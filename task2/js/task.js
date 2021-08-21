const addForm = document.querySelector('#addForm form')
const contentWrap =document.querySelector("#content .row")
const form = document.querySelector('#addForm ')
const taskHeads = ['title', 'content', 'date']
const showHideBtn = document.querySelector('#showHideBtn button')
const addEditbtn = document.querySelector('#addEditbtn .btn')
const taTitle = document.querySelector('#tTitle')
const taContent = document.querySelector('#tContent')
const taDate = document.querySelector('#tDate')

const taskId = JSON.parse(localStorage.getItem('editProduct'))
let tasks=[]
let myTask = tasks.find(t => t.id === taskId);
let isEdit=false;
let originalTask={}

//.....................showHideBtn........................

showHideEvent = function(e){
    form.classList.toggle('d-none')
    if(e.target) this.innerText === "show"?  this.innerText = "hide" : this.innerText = "show"
    else{ e.innerText="show" }
}
//...........................addTaskBtn..............
addEditEvent = function(e){
    
    if(e.target) this.innerText === "Add Task"?  this.innerText = "Edit Task" : this.innerText = "Add Task"
    else{ e.innerText="Add Task" }
}

//......................localstorage.....................

const getTasks = () =>{
    tasks = localStorage.getItem('tasks') || '[]'
    return JSON.parse(tasks)
}
const setTasks = (tasks) =>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
 //....................addTask................................

//  addTask = function(e){
//      if(isEdite){
//     e.preventDefault()
//     task = { status:false, id : new Date().getTime()}
//     taskHeads.forEach( head => task[head] = this.elements[head].value );
//     tasks = getTasks()}
//     else{
//         editeTask(task)
//         tasks.push(task)
//     }
//     setTasks(tasks)
//     this.reset()
//     showHideEvent(showHideBtn)
//     displayData(task)
// }

//.............another method......................
addTask = function(e){
    e.preventDefault()
    task = { status:false, id : new Date().getTime()}
    taskHeads.forEach( head => task[head] = this.elements[head].value );
    tasks = getTasks()
    if(isEdit){
        taskHeads.forEach( head => task[head] = this.elements[head].value );
        const index=tasks.findIndex(t=> t.id == originalTask.id)
        task={...task,id:originalTask.id}
        tasks[index]=task
    }
    else{
        tasks.push(task);
    }
    setTasks(tasks)
    this.reset();
    showTasks();
} 


//.......................editeTask.......................

// editeTask=function(task){
//     isEdite=true
//     addEditEvent(addEditbtn)
//     taskHeads.forEach( head => task[head] = this.elements[head].value );
//         taTitle.value = taskHeads.Title
//         taContent.value = taskHeads.Content
//         taDate.value = taskHeads.Date
//         addTask.value = "Update Task"
 
  
// }

//.......................another method ..................
editTask=function(task){
    showHideEvent(showHideBtn);
    addEditbtn.innerText=' Edit Task';
    setFormData(task);
    originalTask=task
    isEditMode=true;
}
function setFormData(task){
    taskHeads.forEach( head => addForm.elements[head].value =task[head]);
}

//.......................deleteTask.......................
deleteTask = (task) => {
    i = tasks.findIndex(t => t.id == task.id)
    tasks.splice(i, 1);
    setTasks(tasks);
    showTasks();
   // alert('Task delete Success')
}
 
//............createElement.............................

let createNewElement = (elementTag, elementTxt, elementClasses,parent, attributes) =>{
    myNewEl = document.createElement(elementTag)
    if(elementTxt!='') myNewEl.innerText = elementTxt
    if(elementClasses!="") myNewEl.className =elementClasses
    parent.appendChild(myNewEl)  
    attributes.forEach(attr=>{
            myNewEl.setAttribute(attr.attrName, attr.attrVal)
        })
        return myNewEl  
}
 //.....................displayTaskAndTasks.........................

 
showTasks = () => {
    tasks = getTasks();
    contentWrap.innerText = '';
    if(tasks.length == 0 ) createNewElement('div', 'No Tasks', 'alert alert-danger', contentWrap, [])
    else tasks.forEach((task, i) => {
        displayData(task)
    })
}

function displayData(task){
    col4Div = createNewElement('div', '', 'col-4 x', contentWrap, [])
    contentDiv = createNewElement('div', '', 'm-3 border border-primary border-3 p-2 bg-danger text-white', col4Div, [])
    createNewElement('h3', task.title, '',contentDiv, [])
    createNewElement('p', task.content, '',contentDiv, [])
    createNewElement('p', task.date, '',contentDiv, [])
    btnDel = createNewElement('button', 'delete', 'btn btn-warning', contentDiv, []) 
    btnEdit = createNewElement('button', 'edit', 'btn btn-success', contentDiv, []) 
    btnDel.addEventListener('click',function(e) {deleteTask(task)})
    btnEdit.addEventListener('click', function(e){editTask(e, task)})
}



showHideBtn.addEventListener('click', showHideEvent)
addForm.addEventListener('submit', addTask)
showTasks()

 