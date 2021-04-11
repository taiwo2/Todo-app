import displayController from '../displayController';
import storage from '../storage';


const deleteTask = () => {
  const parent = target.parentElement.parentElement.parentElement.parentElement;
  const objId = parent.getAttribute('data-id');

  displayController.removeTaskFromArr(objId);
  storage.saveToLocal();
  parent.remove();
};

export default deleteTask;
