function task(id, title, description, dueDate, project) {
  return {
    id: id,
    title: title,
    description: description,
    dueDate: dueDate,
    project: project,
    checked: false,
    };
  }
  
  export default task;