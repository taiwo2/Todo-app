import displayController from './displayController';
import addTask from './todo/addTask';
import createProject from './project/createProject';

const domListeners = () => {
  const faCheck = document.querySelector('.fa-check');
  const faBan = document.querySelector('.fa-ban');
  const addProject = document.getElementById('add-project');
  const addProjectInputContainer = document.getElementById('add-project-input-container');
  const editTaskModal = document.getElementById('edit-task-modal');

  // Add Task
  displayController.addTask.addEventListener('click', () => {
    displayController.createTaskModal.style.display = 'flex';
  });

  displayController.cancelButton.addEventListener('click', () => {
    displayController.createTaskModal.style.display = 'none';
  });

  displayController.createTaskForm.addEventListener('submit', addTask);

  // Add Project
  displayController.addProject.addEventListener('click', () => {
    addProjectInputContainer.style.display = 'flex';
    addProject.style.display = 'none';
  });

  faCheck.addEventListener('click', createProject);

  faBan.addEventListener('click', (e) => {
    e.addProjectInputContainer.style.display = 'none';
    addProject.style.display = 'flex';
  });

  // Edit Task

  displayController.cancelEditButton.addEventListener('click', (e) => {
    e.preventDefault();

    editTaskModal.style.display = 'none';
  });
};

export default domListeners;
