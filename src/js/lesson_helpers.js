/*
Code for recording audio was modified from these sources/tutorials:
https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
https://addpipe.com/blog/using-recorder-js-to-capture-wav-audio-in-your-html5-web-site/
*/
let getUserMediaStream;
let recorderObj;
let mediaStreamAudioSourceNode;

let recordAudioContext;

//TESTING
let playbackAudioContext = new AudioContext();
const source = playbackAudioContext.createBufferSource();

let globalAudioBuffer;

export function loadWavIntoBuffer(url){
    fetch(url)    
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => playbackAudioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
		//console.log("In loadWavIntoBuffer");
        return audioBuffer;
    })
    .then(audioBuffer =>{
			//playWav(audioBuffer,playbackAudioContext);
			globalAudioBuffer = audioBuffer;
    });

}

// export function playLesson(e){
//     console.log(e.target.innerText);
//     console.log(e.target.myParam);
//     let url = e.target.myParam;

//     var playbackAudioContext = new AudioContext();
//     fetch(url)    
//     .then(response => response.arrayBuffer())
//     .then(arrayBuffer => playbackAudioContext.decodeAudioData(arrayBuffer))
//     .then(audioBuffer => {
//         return audioBuffer;
//     })
//     .then(audioBuffer =>{
//             playWav(audioBuffer,playbackAudioContext);
//     });
// }

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
	console.log(source.buffer);
	
	//const source = playbackAudioContext.createBufferSource();
	source.buffer = globalAudioBuffer;
	source.connect(playbackAudioContext.destination);
	source.start();
	
}

function pauseWav() {
	//const source = playbackAudioContext.createBufferSource();
    //source.buffer = globalAudioBuffer;
	//source.connect(playbackAudioContext.destination);
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

	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
		console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
		recordAudioContext = new AudioContext();

		let contextDetails = "Format: 2 channel pcm @ " + recordAudioContext.sampleRate/1000+"kHz";
		console.log(contextDetails);

		getUserMediaStream = stream;
		mediaStreamAudioSourceNode = recordAudioContext.createMediaStreamSource(stream);
		//record audio in stereo
		recorderObj = new Recorder(mediaStreamAudioSourceNode,{numChannels:2});
		recorderObj.record();
		console.log("Recording......");

	}).catch(error => {
		console.log(error);
	})

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

	function postWavToServer(blob){
		let audio_player_container = document.getElementById('audio_player_container');
		let blob_url = URL.createObjectURL(blob);
	
		let post_recording_btn = document.createElement('btn');
		let discard_recording_button = document.createElement('btn');
	
		post_recording_btn.className = "btn btn-default";
		post_recording_btn.textContent = "Submit Recording";
		post_recording_btn.id="post_recording_btn";
		
		discard_recording_button.className = "btn btn-default";
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
					console.log(typeof data);
					console.log(data);
				}
			});

			// data.append("message","This is a message");
			// $.ajax({
			// 	type: "Post",
			// 	url: "http://127.0.0.1:5000/test-post",
			// 	data: data,
			// 	processData: false,
			// 	contentType: false,
			// 	success: function (result) {
			// 		if(result != undefined && result.length > 0)
			// 			console.log(result);
			// 	}
			// });
		}
	
		function discard_recording(e){
			recorderObj.clear();
		}
	}// end postWavToServer() 
}

function parseUrl(url){
	//create a new url with HOSTNAME/analyse/<dirone>/<dirtwo>/<lesson>
	//NOTE: I had originally set the url on the frontend <dirone> to be /topics when for anyalyse part it should just be /topic
	//TO DO: Fix this
	let url_corrected = url.replace("topics","topic");
	let parser = document.createElement('a');
	parser.href = url_corrected;
	return parser.protocol + "//" + parser.host + "/analyse" + parser.pathname;     
}

// function postWavToServer(blob){
// 	let audio_player_container = document.getElementById('audio_player_container');
// 	let blob_url = URL.createObjectURL(blob);

// 	let post_recording_btn = document.createElement('btn');
// 	let discard_recording_button = document.createElement('btn');

// 	post_recording_btn.className = "btn btn-default";
//     post_recording_btn.textContent = "Submit Recording";
// 	post_recording_btn.id="post_recording_btn";
	
// 	discard_recording_button.className = "btn btn-default";
//     discard_recording_button.textContent = "Discard Recording";
//     discard_recording_button.id="discard_recording_button";

// 	let audio_player = document.createElement('audio');
// 	audio_player.id = "audio_player";
// 	audio_player.controls = true;
// 	audio_player.src = blob_url;

// 	audio_player_container.appendChild(audio_player);
// 	audio_player_container.appendChild(post_recording_btn);
// 	audio_player_container.appendChild(discard_recording_button);

// 	//attach event listeners for buttons
// 	document.getElementById('post_recording_btn').addEventListener('click',post_recording);
// 	document.getElementById('discard_recording_button').addEventListener('click',discard_recording);

// 	///analyse/<dirone>/<dirtwo>/<lesson>
// 	function post_recording(e){
// 		console.log(e.target.innerText);
// 		console.log(blob);

// 	}

// 	function discard_recording(e){

// 	}
// }





