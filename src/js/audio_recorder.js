import 'jquery';
import 'bootstrap';

//NOTE to self: This is how you add mutliple js files into one dist bundle. Export it from <blah>.js
//var processFeedbackJSON = require('./lesson_feedback');
import {processFeedbackJSON} from './lesson_feedback';


let getUserMediaStream;
let recorderObj;
let mediaStreamAudioSourceNode;
let recordAudioContext;
let recordingPresent = false

export function recordLesson(e){
    
	//Audio only
	let constraints = { audio: true, video:false }

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

		}).catch(error => {
			console.log(error);
		})
	}
}

export function stopRecording(e){
    console.log("Stopped recording.....");

   
    let url = localStorage.getItem("url");
    console.log(url);

	recorderObj.stop();
	//stop using microphone
	getUserMediaStream.getAudioTracks()[0].stop();

	//Create wav blog to be posted to server for analysis
	recorderObj.exportWAV(createAudioElement);
    recordingPresent = true;
    
}


function createAudioElement(blob){
    //hide the playback controls
    $("#playback_and_recording_controls").hide();

    let audio_player_container = document.getElementById('audio_player_container');
    console.log(audio_player_container);
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
    console.log(audio_player);
    audio_player.id = "audio_player";
    audio_player.controls = true;
    audio_player.src = blob_url;


    audio_player_container.appendChild(audio_player);
    audio_player_container.appendChild(post_recording_btn);
    audio_player_container.appendChild(discard_recording_button);

    //attach event listeners for buttons
    document.getElementById('post_recording_btn').addEventListener('click',post_recording);
    post_recording_btn.blob = blob;
    document.getElementById('discard_recording_button').addEventListener('click',discard_recording);
}

function post_recording(e){
    //Server endpoint for non chord lessons is analyse/<dirone>/<dirtwo>/<lesson>
    //<dirone> is topic (just the word topic NOT topics)
    //<dirtwo> is the topic ie picking or exercises etc
    //<lesson> is the actual lesson name like: A_minor_scale_frag_1_LESSON.wav

    let url = localStorage.getItem("url");
    //show progress bar
    $('#uploadProgressModal').modal('show');

    //get the blob to post
    let blob = e.target.blob;
    console.log("post recording to: " + url);
    let analysis_url = createAnalysisUrl(url);
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
            console.log(data);
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

function discard_recording(e){
    //remove the audio player and buttons
    document.getElementById('audio_player').remove();
    document.getElementById('discard_recording_button').remove();
    document.getElementById('post_recording_btn').remove();
    document.getElementById('user_notation').remove();

    //clear the recording and allow another to be made
    recorderObj.clear();
    recordingPresent = false;
    
    //allow the user to make another recording
    $("#playback_and_recording_controls").show();
}

function displayCountIn(bpm){
	//This is used to get the player to wait till roughly the same time as the lesson starts.
	//the lessons have been recorded with a count in of 4 beats. 
	//The user will be recorded straight away but having them wait until they are told to play will roughly line up
    //their playing start time with the lesson playing start time. This is done to compare the timing list
    let count_in_div = document.getElementById('count_in_div');
	let count_in_seconds = (60/bpm) * 1000;
	let num_of_beats = 4;
	let countInTimer = setInterval(function(){
        console.log(num_of_beats);
        count_in_div.innerText = num_of_beats;
        
		num_of_beats -= 1;
		if(num_of_beats <= 0){
			clearInterval(countInTimer);
            
		}
    }, count_in_seconds);
    count_in_div.innerText = "";
}


function createAnalysisUrl(url){
	//create a new url with HOSTNAME/analyse/<dirone>/<dirtwo>/<lesson>
	if(url.includes("topics")){
		let parser = document.createElement('a');
		parser.href = url;
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
		let parser = document.createElement('a');
		parser.href = url;
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

function showFeedbackModel(){
    //enable any popovers on page. There is one in the modal
    $(function () {
        $('[data-toggle="popover"]').popover()
    })
    $('#feedbackModal').modal('show');
}