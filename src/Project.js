import ToDo from './ToDo';


const Project = (title, description) => {
  const ToDos = [];

  const addToDo = (title, description, dueDate, priority, notes, checked) => {
    ToDos.push(ToDo(title, description, dueDate, priority, notes, checked));
  };

  const getAllToDos = () => ToDos;

  const removeToDo = (index) => {
    ToDos.splice(index, 1);
  };
  
/* eslint-disable */

  const getToDo = (index) => ToDos[index];

  const editToDo = (index, title, description, duedate, notes, priority) => {
    ToDos[index].title = title;
    ToDos[index].description = description;
    ToDos[index].duedate = duedate;
    ToDos[index].notes = notes;
    ToDos[index].priority = priority;
  };

  const changeCheckedToDo = (index, checked) => {
    if (ToDos[index] = checked) {
      return checked;
    } else {
      return !checked;
    }
  };
  return {
    title, description, addToDo, getAllToDos, removeToDo, getToDo, editToDo, changeCheckedToDo,
  };
};
Project();
export default Project;
