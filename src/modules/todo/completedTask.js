const completedTask = () => {
    const checkbox = document.querySelectorAll('.checkbox');

  for (let i = 0; i < checkbox.length; i += 1) {
    if (checkbox[i].checked) {
      const parent = checkbox[i].parentElement.parentElement;
      parent.classList.add('complete');
    } else {
      const parent = checkbox[i].parentElement.parentElement;
      parent.classList.remove('complete');
    }
    }
  };

export default completedTask;  