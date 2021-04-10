import displayController from '../displayController';

const viewTask = e => {
  const viewTaskTitle = document.getElementById('view-task-title');
  const viewTaskDescription = document.getElementById('view-task-description');
  const viewDueDate = document.getElementById('view-due-date');
  const viewProject = document.getElementById('view-project');
  const target = e.target;
  const parent = target.parentElement.parentElement;
  const objId = parent.getAttribute('data-id');
  const taskObj = displayController.myTasks.filter(e => e.id === objId);

  viewTaskTitle.textContent = taskObj[0].title;
  viewTaskDescription.textContent = taskObj[0].description;
  viewDueDate.textContent = `Due Date: ${taskObj[0].dueDate}`;
  viewProject.textContent = `Project: ${taskObj[0].project}`;

  // // change to display flex
  const viewTaskModal = document.getElementById('view-task-modal');
  viewTaskModal.style.display = 'flex';

  // Edit Task
  const editButton = document.getElementById('edit-button');
  editButton.addEventListener('click', d => {
    const editTaskModal = document.getElementById('edit-task-modal');
    const editTaskTitle = document.getElementById('edit-task-title');
    const editTaskDescription = document.getElementById(
      'edit-task-description'
    );
    const editTaskDate = document.getElementById('edit-task-date');
    const editTaskProject = document.getElementById('edit-task-project');

    const month = taskObj[0].dueDate.slice(0, 2);
    const day = taskObj[0].dueDate.slice(3, 5);
    const year = taskObj[0].dueDate.slice(6);

    const date = `${year}-${month}-${day}`;

    editTaskModal.style.display = 'flex';
    editTaskTitle.value = taskObj[0].title;
    editTaskDescription.value = taskObj[0].description;
    editTaskDate.value = date;
    editTaskProject.value = taskObj[0].project;

    displayController.updateEditId(objId);
    viewTaskModal.style.display = 'none';
  });

  // Exit modal
  const viewCancelButton = document.getElementById('view-cancel-button');
  viewCancelButton.addEventListener('click', e => {
    viewTaskModal.style.display = 'none';
  });
};

export default viewTask;
