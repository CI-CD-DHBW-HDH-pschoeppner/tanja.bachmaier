import { formatTodo, generateColor } from "./todo";

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

  it("does not return the same value twice" , () => {
    const color1 = generateColor();
    const color2 = generateColor();
    expect(color1 != color2);
  });
});
