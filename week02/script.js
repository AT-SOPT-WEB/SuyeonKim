const todoList = document.querySelector(".todo-list")
const todoInput = document.querySelector(".todo-input")
const addButton = document.querySelector(".add-button")

let todos = JSON.parse(localStorage.getItem('todos')) || [];

todos.forEach((todo) =>  {
    const li = document.createElement('li');
    li.textContent = todo;
    todoList.appendChild(li);
});

addButton.addEventListener('click', () => {
    const value = todoInput.value;
	
    if (!value) {
        return;
    }

    const li = document.createElement('li');
    li.textContent = value;
    todoList.appendChild(li);

    // 로컬스토리지에 저장
    todos.push(value);
    localStorage.setItem("todos", JSON.stringify(todos));

    todoInput.value = '';
});