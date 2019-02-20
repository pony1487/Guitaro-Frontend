import '../css/main.css';
import '../css/input-elements.css';
import 'jquery';

import { ListPlansButton, ListTopicsButton, recordButton, stopButton } from './dom-loader';


const p = $('test_p');
console.log(p);
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

    //let url = 'http://guitarobackend-env.ebdsxqv3c6.eu-west-1.elasticbeanstalk.com/topics'
    let url = 'http://127.0.0.1:5000/topics'
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

    //let url = 'http://guitarobackend-env.ebdsxqv3c6.eu-west-1.elasticbeanstalk.com/topics'
    let url = 'http://127.0.0.1:5000/plans'
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


function createListElement(array,h2_text){
    /*
    Takes an array from a fetch request response and creates a div element contaning a list
    <divid="response_div">
        <h2></h2>
        <ul id="response_list">
            <li id="0"></li>
            <li id="1"></li>
        </ul>
    </div>

    */
    let response_div = document.createElement('div');
    let h2 = document.createElement('h2');
    h2.innerText = h2_text;
    response_div.appendChild(h2);

    let response_unordered_list = document.createElement('ul');
    response_unordered_list.id = "response_list";

    for(let i = 0;i < array.length;i++){
        var li = document.createElement('li');
        li.innerText = array[i];
        li.id = i;
        li.className = "list-group-item";
        response_unordered_list.appendChild(li);
    }
    
    response_div.appendChild(response_unordered_list);
    return response_div;
}

function addEventListenersToListItems(){
    var ul = document.getElementById('response_list');
    var lis = ul.getElementsByTagName('li');

    for(let i = 0; i < lis.length;i++)
    {
        lis[i].addEventListener('click', clickEvent);
    }
}

function clickEvent(e){
    console.log(e.target.id + " was clicked");
}

function removeChildNodes(element){
    if(element.hasChildNodes()){
        let child_nodes = element.childNodes;
        for(var i = 0; i < child_nodes.length;i++){
            element.removeChild(child_nodes[i]);
        }
    }
}

function hideElement(element) {
    var x = document.getElementById(element);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

function recordAudio(){
    console.log("Recording...");
}

function stopRecording(){
    console.log("Stopped...");
}