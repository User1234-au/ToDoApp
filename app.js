const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
const emptyMsg = document.getElementById('empty-msg');
const themeToggle = document.getElementById('theme-toggle');

// Load persisted theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

function updateEmptyMsg() {
  const items = list.querySelectorAll('.todo-item');
  emptyMsg.style.display = items.length === 0 ? 'block' : 'none';
}

function addTodo() {
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.className = 'todo-item';

  const span = document.createElement('span');
  span.className = 'todo-text';
  span.textContent = text;
  span.title = 'Cliquer pour marquer comme terminé';
  span.addEventListener('click', () => {
    li.classList.toggle('done');
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = '✕';
  deleteBtn.setAttribute('aria-label', 'Supprimer la tâche');
  deleteBtn.addEventListener('click', () => {
    li.remove();
    updateEmptyMsg();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  list.appendChild(li);

  input.value = '';
  input.focus();
  updateEmptyMsg();
}

addBtn.addEventListener('click', addTodo);

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTodo();
});

updateEmptyMsg();
