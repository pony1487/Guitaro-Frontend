/*
Code for recording audio was modified from these sources/tutorials:
https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
https://addpipe.com/blog/using-recorder-js-to-capture-wav-audio-in-your-html5-web-site/
*/
// var audio_recorder_methods = require('./audio_recorder.js');
// var recordLesson = audio_recorder_methods.recordLesson;
// var stopRecording = audio_recorder_methods.stopRecording;
const CONFIG = require('./config.json');

import { stopRecording,recordLesson } from './audio_recorder';
import { draw_tab } from './lesson_notation';

const PlaybackController = require('./PlaybackController.js');
let playbackController = new PlaybackController();


$(document).ready(function() {
    init();
});

function init(){
    console.log("Hello from audio processor");
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

    fetchLessonToBeNotated();
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
        console.log(playbackController.checkIsPlaying());

    });

    $("#stop_playing_button").click(function(){
        let play_button = document.getElementById("play_button");
        play_button.className = "btn btn-secondary";
        play_button.innerText = "Play";
        console.log(playbackController.checkIsPlaying());

    });
});

function fetchLessonToBeNotated(){
    //http://127.0.0.1:5000/notation/topics/picking/A_minor_pentatonic_ascending-95.wav
    //http://127.0.0.1:5000/topics/picking/A_minor_pentatonic_ascending-95.wav

    let url = localStorage.getItem("url");   

    let notation_url = constructNotationUrl(url);

    fetch(notation_url)    
    .then(response => response.json())
    .then(json => {
        let lesson_fret_list = json.lesson_fret_list;
        let lesson_string_list = json.lesson_string_list;
        let duration_list = json.padded_duration_list;
        let total_beats = json.total_beats;

        // Store bpm for use in audio_recorder.js to determine count in
        localStorage.setItem("bpm", json.bpm);
        draw_tab(lesson_string_list,lesson_fret_list,duration_list,total_beats,"lesson_notation");
        test_canvas();

    })
    .catch(error => {
        console.log(error);
    });
}
////////////////////////////////////////////
//DELETE
function test_canvas(){
    let num_of_notes = 8;

    let width = 500;
    let height = 200;

    let x_position_diff = 500 / num_of_notes;
    let string = height / 6;

    let string_coordinates = {}

    let start_string_coordinate = 0;
    let string_number = 1;
    for(let i =0;i < 6;i++){
        string_coordinates[string_number] = start_string_coordinate;
        start_string_coordinate += string;
        string_number++;
    }

    //console.log(string_coordinates);

    let canvas = document.getElementById("lessonNotationCanvas");
    let ctx = canvas.getContext("2d");
    ctx.moveTo(0, 0);
    ctx.fillStyle = "red";

    let x_pos = 30;
    let y_pos = 150;

    ctx.fillRect(x_pos,y_pos,10,10); 

    // let x_pos = 10;

    // let test_string_nums = [6,6,5,5,4,4,5,5];

    // for(let i = 0; i < num_of_notes;i++){
    //     let string_played = test_string_nums[i];
    //     console.log(string_played);
    //     let y_pos = string_coordinates[string_played];
        
    //     console.log("y_pos: " + y_pos);
    //     ctx.fillRect(x_pos,y_pos,10,10); 
    //     x_pos += x_position_diff;
    // }
}
////////////////////////////////////////////////////



function loadWavIntoBuffer(){
    console.log("loadWavIntoBuffer" + localStorage.getItem("url"));
    let url = localStorage.getItem("url");
    fetch(url)    
    .then(response => response.arrayBuffer())
    .catch(error =>{
        console.log(error);
    })
    .then(arrayBuffer => {
        let pbc = playbackController.getAudioContext();
        return pbc.decodeAudioData(arrayBuffer);
    })
    .catch(error =>{
        console.log(error);
    })
    .then(audioBuffer => {
        return audioBuffer;
    })
    .catch(error =>{
        console.log(error);
    })
    .then(audioBuffer =>{
        playbackController.setAudioBuffer(audioBuffer);
        playbackController.printAudioBuffer();
    }).catch(error =>{
        alert("Something went wrong: Could not fetch audio file!");
        console.log(error);
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

function constructNotationUrl(url){
    /*  
parser.protocol; // => "http:"
parser.host;     // => "example.com:3000"
parser.hostname; // => "example.com"
parser.port;     // => "3000"
parser.pathname; // => "/pathname/"
parser.hash;     // => "#hash"
parser.search;   // => "?search=test"
parser.origin;  

    */
    let parser = document.createElement('a');
    parser.href = url;

    let notationUrl = parser.origin + "/" + "notation" + parser.pathname;
    console.log(notationUrl);

    return notationUrl;
}
