import { format, parse } from 'date-fns';
import Projects from './Projects';

const barDOM = (index) => {
  const bar = document.createElement('div');
  bar.classList.add('bar');
  const input = document.createElement('input');
  input.type = 'text';
  input.classList.add('text-fixed');
  const buttonAdd = document.createElement('button');
  buttonAdd.classList.add('btn-fixed');
  buttonAdd.textContent = '+';
  bar.appendChild(input);
  bar.appendChild(buttonAdd);
  buttonAdd.addEventListener('click', () => {
    if (input.value !== '') {
      const todos = document.querySelector('.todos');
      Projects.addToDoOnProject(index, input.value);
      while (todos.firstChild) {
        todos.removeChild(todos.lastChild);
      }
      todos.appendChild(todosDOM(index));
      todos.appendChild(barDOM(index));
    } else {
      input.placeholder = 'You should introduce something here.';
    }
  });
  return bar;
};
const configTodoDOM = (index, j, ToDo) => {
  const todoConfig = document.createElement('div');
  todoConfig.classList.add('todo-config');
  todoConfig.classList.add('todo');
  const inputTitle = document.createElement('input');
  inputTitle.classList.add('todo-input');
  inputTitle.value = ToDo.title;
  inputTitle.type = 'text';
  inputTitle.id = 'inputTitle';
  const inputDesc = document.createElement('input');
  inputDesc.classList.add('todo-input');
  inputDesc.type = 'text';
  inputDesc.id = 'inputDesc';
  inputDesc.value = ToDo.description;
  const inputDate = document.createElement('input');
  inputDate.classList.add('todo-input');
  inputDate.type = 'datetime-local';
  inputDate.value = format(ToDo.duedate, "yyyy-MM-dd'T'HH:mm");
  inputDate.id = 'inputDate';
  const inputNotes = document.createElement('textarea');
  inputNotes.rows = 5;
  inputNotes.id = 'inputNotes';
  inputNotes.value = ToDo.notes;
  const btnSubmit = document.createElement('button');
  btnSubmit.id = 'btnEditToDo';
  btnSubmit.textContent = 'Submit';
  let selection;
  const radios = document.createElement('div');
  radios.classList.add('priority-radios');
  const LowPriority = document.createElement('div');
  LowPriority.classList.add('child-radio');
  const MedPriority = document.createElement('div');
  MedPriority.classList.add('child-radio');
  const HighPriority = document.createElement('div');
  HighPriority.classList.add('child-radio');
  const radioLowPriority = document.createElement('input');
  radioLowPriority.type = 'radio';
  radioLowPriority.name = 'priority';
  radioLowPriority.id = 'rdLow';
  radioLowPriority.value = 'Low';
  const lblLowPriority = document.createElement('label');
  lblLowPriority.textContent = 'Low:';
  lblLowPriority.htmlFor = 'rdLow';
  LowPriority.appendChild(lblLowPriority);
  LowPriority.appendChild(radioLowPriority);
  radioLowPriority.addEventListener('click', (e) => {
    if (e.target.checked) {
      todoConfig.classList.remove('high-p');
      todoConfig.classList.remove('medium-p');
      todoConfig.classList.add('low-p');
      selection = radioLowPriority.value;
    }
  });
  const radioMedPriority = document.createElement('input');
  radioMedPriority.type = 'radio';
  radioMedPriority.name = 'priority';
  radioMedPriority.id = 'rdMed';
  radioMedPriority.value = 'Medium';
  const lblMedPriority = document.createElement('label');
  lblMedPriority.textContent = 'Medium:';
  lblMedPriority.htmlFor = 'rdMed';
  MedPriority.appendChild(lblMedPriority);
  MedPriority.appendChild(radioMedPriority);
  radioMedPriority.addEventListener('click', (e) => {
    if (e.target.checked) {
      todoConfig.classList.remove('high-p');
      todoConfig.classList.remove('low-p');
      todoConfig.classList.add('medium-p');
      selection = radioMedPriority.value;
    }
  });
  const radioHighPriority = document.createElement('input');
  radioHighPriority.type = 'radio';
  radioHighPriority.name = 'priority';
  radioHighPriority.id = 'rdLow';
  radioHighPriority.value = 'High';
  const lblHighPriority = document.createElement('label');
  lblHighPriority.textContent = 'High:';
  lblHighPriority.htmlFor = 'rdLow';
  HighPriority.appendChild(lblHighPriority);
  HighPriority.appendChild(radioHighPriority);
  radioHighPriority.addEventListener('click', (e) => {
    if (e.target.checked) {
      todoConfig.classList.remove('low-p');
      todoConfig.classList.remove('medium-p');
      todoConfig.classList.add('high-p');
      selection = radioHighPriority.value;
    }
  });
  radios.appendChild(LowPriority);
  radios.appendChild(MedPriority);
  radios.appendChild(HighPriority);
  switch (ToDo.priority.toLowerCase()) {
    case 'low': todoConfig.classList.add('low-p'); radioLowPriority.checked = true; selection = radioLowPriority.value; break;
    case 'medium': todoConfig.classList.add('medium-p'); radioMedPriority.checked = true;
      selection = radioMedPriority.value; break;
    case 'high': todoConfig.classList.add('high-p'); radioHighPriority.checked = true;
      selection = radioHighPriority.value; break;
    default: 'low';
  }
  btnSubmit.addEventListener('click', () => {
    if (inputTitle.value !== '' && inputDesc.value !== '' && inputDate.value !== '' && inputNotes.value !== '') {
      Projects.editToDofromProject(index, j, inputTitle.value, inputDesc.value, parse(inputDate.value, "yyyy-MM-dd'T'HH:mm", new Date()), inputNotes.value, selection);
      const todos = document.querySelector('.todos');
      while (todos.firstChild) {
        todos.removeChild(todos.lastChild);
      }
      todos.appendChild(todosDOM(index));
      todos.appendChild(barDOM(index));
    }
  });
  const lblTitle = document.createElement('label');
  lblTitle.textContent = 'Title:';
  lblTitle.htmlFor = 'inputTitle';
  const lblDesc = document.createElement('label');
  lblDesc.textContent = 'Description:';
  lblDesc.htmlFor = 'inputDesc';
  const lblDate = document.createElement('label');
  lblDate.textContent = 'Due Date:';
  lblDate.htmlFor = 'inputDate';
  const lblNotes = document.createElement('label');
  lblNotes.textContent = 'Notes:';
  lblNotes.htmlFor = 'inputNotes';
  todoConfig.appendChild(lblTitle);
  todoConfig.appendChild(inputTitle);
  todoConfig.appendChild(lblDesc);
  todoConfig.appendChild(inputDesc);
  todoConfig.appendChild(lblDate);
  todoConfig.appendChild(inputDate);
  todoConfig.appendChild(lblNotes);
  todoConfig.appendChild(inputNotes);
  todoConfig.appendChild(radios);
  todoConfig.appendChild(btnSubmit);
  return todoConfig;
};

