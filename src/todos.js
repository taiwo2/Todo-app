import { format } from 'date-fns';
import configTodoDOM from './call';

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

  export default  todosDOM;