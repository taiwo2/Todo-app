import { ToDo } from './ToDo';

const Project = (title, description) => {
  const ToDos = [];

  const addToDo = (title, description, dueDate, priority, notes, checked) => {
    ToDos.push(ToDo(title, description, dueDate, priority, notes, checked));
  };

  const getAllToDos = () => {
    return ToDos;
  };

  const removeToDo = (index) => {
    ToDos.splice(index, 1);
  };

  const getToDo = (index) => {
    return ToDos[index];
  };

  const editToDo = (index, title, description, duedate, notes, priority) => {
    ToDos[index].title = title;
    ToDos[index].description = description;
    ToDos[index].duedate = duedate;
    ToDos[index].notes = notes;
    ToDos[index].priority = priority;
  }

  const changeCheckedToDo = (index, checked) => {
    ToDos[index].checked = checked;
  }
  return { title, description, addToDo, getAllToDos, removeToDo, getToDo, editToDo, changeCheckedToDo };
}

export default Project;
