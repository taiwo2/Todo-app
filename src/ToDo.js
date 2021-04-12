const ToDo = (title, description, duedate, priority, notes, checked) => {
  if (!(duedate instanceof Date)) {
    duedate = new Date(duedate);
  }
  const getDueDate = () => duedate;
  const setDueDate = (newDate) => { return duedate = newDate };
  const getChecked = () => checked;
  const changeCheck = () => {
    checked = !checked;
  };
  return { 
    title, 
    description,
    priority, 
    notes, 
    duedate, 
    checked, 
    getDueDate, 
    setDueDate, 
    getChecked, 
    changeCheck,
  };
};

export default ToDo;