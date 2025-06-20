import { test as setup, expect } from "../fixtures/login-fixture";
import { STORAGE_STATE_PATH } from '../playwright.config';

setup('Login setup', async ({ loginPage }) => {
    expect(await loginPage.isLoggedIn()).toBe(true);

    // Save the storage state after login
    await loginPage.context.storageState({ path: STORAGE_STATE_PATH });
});
