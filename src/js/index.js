import '../css/main.css';
import '../css/input-elements.css';
import 'jquery';

import { ListPlansButton, ListTopicsButton, recordButton, stopButton } from './dom-loader';
import { addEventListenersToListItems, createListElement, removeChildNodes } from './index_helpers';

var CONFIG = require('./config.json');
var URL = CONFIG.localUrl;

console.log(URL);

ListTopicsButton.addEventListener('click', listTopics);
ListPlansButton.addEventListener('click', listPlans);

recordButton.addEventListener('click', recordAudio);
stopButton.addEventListener('click', stopRecording);

function listTopics(){
    fetchTopics();
}

function listPlans(){
    fetchPlans();
}

function fetchTopics(){
    let fetch_response_container = document.getElementById('fetch-response-container');
    removeChildNodes(fetch_response_container);

    let url = URL + '/topics'
    fetch(url) 
    .then(response => response.json())
    .then(json => {
        let topic_list = json["directories"];
        let topic_list_element = createListElement(topic_list,"Topics");
        console.log(topic_list_element);
        fetch_response_container.appendChild(topic_list_element);
        addEventListenersToListItems();
    })
    .catch(error => {
        console.log(error);
    });
}

function fetchPlans(){

    // Remove Previous Lists to stop appending multiple items
    let fetch_response_container = document.getElementById('fetch-response-container');
    removeChildNodes(fetch_response_container);

    let url =  URL + '/plans'
    fetch(url) 
    .then(response => response.json())
    .then(json => {
        let plan_list = json["directories"];
        let plan_list_element = createListElement(plan_list,"Plans");
        console.log(plan_list_element.childNodes);
        fetch_response_container.appendChild(plan_list_element);
        addEventListenersToListItems();
    })
    .catch(error => {
        console.log(error);
    });
}


function testAudioUserGetMedia(){
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported.');
        navigator.mediaDevices.getUserMedia (
           // constraints - only audio needed for this app
           {
              audio: true
           })
     
           // Success callback
           .then(function(stream) {
      
           })
     
           // Error callback
           .catch(function(err) {
              console.log('The following getUserMedia error occured: ' + err);
           }
        );
     } else {
        console.log('getUserMedia not supported on your browser!');
     }
}

function recordAudio(){
    console.log("Recording...");
}

function stopRecording(){
    console.log("Stopped...");
}