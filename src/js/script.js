const taskElement = document.getElementById('task');
const inputTaskElement = document.getElementById('inputtask');
const containerElement = document.getElementById('container');

const pendingTaskElement = document.getElementById('pendingtask');
const centerFilterElement = document.getElementById('center');
const clearTasksElement = document.getElementById('clear');

const newTask = (event) => {
  if (event.key === 'Enter' && event.target.value !== '') {
    const containerTask = document.createElement('div');
    containerTask.className = 'containertask';

    const printedTask = document.createElement('div');
    printedTask.className = 'printedtask';

    const customCheckbox = document.createElement('label');
    customCheckbox.className = 'custom-checkbox';

    const inputCheckbox = document.createElement('input');
    inputCheckbox.type = 'checkbox';

    const spanCheckmark = document.createElement('span');
    spanCheckmark.className = 'checkmark';

    const pTextInput = document.createElement('p');
    pTextInput.className = 'text-input';
    pTextInput.textContent = `${event.target.value}`;

    taskElement.insertAdjacentElement('afterend', containerTask);
    containerTask.append(printedTask);
    printedTask.append(customCheckbox);
    customCheckbox.append(inputCheckbox, spanCheckmark, pTextInput);

    inputTaskElement.value = '';
  }
};

const pendingTask = (event) => {
  event.target.textContent = printedTask.length;

  console.dir(printedTask);
};

inputTaskElement.addEventListener('keydown', newTask);
pendingTaskElement.addEventListener('click', pendingTask);
