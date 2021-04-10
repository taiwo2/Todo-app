import displayController from './displayController';

const storage = (() => {
  const saveToLocal = () => {
    localStorage.setItem(`myTasks`, JSON.stringify(displayController.myTasks));
  };

  const saveProjectToLocal = () => {
    localStorage.setItem(
      `myProjects`,
      JSON.stringify(displayController.myProjects)
    );
  };

  const deleteFromLocal = taskId => {
    localStorage.removeItem(`${taskId}`);
  };

  return { saveToLocal, saveProjectToLocal, deleteFromLocal };
})();

export default storage;
