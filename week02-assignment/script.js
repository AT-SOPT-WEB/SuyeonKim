import { todos } from './mock/dummyTodos.js';

const table = document.querySelector('.todo-table');
const tbody = table.querySelector('tbody');
const totalButton = document.querySelector(".total-button");
const completedButton = document.querySelector(".completed-button");
const incompleteButton = document.querySelector(".incomplete-button");

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