export function hello() {
    console.log("Hello World!");
}


export function createListElement(array,h2_text){
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

export function addEventListenersToListItems(){
    var ul = document.getElementById('response_list');
    var lis = ul.getElementsByTagName('li');

    for(let i = 0; i < lis.length;i++)
    {
        lis[i].addEventListener('click', clickEvent);
    }
}

export function clickEvent(e){
    console.log(e.target.id + " was clicked");
}

export function removeChildNodes(element){
    if(element.hasChildNodes()){
        let child_nodes = element.childNodes;
        for(var i = 0; i < child_nodes.length;i++){
            element.removeChild(child_nodes[i]);
        }
    }
}

export function hideElement(element) {
    var x = document.getElementById(element);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}