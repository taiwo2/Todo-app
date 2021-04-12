import { format } from 'date-fns';
import Projects from './Projects';
import SVG from './svg';
import {barDOM, configTodoDOM } from './call'

const ManipulateDOM = (() => {
  const putProjects = () => {
    const projectsDOM = document.querySelector('.list-projects');
    Projects.getAllProjects().forEach((project, index) => {
      const projectDOM = document.createElement('div');
      projectDOM.dataset.id = index;
      projectDOM.classList.add('project');
      const titleDOM = document.createElement('p');
      titleDOM.classList.add('title');
      titleDOM.textContent = project.title;
      const descDOM = document.createElement('p');
      descDOM.classList.add('description');
      descDOM.textContent = project.description;
      projectDOM.appendChild(titleDOM);
      projectDOM.appendChild(descDOM);
      projectDOM.addEventListener('click', () => {
        const projectDetails = document.querySelector('.project-details');
        const todos = document.querySelector('.todos');
        while (projectDetails.firstChild) {
          projectDetails.removeChild(projectDetails.lastChild);
          }
          while (todos.firstChild) {
          todos.removeChild(todos.lastChild);
        }
        projectDetails.appendChild(ProjectFieldsDOM(project, index));
        todos.appendChild(todosDOM(index));
        todos.appendChild(barDOM(index));
      })
      projectsDOM.appendChild(projectDOM);
    });

  };

  const todosDOM = (index) => {
    const todowrap = document.createElement('div');
    todowrap.classList.add('todowrap');
    Projects.getProject(index).getAllToDos().forEach((ToDo, j) => {
      const todo = document.createElement('div');
      todo.classList.add('todo');
      switch (ToDo.priority.toLowerCase()) {
        case 'low': todo.classList.add('low-p'); break;
        case 'medium': todo.classList.add("medium-p"); break;
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

/* eslint-disable */

  const ProjectFieldsDOM = (project, index) => {
      let wrap = document.createElement('div');
      wrap.classList.add('project-options');
      let info = document.createElement('div');
      info.classList.add('project-info');
      let wrapbuttons = document.createElement('div');
      wrapbuttons.classList.add('project-buttons');
      let title = document.createElement('h1');
      title.textContent = project.title;
      const btnEdit = document.createElement('button');
      let btnDelete = document.createElement('button');
      btnEdit.id = 'btnEdit';
      btnDelete.id = 'btnDelete';
      btnEdit.innerHTML = SVG.editBtn();
      btnDelete.innerHTML = SVG.deleteBtn();
      // Edit Button Action
      btnEdit.addEventListener('click', () => {
        const projectsDOM = document.querySelector('.list-projects');
        document.querySelector('#btnAddProject').classList.add('hidden');
        document.querySelector('#btnBackProject').classList.remove('hidden');
        while (projectsDOM.firstChild) {
            projectsDOM.removeChild(projectsDOM.lastChild);
        }
        projectsDOM.appendChild(EditProjectDOM(project, index));
      })
      // Delete Button Action
      btnDelete.addEventListener('click', () => {
        Projects.removeProject(index);
        let todos = document.querySelector('.todos');
        while (wrap.firstChild) {
            wrap.removeChild(wrap.lastChild);
        }
        while (todos.firstChild) {
            todos.removeChild(todos.lastChild);
        }
        reloadProjects();
      });
      info.appendChild(title);
      wrapbuttons.appendChild(btnEdit);
      wrapbuttons.appendChild(btnDelete);
      wrap.appendChild(info);
      wrap.appendChild(wrapbuttons);
      return wrap;
  }

   /* eslint-disable */
   
  const EditProjectDOM = (project, index) => {
      let form = document.createElement('div');
      form.classList.add('form-add');
      let txtTitle = document.createElement('input');
      let lblTitle = document.createElement('label');
      lblTitle.htmlFor = 'txtTitle';
      lblTitle.textContent = 'Title:';
      let lblDescription = document.createElement('label');
      lblDescription.htmlFor = 'txtDescription';
      lblDescription.textContent = 'Description:';
      txtTitle.type = 'text';
      txtTitle.id = 'txtTitle';
      txtTitle.value = project.title;
      let txtDescription = document.createElement('input');
      txtDescription.type = 'text';
      txtDescription.id = 'txtDesc';
      txtDescription.value = project.description;
      let btnSubmit = document.createElement('button');
      btnSubmit.textContent = 'Edit';
      btnSubmit.classList.add('btn-aside');
      let Error = document.createElement('p');
      Error.classList.add('hidden');
      Error.classList.add('error');
      form.appendChild(lblTitle);
      form.appendChild(txtTitle);
      form.appendChild(lblDescription);
      form.appendChild(txtDescription);
      form.appendChild(btnSubmit);
      form.appendChild(Error);
      btnSubmit.addEventListener('click', () => {
        if (txtTitle.value !== '' && txtDescription.value !== '') {
          Projects.editProject(index, txtTitle.value, txtDescription.value);
          reloadProjects();
          document.querySelector('#btnBackProject').classList.add('hidden');
          document.querySelector('#btnAddProject').classList.remove('hidden');
        }
        else {
          Error.textContent = 'ERROR: Fields are still empty';
          Error.classList.remove('hidden');
        }
      })
      return form;
  }
  const createNewProjectDOM = () => {
      let form = document.createElement('div');
      form.classList.add('form-add');
      let txtTitle = document.createElement('input');
      let lblTitle = document.createElement('label');
      lblTitle.htmlFor = 'txtTitle';
      lblTitle.textContent = 'Title:';
      let lblDescription = document.createElement('label');
      lblDescription.htmlFor = 'txtDescription';
      lblDescription.textContent = 'Description:';
      txtTitle.type = 'text';
      txtTitle.id = 'txtTitle';
      let txtDescription = document.createElement('input');
      txtDescription.type = 'text';
      txtDescription.id = 'txtDesc';
      let btnSubmit = document.createElement('button');
      btnSubmit.textContent = 'Create';
      btnSubmit.classList.add('btn-aside');
      let Error = document.createElement('p');
      Error.classList.add('hidden');
      Error.classList.add('error');
      form.appendChild(lblTitle);
      form.appendChild(txtTitle);
      form.appendChild(lblDescription);
      form.appendChild(txtDescription);
      form.appendChild(btnSubmit);
      form.appendChild(Error);
      // Submit Add Button Action
      btnSubmit.addEventListener('click', () => {
        if (txtTitle.value !== '' && txtDescription.value !== '') {
          Projects.addProject(txtTitle.value, txtDescription.value);
          reloadProjects();
          document.querySelector('#btnBackProject').classList.add('hidden');
          document.querySelector("#btnAddProject").classList.remove('hidden');
        }
        else {
          Error.textContent = 'ERROR: Fields are still empty';
          Error.classList.remove('hidden');
        }
      });
      return form;
  }
  const reloadProjects = () => {
    const projectsDOM = document.querySelector('.list-projects');
    while (projectsDOM.firstChild) {
        projectsDOM.removeChild(projectsDOM.lastChild);
    }
    putProjects();
  }
  const InitialEvents = () => {
    const btnAddProject = document.querySelector('#btnAddProject');
    const btnBack = document.querySelector('#btnBackProject');
    btnAddProject.addEventListener('click', (e) => {
      const projectDOM = document.querySelector('.list-projects');
      e.target.classList.add('hidden');
      btnBack.classList.remove('hidden');
      while (projectDOM.firstChild) {
          projectDOM.removeChild(projectDOM.lastChild);
    }
    projectDOM.replaceChildren(createNewProjectDOM());
    });
    btnBack.addEventListener('click', (e) => {
      e.target.classList.add('hidden');
      btnAddProject.classList.remove('hidden');
      reloadProjects();
    });
  }
  const init = () => {
    reloadProjects();
    InitialEvents();
  }
  return { init }
})();

ManipulateDOM.init();