import { test, expect, request } from "../fixtures/todo-fixture";

const TEST_TODO_PREFIX = "Test-Todo";

test.describe("Perform Todo page tests", () => {
  test("should have a title", async ({ todoPage }) => {
    await todoPage.goto();
    expect(await todoPage.isListTitleVisible()).toBe(true);
  });

  test("should be able to add 'todo's", async ({ todoPage }) => {
    await todoPage.goto();
    await todoPage.addTodo("Test-Todo");
    // wait for network idle to ensure all todos are loaded
    await todoPage.page.waitForLoadState("networkidle");
    expect(await todoPage.getTodos()).toContain("Test-Todo");

    // clean up after test
    await todoPage.deleteTodo("Test-Todo");
  });

  test("should be able to delete 'todo's", async ({ todoPage }) => {
    await todoPage.goto();

    await todoPage.addTodo("Test-Todo");
    await todoPage.page.waitForLoadState("networkidle");

    await todoPage.deleteTodo("Test-Todo");
    await todoPage.page.waitForLoadState("networkidle");

    // wait for the todo to be deleted
    await todoPage.page.waitForTimeout(3000);

    expect(await todoPage.getTodos()).not.toContain("Test-Todo");
  });

  test("should be able to edit 'todo's", async ({ todoPage }) => {
    await todoPage.goto();

    await todoPage.addTodo("Test-Todo-Edit");
    await todoPage.page.waitForLoadState("networkidle");

    await todoPage.editTodo("Test-Todo-Edit", "Test-Todo-Edited");
    await todoPage.page.waitForLoadState("networkidle");

    expect(await todoPage.getTodos()).toContain("Test-Todo-Edited");

    // clean up after test
    await todoPage.deleteTodo("Test-Todo-Edited");
  });

  test("should not allow adding empty 'todo's", async ({ todoPage }) => {
    await todoPage.goto();
    await todoPage.addTodo(""); // Attempt to add an empty todo
    // Verify that the todo list does not contain an empty todo
    expect(await todoPage.getTodos()).not.toContain("");
    expect(await todoPage.isEmptyTodoValidationVisible()).toBe(true);

  });

  test("should not allow editing to empty 'todo's", async ({ todoPage }) => {
    await todoPage.goto();
    await todoPage.addTodo("Test-Todo-Edit-Empty");
    await todoPage.page.waitForLoadState("networkidle");

    // Attempt to edit to an empty todo
    await todoPage.editTodo("Test-Todo-Edit-Empty", "");
    await todoPage.page.waitForLoadState("networkidle");

    // wait for the todo to be deleted
    await todoPage.page.waitForTimeout(3000);

    // Verify that the todo list still contains the original text
    expect(await todoPage.getTodos()).toContain("Test-Todo-Edit-Empty");

    // Clean up after test
    await todoPage.deleteTodo("Test-Todo-Edit-Empty");
  });

  test("should add a todo and clean up via API", async ({ todoPage }) => {
    const todoText = `${TEST_TODO_PREFIX}-Cleanup`;
    await todoPage.goto();
    await todoPage.addTodo(todoText);
    await todoPage.page.waitForLoadState("networkidle");
    expect(await todoPage.getTodos()).toContain(todoText);
    // No need for manual cleanup here; afterEach will handle it
  });

  test("should logout successfully", async ({ todoPage }) => {
    await todoPage.goto();
    await todoPage.logout();
    // Verify that the user is redirected to the login page or home page
    expect(await todoPage.page.url()).toContain("/login");
  });
});
