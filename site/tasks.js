export function addTask(tasks, text, id) {
  const title = text.trim();
  if (!title) throw new Error('Task cannot be empty');
  return [...tasks, { id, title, done: false }];
}
export function toggleTask(tasks, id) {
  return tasks.map(task => task.id === id ? { ...task, done: !task.done } : task);
}
export function deleteTask(tasks, id) {
  return tasks.filter(task => task.id !== id);
}
#ddd