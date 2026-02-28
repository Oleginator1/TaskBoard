import { describe, it, expect } from "vitest";
import {
  createTask,
  addTask,
  toggleStatus,
  deleteTask,
  clearDone,
  filterTasks
} from "../src/taskStore.js";

describe("taskStore", () => {
  it("createTask validează titlul", () => {
    const r1 = createTask({ title: " " });
    expect(r1.ok).toBe(false);

    const r2 = createTask({ title: "Ab" });
    expect(r2.ok).toBe(true);
    expect(r2.task.title).toBe("Ab");
  });

  it("addTask adaugă la început", () => {
    const t1 = createTask({ title: "T1" }).task;
    const t2 = createTask({ title: "T2" }).task;
    const list = addTask([t1], t2);
    expect(list[0].id).toBe(t2.id);
  });

  it("toggleStatus schimbă open <-> done", () => {
    const t = createTask({ title: "X" }).task;
    let list = [t];
    list = toggleStatus(list, t.id);
    expect(list[0].status).toBe("done");
    list = toggleStatus(list, t.id);
    expect(list[0].status).toBe("open");
  });

  it("deleteTask șterge după id", () => {
    const a = createTask({ title: "A" }).task;
    const b = createTask({ title: "B" }).task;
    const list = deleteTask([a, b], a.id);
    expect(list.length).toBe(1);
    expect(list[0].id).toBe(b.id);
  });

  it("clearDone elimină taskurile done", () => {
    const a = { ...createTask({ title: "A" }).task, status: "done" };
    const b = { ...createTask({ title: "B" }).task, status: "open" };
    const list = clearDone([a, b]);
    expect(list.length).toBe(1);
    expect(list[0].status).toBe("open");
  });

  it("filterTasks filtrează după text și status", () => {
    const a = { ...createTask({ title: "Buy milk" }).task, status: "open" };
    const b = { ...createTask({ title: "Do homework" }).task, status: "done" };
    const all = [a, b];

    const q1 = filterTasks(all, { q: "buy", status: "all" });
    expect(q1.length).toBe(1);

    const q2 = filterTasks(all, { q: "", status: "done" });
    expect(q2.length).toBe(1);
    expect(q2[0].status).toBe("done");
  });
});