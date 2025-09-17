const allTasks = [];

const tasksList = document.querySelector("tasksList");

function renderTasks() {
  let html;
  if (allTasks.length == 0) {
    html = `
    <li class="taskItem">
      <p>You don't have any tasks yet</p>
    </li>
  `
  } else {
    html = allTasks.forEach((el)=>{
      `<li id=${el.id}class="taskItem">
    <input type="checkbox" checked=${el.isDone}/>
      <p>${el.text}</p>
    </li>`});
  
}
  return tasksList.innerHtml = html;
}


function addNewTask(text) {

  let newTask = {
    id: new Date(),
    text: text,
    isDone: false,
  };

  allTasks.push(newTask);
  renderTasks();
};

renderTasks();