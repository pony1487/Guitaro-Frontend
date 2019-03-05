const CONFIG = require('./config.json');
let BASE_URL;
let TOPICS_URL;
let PLANS_URL;
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
    fetchPlans();
}

function fetchPlans(){
    fetch(PLANS_URL) 
    .then(response => response.json())
    .then(json => {
        PLANS_LIST = json["directories"];   
        //console.log(PLANS_LIST);
        createListItem(PLANS_LIST);
        addEventListenerToLesson();
    })
    .catch(error => {
        console.log(error);
    });
}



function createListItem(array){
    /*
    Create a button for each item in the array and append them all to the list in topics.html
    <button id=<i> type="button" class="list-group-item list-group-item-action">Dapibus ac facilisis in</button>
    */
    let plans_list = document.getElementById('plans_list');
    for(let i = 0;i < array.length;i++){
        console.log(array[i]);
        let btn = document.createElement('button');
        btn.innerText = array[i];
        btn.id = i;
        btn.className = "list-group-item list-group-item-action";
        plans_list.appendChild(btn);

    }
}

function addEventListenerToLesson(lesson_path){
    let ul = document.getElementById('plans_list');
    let buttons = ul.getElementsByTagName('button');

    for(let i = 0; i < buttons.length;i++)
    {
        buttons[i].addEventListener('click', clickLesson);
        buttons[i].myParam = lesson_path;
    }
}

function clickLesson(e){
    console.log(e.target.innerText);
    list_lesson_in_plan(e.target.innerText);
}

function list_lesson_in_plan(path){
        // If it is a plan lesson
    if(PLANS_LIST.includes(path)){
        let lesson_path = PLANS_URL + "/" + path;
        console.log(lesson_path);

        fetch(lesson_path) 
        .then(response => response.json())
        .then(json => {
            let list = json["files"];
            console.log(list);
        })
        .catch(error => {
            console.log(error);
        });
    }
}







