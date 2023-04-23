// Step 1
let addTaskButton = document.getElementById('add-task')
let newTaskInput = document.getElementById('input-task')
let todoListContainer = document.getElementById('todo-list')

let templateElement = document.getElementById("list-item-template");
let template = templateElement.innerHTML;

let showActiveButton = document.getElementById('add-task');


    //2. set the text for the list item to the taskName
    function onAddTaskClicked(e){

        let taskName = newTaskInput.value;
        newTaskInput.value = "";

            
        if (taskName != ""){
            let taskHTML = template.replace("<!--TASK_NAME-->", taskName);
            todoListContainer.insertAdjacentHTML('afterbegin', taskHTML);

            saveTask(taskName, false);
        }

    }    

    function onTodolistClicked(e)
    {
        let targetElement = e.target;

        while (!targetElement.classList.contains("task")){
            targetElement = targetElement.parentElement;
        }

        let checkbox = targetElement.querySelector(".checkbox");
        if (checkbox.checked){

            targetElement.classList.add("completed");
        }else {
            targetElement.classList.remove("completed");
        }

        let taskNameElement = targetElement.querySelector(".task-name");
        let taskName = taskNameElement.innerText;

        saveTask(taskName, checkbox.checked)
    }

    function showActiveTasks(e){
        let tasks = document.getElementsByClassName("task");
        console.log(tasks);

        for (let i=0; i < tasks.length; i++){
            if (tasks[i].classList.contains("completed")){
                tasks[i].style.display = "none"

            } else {
                tasks[i].style.display = "block";
            }
        }
    }


    function saveTask(name, IsCompleted){
        localStorage.setItem(name, IsCompleted)
    }

    function renderTasks(){
        for(let i=0; i<localStorage.length; i++){
            let taskName = localStorage.key(i);
            let isCompleted = localStorage.getItem(taskName) == "true";
            let taskHTML = template.replace("<!-- TASK_NAME -->", taskName)

            if (!isCompleted){
                todoListContainer.insertAdjacentHTML('afterbegin', taskHTML);
            }
        }
    }

    //3. add the list item to the ul element, todoListContainer
    addTaskButton.addEventListener('click', onAddTaskClicked)
    todoListContainer.addEventListener('click', onTodolistClicked)
    showActiveButton.addEventListener('click', showActiveTasks)
    renderTasks();
    


