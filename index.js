import "./js/showYear.js";
import renderList from "./js/renderList.js";
import showAlertMessage from "./js/showAlertMessage.js";
//@ts-ignore
var db = new PouchDB("PWATodoList");
export let isEditing = false;
export let todoList;
const InputText = document.getElementById("input-text");
const todoContainer = document.querySelector(".todo-container");
// Listen event
const form = document.getElementById("form");
const removeItems = document.getElementById("removeAll");
// variables
const textValue = InputText;
let taskID;
const showTodoList = () => {
    db.allDocs({ include_docs: true, descending: true }).then((doc) => {
        todoList = doc.rows.map((task) => {
            // TODO
            return task.doc;
        });
        renderList();
    });
};
db.changes({
    since: "now",
    live: true,
}).on("change", showTodoList);
showTodoList();
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (textValue.value && textValue.value.trim() !== "") {
        if (isEditing) {
            todoList.map((task) => {
                if (task._id === taskID) {
                    task.value = textValue.value;
                    db.put(task);
                }
            });
            textValue.value = "";
            isEditing = false;
            showAlertMessage("Edited", "success");
        }
        else {
            let newTask = {
                _id: new Date().getTime().toString(),
                value: textValue.value,
                isComplete: false,
            };
            db.put(newTask);
            textValue.value = "";
            showAlertMessage("Task created", "success");
        }
    }
    else {
        showAlertMessage("Please enter a task", "danger");
    }
});
// Remove items
removeItems.addEventListener("click", () => {
    todoContainer.innerHTML = ""; // check this later
    todoList = [];
    db.destroy().then(function () {
        db = new PouchDB("PWATodoList");
    });
    removeItems.style.display = "none";
    showAlertMessage("All Tasks Deleted", "danger");
});
// Task options
todoContainer.addEventListener("click", (e) => {
    let target = e.target;
    textValue.value = "";
    isEditing = false;
    taskID = target.parentElement.parentElement.dataset.id;
    let task = todoList.find((task) => task._id == taskID);
    if (!task)
        return;
    // Complete task
    if (target.classList.contains("completeItem")) {
        target.parentElement.parentElement.classList.toggle("isComplete");
        task.isComplete = !task.isComplete;
        db.put(task);
    }
    else {
        // Edit task
        if (target.classList.contains("editItem")) {
            isEditing = true;
            todoList.map((task) => {
                if (task._id === taskID) {
                    textValue.value = task.value;
                }
            });
            showAlertMessage("Editing", "warning");
        }
        // Delete Task;
        else if (target.classList.contains("deleteItem")) {
            db.remove(task);
            showAlertMessage("Task Deleted", "danger");
        }
    }
});
