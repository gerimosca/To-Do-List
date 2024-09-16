const formElement = document.getElementById('form');

const allTasks = [
  {
    id: Date.now(),
    taskName: taskName,
    completed: false,
  },
];

const saveTask = (task) => {
  allTasks.push(task);
  console.log(allTasks);
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
});
