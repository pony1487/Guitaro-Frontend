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


let playbackAudioContext = new AudioContext();

let globalAudioBuffer;


$(document).ready(function() {
    init();
});
function init(){
    console.log("Hello from audio processor");
    console.log(localStorage.getItem("url"));
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
});


function loadWavIntoBuffer(){
    url = localStorage.getItem("url")
    fetch(url)    
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => playbackAudioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
        return audioBuffer;
    })
    .then(audioBuffer =>{
        globalAudioBuffer = audioBuffer;
        console.log(globalAudioBuffer);
    });
}