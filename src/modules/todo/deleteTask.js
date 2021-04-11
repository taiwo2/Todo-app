import displayController from '../displayController';
import storage from '../storage';


const deleteTask = (e) => {
  const parent = e.target.parentElement.parentElement.parentElement.parentElement;
  const objId = parent.getAttribute('data-id');

  displayController.removeTaskFromArr(objId);
  storage.saveToLocal();
  parent.remove();
};

export default deleteTask;
