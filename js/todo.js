function reloadPage() {
  localStorage.setItem("firstLoad", "true");
}

function defaultTodos() {
  if (localStorage.getItem("firstLoad") === null) {
    localStorage.setItem(
      "todo-item",
      JSON.stringify([
        { text: "text", completed: false },
        { text: "text", completed: false },
      ])
    );
    reloadPage();
  }
}

function getTodoLists() {
  return JSON.parse(localStorage.getItem("todo-item")) || [];
}

function createTodoItem(todo, index) {
  return `<li class="todo-item ${
    todo.completed ? "todo-item--checked" : ""
  }" data-index="${index}">
            <input type="checkbox" ${
              todo.completed ? "checked" : ""
            } onchange="toggleComp(${index}, this)" />
            <span class="todo-item__description">${todo.text}</span>
            <button class="todo-item__delete" onclick="removeTodo(${index})">Delete</button>
          </li>`;
}

function createTodoList(todos) {
  const parent = document.querySelector(".js--todos-wrapper");
  parent.innerHTML = "";
  todos.forEach((todo, index) => {
    parent.innerHTML += createTodoItem(todo, index);
  });
}

function showLists() {
  const lists = getTodoLists();
  createTodoList(lists);
}

document.querySelector(".form__btn").addEventListener("click", (e) => {
  e.preventDefault();

  const input = document.querySelector(".form__input");
  const text = input.value.trim();
  if (text === "") return;

  const todos = getTodoLists();
  todos.push({ text: text, completed: false });
  localStorage.setItem("todo-item", JSON.stringify(todos));

  input.value = "";
  showLists();
});

function toggleComp(index, checkbox) {
  const todos = getTodoLists();
  todos[index].completed = checkbox.checked;

  localStorage.setItem("todo-item", JSON.stringify(todos));

  const todoItem = checkbox.closest(".todo-item");

  todoItem.classList.toggle("todo-item--checked", checkbox.checked);
}

function removeTodo(index) {
  const todos = getTodoLists();
  todos.splice(index, 1);
  localStorage.setItem("todo-item", JSON.stringify(todos));
  showLists();
}
