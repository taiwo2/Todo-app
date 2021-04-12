const ToDo = (title, description, duedate, priority, notes, checked) => {
  if (!(duedate instanceof Date)) {
    duedate = new Date(duedate);
  }

  const getDueDate = () => {
    return duedate;
  };

  const setDueDate = (newDate) => {
    duedate = newDate;
  };

  const getChecked = () => {
    return checked;
  };

  const changeCheck = () => {
    checked = !checked;
  };

  return { 
    title, description, priority, notes, duedate, checked, 
    getDueDate, setDueDate, getChecked, changeCheck };
};

export default ToDo;