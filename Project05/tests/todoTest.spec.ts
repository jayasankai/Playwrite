import { todo } from "node:test";
import { test, expect, request } from "../fixtures/todo-fixture";

const TEST_TODO_PREFIX = "Test-Todo";

test.describe("Perform Todo page tests", () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.goto();
    await todoPage.waitForLoad();
  });

  test.afterEach(async ({ todoPage }) => {
    // Clean up all test todos after each test
    const todos = await todoPage.getTodos();
    for (const todo of todos) {
      if (todo.startsWith(TEST_TODO_PREFIX)) {
        await todoPage.deleteTodo(todo);
        await todoPage.waitForLoad();
      }
    }
  });

  test("should have a title", async ({ todoPage }) => {
    expect(await todoPage.isListTitleVisible()).toBe(true);
  });

  test("should be able to add 'todo's", async ({ todoPage }, testInfo) => {
    const todoTextAdd = `Test-Todo-Add-${testInfo.project.name}`;
    await todoPage.addTodo(todoTextAdd);
    // wait for network idle to ensure all todos are loaded
    await todoPage.waitForLoad();
    await todoPage.page.waitForTimeout(1000);
    expect(await todoPage.getTodos()).toContain(todoTextAdd);
  });

  test("should be able to delete 'todo's", async ({ todoPage }, testInfo) => {
    const todoTextDelete = `Test-Todo-Delete-${testInfo.project.name}`;

    await todoPage.addTodo(todoTextDelete);
    await todoPage.waitForLoad();

    await todoPage.deleteTodo(todoTextDelete);
    await todoPage.waitForLoad();

    // wait for the todo to be deleted
    await todoPage.page.waitForTimeout(3000);

    expect(await todoPage.getTodos()).not.toContain(todoTextDelete);
  });

  test("should be able to edit 'todo's", async ({ todoPage }, testInfo) => {
    const todoTextEdit = `Test-Todo-Edit-${testInfo.project.name}`;
    const todoTextEdited = `Test-Todo-Edited-${testInfo.project.name}`;

    await todoPage.addTodo(todoTextEdit);
    await todoPage.waitForLoad();
    await todoPage.page.waitForTimeout(1000);

    await todoPage.editTodo(todoTextEdit, todoTextEdited);
    await todoPage.waitForLoad();
    await todoPage.page.waitForTimeout(1000);

    expect(await todoPage.getTodos()).toContain(todoTextEdited);
  });

  test("should not allow adding empty 'todo's", async ({ todoPage }) => {
    await todoPage.addTodo(""); // Attempt to add an empty todo
    // Verify that the todo list does not contain an empty todo
    expect(await todoPage.getTodos()).not.toContain("");
    expect(await todoPage.isEmptyTodoValidationVisible()).toBe(true);
  });

  test("should not allow editing to empty 'todo's", async ({
    todoPage,
  }, testInfo) => {
    const todoTextEditEmpty = `Test-Todo-Edit-Empty-${testInfo.project.name}`;

    await todoPage.addTodo(todoTextEditEmpty);
    await todoPage.waitForLoad();
    await todoPage.page.waitForTimeout(3000);

    // Attempt to edit to an empty todo
    await todoPage.editTodo(todoTextEditEmpty, "");
    await todoPage.waitForLoad();
    await todoPage.page.waitForTimeout(3000);

    await todoPage.cancelEditTodo();

    // Verify that the todo list still contains the original text
    expect(await todoPage.getTodos()).toContain(todoTextEditEmpty);
  });

  test("should logout successfully", async ({ todoPage }) => {
    await todoPage.logout();
    // Verify that the user is redirected to the login page or home page
    expect(await todoPage.page.url()).toContain("/login");
  });
});
