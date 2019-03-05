import { processFeedbackJSON } from './lesson_feedback';
import 'jquery';
import 'bootstrap';
/*
Code for recording audio was modified from these sources/tutorials:
https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
https://addpipe.com/blog/using-recorder-js-to-capture-wav-audio-in-your-html5-web-site/
*/
let getUserMediaStream;
let recorderObj;
let mediaStreamAudioSourceNode;
let recordAudioContext;
let recordingPresent = false

//TESTING
let playbackAudioContext = new AudioContext();

let globalAudioBuffer;

export function loadWavIntoBuffer(url){
    fetch(url)    
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => playbackAudioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
        return audioBuffer;
    })
    .then(audioBuffer =>{
			globalAudioBuffer = audioBuffer;
    });

}


export function playLesson(e){
	    console.log(e.target.innerText);
	    console.log(e.target.myParam);
	    let url = e.target.myParam;
		playWav();
}

export function pauseLessonPlaying(e){
    console.log(e.target.myParam);
	console.log(e.target.innerText);
	let url = e.target.myParam;
	pauseWav();

	
}


function playWav() {
	
	const source = playbackAudioContext.createBufferSource();
	source.buffer = globalAudioBuffer;
	source.connect(playbackAudioContext.destination);
	//source.start();
	source.start();

}

function pauseWav() {
	let btn = document.getElementById('pause_button');
	if(playbackAudioContext.state == 'running'){
		playbackAudioContext.suspend()
		btn.innerText = "Resume";
	}
	else if(playbackAudioContext.state == 'suspended'){
		playbackAudioContext.resume();
		btn.innerText = "Pause";
	}
}

function stopWav() {
	//TO DO
}

export function recordLesson(e){
	//e.target.myParam is the url of the lesson the user played
    console.log(e.target.innerText);
	console.log(e.target.myParam);

	//Audio only
	let constraints = { audio: true, video:false }

	//Disable Recording button until finished current recording
	//NOT WORKING
	let rec_btn = document.getElementById('record_button');
	rec_btn.disabled = true;

	if(recordingPresent){
		console.log("You have already recorded. Submit it or discard it");
		alert("You have already recorded. Submit it or discard it");
	}
	else
	{
		navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
			console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
			recordAudioContext = new AudioContext();

			let contextDetails = "Format: 2 channel pcm @ " + recordAudioContext.sampleRate/1000+"kHz";
			console.log(contextDetails);

			getUserMediaStream = stream;
			mediaStreamAudioSourceNode = recordAudioContext.createMediaStreamSource(stream);
			//record audio in stereo
			recorderObj = new Recorder(mediaStreamAudioSourceNode,{numChannels:2});

			displayCountIn(60);
			recorderObj.record();
			console.log("Recording......");

			// let bpm = 60;
			// let num_of_beats = 8;
			// let count_in_seconds = (60/bpm) * 1000;
			// //give the user a count in 
			// let countInTimer = setInterval(function(){
			// 	console.log(num_of_beats);
			// 	num_of_beats -= 1;
			// 	if(num_of_beats <= 0){
			// 	  clearInterval(countInTimer);
			// 	  	recorderObj.record();
			// 		console.log("Recording......");
			// 	}
			//   }, count_in_seconds);
		}).catch(error => {
			console.log(error);
		})
	}
}

