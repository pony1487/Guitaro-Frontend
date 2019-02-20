import '../css/main.css';
import '../css/input-elements.css';
import 'jquery';

import { ListPlansButton, ListTopicsButton, recordButton, stopButton } from './dom-loader';
import { createListElement, removeChildNodes } from './index_helpers';

const CONFIG = require('./config.json');
let BASE_URL = CONFIG.localUrl;
let TOPICS_URL = CONFIG.localTopics;
let PLANS_URL = CONFIG.localPlans;

let TOPICS_LIST;
let PLANS_LIST;

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
    .catch(error => {
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
    let fetch_response_container = document.getElementById('fetch-response-container');
    removeChildNodes(fetch_response_container);

    let list_element = createListElement(TOPICS_LIST,"Topics","topics");
    fetch_response_container.appendChild(list_element);
    addEventListenerToList();
}

function listPlans(){
    let fetch_response_container = document.getElementById('fetch-response-container');
    removeChildNodes(fetch_response_container);

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
    console.log(url);

    var context = new AudioContext();
    fetch(url)    
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
        return audioBuffer;
    })
    .then(audioBuffer =>{
            playWav(audioBuffer,context);
    });

}

function playWav(audioBuffer,context) {
    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start();
}




