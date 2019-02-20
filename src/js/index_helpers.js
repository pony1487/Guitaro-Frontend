const CONFIG = require('./config.json');
let URL = CONFIG.localUrl;

export function createListElement(array,h2_text,path){
    /*
    Takes an array from a fetch request response and creates a div element contaning a list
    <divid="response_div">
        <h2></h2>
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
    //console.log(response_unordered_list.className);
    response_unordered_list.id = "response_list";

    for(let i = 0;i < array.length;i++){
        let li = document.createElement('li');
        li.innerText = array[i];
        li.id = i;
        li.className = "list-group-item";
        response_unordered_list.appendChild(li);
    }
    
    response_div.appendChild(response_unordered_list);
    return response_div;
}

export function addEventListenersToListItems(){
    let ul = document.getElementById('response_list');
    let lis = ul.getElementsByTagName('li');

    for(let i = 0; i < lis.length;i++)
    {
        lis[i].addEventListener('click', clickEvent);
    }
}


function clickEvent(e){
    let listClassName = document.getElementById("response_list").className;
    let url = URL + "/" + listClassName + "/" + e.target.innerText;

    fetch(url) 
    .then(response => response.json())
    .then(json => {
        console.log(json);
    })
    .catch(error => {
        console.log(error);
    })
}

export function removeChildNodes(element){
    if(element.hasChildNodes()){
        let child_nodes = element.childNodes;
        for(let i = 0; i < child_nodes.length;i++){
            element.removeChild(child_nodes[i]);
        }
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