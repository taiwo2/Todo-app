function todo(id, title, description, dueDate, project) {
    return {
      id: id,
      title: title,
      description: description,
      dueDate: dueDate,
      project: project,
      checked: false,
    };
  }
  
  export default todo;
  