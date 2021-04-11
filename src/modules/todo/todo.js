function task(id, title, description, dueDate, project) {
  return {
    id,
    title,
    description,
    dueDate,
    project,
    checked: false
};
}

export default task;