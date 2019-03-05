//import '../css/main.css';
//import '../css/input-elements.css';

//import 'jquery';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.css';






// import { ListPlansButton, ListTopicsButton } from './dom-loader';
// import { createListElement, removeChildNodes } from './index_helpers';
// import { createLessonContainer } from './lesson';
// import { loadWavIntoBuffer,playLesson, pauseLessonPlaying, recordLesson, stopRecording } from './lesson_helpers';
// import { init_notation } from './notation';



console.log("Hello from topics.js");

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

$(document).ready(function() {

    //DOM manipulation code
    init();

});
function init(){
    console.log("loaded..");
    fetchTopics();
    fetchPlans();
}

function fetchTopics(){
    fetch(TOPICS_URL) 
    .then(response => response.json())
    .then(json => {
        TOPICS_LIST = json["directories"];
        console.log(TOPICS_LIST);
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
        console.log(PLANS_LIST);
    })
    .catch(error => {
        console.log(error);
    });
}

function createListItem(){
    
}



