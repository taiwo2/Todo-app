import deleteTask from './todo/deleteTask';
import viewTask from './todo/viewTask';
import completedTask from './todo/completedTask';
import storage from './storage';
import removeProject from './project/removeProject';
import filterTask from './project/filterTask';
import editTask from './todo/edit';
import editProject from './project/editProject';

const format = require('date-fns/format');

const displayController = (() => {
  const content = document.getElementById('content');
  content.innerHTML = `
  <main id="main">
    <div id="col-1">
      <div id="project-container">
        <div id="project-header">
          <h3>Projects</h3>
        </div>
        <div class="project-group-all">
          <h3 id="all-project">All</h3>
        </div>
        <div id="add-project-input-container">
          <input type="text" id="add-project-input" />
          <div class="add-project-buttons">
            <i class="fas fa-check"></i>
            <i class="fas fa-ban"></i>
          </div>
        </div>
        <div id="add-project">
          <p id="plus">&#x2B;</p>
          <p id="add-project-text">Add Project</p>
        </div>
      </div>
    </div>
    <div id="col-2">
      <div id="task-container">
        <div id="task-header">
          <p>Task</p>
          <p>Due Date</p>
        </div>
        <div id="add-task">
          <p id="plus">&#x2B;</p>
          <p id="add-task-text">Add Task</p>
        </div>
      </div>
    </div>
  </main>
  <div id="create-task-modal">
    <form action="#" id="create-task-form">
      <div id="create-task-group-1">
        <input type="text" placeholder="Add a task" required id="create-task-title" name="title"/>
        <textarea
          name="description"
          id="create-task-description"
          placeholder="Description"
        ></textarea>
      </div>
      <div id="create-task-group-2">
        <input type="date" id="create-task-date" name="date" required />
        <input type="text" id="create-task-project" placeholder="Project"/>
      </div>
      <div id="create-task-group-3">
        <input type="button" id="cancel-button" value="Cancel"></input>
        <input type="submit" id="submit-button" />
      </div>
    </form>
  </div>
  <div id="view-task-modal">
    <div id="view-task-container">
      <p id="view-task-title"></p>
      <p id="view-task-description"></p>
      <div id="view-task-date-project">
        <p id="view-due-date">Due Date:</p>
        <p id="view-project">Project:</p>
      </div>
      <div id="create-task-group-3">
        <button id="view-cancel-button">Cancel</button>
        <input type="submit" id="edit-button" value="Edit" />
      </div>
    </div>
  </div>
  <div id="edit-task-modal">
    <form action="#" id="edit-task-form">
      <div id="edit-task-group-1">
        <input type="text" placeholder="Add a task" required id="edit-task-title" name="title" />
        <textarea
          name="description"
          id="edit-task-description"
          placeholder="Description"
        ></textarea>
      </div>
      <div id="edit-task-group-2">
        <input type="date" id="edit-task-date" name="date" required />
        <input type="text" id="edit-task-project"/>
      </div>
      <div id="create-task-group-3">
        <button id="cancel-edit-button">Cancel</button>
        <input type="submit" id="submit-edit-button" />
      </div>
    </form>
  </div>
  `;

  const addProject = document.getElementById('add-project');
  const addTask = document.getElementById('add-task');
  const createTaskModal = document.getElementById('create-task-modal');
  const cancelButton = document.getElementById('cancel-button');
  const createTaskForm = document.getElementById('create-task-form');
  const createTaskTitle = document.getElementById('create-task-title').value;
  const createTaskDescription = document.getElementById('create-task-description').value;
  const createTaskDate = document.getElementById('create-task-date').value;
  const createTaskProject = document.getElementById('create-task-project').value;
  const addProjectInputContainer = document.getElementById('add-project-input-container');
  const editTaskForm = document.getElementById('edit-task-form');
  const editTaskModal = document.getElementById('edit-task-modal');
  const cancelEditButton = document.getElementById('cancel-edit-button');
  let myTasks = [];
  let myProjects = [];
  let editId;

  const loadTask = () => {
    for (let i = 0; i < myTasks.length; i +=1) {
      addTask.insertAdjacentHTML(
        'beforebegin',
        `
        <div class="task" data-id="${myTasks[i].id}">
          <div class="task-group">
            <input type="checkbox" class="checkbox" ${myTasks[i].checked}/>
            <p class="task-name">${myTasks[i].title}</p>
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
            <p class="due-date">${myTasks[i].dueDate}</p>
          </div>
        </div>`);
    }
  };

  // Project functions

  const loadProjects = () => {
    for (let i = 0; i < myProjects.length; i += 1) {
      addProjectInputContainer.insertAdjacentHTML(
        'beforebegin',
        `
        <div class="project-group project-hover" data-id="${myProjects[i].id}">
          <h3 class="project">${myProjects[i].title}</h3>
          <div class="task-buttons">
            <i class="far fa-edit edit-project-button"></i>
            <i class="far fa-trash-alt delete-project"></i>
          </div>
        </div>
        `
      );
    }
  };


  const addToProjectArr = project => {
    myProjects.push(project);
  };

  const removeProjectFromArr = projectId => {
    for (let i = 0; i < myProjects.length; i += 1) {
      if (myProjects[i].id === projectId) {
        myProjects.splice(i, 1);
      }
    }
  };

  const projectTrashHandler = () => {
    const deleteProject = document.querySelectorAll('.delete-project');
    for (let i = 0; i < deleteProject.length; i += 1) {
      deleteProject[i].addEventListener('click', removeProject);
    }
  };

  const editProjectInArr = (id, title) => {
    for (let i = 0; i < myProjects.length; i += 1) {
      if (myProjects[i].id === id) {
        myProjects[i].title = title;
      }
    }
  };

  const editProjectHandler = () => {
    const editProjectButton = document.querySelectorAll('.edit-project-button');
    for (let i = 0; i < editProjectButton.length; i += 1) {
      editProjectButton[i].addEventListener('click', (e) => {
        const target = e.target;
        const parent = target.parentElement.parentElement;
        const projectId = parent.getAttribute('data-id');
        const title = target.parentElement.previousElementSibling.textContent;

        parent.outerHTML = `
        <div id="edit-project-input-container" data-id="${projectId}">
          <input type="text" id="edit-project-input" value="${title}"/>
          <div class="add-project-buttons">
            <i class="fas fa-check" id="submit-project-edit"></i>
            <i class="fas fa-ban" id="exit-project-edit"></i>
          </div>
        </div>
        `;

        // Submit edits
        editProject.submitProjectEditHandler(projectId);

        // Exit edits
        editProject.exitProjectEditHandler(projectId);
      });
    }
  };

  const displayProjectButtonsOnHover = () => {
    const projectHover = document.querySelectorAll('.project-hover');
    for (let i = 0; i < projectHover.length; i += 1) {
      projectHover[i].addEventListener('mouseenter', e => {
        const target = e.target;
        const child = target.lastElementChild;
        child.style.display = 'flex';
      });
    }

    for (let i = 0; i < projectHover.length; i += 1) {
      projectHover[i].addEventListener('mouseleave', e => {
        const target = e.target;
        const child = target.lastElementChild;
        child.style.display = 'none';
      });
    }
  };

  // Task functions

  const addToTaskArr = taskObj => {
    myTasks.push(taskObj);
  };

  const removeTaskFromArr = taskId => {
    for (let i = 0; i < myTasks.length; i += 1) {
      if (myTasks[i].id === taskId) {
        myTasks.splice(i, 1);
      }
    }
  };

  const trashHandler = () => {
    const trash = document.querySelectorAll('.fa-trash-alt');
    for (let i = 0; i < trash.length; i += 1) {
      trash[i].addEventListener('click', deleteTask);
    }
  };

  const viewTaskHandler = () => {
    const taskName = document.querySelectorAll('.task-name');
    for (let i = 0; i < taskName.length; i += 1) {
      taskName[i].addEventListener('click', viewTask);
    }
  };

  const checkHandler = () => {
    const checkbox = document.querySelectorAll('.checkbox');
    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].addEventListener('click', (e) => {
        const target = e.target;
        const parent = target.parentElement.parentElement;
        const completed = target.checked ? 'checked' : false;
        const taskId = parent.getAttribute('data-id');

        for (let i = 0; i < myTasks.length; i += 1) {
          if (myTasks[i].id === taskId) {
            myTasks[i].checked = completed;
          }
        }
        storage.saveToLocal();
        completedTask();
      });
    }
  };

  const updateEditId = id => {
    editId = id;
  };

  editTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const editTaskTitle = document.getElementById('edit-task-title');
    const editTaskDescription = document.getElementById(
      'edit-task-description'
    );
    const editTaskDate = document.getElementById('edit-task-date');
    const editTaskProject = document.getElementById('edit-task-project');

    const year = editTaskDate.value.slice(0, 4);
    const month = parseInt(editTaskDate.value.slice(5, 7)) - 1;
    const day = editTaskDate.value.slice(8);

    const date = format(new Date(year, month, day), 'MM-dd-yyyy');

    displayController.editTaskInArr(
      editId,
      editTaskTitle.value,
      editTaskDescription.value,
      date,
      editTaskProject.value
    );
    storage.saveToLocal();
    editTaskModal.style.display = 'none';

    for (let i = 0; i < myTasks.length; i += 1) {
      if (myTasks[i].id === editId) {
        const targetTask = document.querySelector(`[data-id="${editId}"]`);
        const taskTitle = targetTask.firstElementChild.lastElementChild;
        const taskDate = targetTask.lastElementChild.lastElementChild;
        taskTitle.textContent = editTaskTitle.value;
        taskDate.textContent = date;
      }
    }
  });

  const editTaskHandler = () => {
    const editTaskButton = document.querySelectorAll('.edit-task-button');
    for (let i = 0; i < editTaskButton.length; i += 1) {
      editTaskButton[i].addEventListener('click', editTask);
    }
  };

  const editTaskInArr = (id, title, description, dueDate, project) => {
    for (let i = 0; i < myTasks.length; i +=1) {
      if (myTasks[i].id === id) {
        myTasks[i].id = id;
        myTasks[i].title = title;
        myTasks[i].description = description;
        myTasks[i].dueDate = dueDate;
        myTasks[i].project = project;
      }
    }
  };

  // fix this
  const displayTaskButtonsOnHover = () => {
    const task = document.querySelectorAll('.task');
    for (let i = 0; i < task.length; i +=1) {
      task[i].addEventListener('mouseenter', (e) => {
        const target = e.target;
        const child = target.lastElementChild.firstElementChild;
        child.style.display = 'flex';
      });
    }

    for (let i = 0; i < task.length; i +=1) {
      task[i].addEventListener('mouseleave', (e) => {
        const target = e.target;
        const child = target.lastElementChild.firstElementChild;
        child.style.display = 'none';
      });
    }
  };

  const projectHandler = () => {
    const project = document.querySelectorAll('.project');
    const allProject = document.getElementById('all-project');
  
    allProject.addEventListener('click', (e) => {
      const task = document.querySelectorAll('.task');
      const target = e.target;
      for (let i = 0; i < task.length; i++) {
        task[i].remove();
      }
  
      for (let i = 0; i < project.length; i += 1) {
        project[i].style.color = '#333333';
      }
      target.style.color = '#262626';
  
      loadTask();
      trashHandler();
      viewTaskHandler();
      checkHandler();
      completedTask();
      editTaskHandler();
      displayTaskButtonsOnHover();
    });
  
    for (let i = 0; i < project.length; i += 1) {
      project[i].addEventListener('click', filterTask);
    }
  };

  // Check local storage & populate

  if (localStorage.getItem('myTasks')) {
    const getObj = JSON.parse(localStorage.getItem('myTasks'));
    myTasks = getObj;
    loadTask();
    trashHandler();
    viewTaskHandler();
    checkHandler();
    completedTask();
    editTaskHandler();
    displayTaskButtonsOnHover();
  }

  if (localStorage.getItem('myProjects')) {
    const getObj = JSON.parse(localStorage.getItem('myProjects'));
    myProjects = getObj;
    loadProjects();
    projectTrashHandler();
    projectHandler();
    editProjectHandler();
    displayProjectButtonsOnHover();
  }

  return {
    addProject,
    addTask,
    createTaskModal,
    cancelButton,
    createTaskForm,
    createTaskTitle,
    createTaskDescription,
    createTaskDate,
    createTaskProject,
    editTaskForm,
    cancelEditButton,
    addToTaskArr,
    addToProjectArr,
    myTasks,
    myProjects,
    removeTaskFromArr,
    removeProjectFromArr,
    loadTask,
    trashHandler,
    viewTaskHandler,
    projectTrashHandler,
    projectHandler,
    checkHandler,
    editTaskHandler,
    editTaskInArr,
    updateEditId,
    editId,
    editProjectHandler,
    displayTaskButtonsOnHover,
    displayProjectButtonsOnHover,
    editProjectInArr,
  };
})();


export default displayController;
