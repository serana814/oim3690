// Font and color are set in CSS for a neutral, aesthetic look
// --- Multiple Lists Feature ---
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const listSelect = document.getElementById('list-select');
const listInput = document.getElementById('list-input');
const listAddBtn = document.getElementById('list-add-btn');

// Store lists in memory (could use localStorage for persistence)
let lists = {
    'Default': []
};
let currentList = 'Default';

// --- List Management ---
const allListsSection = document.getElementById('all-lists-section');

function updateListSelect() {
    listSelect.innerHTML = '';
    Object.keys(lists).forEach(listName => {
        const option = document.createElement('option');
        option.value = listName;
        option.textContent = listName;
        if (listName === currentList) option.selected = true;
        listSelect.appendChild(option);
    });
    renderAllListsSection();
}

function renderAllListsSection() {
    allListsSection.innerHTML = '';
    Object.keys(lists).forEach(listName => {
        const box = document.createElement('div');
        box.className = 'list-box' + (listName === currentList ? ' selected' : '');
        box.title = 'Switch to ' + listName;
        box.onclick = function() {
            if (currentList !== listName) {
                currentList = listName;
                updateListSelect();
                renderTodos();
            }
        };
        const nameDiv = document.createElement('div');
        nameDiv.className = 'list-name';
        nameDiv.textContent = listName;
        const countDiv = document.createElement('div');
        countDiv.className = 'list-count';
        countDiv.textContent = lists[listName].length + ' item' + (lists[listName].length === 1 ? '' : 's');
        box.appendChild(nameDiv);
        box.appendChild(countDiv);
        allListsSection.appendChild(box);
    });
}

listAddBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const name = listInput.value.trim();
    if (name && !lists[name]) {
        lists[name] = [];
        currentList = name;
        updateListSelect();
        renderTodos();
        listInput.value = '';
    }
});

listSelect.addEventListener('change', function() {
    currentList = listSelect.value;
    renderTodos();
});

// --- Todo Management ---
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = input.value.trim();
    if (text !== '') {
        addTodo(text);
        input.value = '';
        input.focus();
    }
});

function addTodo(text) {
    lists[currentList].push({ text, completed: false });
    renderTodos();
}

function toggleTodo(index) {
    lists[currentList][index].completed = !lists[currentList][index].completed;
    renderTodos();
}

function removeTodo(index) {
    lists[currentList].splice(index, 1);
    renderTodos();
}

function renderTodos() {
    list.innerHTML = '';
    lists[currentList].forEach((todo, idx) => {
        const li = document.createElement('li');
        if (todo.completed) li.classList.add('completed');

        // Content wrapper for checkbox and text
        const contentDiv = document.createElement('div');
        contentDiv.className = 'todo-content';

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', function() {
            toggleTodo(idx);
        });

        // Todo text
        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text;

        contentDiv.appendChild(checkbox);
        contentDiv.appendChild(span);
        li.appendChild(contentDiv);

        // Trashcan icon button
        const btn = document.createElement('button');
        btn.className = 'remove-btn';
        btn.title = 'Remove';
        btn.innerHTML = `<svg viewBox="0 0 20 20"><path d="M7.5 8.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 .5-.5zm2.5.5a.5.5 0 0 1 1 0v5a.5.5 0 0 1-1 0v-5zm3-4A1.5 1.5 0 0 0 12 3.5h-4A1.5 1.5 0 0 0 6.5 5v1H3a.5.5 0 0 0 0 1h.54l.82 9.04A2 2 0 0 0 6.35 18h7.3a2 2 0 0 0 1.99-1.96l.82-9.04H17a.5.5 0 0 0 0-1h-3.5v-1zM7.5 5A.5.5 0 0 1 8 4.5h4a.5.5 0 0 1 .5.5v1h-5v-1zm7.13 2l-.8 8.84a1 1 0 0 1-.99.96h-7.3a1 1 0 0 1-.99-.96L4.75 7h9.88z"/></svg>`;
        btn.addEventListener('click', function() {
            removeTodo(idx);
        });
        li.appendChild(btn);

        list.appendChild(li);
    });
}

// Initialize
updateListSelect();
renderTodos();
