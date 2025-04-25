import { todos } from './mock/dummyTodos.js';

const table = document.querySelector('.todo-table');
const tbody = table.querySelector('tbody');

const totalButton = document.querySelector(".total-button");
const completedButton = document.querySelector(".completed-button");
const incompleteButton = document.querySelector(".incomplete-button");
const importanceButton = document.querySelector('.importance-button');
const importanceDropdown = document.querySelector('.importance-dropdown');

const todoInput = document.querySelector(".todo-input");
const importanceSelect = document.querySelector(".importance-select");
const addButton = document.querySelector(".add-button");

const deleteButton = document.querySelector(".delete-button");
const completeButton = document.querySelector(".complete-button");

const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");

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

importanceButton.addEventListener('click', () => {
    importanceDropdown.classList.toggle('hidden');
});

importanceDropdown.addEventListener('click', (event) => {
    const selected = event.target.dataset.priority;
    
    const filtered = storedTodos.filter(todo => todo.priority === Number(selected));
    renderTodos(filtered);

    importanceDropdown.classList.add('hidden');
});

document.addEventListener('click', (e) => {
    if (!importanceButton.contains(e.target) && !importanceDropdown.contains(e.target)) {
        importanceDropdown.classList.add('hidden');
    }
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

deleteButton.addEventListener('click', () => {
    const checkboxes = tbody.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            storedTodos.splice(index, 1);
        }
    });

    localStorage.setItem('todos', JSON.stringify(storedTodos));
    renderTodos(storedTodos);
});

completeButton.addEventListener('click', () => {
    const checkboxes = tbody.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            if (storedTodos[index].completed) {
                modal.style.display = "block";
            } else {
                storedTodos[index].completed = true;

                localStorage.setItem('todos', JSON.stringify(storedTodos));
                renderTodos(storedTodos);
            }
        }
    });
});

closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

function renderTodos(todos) {
    tbody.innerHTML = '';

    todos.forEach((todo, index) => {
        const tr = document.createElement('tr');

        tr.setAttribute('draggable', 'true');
        tr.setAttribute('data-index', index);

        tr.innerHTML = `
            <td><input type="checkbox" /></td>
            <td>${todo.priority}</td>
            <td>${todo.completed ? '✅' : '❌'}</td>
            <td>${todo.title}</td>
        `;

        tbody.appendChild(tr);
    });

    dragAndDropHandlers();
}

function dragAndDropHandlers() {
    const rows = tbody.querySelectorAll('tr');

    let draggedIndex = null;

    rows.forEach(row => {
        row.addEventListener('dragstart', (e) => {
            draggedIndex = Number(row.dataset.index);
            row.classList.add('dragging');
        });

        row.addEventListener('dragover', (e) => {
            e.preventDefault();
            row.classList.add('drag-over');
        });

        row.addEventListener('dragleave', () => {
            row.classList.remove('drag-over');
        });

        row.addEventListener('drop', () => {
            row.classList.remove('drag-over');
            const targetIndex = Number(row.dataset.index);

            if (draggedIndex !== null && draggedIndex !== targetIndex) {
                const draggedItem = storedTodos[draggedIndex];
                storedTodos.splice(draggedIndex, 1);
                storedTodos.splice(targetIndex, 0, draggedItem);

                localStorage.setItem('todos', JSON.stringify(storedTodos));
                renderTodos(storedTodos);
            }
        });

        row.addEventListener('dragend', () => {
            row.classList.remove('dragging');
        });
    });
}

renderTodos(storedTodos);