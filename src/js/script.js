const formElement = document.getElementById('form');
const tasksElement = document.getElementById('tasks');
const deleteCompletedElement = document.getElementById('delete-completed');
const itemsLeftElement = document.getElementById('items-left');
const filtersElement = document.getElementById('filters');
const allFiltersElement = document.querySelectorAll('.filter');

let allTasks = [];

let filterActive = 'all';

const countItemsLeft = () => {
  if (allTasks.length === 0) {
    itemsLeftElement.textContent = 'No tasks';
    return;
  }

  const itemsLeft = allTasks.filter((task) => !task.completed).length;

  if (itemsLeft === 0) {
    itemsLeftElement.textContent = 'All tasks completed';
  } else {
    itemsLeftElement.textContent = `${itemsLeft} items left`;
  }
};

const getFilteredTasks = () => {
  if (filterActive === 'active') return allTasks.filter((task) => !task.completed);
  if (filterActive === 'completed') return allTasks.filter((task) => task.completed);
  return [...allTasks];
};

const printTasks = () => {
  const fragment = document.createDocumentFragment();
  const filteredTasks = getFilteredTasks();

  filteredTasks.forEach((task) => {
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
  countItemsLeft();
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

const selectFilter = (event) => {
  const currentFilter = event.target.dataset.filter;
  if (!currentFilter) return;

  allFiltersElement.forEach((filter) => filter.classList.remove('filter-active'));
  event.target.classList.add('filter-active');
  filterActive = currentFilter;
  printTasks();
};

countItemsLeft();

deleteCompletedElement.addEventListener('click', deleteAllCompletedTasks);
formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!event.target.task.value.trim()) return;
  createTask(event.target.task.value);
  event.target.reset();
});
filtersElement.addEventListener('click', selectFilter);
