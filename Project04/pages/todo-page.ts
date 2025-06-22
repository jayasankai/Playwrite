import type { Page, Locator } from "@playwright/test";

export class TodoPage {
  private readonly todoListTitle: Locator;
  private readonly todoInput: Locator;
  private readonly addButton: Locator;
  private readonly todoList: Locator;
  private readonly saveButton: Locator;

  private readonly logoutButton: Locator;

  constructor(public readonly page: Page) {
    this.todoListTitle = this.page.getByRole("heading", { name: "Todo List" });
    this.todoInput = this.page.getByRole("textbox", { name: "Add a new todo" });
    this.addButton = this.page.getByRole("button", { name: "Add" });
    this.todoList = this.page.getByRole("list");
    this.saveButton = this.page.getByRole("button", { name: "Save" });
    this.logoutButton = this.page.getByRole("button", { name: "Logout" });
  }

  async goto() {
    await this.page.goto("http://localhost:5173/");
    await this.page.waitForLoadState("domcontentloaded");
  }

  async isListTitleVisible(): Promise<boolean> {
    return this.todoListTitle.isVisible();
  }

  async addTodo(todoText: string) {
    await this.todoInput.fill(todoText);
    await this.addButton.click();
  }

  async editTodo(oldText: string, newText: string) {
    const todoItem = this.todoList
      .getByRole("listitem")
      .filter({ hasText: oldText });
    await todoItem.click();
    await todoItem.getByRole("button", { name: "Edit" }).click();
    await this.todoList.getByRole("textbox").fill(newText);
    await this.saveButton.click();
  }

  async deleteTodo(todoText: string) {
    // Find the list item containing the todo text
    const todoItem = this.todoList
      .locator(".todo-item")
      .filter({
        has: this.page.locator(".todo-item-content span", {
          hasText: todoText,
        }),
      })
      .first();

    // Click the delete button inside this todo item
    const deleteButton = todoItem.locator("button", { hasText: "Delete" });
    await deleteButton.click();
  }

  async getTodos(): Promise<string[]> {
    const todoSpans = await this.todoList
      .locator(".todo-item-content span")
      .all();
    const todos: string[] = [];
    for (const span of todoSpans) {
      const text = await span.textContent();
      if (text) {
        todos.push(text.trim());
      }
    }
    return todos;
  }
}
