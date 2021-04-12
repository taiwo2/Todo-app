import { Project } from './Project'

const LocalDB = (() => {
  const saveProjects = (projects) => {
    localStorage.setItem('projects', JSON.stringify(projects))
  }

  const saveTodo = (title, ToDos) => {
    localStorage.setItem(title, JSON.stringify(ToDos))
  }

  const getProjects = () => {
    const projects = []
    if (Object.prototype.hasOwnProperty.call(localStorage, 'projects')) {
      const retrievedProjects = JSON.parse(localStorage.getItem('projects'))
      retrievedProjects.forEach((project) => {
        projects.push(Project(project.title, project.description))
        if (Object.prototype.hasOwnProperty.call(localStorage, project.title)) {
          const retrievedTodos = JSON.parse(localStorage.getItem(project.title))
          retrievedTodos.forEach((ToDo) => {
            projects[projects.length - 1].addToDo(
              ToDo.title,
              ToDo.description,
              ToDo.duedate,
              ToDo.priority,
              ToDo.notes,
              ToDo.checked
            )
          })
        }
      })
    }
    return projects
  }

  const removeToDos = (title) => {
    localStorage.removeItem(title)
  }

  return { saveProjects, getProjects, removeToDos, saveTodo }
})()

export { LocalDB }
