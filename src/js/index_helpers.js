export function createListElement(array,h2_text,path){
    /*
    Takes an array from a fetch request response and creates a div element contaning a list
    <divid="response_div">
        <h2>h2_text</h2> <!--This will be "Lessons" when it is showing a list of lessons -->
        <ul id="response_list" class=path>
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
    response_unordered_list.className = path;
    response_unordered_list.id = "response_list";

    for(let i = 0;i < array.length;i++){
        let li = document.createElement('li');
        li.innerText = array[i];
        li.id = i;
        li.className = "list-group-item";
        response_unordered_list.appendChild(li);
    }
    
    response_div.appendChild(response_unordered_list);
    console.log(h2_text);
    //Only add a back button if it the list being created is a list of lessons as opposed to list of topics or plans
    if(h2_text === "Lessons"){
        let back_button = document.createElement('button');
        back_button.className = "btn btn-default";
        back_button.textContent = "Back";
        back_button.id="back_button";
        
        response_div.appendChild(back_button);
    }
    return response_div;
}


export function removeChildNodes(element){
    if(element.hasChildNodes()){
        let child_nodes = element.childNodes;
        for(let i = 0; i < child_nodes.length;i++){
            element.removeChild(child_nodes[i]);
        }
    }
}

//Used for debugging
export function getEachLessonInTopic(){
    //Get each lesson in the topic
    for(let i = 0; i < TOPICS_LIST.length;i++){
        let lesson_path = TOPICS_URL + "/" + TOPICS_LIST[i];
        //console.log(lesson_path);

        fetch(lesson_path) 
        .then(response => response.json())
        .then(json => {
            //returns an array for each topic containing lesson file names
            return json["files"];
        })
        .then(lessons => {
            for(let i = 0; i < lessons.length;i++){
                //console.log(lesson_path + "/" + lessons[i]);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
}

//Used for debugging
export function getEachLessonInPlan(){
    //Get each lesson in the plan
    for(let i = 0; i < PLANS_LIST.length;i++){
        let lesson_path = PLANS_URL + "/" + PLANS_LIST[i];
        console.log(lesson_path);
        
        fetch(lesson_path) 
        .then(response => response.json())
        .then(json => {
            //returns an array for each topic containing lesson file names
            return json["files"];
        })
        .then(lessons => {
            for(let i = 0; i < lessons.length;i++){
                //console.log(lesson_path + "/" + lessons[i]);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }   
}

export function hideElement(element) {
    let x = document.getElementById(element);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}