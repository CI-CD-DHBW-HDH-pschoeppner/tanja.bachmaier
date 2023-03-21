import { writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";

export class TodoItem {
  id = "";
  value = "";
  done = false;
}

// this function must return a unique ID every time it is called
export function generateID(): string {
  return uuidv4();
}

// make sure, that
// the value isn't longer than 255 characters
// the value isn' empty
// the todo isn't contained in the todos array (case insensitive)
export function validateTodo(todo: TodoItem, todos: TodoItem[]): boolean {
  const maxChar = 255;

  if (!todo.value.trim() || todo.value.length > maxChar) {
    return false;
  }

  // Check if todo is contained in todos array (case-insensitive)
  const todoValue = todo.value.toLowerCase();
  const isDuplicate = todos.some(
    (existingTodo) => existingTodo.value.toLowerCase() === todoValue
  );
  if (isDuplicate) {
    return false;
  }

  // If all validation checks pass, return true
  return true;
}

// capitalize the first letter of the todo
export function formatTodo(todo: TodoItem): TodoItem {
  //get the value of the todo and set the first letter (index 0) to upper case
  const capitalizedValue =
    todo.value.charAt(0).toUpperCase() + todo.value.slice(1);
  return {
    id: todo.id,
    value: capitalizedValue,
    done: todo.done,
  };
}

// generate a random rgb color
// each value (r,g,b) is between 50 and 150
export function generateColor(): string {
  const min = 50;
  const max = 150;
  //three random values for red, green, blue
  const r = Math.floor(Math.random() * (max - min + 1) + min);
  const g = Math.floor(Math.random() * (max - min + 1) + min);
  const b = Math.floor(Math.random() * (max - min + 1) + min);
  return `rgb(${r}, ${g}, ${b})`;
}

export const todoList = writable<TodoItem[]>([]);
