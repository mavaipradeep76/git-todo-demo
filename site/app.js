import { addTask, toggleTask, deleteTask } from './tasks.js';
const key = 'git-todo-demo-v1';
const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const list = document.querySelector('#tasks');
const status = document.querySelector('#status');
let tasks = [];
try {
  const saved = JSON.parse(localStorage.getItem(key) || '[]');
  if (Array.isArray(saved)) tasks = saved.filter(t => t && typeof t.id === 'string' && typeof t.title === 'string' && typeof t.done === 'boolean');
} catch { status.textContent = 'Saved tasks could not be loaded.'; }
function render() {
  list.replaceChildren();
  document.querySelector('#count').textContent = `${tasks.filter(t => !t.done).length} pending / ${tasks.length} total`;
  for (const task of tasks) {
    const item = document.createElement('li');
    const label = document.createElement('label');
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = task.done;
    check.addEventListener('change', () => { tasks = toggleTask(tasks, task.id); save(); });
    const title = document.createElement('span');
    title.textContent = task.title;
    if (task.done) title.className = 'done';
    label.append(check, title);
    const remove = document.createElement('button');
    remove.textContent = 'Delete';
    remove.setAttribute('aria-label', `Delete ${task.title}`);
    remove.addEventListener('click', () => { tasks = deleteTask(tasks, task.id); save(); });
    item.append(label, remove);
    list.append(item);
  }
}
function save() {
  try { localStorage.setItem(key, JSON.stringify(tasks)); status.textContent = ''; }
  catch { status.textContent = 'Storage unavailable. Tasks will last only for this session.'; }
  render();
}
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!input.value.trim()) { status.textContent = 'Please enter a task.'; return; }
  tasks = addTask(tasks, input.value, crypto.randomUUID());
  input.value = '';
  save();
  input.focus();
});
render();
