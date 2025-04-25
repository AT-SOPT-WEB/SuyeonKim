import { todos } from './mock/dummyTodos.js';

const table = document.querySelector('.todo-table');

localStorage.setItem('todos', JSON.stringify(todos));
const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];

storedTodos.forEach(todo => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td><input type="checkbox" /></td>
        <td>${todo.priority}</td>
        <td>${todo.completed ? '✅' : '❌'}</td>
        <td>${todo.title}</td>
    `;

    table.querySelector('tbody').appendChild(tr);
});