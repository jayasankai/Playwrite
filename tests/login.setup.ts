import { test as setup } from '@playwright/test';
import {STORAGE_STATE_PATH} from '../playwright.config';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env') });

setup('Login setup', async ({ page }) => {
    await page.goto('');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill(process.env.USERNAME || '');
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env.PASSWD || '');
    await page.getByRole('button', { name: 'Log in' }).click();

    await page.context().storageState({ path: STORAGE_STATE_PATH });
});