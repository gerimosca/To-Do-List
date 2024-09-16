const formElement = document.getElementById('form');
const tasksElement = document.getElementById('tasks');

const allTasks = [
  {
    id: Date.now(),
    taskName: 'Terminar de programar el To-Do List',
    completed: false,
  },
];

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

formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!event.target.task.value.trim()) return;
  createTask(event.target.task.value);
  event.target.reset();
});
