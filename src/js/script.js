const formElement = document.getElementById('form');
const tasksElement = document.getElementById('tasks');
const deleteCompletedElement = document.getElementById('delete-completed');

let allTasks = [];

const printTasks = () => {
  const fragment = document.createDocumentFragment();

  allTasks.forEach((task) => {
    const newTaskContainer = document.createElement('div');
    newTaskContainer.classList.add('task-container');

    const newTaskCheck = document.createElement('input');
    newTaskCheck.type = 'checkbox';
    newTaskCheck.classList.add('task-check');
    newTaskCheck.checked = task.completed;
    newTaskCheck.id = task.id;
    newTaskCheck.dataset.id = task.id;

    const newTaskLabel = document.createElement('label');
    newTaskLabel.classList.add('task-text');
    newTaskLabel.textContent = task.taskName;
    newTaskLabel.htmlFor = task.id;

    const newTaskDelete = document.createElement('img');
    newTaskDelete.classList.add('task-delete');
    newTaskDelete.src = './docs/assets/images/icon-cross.svg';

    newTaskDelete.addEventListener('click', () => deleteTask(task.id));
    newTaskCheck.addEventListener('change', () => completedTask(task.id));

    newTaskContainer.append(newTaskCheck, newTaskLabel, newTaskDelete);
    fragment.append(newTaskContainer);
  });

  tasksElement.textContent = '';
  tasksElement.append(fragment);
};

const saveTask = (task) => {
  allTasks.push(task);
  printTasks();
};

const createTask = (taskName) => {
  const newTask = {
    id: Date.now(),
    taskName,
    completed: false,
  };

  saveTask(newTask);
};

const completedTask = (id) => {
  allTasks = allTasks.map((task) => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
  printTasks();
};

const deleteTask = (id) => {
  allTasks = allTasks.filter((task) => task.id !== id);
  printTasks();
};

const deleteAllCompletedTasks = () => {
  allTasks = allTasks.filter((task) => {
    return !task.completed;
  });
  printTasks();
};

deleteCompletedElement.addEventListener('click', deleteAllCompletedTasks);

formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!event.target.task.value.trim()) return;
  createTask(event.target.task.value);
  event.target.reset();
});
