// import { test as setup } from '@playwright/test';
import { test as setup, expect } from "../fixtures/page-fixtures";

// import { LoginPage } from '../pages/login-page';
// import { STORAGE_STATE_PATH } from '../playwright.config';
// import path from 'path';

setup('Login setup', async ({ loginPage }) => {
    // const loginPage = new LoginPage(page);
    // Navigate to the login page and perform login
    // await loginPage.goto();
    // await loginPage.login(process.env.EMAIL || '', process.env.PASSWD || '');

    // Save the storage state after login
    // await loginPage.context.storageState({ path: STORAGE_STATE_PATH });
});
