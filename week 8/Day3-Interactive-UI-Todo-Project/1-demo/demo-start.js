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

function saveTodosToStorage() {
    // save data to storage 
};

let todoItems = loadTodoApp(); // load from storage or start with empty array
// console.log(todoItems);

// STEP 3: render(): clear the list, build one <li> per task, append
function createTodoItem(todo) {
    const liElem = document.createElement("li");
    liElem.className = "todo-item";
    if (todo.completed) {
        liElem.classList.add("completed"); // add "completed" class if class is complet
    }

    //creating the delete button for the li
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    //creating the text content for the li
    const liTextElem = document.createElement("span");
    liTextElem.className = "todo-text";
    liTextElem.textContent = todo.text;


    //creat a checkbox for the li
    const checkboxElem = document.createElement("input");
    checkboxElem.type = "checkbox";
    checkboxElem.className = "toggle";
    checkboxElem.checked = todo.completed; // set checkbox state based on completed property

    //append the checkbox, text and delete button to the li
    liElem.appendChild(liTextElem);
    liElem.appendChild(checkboxElem);
    liElem.appendChild(deleteBtn);
    ulElem.appendChild(liElem); // append the li to the ul

    return liElem;
};

function renderApp() {
    ulElem.textContent = ""; // clear the list

    // iterate over the todoItems array and create a list item for each task
    todoItems.forEach(todo => {
        createTodoItem(todo); // create and append each todo item
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
    renderApp(); // re-render the list
    inputElem.value = "";
}


formElem.addEventListener("submit", handleFormSubmit);

// STEP 5: Toggle + delete with ONE listener on the list (delegation)


// STEP 6: Filters (All / Active / Completed)


// STEP 7: Footer: items left + clear completed


// STEP 8: Save to localStorage and load on start

