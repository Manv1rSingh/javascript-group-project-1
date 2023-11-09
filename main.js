function task_div(parent, class_name = "") {
  const elem = document.createElement("div");
  elem.className = class_name;
  parent.appendChild(elem);
  return elem;
}

function display_task(id, task) {
  const elem = document.createElement("div";
  const { name, description, assignee, deadline, label } = task;
  elem.className = "task";
  elem.id = id;
  elem.addEventListener("click", (_) => {
    if (active_task) {
      active_task.className = "task";
    }
    active_task = elem;
    elem.className = "task selected";
  });
  document.getElementById("tasks").appendChild(elem);

  const name_div = task_div(elem, name ${label});
  name_div.innerText = name;

  const desc_div = task_div(elem, "smalltext");
  desc_div.innerText = Description: ${description};

  const assignee_div = task_div(elem, "smalltext assignee");
  assignee_div.innerText = Assigned to: ${assignee};

  const deadline_div = task_div(elem, "smalltext date");
  deadline_div.innerText = Deadline: ${new Date(deadline).toDateString()};
}

function display_tasks(tasks) {
  for (let i = 0; i < tasks.length; ++i) {
    const task = tasks[i];
    display_task(task${i}, task);
  }

function search(value) {
  reset_tasks_div();
  if (!value) {
    display_tasks(tasks);
    return;
  }

  // [5]
  const tasks_set = new Set([
    ...tasks.filter((task) => task.name.includes(value)),
    ...tasks.filter((task) => task.assignee.includes(value)),
    ...tasks.filter((task) => task.description.includes(value)),
  ]);

  display_tasks(Array.from(tasks_set));
}

function reset_tasks_div() {
  document.getElementById("tasks").remove();
  const uilist = document.createElement("div");
  uilist.id = "tasks";
  uilist.style = "cursor: default;";
  const container = document.getElementById("container");
  container.appendChild(uilist);
}

function update() {
  // [2], [3]
  localStorage.setItem("tasks", JSON.stringify(tasks));
  reset_tasks_div();

  const name = get_value("filter");
  search(name);
}

window.onload = () => {
  document.getElementById("filter").addEventListener("input", (e) => {
    search(e.target.value);
  });
  update();
};

// References:
// [1] Dynamically display and hide element
//     https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
// [2] Local Storage API
//     https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
// [3] JSON API for storing arrays of objects in localStorage
//     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON 
