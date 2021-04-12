const ProjectFieldsDOM = (project, index) => {
    let wrap = document.createElement('div');
    wrap.classList.add('project-options');
    let info = document.createElement('div');
    info.classList.add('project-info');
    let wrapbuttons = document.createElement('div');
    wrapbuttons.classList.add('project-buttons');
    let title = document.createElement('h1');
    title.textContent = project.title;
    const btnEdit = document.createElement('button');
    let btnDelete = document.createElement('button');
    btnEdit.id = 'btnEdit';
    btnDelete.id = 'btnDelete';
    btnEdit.innerHTML = SVG.editBtn();
    btnDelete.innerHTML = SVG.deleteBtn();
    // Edit Button Action
    btnEdit.addEventListener('click', () => {
      const projectsDOM = document.querySelector('.list-projects');
      document.querySelector('#btnAddProject').classList.add('hidden');
      document.querySelector('#btnBackProject').classList.remove('hidden');
      while (projectsDOM.firstChild) {
          projectsDOM.removeChild(projectsDOM.lastChild);
      }
      projectsDOM.appendChild(EditProjectDOM(project, index));
    })
    // Delete Button Action
    btnDelete.addEventListener('click', () => {
      Projects.removeProject(index);
      let todos = document.querySelector('.todos');
      while (wrap.firstChild) {
          wrap.removeChild(wrap.lastChild);
      }
      while (todos.firstChild) {
          todos.removeChild(todos.lastChild);
      }
      reloadProjects();
    });
    info.appendChild(title);
    wrapbuttons.appendChild(btnEdit);
    wrapbuttons.appendChild(btnDelete);
    wrap.appendChild(info);
    wrap.appendChild(wrapbuttons);
    return wrap;
}

export default ProjectFieldsDOM;