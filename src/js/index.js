import '../css/main.css';
import '../css/input-elements.css';
import 'jquery';

import { ListPlansButton, ListTopicsButton } from './dom-loader';
import { createListElement, removeChildNodes } from './index_helpers';
import { createLessonContainer } from './lesson';
import { loadWavIntoBuffer,playLesson, pauseLessonPlaying, recordLesson, stopRecording } from './lesson_helpers';
import { init_notation } from './notation';


const CONFIG = require('./config.json');
let BASE_URL;
let TOPICS_URL;
let PLANS_URL;
let TOPICS_LIST;
let PLANS_LIST;

// Set up local dev or prod aws
let environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

if(environment == 'production'){
    BASE_URL = CONFIG.awsUrl;
    TOPICS_URL = CONFIG.awsTopics;
    PLANS_URL = CONFIG.awsPlans;
}
else if(environment == 'development'){
    BASE_URL = CONFIG.localUrl;
    TOPICS_URL = CONFIG.localTopics;
    PLANS_URL = CONFIG.localPlans;
}

console.log(environment);
console.log(BASE_URL);
console.log(TOPICS_URL);
console.log(PLANS_URL);

ListTopicsButton.addEventListener('click', listTopics);
ListPlansButton.addEventListener('click', listPlans);



window.onload = function init(){
    console.log("loaded..");
    fetchTopics();
    fetchPlans();

}

function fetchTopics(){
    fetch(TOPICS_URL) 
    .then(response => response.json())
    .then(json => {
        TOPICS_LIST = json["directories"];

    })
    .catch(error => {TOPICS_LIST
        console.log(error);
    });
}

function fetchPlans(){
    fetch(PLANS_URL) 
    .then(response => response.json())
    .then(json => {
        PLANS_LIST = json["directories"];
    })
    .catch(error => {
        console.log(error);
    });
}

function listTopics(){
    //prevent constantly appending a new list each time
    let fetch_response_container = document.getElementById('fetch-response-container');
    removeChildNodes(fetch_response_container);

    //remove lesson container if there is one
    let lesson_div = document.getElementById('lesson');
    removeChildNodes(lesson_div);

    let list_element = createListElement(TOPICS_LIST,"Topics","topics");
    fetch_response_container.appendChild(list_element);
    addEventListenerToList();

}

function listPlans(){
    //prevent constantly appending a new list each time
    let fetch_response_container = document.getElementById('fetch-response-container');
    removeChildNodes(fetch_response_container);

    //remove lesson container if there is one
    let lesson_div = document.getElementById('lesson');
    removeChildNodes(lesson_div);

    let list_element = createListElement(PLANS_LIST,"Plans","plans");
    fetch_response_container.appendChild(list_element);
    addEventListenerToList();

}

function addEventListenerToList(){
    let ul = document.getElementById('response_list');
    let lis = ul.getElementsByTagName('li');

    for(let i = 0; i < lis.length;i++)
    {
        lis[i].addEventListener('click', clickListItem);
    }
}

function clickListItem(e){
    list_lesson_in_topic(e.target.innerText);
}

function list_lesson_in_topic(path){
    let fetch_response_container = document.getElementById('fetch-response-container');
    removeChildNodes(fetch_response_container);

    // If it is a topic lesson
    if(TOPICS_LIST.includes(path)){
        let lesson_path = TOPICS_URL + "/" + path;
        fetch(lesson_path) 
        .then(response => response.json())
        .then(json => {
            let list = json["files"];
            let list_element = createListElement(list,"Lessons",path);
            fetch_response_container.appendChild(list_element);
            addEventListenerToLesson(lesson_path);

            //add event listent to button that was just created in index_helper.js
            let back_btn = document.getElementById('back_button');
            back_btn.addEventListener('click',goBackFromLessonsInTopic);
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    // If it is a plan lesson
    if(PLANS_LIST.includes(path)){
        let lesson_path = PLANS_URL + "/" + path;
        fetch(lesson_path) 
        .then(response => response.json())
        .then(json => {
            let list = json["files"];
            let list_element = createListElement(list,"Lessons",path);
            fetch_response_container.appendChild(list_element);
            addEventListenerToLesson(lesson_path);

            //add event listent to button that was just created in index_helper.js
            let back_btn = document.getElementById('back_button');
            back_btn.addEventListener('click',goBackFromLessonsInPlan);
        })
        .catch(error => {
            console.log(error);
        });

    }
}

function addEventListenerToLesson(lesson_path){
    let ul = document.getElementById('response_list');
    let lis = ul.getElementsByTagName('li');

    for(let i = 0; i < lis.length;i++)
    {
        lis[i].addEventListener('click', clickLesson);
        lis[i].myParam = lesson_path;
    }
}

function clickLesson(e){
    let url = e.target.myParam + "/" + e.target.innerText;

    //remove lesson list
    let fetch_response_container = document.getElementById('fetch-response-container');
    removeChildNodes(fetch_response_container);

    loadWavIntoBuffer(url);
    //get lesson element from index.html
    let lesson_element = document.getElementById('lesson');

    let lesson_container = createLessonContainer();
    lesson_element.appendChild(lesson_container);

    //get the buttons that were just created
    let play_button = document.getElementById('play_button');
    play_button.addEventListener('click', playLesson);
    play_button.myParam = url;

    let pause_button = document.getElementById('pause_button');
    pause_button.addEventListener('click', pauseLessonPlaying);
    pause_button.myParam = url;


    let record_button = document.getElementById('record_button');
    record_button.addEventListener('click', recordLesson);
    record_button.myParam = url;

    let stop_recording_button = document.getElementById('stop_recording_button');
    stop_recording_button.addEventListener('click', stopRecording);
    stop_recording_button.myParam = url;

}


function goBackFromLessonsInTopic(e){
    //Fetch the List of Topics again
    listTopics();
    console.log("goBackFromTopics");
}

function goBackFromLessonsInPlan(e){
    //Fetch the list of Plans again
    listPlans();
    console.log("goBackFromPlans");
}

// function clickLesson(e){
//     let url = e.target.myParam + "/" + e.target.innerText;
//     console.log(url);

//     var context = new AudioContext();
//     fetch(url)    
//     .then(response => response.arrayBuffer())
//     .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
//     .then(audioBuffer => {
//         return audioBuffer;
//     })
//     .then(audioBuffer =>{
//             playWav(audioBuffer,context);
//     });

// }

// function playWav(audioBuffer,context) {
//     const source = context.createBufferSource();
//     source.buffer = audioBuffer;
//     source.connect(context.destination);
//     source.start();
// }
