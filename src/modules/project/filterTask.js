import displayController from '../displayController';
import completedTask from '../todo/completedTask';
import storage from '../storage';

const filterTask = (e) => {
  const target = e.target.textContent.toLowerCase();
  const taskArr = displayController.myTasks;
  const task = document.querySelectorAll('.task');
  const addTask = document.getElementById('add-task');
  const filterArr = [];

  const checkHandler = () => {
    const checkbox = document.querySelectorAll('.checkbox');
    for (let i = 0; i < checkbox.length; i += 1) {
      checkbox[i].addEventListener('click', (e) => {
        const parent = e.target.parentElement.parentElement;
        const completed = target.checked ? 'checked' : false;
        const taskId = parent.getAttribute('data-id');

        for (let i = 0; i < filterArr.length; i += 1) {
          if (filterArr[i].id === taskId) {
            filterArr[i].checked = completed;
          }
        }
        storage.saveToLocal();
        completedTask();
      });
    }
  };

  for (let i = 0; i < task.length; i += 1) {
    task[i].remove();
  }

  for (let i = 0; i < taskArr.length; i += 1) {
    if (taskArr[i].project.toLowerCase() === target) {
      filterArr.push(taskArr[i]);
    }
  }

  for (let i = 0; i < filterArr.length; i += 1) {
    addTask.insertAdjacentHTML(
      'beforebegin',
      `
      <div class="task" data-id="${filterArr[i].id}">
        <div class="task-group">
          <input type="checkbox" class="checkbox" ${filterArr[i].checked}/>
          <p class="task-name">${filterArr[i].title}</p>
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
          <p class="due-date">${filterArr[i].dueDate}</p>
        </div>
      </div>`
    );

    checkHandler();
    completedTask();
  }

  // Add focus on selected project
  const project = document.querySelectorAll('.project');
  const allProject = document.getElementById('all-project');
  const selectedProject = e.target;

  for (let i = 0; i < project.length; i += 1) {
    project[i].style.color = '#333333';
  }
  allProject.style.color = '#333333';
  selectedProject.style.color = '#262626';

  displayController.trashHandler();
  displayController.viewTaskHandler();
  displayController.editTaskHandler();
  displayController.displayTaskButtonsOnHover();
};

export default filterTask;
