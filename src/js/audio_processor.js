/*
Code for recording audio was modified from these sources/tutorials:
https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
https://addpipe.com/blog/using-recorder-js-to-capture-wav-audio-in-your-html5-web-site/
*/
var audio_recorder_methods = require('./audio_recorder.js');
var recordLesson = audio_recorder_methods.recordLesson;
var stopRecording = audio_recorder_methods.stopRecording;

const PlaybackController = require('./PlaybackController.js');
let playbackController = new PlaybackController();

$(document).ready(function() {
    init();
});

function init(){
    console.log("Hello from audio processor");
    console.log(localStorage.getItem("url"));
    setHeaderToLessonName(localStorage.getItem("url"));

    let play_button = document.getElementById('play_button');
    play_button.addEventListener('click', playLesson);

    let stop_button = document.getElementById('stop_playing_button');
    stop_button.addEventListener('click', stopLessonPlaying);

    let pause_button = document.getElementById('pause_button');
    pause_button.addEventListener('click', pauseLesson);

    let record_button = document.getElementById('record_button');
    record_button.addEventListener('click', recordLesson);


    let stop_recording_button = document.getElementById('stop_button');
    stop_recording_button.addEventListener('click', stopRecording);
    
    loadWavIntoBuffer();
}

$(document).ready(function(){
    $("#record_button").click(function(){
        let record_button = document.getElementById("record_button");
        record_button.className = "btn btn-danger";
        record_button.innerText = "Recording";
    });

    $("#stop_button").click(function(){
        let record_button = document.getElementById("record_button");
        record_button.className = "btn btn-secondary";
        record_button.innerText = "Record";
    });

    $("#play_button").click(function(){
        let play_button = document.getElementById("play_button");
        play_button.className = "btn btn-success";
        play_button.innerText = "Playing";
    });

    $("#stop_playing_button").click(function(){
        let play_button = document.getElementById("play_button");
        play_button.className = "btn btn-secondary";
        play_button.innerText = "Play";
    });
});


function loadWavIntoBuffer(){
    console.log(localStorage.getItem("url"));
    url = localStorage.getItem("url");
    fetch(url)    
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => {
        pbc = playbackController.getAudioContext();
        return pbc.decodeAudioData(arrayBuffer);
    })
    .then(audioBuffer => {
        return audioBuffer;
    })
    .then(audioBuffer =>{
        globalAudioBuffer = audioBuffer;
        playbackController.setAudioBuffer(audioBuffer);
        playbackController.printAudioBuffer();
    });
}

function playLesson(e){
    playbackController.playAudio();
}

function stopLessonPlaying(e){
    playbackController.stopAudio();
}

function pauseLesson(e){
    let btn = document.getElementById('pause_button');
    let state = playbackController.pauseAudio();
    console.log(state);
	if(state == 'running'){
        btn.innerText = "Resume";
        btn.className = "btn btn-secondary";
        
	}
	else if(state == 'suspended'){
        btn.innerText = "Suspended";
        btn.className = "btn btn-warning";
	}
}

function setHeaderToLessonName(url){

    let header = document.getElementById('lesson_header');
    let parser = document.createElement('a');
    parser.href = url;
    let arr = parser.pathname.split("/");
    header.innerText += ": " +  arr[3];
    
}
