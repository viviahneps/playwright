import { test, expect } from '@playwright/test';



test('Barriga - Cadastro', async ({ page }) => {
    await page.goto('https://barrigareact.wcaquino.me');
    await page.getByText('Registrar').click();
    await page.getByPlaceholder('Nome').pressSequentially("Teste_PlayWrigth");
    await page.getByPlaceholder('Email').pressSequentially("with-student@em00lc11h.mailosaur.net");
    await page.getByPlaceholder('Senha').pressSequentially("1234");
    await page.getByRole('button').getByText('Registrar').click();
    const mensagem =page.locator('.toast-message');
    await expect(mensagem).toHaveText("Usuário adicionado com sucesso");
});

test.only('Barriga - Login ', async ({ page }) => {
    await page.goto('https://barrigareact.wcaquino.me');
    await expect(page).toHaveURL('https://barrigareact.wcaquino.me/login');
    await page.getByTestId('email').pressSequentially("with-student@em00lc11h.mailosaur.net");
    await page.getByTestId('passwd').pressSequentially("1234");
    await page.getByRole('button').getByText('Entrar').click();
    const mensagem =page.locator('.toast-message');
    await expect(mensagem).toHaveText("Bem vindo, Teste_PlayWgth!");
    
});