const todosDOM = (index) => {
  const todowrap = document.createElement('div');
  todowrap.classList.add('todowrap');
  Projects.getProject(index).getAllToDos().forEach((ToDo, j) => {
    const todo = document.createElement('div');
    todo.classList.add('todo');
    switch (ToDo.priority.toLowerCase()) {
      case 'low': todo.classList.add('low-p'); break;
      case 'medium': todo.classList.add('medium-p'); break;
      case 'high': todo.classList.add('high-p'); break;
      default: null;
    }
    const todoInfo = document.createElement('div');
    todoInfo.classList.add('todo-info');
    const todoButtons = document.createElement('div');
    todoButtons.classList.add('todo-btns');
    todo.dataset.id = j;
    const pTitle = document.createElement('p');
    pTitle.classList.add('todo-title');
    pTitle.textContent = ToDo.title;
    const pDescription = document.createElement('p');
    pDescription.classList.add('todo-description');
    pDescription.textContent = ToDo.description;
    const pDate = document.createElement('p');
    pDate.classList.add('todo-date');
    pDate.textContent = format(ToDo.duedate, 'PPPP, HH:mm');
    const btnEdit = document.createElement('button');
    const btnDelete = document.createElement('button');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = ToDo.checked;
    btnDelete.id = 'btnBorrarToDo';
    btnEdit.id = 'btnEditarToDo';
    checkbox.addEventListener('click', () => {
      Projects.changeCheck(index, j, checkbox.checked);
      const todos = document.querySelector('.todos');
      while (todos.firstChild) {
        todos.removeChild(todos.lastChild);
      }
      todos.appendChild(todosDOM(index));
      todos.appendChild(barDOM(index));
    });
    btnEdit.innerHTML = SVG.editBtn();
    btnDelete.innerHTML = SVG.deleteBtn();
    btnEdit.addEventListener('click', () => {
      const todowrap = document.querySelector('.todowrap');
      while (todowrap.firstChild) {
      todowrap.removeChild(todowrap.lastChild);
      }
      todowrap.appendChild(configTodoDOM(index, j, ToDo));
    });
    btnDelete.addEventListener('click', () => {
      const todos = document.querySelector('.todos');
      Projects.deleteToDofromProject(index, j);
      while (todos.firstChild) {
        todos.removeChild(todos.lastChild);
      }
      todos.appendChild(todosDOM(index));
      todos.appendChild(barDOM(index));
    });
    todoButtons.appendChild(btnEdit);
    todoButtons.appendChild(btnDelete);
    todoButtons.appendChild(checkbox);
    todoInfo.appendChild(pTitle);
    todoInfo.appendChild(pDescription);
    todoInfo.appendChild(pDate);
    todo.appendChild(todoInfo);
    todo.appendChild(todoButtons);
    todowrap.appendChild(todo);
    });
    return todowrap;
};

export { barDOM, configTodoDOM, todosDOM };