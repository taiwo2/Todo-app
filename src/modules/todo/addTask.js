import todo from './todo';
import displayController from '../displayController';
import storage from '../storage';
import project from '../project/project';
const format = require('date-fns/format');

const addTask = e => {
  e.preventDefault();
  const createTaskTitle = document.getElementById('create-task-title').value;
  const createTaskDescription = document.getElementById(
    'create-task-description'
  ).value;
  const createTaskDate = document.getElementById('create-task-date').value;
  const createTaskProject = document.getElementById('create-task-project')
    .value;

  // Generate random ID
  function s4() {
    return Math.floor((1 + Math.random()) * 0x1000)
      .toString(16)
      .substring(1);
  }
  const taskId = s4() + '-' + s4() + '-' + s4();

  const year = createTaskDate.slice(0, 4);
  const month = parseInt(createTaskDate.slice(5, 7)) - 1;
  const day = createTaskDate.slice(8);

  const date = format(new Date(year, month, day), 'MM-dd-yyyy');

  // Create a new task object
  const newTask = todo(
    taskId,
    createTaskTitle,
    createTaskDescription,
    date,
    createTaskProject
  );

  displayController.addTask.insertAdjacentHTML(
    'beforebegin',
    `
    <div class="task" data-id="${newTask.id}">
      <div class="task-group">
        <input type="checkbox" class="checkbox" />
        <p class="task-name">${newTask.title}</p>
      </div>
      <div class="button-date-group">
        <div class="task-buttons">
          <div>
            <i class="far fa-edit edit-task-button"></i>
          </div>
          <div>
            <i class="far fa-trash-alt"></i>
          </div>
        </div>
        <p class="due-date">${newTask.dueDate}</p>
      </div>
    </div>
  `
  );

  // Creates the project if it doesn't exist
  const projectArr = [];

  for (let i = 0; i < displayController.myProjects.length; i++) {
    projectArr.push(displayController.myProjects[i].title.toLowerCase());
  }

  if (
    projectArr.indexOf(createTaskProject.toLowerCase()) < 0 &&
    createTaskProject !== ''
  ) {
    const addProjectInputContainer = document.getElementById(
      'add-project-input-container'
    );

    const projectId = s4() + '-' + s4() + '-' + s4();

    const newProject = project(projectId, createTaskProject);

    addProjectInputContainer.insertAdjacentHTML(
      'beforebegin',
      `
      <div class="project-group project-hover" data-id="${newProject.id}">
        <h3 class="project">${newProject.title}</h3>
        <div class="task-buttons">
          <i class="far fa-edit edit-project-button"></i>
          <i class="far fa-trash-alt delete-project"></i>
        </div>
      </div>
      `
    );
  }

};

export default addTask;
