import { test, expect } from "../fixtures/todo-fixture";
import { STORAGE_STATE_PATH } from "../playwright.config";

test.use({ storageState: STORAGE_STATE_PATH });

test.describe("Perform Todo page tests", () => {
  test("should have a title", async ({ todoPage }) => {
    await todoPage.goto();
    expect(await todoPage.isListTitleVisible()).toBe(true);
  });

  test("should be able to add 'todo's", async ({ todoPage }) => {
    await todoPage.goto();
    await todoPage.addTodo("Test-Todo");
    expect(await todoPage.getTodos()).toContain("Test-Todo");
  });

  test("should be able to delete 'todo's", async ({ todoPage }) => {
    await todoPage.goto();
    await todoPage.deleteTodo("Test-Todo");
    expect(await todoPage.getTodos()).not.toContain("Test-Todo");
  });
});
