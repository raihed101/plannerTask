
let taskArray = [] //global variable

let addButton = document.querySelectorAll('#addButton')[0];

addButton.addEventListener('click', function(){
    const name = document.querySelector("#nameInput");
    const des = document.querySelector("#descriptionInput");
    const assign = document.querySelector("#assignInput");
    const date = document.querySelector("#dueDateInput");
    const status = document.querySelector("#statusInput");

    formValidation(name, des, assign, date, status);
}); 

function formValidation( name, des, assign, date, status){
    //get values from inputs 
    const nameValue = name.value;
    const descriptionValue = des.value;
    const assignValue = assign.value;
    const dateValue = date.value;
    const statusValue = status.value;

    let isError = false



    if(nameValue === ""){
        isError = true
        //show error
        //add error class
        setErrorFor(name, 'Enter name please');
    }else{
        setSuccessFor(name);
        //add success class
    }

    if(descriptionValue === ""){
        isError = true
        //show error
        //add error class
        setErrorFor(des, 'Enter description');
    }else{
        setSuccessFor(des);
        //add success class
    }

    if(assignValue === ""){
        isError = true
            //show error
            //add error class
        setErrorFor(assign, 'Enter assign to');
    }else{
        setSuccessFor(assign);
            //add success class
    }

    if(dateValue === ""){
        isError = true
        //show error
        //add error class
        setErrorFor(date, 'Enter date ');
    }else{
        setSuccessFor(date);
        //add success class
    }

    if(assignValue === ""){
        isError = true
        //show error
        //add error class
        setErrorFor(assign, 'Assign to a person');
    }else{
        setSuccessFor(status);
        //add success class
    }
    if(statusValue === ""){
        isError = true
        //show error
        //add error class
        setErrorFor(status, 'Select status');
    }else{
        setSuccessFor(status);
        //add success class
    }
    if(!isError){
        createTaskObject(nameValue, descriptionValue, assignValue, dateValue, statusValue, myTaskManager.allTasks);
        let task = myTaskManager.allTasks.length-1;
        console.log(myTaskManager.allTasks[task])
        myTaskManager.addTask(myTaskManager.allTasks[task]);
    }
}

function setErrorFor(input, message){
    const formGroup = input.parentElement; //form-group
    const small = formGroup.querySelector("small");

    //add error message inside small
    small.innerText = message;
    //add error class
    formGroup.className = 'form-group error ';
}

function setSuccessFor(input){
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success'; 
}


//2


// console.log(taskArray);




function createTaskObject(name, des, assign, date, status){
    myTaskManager.allTasks.push({
        "name": name,
        "des": des,
        "assign": assign,
        "date": date,
        "status": status,
        "ID": `${taskArray.length <1 ? 1 : taskArray.length +1}`

    })

    localStorage.setItem("taskArray2", JSON.stringify(myTaskManager.allTasks));
    return myTaskManager.allTasks;

}

document.addEventListener('click', function(event){
    const Button = (event.target.nodeName == 'BUTTON')
    if(Button){
        const delElement = event.target;
        myTaskManager.deleteTask(delElement);
    }
})






//create class

class TaskManager{
    constructor(name){
        this.allTasks = [];
        this.name = name;
    }

    getAllTasks(){
        console.log(this.allTasks);

    }
    
    addTask(addObj){
        let card =  `<div class="col-md-4" taskID= "${addObj.ID}">
                   <div class="card">
                    <div class="card-header">
                    Featured
                    </div>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item">Name: ${addObj.name}</li>
                    <li class="list-group-item">Assigned To: ${addObj.assign}</li>
                    <li class="list-group-item">Due Date: ${addObj.date}</li>
                    <li class="list-group-item">Description: ${addObj.des}</li>
                    <li class="list-group-item">Status: ${addObj.status}</li>
                    </ul>
                    <button type="button class="btn btn-dark" job="delete" deleteID="${addObj.ID}">Delete</button>
                </div>
            </div>`

        let placeCard = document.querySelector("#cardsArea");
        placeCard.innerHTML += card;

        let list = ` <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" taskID= "${addObj.ID}">
                    <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Assigned To: ${addObj.assign}</h5>
                    <small>Due Date: ${addObj.date}</small>
                    </div>
                    <small>Status: ${addObj.status}</small>
                    </a>`

        
        let listCard = document.querySelector("#cardsList");
        listCard.innerHTML += list;


    }
    
    deleteTask(delElement){
        //removes from array
        let cardID = delElement.parentNode.parentNode.attributes.taskID.value;
        for(let i=0; i < this.allTasks.length; i++){
            if(this.allTasks[i].ID == cardID){
                this.allTasks.splice(i,1);
                localStorage.setItem('taskArray2', JSON.stringify(myTaskManager.allTasks));
            }
        }


        delElement.parentNode.parentNode.parentNode.removeChild(delElement.parentNode.parentNode)

        let elementA = document.querySelectorAll('a');
        for(let i = 0; i < elementA.length; i++){
            delElement = elementA[i];
            if(delElement.attributes.taskID.value == cardID){
                delElement.parentNode.removeChild(delElement);
            }
        }

    }
    // updateTask(){

    // }
}
//returns data back from local storage

let myTaskManager = new TaskManager("Name1");

let dataReturn = localStorage.getItem('taskArray2');

if(dataReturn){
    myTaskManager.allTasks = JSON.parse(dataReturn);
    populatePage(myTaskManager.allTasks);
// } else {
//     myTaskManager.taskArray2 = [];
}

function populatePage(array){
    for(let i = 0; i < array.length; i++){
        myTaskManager.addTask(array[i]);
    }

}