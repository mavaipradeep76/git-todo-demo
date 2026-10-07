import test from 'node:test';
import assert from 'node:assert/strict';
import { addTask, toggleTask, deleteTask } from '../site/tasks.js';
test('adds a trimmed pending task without changing the original', () => {
  const original = [];
  assert.deepEqual(addTask(original, ' Learn Git ', '1'), [{id:'1',title:'Learn Git',done:false}]);
  assert.deepEqual(original, []);
});
test('rejects blank tasks', () => { assert.throws(() => addTask([], '  ', '1'), /empty/); });
test('toggles only the selected task and can undo completion', () => {
  const tasks = addTask(addTask([], 'Git', '1'), 'CI', '2');
  const updated = toggleTask(tasks, '1');
  assert.equal(updated[0].done, true);
  assert.equal(updated[1].done, false);
  assert.equal(tasks[0].done, false);
  assert.deepEqual(toggleTask(updated, '1'), tasks);
});
test('deletes only the selected task', () => {
  const tasks = addTask(addTask([], 'Git', '1'), 'CI', '2');
  assert.deepEqual(deleteTask(tasks, '1'), [tasks[1]]);
  assert.deepEqual(deleteTask(tasks, 'unknown'), tasks);
});
