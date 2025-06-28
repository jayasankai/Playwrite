import { test as base } from "@playwright/test";
import { TodoPage } from "../pages/todo-page";

export const test = base.extend<{
  todoPage: TodoPage;
}>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await use(todoPage);
  },
});

export { expect } from "@playwright/test";
export { request } from "@playwright/test";
