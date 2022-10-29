import { isEditing } from "../todo.js";
const showAlert = document.getElementById("alert-box");
const alertText = document.getElementById("alert-text");
let timeOut;
const showAlertMessage = (msg, type) => {
    alertText.innerText = msg;
    showAlert.className = ""; // edit class
    showAlert.classList.add("alert-box", "show", `${type}`);
    clearTimeout(timeOut);
    if (!isEditing) {
        timeOut = window.setTimeout(() => {
            showAlert.classList.remove("show", `${type}`);
        }, 1500);
    }
};
export default showAlertMessage;
