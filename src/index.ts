import renderList from "./js/renderList.js";
import "./js/showYear.js";
import showAlertMessage from "./js/showAlertMessage.js";

var db = new PouchDB("PWATodoList");
var remoteCouch = false;
console.log("PWATodoList");

interface Task {
  _id: string;
  value: string;
}

export let isEditing: boolean = false;
export let todoList: Task[];

const InputText = document.getElementById("input-text")! as HTMLInputElement;
const todoContainer = document.querySelector(".todo-container")! as HTMLElement;
// Listen event
const form = document.getElementById("form")! as HTMLFormElement;
const removeItems = document.getElementById("removeAll")! as HTMLButtonElement;

// variables
const textValue = InputText;
let taskID: string | undefined;

class SingleTask {
  _id: string;
  value: string;
  constructor(_id: string, value: string) {
    this._id = _id;
    this.value = value;
  }
}

// Create localStorage
if (localStorage.getItem("TSTodoList")) {
  todoList = JSON.parse(localStorage.getItem("TSTodoList")!);
  renderList();
} else {
  todoList = [];
  localStorage.setItem("TSTodoList", JSON.stringify(todoList));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (textValue.value && textValue.value.trim() !== "") {
    if (isEditing) {
      todoList.map((task: Task) => {
        if (task._id === taskID) {
          task.value = textValue.value;
        }
      });
      textValue.value = "";
      isEditing = false;
      showAlertMessage("Edited", "success");
    } else {
      let newTask = new SingleTask(
        new Date().getTime().toString(),
        textValue.value
      );
      todoList.push(newTask);

      db.put(newTask, function callback(err: any, result: any) {
        if (!err) {
          console.log("Successfully posted a todo!");
        } else {
          console.log(err);
        }
      });

      textValue.value = "";
      showAlertMessage("Task created", "success");
    }
  } else {
    showAlertMessage("Please enter a task", "danger");
  }
  renderList();
});

// Remove items
removeItems.addEventListener("click", () => {
  todoContainer.innerHTML = ""; // check this later
  todoList = [];
  removeItems.style.display = "none";
  showAlertMessage("All Tasks Deleted", "danger");
  renderList(); // to clear local storage
});

// Task options
todoContainer.addEventListener("click", (e) => {
  let target = e.target! as HTMLElement;
  textValue.value = "";
  isEditing = false;
  taskID = (target.parentElement!.parentElement as HTMLElement).dataset.id;

  // Complete task
  if (target.classList.contains("completeItem")) {
    target.parentElement!.parentElement!.classList.toggle("isComplete");
  } else {
    // Edit task
    if (target.classList.contains("editItem")) {
      isEditing = true;
      todoList.map((task: Task) => {
        if (task._id === taskID) {
          textValue.value = task.value;
        }
      });
      showAlertMessage("Editing", "warning");
    }
    // Delete Task;
    else if (target.classList.contains("deleteItem")) {
      todoList = todoList.filter((task: Task) => task._id !== taskID);
      renderList();
      showAlertMessage("Task Deleted", "danger");
    }
  }
});
