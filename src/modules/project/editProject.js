import storage from '../storage';
import displayController from '../displayController';

const editProject = (() => {
  const submitProjectEditHandler = id => {
    const editProjectInput = document.getElementById('edit-project-input');
    const submitProjectEdit = document.getElementById('submit-project-edit');

    submitProjectEdit.addEventListener('click', e => {
      displayController.editProjectInArr(id, editProjectInput.value);
      storage.saveProjectToLocal();

      const element = e.target.parentElement.parentElement;

      element.outerHTML = `
      <div class="project-group project-hover" data-id="${id}">
        <h3 class="project">${editProjectInput.value}</h3>
        <div class="task-buttons">
          <i class="far fa-edit edit-project-button"></i>
          <i class="far fa-trash-alt delete-project"></i>
        </div>
      </div>
      `;

      displayController.projectTrashHandler();
      displayController.projectHandler();
      displayController.editProjectHandler();
      displayController.displayProjectButtonsOnHover();
    });
  };

  const exitProjectEditHandler = id => {
    const exitProjectEdit = document.getElementById('exit-project-edit');
    const project = document.querySelector(`[data-id="${id}"]`);
    const element = project;
    const getObj = JSON.parse(localStorage.getItem('myProjects'));
    const projectObj = getObj.filter(e => e.id === id);

    exitProjectEdit.addEventListener('click', e => {
      element.outerHTML = `
      <div class="project-group project-hover" data-id="${id}">
        <h3 class="project">${projectObj[0].title}</h3>
        <div class="task-buttons">
          <i class="far fa-edit edit-project-button"></i>
          <i class="far fa-trash-alt delete-project"></i>
        </div>
      </div>
      `;

      displayController.projectTrashHandler();
      displayController.projectHandler();
      displayController.editProjectHandler();
      displayController.displayProjectButtonsOnHover();
    });
  };

  return { submitProjectEditHandler, exitProjectEditHandler };
})();

export default editProject;
