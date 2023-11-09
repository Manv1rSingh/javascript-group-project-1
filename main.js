// [1]
function hide(id) {
  document.getElementById(id).style display = "none";
}

function display(id, style) {
  document.getElementById(id).style.display = style;
}

function display_form(edit) {
  if (edit && !active_task) {
    return;
  }

  display("submit_task_form", "block");
  hide("filter"); 
  hide("add_task_btn");
  hide("edit_task_btn");
  hide("delete_task_btn");
  hide("tasks");

  if (edit) {
    hide("submit_btn_add");
    edit_task();
  } else {
    hide("submit_btn_edit");
  }
}

function hide_form(edit) {
  hide("submit_task_form");
  display("filter", "inline-block");
  display("add_task_btn", "inline-block");
  display("edit_task_btn", "inline-block");
  display("delete_task_btn", "inline-block");
  display("tasks", "block");
  if (edit) {
    display("submit_btn_add", "grid");
  } else {
    display("submit_btn_edit", "grid");
  }

const get_value = (id) => document.getElementById(id).value;

function set_value(id, value) {
  document.getElementById(id).value = value;
}

function reset_form() {
  set_value("taskname", "");
  set_value("description", "");
  set_value("assignee", "");
  set_value("deadline", "");
  set_value("task-label", "");
}

const color_map = {
  "urgent": "red",
  "complete": "green",
  "onhold": "yellow",
  "": "",
};

const label_map = {
  "red": "urgent",
  "green": "complete",
  "yellow": "onhold",
  "": "",
};

//
