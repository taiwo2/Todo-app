import displayController from '../displayController';
import storage from '../storage';
import project from './project';

const createProject = () => {
  const addProject = document.getElementById('add-project');
  const addProjectInputContainer = document.getElementById('add-project-input-container');
  const addProjectInput = document.getElementById('add-project-input').value;

  // Generate random ID
  function s4() {
    return Math.floor((1 + Math.random()) * 0x1000).toString(16).substring(1);
  };

  const projectId = `${s4()} + '-' + ${s4()} + '-' + ${s4()}`;

  const newProject = project(projectId, addProjectInput);

  addProjectInputContainer.insertAdjacentHTML(
    'beforebegin',
    `
    <div class="project-group project-hover" data-id="${newProject.id}">
      <h3 class="project">${newProject.title}</h3>
      <div class="task-buttons">
        <i class="far fa-edit edit-project-button"></i>
        <i class="far fa-trash-alt delete-project"></i>
      </div>
    </div>`
  );

  addProjectInputContainer.style.display = 'none';
  addProject.style.display = 'flex';
  displayController.addToProjectArr(newProject);
  storage.saveProjectToLocal();
  displayController.projectTrashHandler();
  displayController.projectHandler();
  displayController.editProjectHandler();
  displayController.displayProjectButtonsOnHover();
};

export default createProject;