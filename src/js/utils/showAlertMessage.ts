import { isEditing } from "../../todo.js";

const showAlert = document.getElementById("alert-box")! as HTMLElement;
const alertText = document.getElementById("alert-text")! as HTMLElement;
let timeOut: number;

const showAlertMessage = (msg: string, type: string) => {
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
