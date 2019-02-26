/*
Code for recording audio was modified from these sources/tutorials:
https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
https://addpipe.com/blog/using-recorder-js-to-capture-wav-audio-in-your-html5-web-site/
*/
let getUserMediaStream;
let recorderObj;
let mediaStreamAudioSourceNode;

let recordAudioContext;



export function playLesson(e){
    console.log(e.target.innerText);
    console.log(e.target.myParam);
    let url = e.target.myParam;

    var playbackAudioContext = new AudioContext();
    fetch(url)    
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => playbackAudioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
        return audioBuffer;
    })
    .then(audioBuffer =>{
            playWav(audioBuffer,playbackAudioContext);
    });
}

export function stopLessonPlaying(e){
    console.log(e.target.myParam);
    console.log(e.target.innerText);
}


function playWav(audioBuffer,playbackAudioContext) {
    const source = playbackAudioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(playbackAudioContext.destination);
    source.start();
}

function stopWav(audioBuffer,playbackAudioContext) {

}

export function recordLesson(e){
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
	recorderObj.stop();
	//stop using microphone
	getUserMediaStream.getAudioTracks()[0].stop();

	//Create wav blog to be posted to server for analysis
	recorderObj.exportWAV(postWavToServer);
}

function postWavToServer(blob){
	let audio_player_container = document.getElementById('audio_player_container');
	console.log(blob);
	let blob_url = URL.createObjectURL(blob);
	console.log(blob_url);

	let audio_player = document.createElement('audio');
	audio_player.controls = true;
	audio_player.src = blob_url;

	audio_player_container.appendChild(audio_player);

}


