const express = require('express');
const app = express();
const port = 3010;
let cors = require('cors');

app.use(cors());
let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];
function addTaskToTaskList(taskId, text, priority) {
  let newTasks = {
    taskId: taskId,
    text: text,
    priority: priority,
  };
  tasks.push(newTasks);
  return tasks;
}
app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let result = addTaskToTaskList(taskId, text, priority);
  res.json({ task: result });
});
function currentStateOfTasksList(tasks) {
  return tasks;
}
app.get('/tasks', (req, res) => {
  let result = currentStateOfTasksList(tasks);
  res.json({ tasks: result });
});
function sortTaskByPriority(task1, task2) {
  return task1.priority - task2.priority;
}
app.get('/tasks/sort-by-priority', (req, res) => {
  let taskCopy = tasks.slice();
  taskCopy.sort(sortTaskByPriority);
  res.json({ tasks: taskCopy });
});
function editTaskPriority(tasks, taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }
  return tasks;
}
app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let result = editTaskPriority(tasks, taskId, priority);
  res.json({ tasks: result });
});
function updateTaskText(tasks, taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
  }
  return tasks;
}
app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let result = updateTaskText(tasks, taskId, text);
  res.json({ tasks: result });
});
function deleteTaskFromTaskList(tasks, taskId) {
  let result = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId !== taskId) {
      result.push(tasks[i]);
    }
  }
  return result;
}
app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let result = deleteTaskFromTaskList(tasks, taskId);
  res.json({ tasks: result });
});
function filterTaskByPriority(tasksobj, priority) {
  return tasksobj.priority === priority;
}
app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = tasks.filter((tasksObj) =>
    filterTaskByPriority(tasksObj, priority)
  );
  res.json({ tasks: result });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