export function stopRecording(e){
	console.log("Stopped recording.....");
	
	//e.target.myParam is the url of the lesson the user played
	let url = e.target.myParam;

	recorderObj.stop();
	//stop using microphone
	getUserMediaStream.getAudioTracks()[0].stop();

	//Create wav blog to be posted to server for analysis
	recorderObj.exportWAV(postWavToServer);
	recordingPresent = true;

	function postWavToServer(blob){
		let audio_player_container = document.getElementById('audio_player_container');
		let blob_url = URL.createObjectURL(blob);
	
		let post_recording_btn = document.createElement('btn');
		let discard_recording_button = document.createElement('btn');
	
		post_recording_btn.className = "btn btn-secondary";
		post_recording_btn.textContent = "Submit Recording";
		post_recording_btn.id="post_recording_btn";
		
		discard_recording_button.className = "btn btn-secondary";
		discard_recording_button.textContent = "Discard Recording";
		discard_recording_button.id="discard_recording_button";
	
		let audio_player = document.createElement('audio');
		audio_player.id = "audio_player";
		audio_player.controls = true;
		audio_player.src = blob_url;
	
		audio_player_container.appendChild(audio_player);
		audio_player_container.appendChild(post_recording_btn);
		audio_player_container.appendChild(discard_recording_button);
	
		//attach event listeners for buttons
		document.getElementById('post_recording_btn').addEventListener('click',post_recording);
		document.getElementById('discard_recording_button').addEventListener('click',discard_recording);
	
		
		function post_recording(e){
			//Server endpoint for non chord lessons is analyse/<dirone>/<dirtwo>/<lesson>
			//<dirone> is topic (just the word topic NOT topics)
			//<dirtwo> is the topic ie picking or exercises etc
			//<lesson> is the actual lesson name like: A_minor_scale_frag_1_LESSON.wav

			//show progress bar
			$('#uploadProgressModal').modal('show');

			console.log(e.target.innerText);
			console.log(blob);
			console.log("post recording to: " + url);
			let analysis_url = parseUrl(url);
			console.log(analysis_url);
			
			var user_recording_file = new File([blob], "user_recording.wav", {type: "audio/wav", lastModified: Date.now()})
			console.log(user_recording_file);

			var data = new FormData();
			data.append('file',user_recording_file);

			$.ajax({
				type: "Post",
				url: analysis_url,
				data: data,
				contentType: false, 
				processData: false, 
				success: function (data) {
					recordingPresent = false;
					$('#uploadProgressModal').modal('hide');
					processFeedbackJSON(data);
					showFeedbackModel();
				},
				error: function(xhr, status, error) {
					console.log(xhr);
					console.log(status);
					console.log(error);
					alert("xhr: " + xhr + "\nStatus: " + status +"\nError: " + error);
				 },
			});
		}

		function showFeedbackModel(){
			//enable any popovers on page. There is one in the modal
			$(function () {
				$('[data-toggle="popover"]').popover()
			})
			$('#feedbackModal').modal('show');
		}
	
		function discard_recording(e){
			console.log("discard recording");
			//clear recording buffer
			recorderObj.clear();
			//remove audio player and buttons
			let post_recording_btn = document.getElementById('post_recording_btn');
			post_recording_btn.remove();

			let audio_player = document.getElementById('audio_player');
			audio_player.remove();

			let discard_recording_button = document.getElementById('discard_recording_button');
			discard_recording_button.remove();

			recordingPresent = false;
			
		}
	}// end postWavToServer() 
}

function parseUrl(url){
	//create a new url with HOSTNAME/analyse/<dirone>/<dirtwo>/<lesson>
	//NOTE: I had originally set the url on the frontend <dirone> to be /topics when for anyalyse part it should just be /topic
	//TO DO: Fix this


	if(url.includes("topics")){
		let url_corrected = url.replace("topics","topic");
		let parser = document.createElement('a');
		parser.href = url_corrected;
		//find if its a chord to be analysed. Chord lessons are prefixed with chords. EG chord_<lesson>.wav
		let arr = parser.pathname.split("/");
		if(arr[3].includes("chord_")){
			return parser.protocol + "//" + parser.host + "/analyse-chords" + parser.pathname; 
		}
		else{
			return parser.protocol + "//" + parser.host + "/analyse" + parser.pathname;     
		}
	}
	if(url.includes("plans")){
		let url_corrected = url.replace("plans","plan");
		let parser = document.createElement('a');
		parser.href = url_corrected;
		//find if its a chord to be analysed. Chord lessons are prefixed with chords. EG chord_<lesson>.wav
		let arr = parser.pathname.split("/");
		if(arr[3].includes("chord_")){
			return parser.protocol + "//" + parser.host + "/analyse-chords" + parser.pathname; 
		}
		else{
			return parser.protocol + "//" + parser.host + "/analyse" + parser.pathname;     
		}
	}
}
function displayCountIn(bpm){
	//This is used to get the player to wait till roughly the same time as the lesson starts.
	//the lessons have been recorded with a count in of 4 beats. 
	//The user will be recorded straight away but having them wait until they are told to play will roughly line up
	//their playing start time with the lesson playing start time. This is done to compare the timing list
	let count_in_seconds = (60/bpm) * 1000;
	let num_of_beats = 4;
	let countInTimer = setInterval(function(){
		console.log(num_of_beats);
		num_of_beats -= 1;
		if(num_of_beats <= 0){
			clearInterval(countInTimer);

		}
	}, count_in_seconds);
}
