import '../css/main.css';
import '../css/input-elements.css';

import { ListPlansButton, ListTopicsButton, recordButton, stopButton } from './dom-loader';


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
/*
    myAnchor.parentNode.replaceChild(mySpan, myAnchor);
*/

function fetchTopics(){
    let fetch_response_container = document.getElementById('fetch-response-container');
    removeChildNodes(fetch_response_container);

    //let url = 'http://guitarobackend-env.ebdsxqv3c6.eu-west-1.elasticbeanstalk.com/topics'
    let url = 'http://127.0.0.1:5000/topics'
    fetch(url) 
    .then(response => response.json())
    .then(json => {
        let topic_response_list = document.createElement('div');
        let h2 = document.createElement('h2');
        h2.innerText = "Topics";
        topic_response_list.appendChild(h2);

        let plan_list = json["directories"];
        for(let i = 0;i < plan_list.length;i++){
            console.log(plan_list[i]);
            var ul = document.createElement('ul');
            ul.innerText = plan_list[i];
            ul.className = "list-group-item";
            topic_response_list.appendChild(ul);
        }
        fetch_response_container.appendChild(topic_response_list);        
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
        let plan_response_list = document.createElement('div');
        let h2 = document.createElement('h2');
        h2.innerText = "Plans";
        plan_response_list.appendChild(h2);

        let plan_list = json["directories"];
        for(let i = 0;i < plan_list.length;i++){
            //console.log(plan_list[i]);
            var ul = document.createElement('ul');
            ul.innerText = plan_list[i];
            ul.className = "list-group-item";
            plan_response_list.appendChild(ul);
        }
        fetch_response_container.appendChild(plan_response_list);
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