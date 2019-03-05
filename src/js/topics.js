const CONFIG = require('./config.json');
let BASE_URL;
let TOPICS_URL;
let PLANS_URL;
let TOPICS_LIST;

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
    init();
});
function init(){
    console.log("loaded..");
    fetchTopics();
}

function fetchTopics(){
    fetch(TOPICS_URL) 
    .then(response => response.json())
    .then(json => {
        if (TOPICS_LIST == null) {
            TOPICS_LIST = json["directories"];
            createListItem(TOPICS_LIST,"topics_list");
            addEventListenerToLesson();
            //console.log(TOPICS_LIST);
        }
        else
        {
            console.log("Fetch topics already done");
        }
       
    })
    .catch(error => {
        console.log(error);
    });
}





function createListItem(array,elementid){
    /*
    Create a button for each item in the array and append them all to the list in topics.html
    <button id=<i> type="button" class="list-group-item list-group-item-action">Dapibus ac facilisis in</button>
    */
    let element = document.getElementById(elementid);
    for(let i = 0;i < array.length;i++){
        console.log(array[i]);
        let btn = document.createElement('button');
        btn.innerText = array[i];
        btn.id = i;
        btn.className = "list-group-item list-group-item-action";
        element.appendChild(btn);

    }

    if(elementid != "topics_list"){
    let backbutton = document.createElement('button');
        backbutton.innerText = "Back";
        backbutton.addEventListener('click',click_back_button);

        function click_back_button(e){
            console.log("Click");
            $("#lessons_in_topic_container").hide();
            $("#topic_list_container").show();
        }

        element.appendChild(backbutton);
    }
}

function addEventListenerToLesson(lesson_path){
    let ul = document.getElementById('topics_list');
    let buttons = ul.getElementsByTagName('button');

    for(let i = 0; i < buttons.length;i++)
    {
        buttons[i].addEventListener('click', clickLesson);
        buttons[i].myParam = lesson_path;
    }
}

function clickLesson(e){
    console.log(e.target.innerText);
    list_lesson_in_topic(e.target.innerText);
}


/*
$(document).ready(function(){
  $(".btn1").click(function(){
    $("#topics").hide();
    $("#lessons_in_topic").show();
  });
  $(".btn2").click(function(){
    $("#lessons_in_topic").hide();
    $("#topics").show();
  });
});
*/

function list_lesson_in_topic(path){

    let element = document.getElementById('lesson_in_topic_list');
    console.log(element.childNodes.length);
    console.log("TEST!!!!!!!!!!!!!!");
    let list;
    // If it is a topic lesson
    if(TOPICS_LIST.includes(path)){
        let lesson_path = TOPICS_URL + "/" + path;
        console.log(lesson_path);
        fetch(lesson_path) 
        .then(response => response.json())
        .then(json => {
                
                list = json["files"];
                console.log(list);

                if(!$(lessons_in_topic_container).is(":visible")){
                    $("#lessons_in_topic_container").show();
                } 

                $("#topic_list_container").hide();

                if(element.childNodes.length > 0){
                    console.log("data already fetched");
                }
                else{
                    createListItem(list,"lesson_in_topic_list");
                }
            
        })
        .catch(error => {
            console.log(error);
        });
    }
}



