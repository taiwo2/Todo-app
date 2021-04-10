import displayController from '../displayController';

const removeProject = e => {
  const target = e.target;
  const parent = target.parentElement.parentElement;
  const projectId = parent.getAttribute('data-id');
  displayController.removeProjectFromArr(projectId);
  parent.remove();
  storage.saveProjectToLocal();
};

export default removeProject;
