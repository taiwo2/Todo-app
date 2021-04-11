import { LocalDB } from './LocalDB';
import { Project } from './Project';

const Projects = (() => {

    let projects = LocalDB.getProjects();

    const addProject = (title, description) => {
        projects.push(Project(title, description));
        LocalDB.saveProjects(projects);
    }

    const editProject = (index, title, description) => {
        LocalDB.removeToDos(projects[index].title);
        projects[index].title = title;
        projects[index].description = description;
        LocalDB.saveProjects(projects);
        LocalDB.saveTodo(projects[index].title, projects[index].getAllToDos());
    }

    const getAllProjects = () => {
        return projects;
    }

    const addToDoOnProject = (index, title) => {
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth();
        let year = today.getFullYear();
        let hours = today.getHours();
        let minutes = today.getMinutes();
        projects[index].addToDo(title, "", new Date(year,month,day,hours,minutes), "Low", "", false);
        LocalDB.saveTodo(projects[index].title, projects[index].getAllToDos());

    }

    const getProject = (index) => {
        return projects[index];
    }

    const removeProject = (index) => {
        LocalDB.removeToDos(projects[index].title);
        projects.splice(index, 1);
        LocalDB.saveProjects(projects);
    }

    const deleteToDofromProject = (indexProject, indexToDo) => {
        projects[indexProject].removeToDo(indexToDo);
        LocalDB.saveTodo(projects[indexProject].title, projects[indexProject].getAllToDos());
    }

    const editToDofromProject = (indexProject, indexTodo, title, description, duedate, notes, priority)=>{
        projects[indexProject].editToDo(indexTodo, title, description, duedate, notes, priority);
        LocalDB.saveTodo(projects[indexProject].title, projects[indexProject].getAllToDos());
    }

    const changeCheck = (indexProject,indexToDo, checked)=>{
        projects[indexProject].changeCheckedToDo(indexToDo, checked);
        LocalDB.saveTodo(projects[indexProject].title, projects[indexProject].getAllToDos());
    }

    return { addProject, getAllProjects, removeProject, editProject, getProject, addToDoOnProject, deleteToDofromProject, editToDofromProject, changeCheck };
})();

export {Projects};