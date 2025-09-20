const storageKey = 'taskTracker';
let allTasks = JSON.parse(localStorage.getItem(storageKey)) || [];

const ul = document.querySelector(".tasksList");
const addNewTaskBtn = document.querySelector(".addBtn");
const inputTask = document.querySelector(".addTask");

function saveToLocalStorage() {
  localStorage.setItem(storageKey, JSON.stringify(allTasks));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem(storageKey);
  if (data) {
    allTasks = JSON.parse(data);
  } else {
    allTasks = [];
  }
}

addNewTaskBtn.addEventListener('click', () => {
  const text = inputTask.value;
  addNewTask(text);
  renderTasks();
});
inputTask.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const text = inputTask.value;
    addNewTask(text);
    renderTasks();
  }
});

ul.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  const id = Number(li.id);

  if (e.target.dataset.action === 'delete') {
    deleteTask(id);
  } else if (e.target.dataset.action === 'toggle') {
    toggleTask(id);
  }
});

function renderTasks() {
  moveTask();
  if (allTasks.length === 0) {
    ul.innerHTML = `
    <li class="taskItem">
      <p>You don't have any tasks yet</p>
    </li>
  `;
  } else {
    ul.innerHTML = allTasks.map((el) => {
      return `<li id=${el.id} class="taskItem">
      <input type="checkbox" data-action="toggle" id="task-${el.id}" ${el.isDone ? "checked" : ''} />
      <span class="checkmark" data-action="toggle"></span>
      <label for="task-${el.id}">${el.text}</label>
      <button class="delTask" data-action="delete">
        <svg class="icon" >
          <use data-action="delete" href="./img/InlineSprite.svg#delete-sharp"></use>
        </svg>
      </button>
      </li>`}).join('');

  }
  saveToLocalStorage();

}

function addNewTask(text) {
  if (!text.trim()) return;

  allTasks.push({
    id: new Date().getTime(),
    text: text,
    isDone: false,
  });
  inputTask.value = '';
  renderTasks();

};

function deleteTask(id) {
  allTasks = allTasks.filter(task => task.id !== id);
  saveToLocalStorage();
  renderTasks();
};
function moveTask() {
  allTasks = allTasks.sort((a, b) => a.isDone - b.isDone)
}

function toggleTask(id) {
  allTasks = allTasks.map(task =>
    task.id === id ? { ...task, isDone: !task.isDone } : task
  );
  saveToLocalStorage();
  renderTasks();
}
renderTasks();