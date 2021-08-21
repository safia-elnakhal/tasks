const addForm = document.querySelector('#addForm form')
const contentWrap =document.querySelector("#content .row")
const form = document.querySelector('#addForm ')
const taskHeads = ['title', 'content', 'date']
const showHideBtn = document.querySelector('#showHideBtn button')
let tasks=[]

//.....................showHideBtn........................

showHideEvent = function(e){
    form.classList.toggle('d-none')
    if(e.target) this.innerText === "show"?  this.innerText = "hide form" : this.innerText = "show"
    else{ e.innerText="show" }
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

addTask = function(e){
    e.preventDefault()
    task = { status:false, id : new Date().getTime()}
    taskHeads.forEach( head => task[head] = this.elements[head].value );
    tasks = getTasks()
    tasks.push(task)
    setTasks(tasks)
    this.reset()
    showHideEvent(showHideBtn)
    displayData(task)
    showTasks()
    //alert("Task add success")
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
    if(tasks.length == 0 ) createNewElement('div', 'No tasks', 'alert alert-danger', contentWrap, [])
    else tasks.forEach((task, i) => {
        displayData(task)
    })
}

function displayData(task){
    col4Div = createNewElement('div', '', 'col-4 x', contentWrap, [])
    contentDiv = createNewElement('div', '', 'm-3 border border-primary border-3 p-2 bg-danger text-white', col4Div, [])
    createNewElement('h3', task.title, '',contentDiv, [])
    createNewElement('p', task.content, '',contentDiv, [])
    btnDel = createNewElement('button', 'delete', 'btn btn-warning', contentDiv, []) 
    btnEdit = createNewElement('button', 'edit', 'btn btn-success', contentDiv, []) 
    btnDel.addEventListener('click',function(e) {deleteTask(task)})
    btnEdit.addEventListener('click', function(e){editTask(e, task)})

}
showHideBtn.addEventListener('click', showHideEvent)
addForm.addEventListener('submit', addTask)
showTasks()









