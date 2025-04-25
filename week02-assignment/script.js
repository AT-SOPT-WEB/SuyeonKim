import { todos } from './mock/dummyTodos.js';

const table = document.querySelector('.todo-table');
const tbody = table.querySelector('tbody');
const totalButton = document.querySelector(".total-button");
const completedButton = document.querySelector(".completed-button");
const incompleteButton = document.querySelector(".incomplete-button");
const todoInput = document.querySelector(".todo-input");
const importanceSelect = document.querySelector(".importance-select");
const addButton = document.querySelector(".add-button");

localStorage.setItem('todos', JSON.stringify(todos));
const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];

totalButton.addEventListener('click', () => {
    renderTodos(storedTodos);
});

completedButton.addEventListener('click', () => {
    const completedTodos = storedTodos.filter(todo => todo.completed);
    renderTodos(completedTodos);
});

incompleteButton.addEventListener('click', () => {
    const incompleteTodos = storedTodos.filter(todo => !todo.completed);
    renderTodos(incompleteTodos);
});

addButton.addEventListener('click', () => {
    const input = todoInput.value;
    const select = importanceSelect.value;

    if (input && select) {
        const newTodo = {
            id: storedTodos.length + 1,
            title: input,
            completed: false,
            priority: select
        };

        storedTodos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(storedTodos));
        renderTodos(storedTodos);

        todoInput.value = '';
        importanceSelect.value = '';
    } else {
        alert("할 일과 중요도를 모두 입력해 주세요!");
    }
});

function renderTodos(todos) {
    tbody.innerHTML = '';

    todos.forEach(todo => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td><input type="checkbox" /></td>
            <td>${todo.priority}</td>
            <td>${todo.completed ? '✅' : '❌'}</td>
            <td>${todo.title}</td>
        `;

        tbody.appendChild(tr);
    });
}

renderTodos(storedTodos);