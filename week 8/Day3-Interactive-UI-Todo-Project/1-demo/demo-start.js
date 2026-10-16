// =============================================================
// Day 3 Demo: Build a To-Do List with vanilla JavaScript
// Pattern: STATE  →  RENDER  →  EVENTS update state  →  RENDER again
// Live-code in this order. Follow DEMO-GUIDE.md. Reference: demo-finished.js
// =============================================================

// STEP 1: Select elements
const formElem = document.getElementById("todo-form");
const inputElem = document.getElementById("todo-input");
const ulElem = document.getElementById("todo-list");
const noOfItemsLeft = document.getElementById("items-left");
const clearBtnElem = document.querySelector(".link-btn");
const allfilterBtns = document.querySelectorAll(".filter");

// STEP 2: State. One array of task objects: { id, text, completed }
function loadTodoApp() {
    //load data from the storage
    const savedTodos = JSON.parse(localStorage.getItem("tasks")) || []; // if no data, return empty array
    return savedTodos;
};

function saveTodosToLocalStorage() {
    // save data to storage 
    localStorage.setItem("tasks", JSON.stringify(todoItems));
    //function to render to app after saving to storage
    renderTodoApp();
};

let todoItems = loadTodoApp(); // load from storage or start with empty array
// console.log(todoItems);

// STEP 3: render(): clear the list, build one <li> per task, append
function createTodoTask(todo) {
    const liTaskElem = document.createElement("li");
    liTaskElem.className = "todo-item";
    if (todo.completed) {
        liTaskElem.classList.add("completed"); // add "completed" class if class is completed
    }

    //creating the delete button for the li
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", (event) => deleteTodoTask(todo.id, event)); // pass the id and event to the delete function

    //creating the text content for the li
    const liTextElem = document.createElement("span");
    liTextElem.className = "todo-text";
    liTextElem.textContent = todo.text;


    //creat a checkbox for the li
    const checkboxElem = document.createElement("input");
    checkboxElem.type = "checkbox";
    checkboxElem.className = "toggle";
    checkboxElem.checked = todo.completed; // set checkbox state based on completed property
    checkboxElem.addEventListener("change", () => toggleTodoTaskCompletion(todo.id));

    //append the checkbox, text and delete button to the li
    liTaskElem.appendChild(liTextElem);
    liTaskElem.appendChild(checkboxElem);
    liTaskElem.appendChild(deleteBtn);
    ulElem.appendChild(liTaskElem); // append the li to the ul

    return liTaskElem;
};

function renderTodoApp() {
    ulElem.textContent = ""; // clear the list

    // iterate over the todoItems array and create a list item for each task
    todoItems.forEach(todo => {
        createTodoTask(todo); // create and append each todo item
    });
}

// STEP 4: Add a task (form "submit" + validation;
function handleFormSubmit(event) {
    event.preventDefault(); // prevent page reload on form submit
    const text = inputElem.value.trim();
    if (text === "") {
        // throw an error message or alert to the user
        alert("Please enter a task.");
        return;
    }

    const newTodoItem = {
        id: Date.now(), // unique id based on timestamp
        text: text,
        completed: false
    };


    todoItems.push(newTodoItem); // add new task to state
    renderTodoApp(); // re-render the list
    inputElem.value = "";
};

formElem.addEventListener("submit", handleFormSubmit);


function deleteTodoTask(id, event) {
    event.stopPropagation(); //prevent triggering other events on the same element when clicking the delete button
    todoItems = todoItems.filter(todo => todo.id !== id); // remove the task with the given id from the state
    saveTodosToLocalStorage(); // re-render the list
};

function toggleTodoTaskCompletion(id) {
    todoItems = todoItems.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed }; // toggle the completed property
        }
        return todo;
    });
    saveTodosToLocalStorage();
};

// STEP 5: Toggle + delete with ONE listener on the list (delegation)


// STEP 6: Filters (All / Active / Completed)


// STEP 7: Footer: items left + clear completed


// STEP 8: Save to localStorage and load on start

