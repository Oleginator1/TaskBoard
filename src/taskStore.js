export function createTask({ title, priority = "medium", dueDate = "" }) {
  const cleanTitle = String(title ?? "").trim();
  if (cleanTitle.length < 2) {
    return { ok: false, error: "Titlul trebuie să aibă minim 2 caractere." };
  }
  const p = ["low", "medium", "high"].includes(priority) ? priority : "medium";

  return {
    ok: true,
    task: {
      id: cryptoLikeId(),
      title: cleanTitle,
      priority: p,
      dueDate: dueDate || "",
      status: "open",
      createdAt: new Date().toISOString()
    }
  };
}

export function addTask(tasks, task) {
  return [task, ...tasks];
}

export function toggleStatus(tasks, id) {
  return tasks.map(t =>
    t.id === id ? { ...t, status: t.status === "done" ? "open" : "done" } : t
  );
}

export function deleteTask(tasks, id) {
  return tasks.filter(t => t.id !== id);
}

export function clearDone(tasks) {
  return tasks.filter(t => t.status !== "done");
}

export function filterTasks(tasks, { q = "", status = "all" } = {}) {
  const query = String(q).trim().toLowerCase();
  return tasks.filter(t => {
    const matchQ = query === "" || t.title.toLowerCase().includes(query);
    const matchStatus =
      status === "all" ? true : (status === "done" ? t.status === "done" : t.status === "open");
    return matchQ && matchStatus;
  });
}

function cryptoLikeId() {
  // ID suficient pentru proiect educațional (nu securitate)
  const rnd = Math.random().toString(16).slice(2);
  const ts = Date.now().toString(16);
  return `t_${ts}_${rnd}`;
}