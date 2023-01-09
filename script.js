const addTodoList = document.getElementById("add-todo-list");
const getDataInput = document.getElementById("getData");
let valueInput;

function inputGet(event) {
  valueInput = event.target.value;
}

function getData() {
  const allTodoElement = document.querySelectorAll("#single-todo");
  if (valueInput) {
    const listTodo = document.querySelector("#todo-list");
    let length = listTodo.children.length;
    if (allTodoElement.length !== 0) {
      const idItem = allTodoElement[allTodoElement.length - 1].childNodes[0].id;
      const idSplitted = idItem.split("");
      const numberIdItem = Number(idSplitted[idSplitted.length - 1]);
      length = numberIdItem + 1;
    }
    const createContainer = document.createElement("div");
    createContainer.setAttribute("id", "single-todo");
    createContainer.setAttribute("data-todo", `list${length}`);
    listTodo.appendChild(createContainer);
    const createCheckbox = document.createElement("input");
    const createLabel = document.createElement("label");
    const dataElementCreate = [
      { type: "type", data: "checkbox" },
      { type: "id", data: `list${length}` },
      { type: "name", data: `list${length}` },
      { type: "value", data: valueInput },
      { type: "class", data: "chkbox" },
      { type: "onchange", data: "eventCheckbox(event)" },
    ];
    for (let element of dataElementCreate)
      createCheckbox.setAttribute(element.type, element.data);
    createLabel.setAttribute("for", `list${length}`);
    createLabel.setAttribute("id", `list${length}`);
    createLabel.textContent = valueInput;
    createLabel.style.textTransform = "lowercase";
    listTodo.lastChild.appendChild(createCheckbox);
    listTodo.lastChild.appendChild(createLabel);
    // Creo il button Delete
    const createDeleteButton = document.createElement("button");
    const colorButton = "#7d0000";
    createDeleteButton.setAttribute("id", "buttonDelete");
    createDeleteButton.style.width = "25px";
    createDeleteButton.style.height = "25px";
    createDeleteButton.style.backgroundColor = colorButton;
    createDeleteButton.style.border = `1px solid ${colorButton}`;
    createDeleteButton.style.cursor = "pointer";
    createDeleteButton.style.backgroundImage = "url(images/trash.svg)";
    createDeleteButton.style.backgroundRepeat = "no-repeat";
    createDeleteButton.style.backgroundPositionY = "center";
    createDeleteButton.style.backgroundPositionX = "center";
    createDeleteButton.onclick = () => btnDelete(`list${length}`);
    listTodo.lastChild.appendChild(createDeleteButton);
    resetInput();
  }
}

function resetInput() {
  valueInput = "";
  getDataInput.value = "";
}

function btnDelete(listToDelete) {
  const childNode = document.querySelector(`[data-todo=${listToDelete}]`);
  const listTodo = document.querySelector("#todo-list");
  listTodo.removeChild(childNode);
}

function eventCheckbox(event) {
  let labels = document.querySelectorAll("label");
  labels.forEach((el) => {
    if (el.id === event.target.id && event.target.checked === true)
      el.style.textDecoration = "line-through";
    if (el.id === event.target.id && event.target.checked === false)
      el.style.textDecoration = "none";
  });
}

addTodoList.addEventListener("click", getData);

document.addEventListener("keyup", (e) => {
  if (e.code === "Enter") getData();
});
