// fix the data object issue

let data = (JSON.parse(localStorage.getItem("todoList")))? JSON.parse(localStorage.getItem("todoList")):{
    todo: [],
    completed: []
    
}



var removeSVG = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

renderData();


function renderData (){
if(!data.todo.length && !data.completed.length) return;    

for(let i = 0; i<data.todo.length; i++){
let value = data.todo[i]
createTask(value)    
} 

for(let j =0; j<data.completed.length; j++){
    let value = data.completed[j]
    createTask(value, true)
}    
}

document.getElementById("item").addEventListener("keydown", function(x){
if(x.which === 13){
let value = this.value
createTask(value)
data.todo.push(value) 
dataObjectUpdated()
this.value = ""
}})





//getting the input
document.getElementById("add").addEventListener("click", function (){
let value = document.getElementById("item").value 
if (value){
    createTask(value)
    // push the value in the Object data
data.todo.push(value) 
dataObjectUpdated()
document.getElementById("item").value = "";

}})

function dataObjectUpdated (){
    localStorage.setItem("todoList", JSON.stringify(data))
}


// creating new task
function createTask (value, area) {

let ul =(area)?document.getElementById("completed"): document.getElementById("todo")

let li = document.createElement("li")
li.innerHTML = value




let div = document.createElement("div")
div.classList.add("buttons")

let complete = document.createElement("button")
complete.classList.add("complete")
complete.innerHTML = completeSVG
complete.addEventListener("click", completeElement) // completing elements

let remove = document.createElement("button")
remove.classList.add("remove")
remove.innerHTML = removeSVG
remove.addEventListener("click", removeElement) // removing elements on click



// creating the element

div.appendChild(complete)
div.appendChild(remove)
li.appendChild(div)

ul.insertBefore(li, ul.childNodes[0]) // set every new list at first place



console.log(data)


    }
// removing elements
function removeElement (){
let list = this.parentNode.parentNode
let parent = list.parentNode
let id = parent.id
let value = list.innerText
let target = (id === "todo") ? data.todo: data.completed

let ind = target.indexOf(value)

target.splice(ind, 1)
parent.removeChild(list)
console.log(data)
dataObjectUpdated ()

}

function completeElement (){
 let list = this.parentNode.parentNode
let parent = list.parentNode
let id = parent.id
let value = list.innerText
let input = this.parentNode.nextElementSibling








//check in which ul is the element and where it should be transfered
let target = (id === "todo") ? document.getElementById("completed"): document.getElementById("todo") 

    
    // pushing elements to the right Object (hopefully)


   
parent.removeChild(list)
target.insertBefore(list, target.childNodes[0])





if(id === "todo"){
    let ind = data.todo.indexOf(value)
    data.completed.push(value)
    data.todo.splice(ind, 1)
    
}else {
    let inx = data.completed.indexOf(value)
    data.completed.splice(inx, 1)
    data.todo.push(value)
    }  
   

   
   dataObjectUpdated()
   
}

