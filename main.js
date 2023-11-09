function submit_task(edit) {
  const name = get_value("taskname");
  const description = get_value("description");
  const assignee = get_value("assignee");
  const deadline = new Date(get_value("deadline"));
  const label = color_map[get_value("task-label")];

  for (const val of [name, description, assignee, deadline]) {
    // input field is empty so return
    if (!val) return;
  }
  const task = {
    name,
    description,
    assignee,
    deadline,
    label,
  };

  if (edit) {
    const s = active_task.id;
    const i = s.substring(4, s.length);
    tasks[i] = task;
    update();
  } else {
    add_task(task);
  }

  hide_form(edit);
}

// This list keeps track of all tasks and loads them from localStorage on page relaod
// [2], [3]
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add a task
//
// this function adds a task into the global tasks array
function add_task(task) {
  tasks.push(task);
  update();
}

// Edit a task
//
// this function edits the selected task
function edit_task() {
  const s = active_task.id;
  const i = s.substring(4, s.length);
  const { name, description, assignee, deadline, label } = tasks[i];

  set_value("taskname", name);
  set_value("description", description);
  set_value("assignee", assignee);
  // [4]
  const date = new Date(deadline);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  set_value("deadline", date.toISOString().slice(0, 16));
  set_value("task-label", label_map[label]);
}

// Delete a task
//
// this function deletes a task from the global tasks array
function delete_task() {
  if (!active_task) {
    return;
  }

  const s = active_task.id;
  const i = s.substring(4, s.length);
  tasks.splice(i, 1);
  update();
}

//
