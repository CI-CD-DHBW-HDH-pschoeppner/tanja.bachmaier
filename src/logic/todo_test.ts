import { formatTodo, generateColor, todoList } from "./todo";

// test the formatTodo function
describe("formatTodo", () => {
  it("capitalizes the first letter of the todo value", () => {
    const todo = { id: "1", value: "test", done: false };
    const formatted = formatTodo(todo);
    expect(formatted).toEqual({ id: "1", value: "Test", done: false });
  });

  it("does not change the ID or done properties", () => {
    const todo = { id: "2", value: "another test", done: true };
    const formatted = formatTodo(todo);
    expect(formatted).toEqual({ id: "2", value: "Another test", done: true });
  });
});

// test the generateColor function
describe("generateColor", () => {
  it('returns a string in the format "rgb(r, g, b)"', () => {
    const color = generateColor();
    expect(color).toMatch(/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/);
  });

  it("returns a string with values between 50 and 150", () => {
    const color = generateColor();
    const match = color.match(/\d{1,3}/g);
    expect(match).not.toBeNull();
    expect(
      match?.every((val) => parseInt(val) >= 50 && parseInt(val) <= 150)
    ).toBe(true);
  });
});

// test the todoList writable store
describe("todoList", () => {
  it("starts with an empty array", () => {
    expect(todoList).toEqual([]);
  });

  it("can add new todo items", () => {
    const store = todoList;
    // no way to fix with esLint
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
    store.update((todos: any) => [
      ...todos,
      { id: "1", value: "test", done: false },
    ]);
    expect(todoList).toEqual([{ id: "1", value: "test", done: false }]);
  });

  it("can update the done property of a todo item", () => {
    const store = todoList;
    store.update((todos) =>
      todos.map((todo) => (todo.id === "1" ? { ...todo, done: true } : todo))
    );
    expect(todoList).toEqual([{ id: "1", value: "test", done: true }]);
  });

  it("can remove a todo item", () => {
    const store = todoList;
    store.update((todos) => todos.filter((todo) => todo.id !== "1"));
    expect(todoList).toEqual([]);
  });
});
