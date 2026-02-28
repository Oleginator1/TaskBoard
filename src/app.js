import {
  createTask,
  addTask,
  toggleStatus,
  deleteTask,
  clearDone,
  filterTasks
} from "./taskStore.js";

const STORAGE_KEY = "taskboard.tasks";

const els = {
  form: document.getElementById("taskForm"),
  title: document.getElementById("title"),
  priority: document.getElementById("priority"),
  dueDate: document.getElementById("dueDate"),
  error: document.getElementById("formError"),
  list: document.getElementById("taskList"),
  stats: document.getElementById("stats"),
  search: document.getElementById("search"),
  statusFilter: document.getElementById("statusFilter"),
  clearDone: document.getElementById("clearDone")
};

let tasks = loadTasks();

render();

els.form.addEventListener("submit", (e) => {
  e.preventDefault();
  els.error.textContent = "";

  const res = createTask({
    title: els.title.value,
    priority: els.priority.value,
    dueDate: els.dueDate.value
  });

  if (!res.ok) {
    els.error.textContent = res.error;
    return;
  }

  tasks = addTask(tasks, res.task);
  saveTasks(tasks);

  els.form.reset();
  els.priority.value = "medium";
  render();
});

els.search.addEventListener("input", render);
els.statusFilter.addEventListener("change", render);

els.clearDone.addEventListener("click", () => {
  tasks = clearDone(tasks);
  saveTasks(tasks);
  render();
});

function render() {
  const visible = filterTasks(tasks, {
    q: els.search.value,
    status: els.statusFilter.value
  });

  els.list.innerHTML = "";

  for (const t of visible) {
    const li = document.createElement("li");
    li.className = `item ${t.status === "done" ? "done" : ""}`;

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = t.status === "done";
    cb.addEventListener("change", () => {
      tasks = toggleStatus(tasks, t.id);
      saveTasks(tasks);
      render();
    });

    const info = document.createElement("div");
    const title = document.createElement("p");
    title.className = "title";
    title.textContent = t.title;

    const meta = document.createElement("p");
    meta.className = "meta";
    const due = t.dueDate ? `Scadență: ${t.dueDate}` : "Fără scadență";
    meta.textContent = `${due} • Creat: ${new Date(t.createdAt).toLocaleString()}`;

    info.appendChild(title);
    info.appendChild(meta);

    const right = document.createElement("div");
    right.className = "actions";

    const badge = document.createElement("span");
    badge.className = `badge ${t.priority}`;
    badge.textContent = `Priority: ${t.priority}`;

    const del = document.createElement("button");
    del.className = "danger";
    del.type = "button";
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      tasks = deleteTask(tasks, t.id);
      saveTasks(tasks);
      render();
    });

    right.appendChild(badge);
    right.appendChild(del);

    li.appendChild(cb);
    li.appendChild(info);
    li.appendChild(right);

    els.list.appendChild(li);
  }

  const total = tasks.length;
  const done = tasks.filter(t => t.status === "done").length;
  els.stats.textContent = `Total: ${total} • Done: ${done} • Open: ${total - done}`;
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTasks(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}