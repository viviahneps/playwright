///Testes positivos do site Barriga React Francisco Aquino com playwright
import { test, expect } from '@playwright/test';
import { describe } from 'node:test';
import { isDate } from 'util/types';
import Barrigapage from './ui-pom/Barrigapage';


test.describe('Automação Barriga React - Positivo', () => {
    
  let barriga : Barrigapage;
  
   
// Verificar se login com a conta cadastrada é efetuado com sucesso na aplicação Barriga
 test.beforeEach('Inicializacao',async ({page}, testInfo)=>{
    console.log(`Rodando: ${testInfo.title}`);
     
        barriga = new Barrigapage (page);
        barriga.logon("with-student@em00lc11h.mailosaur.net", "1234");
       
     });

  test.afterEach('Finalizacao', async ({page})=>{
     await page.close();
     });

 
// Verificar se cadastro de usuário é efetuado com sucesso na aplicação Barriga
  test.skip('Efetuar cadastro com sucesso ', async ({ page }) => {
    await page.getByText('Registrar').click();
    await page.getByPlaceholder('Nome').pressSequentially("Teste_PlayWrigth");
    await page.getByPlaceholder('Email').pressSequentially("with-student@em00lc11h.mailosaur.net");
    await page.getByPlaceholder('Senha').pressSequentially("1234");
    await page.getByRole('button').getByText('Registrar').click();
    const mensagem =page.locator('.toast-message');
    await expect(mensagem).toHaveText("Usuário adicionado com sucesso");
    await page.screenshot({path:`cadastro.png`});
   });


  // Verificar se movimentação -PAGA de conta é inserida com sucesso na aplicação Barriga
   test('Efetuar cadastro de Movimento - Pago ', async ({ page }) => {

    await barriga.reset();
    await page.getByTitle('Cadastrar movimentação').click();
    await expect(page).toHaveURL('https://barrigareact.wcaquino.me/movimentacao');
    await page.getByTestId('data-transacao').fill('2024-01-02');
    await page.getByTestId('data-pagamento').fill('2024-01-12');
    await page.getByPlaceholder('Descrição...').pressSequentially("Conta Playwright_PAGO");
    await page.getByPlaceholder('Valor').pressSequentially("300,01");
    await page.getByPlaceholder('Interessado...').pressSequentially("Playwright Barriga");
    await page.getByTestId('conta').selectOption('Conta para movimentacoes');
    await page.getByTestId('status').click();
    await page.screenshot({path:`Screen/Mov_PAG_1.png`});
    await page.getByRole('button').getByText('Salvar').click();
    const msg =page.locator('.toast-message').nth(0);
    await expect(msg).toHaveText("Movimentação inserida com sucesso!");
    await page.screenshot({path:`Screen/Mov_PAG_2.png`});

   });


   // Verificar se movimentação -PENDENTE de conta é inserida com sucesso na aplicação Barriga
   test('Efetuar cadastro de Movimento - Pendente ', async ({ page }) => {
    await barriga.reset();
    await page.getByTitle('Cadastrar movimentação').click();
    await expect(page).toHaveURL('https://barrigareact.wcaquino.me/movimentacao');
    await page.getByTestId('data-transacao').fill('2024-01-02');
    await page.getByTestId('data-pagamento').fill('2024-01-13');
    await page.getByPlaceholder('Descrição...').pressSequentially("Conta Playwright_PENDENTE");
    await page.getByPlaceholder('Valor').pressSequentially("300,02");
    await page.getByPlaceholder('Interessado...').pressSequentially("Playwright Barriga");
    await page.getByTestId('conta').selectOption('Conta para movimentacoes');
    await page.screenshot({path:`Screen/Mov_PEN_1.png`});
    await page.getByRole('button').getByText('Salvar').click();
    const msg =page.locator('.toast-message').nth(0);
    await expect(msg).toHaveText("Movimentação inserida com sucesso!");
    await page.screenshot({path:`Screen/Mov_PEN_2.png`});
    await page.close();
   });

  //  Verificar se movimentação de conta é exibida no extrato com sucesso na aplicação Barriga 
   test('Valida Movimentação Pago', async ({ page }) => {
    await page.getByTestId('menu-extrato').click();
    await expect(page).toHaveURL('https://barrigareact.wcaquino.me/extrato');
    await page.waitForTimeout(2000);
    var dados=page.getByTestId('mov-row').getByText("Conta Playwright_PAGO");
    await expect(dados).toHaveText("Conta Playwright_PAGO");
    await page.screenshot( {fullPage:true, path:`Screen/extrato.png`});
    });

  //  Verificar se movimentação de conta é editada com sucesso na aplicação Barriga 
   test('Efetua edição de movimento', async ({ page }) => {
    await page.getByTestId('menu-extrato').click();
    await expect(page).toHaveURL('https://barrigareact.wcaquino.me/extrato');
    await page.locator(`//*[@id="root"]/div/div/div[2]/div[2]/li[6]/div/div[2]/a[1]/i`).click();
    await page.waitForTimeout(3000);
    await page.getByPlaceholder('Descrição...').clear();
    await page.getByPlaceholder('Descrição...').pressSequentially("Conta Playwright_Editada");
    await page.getByPlaceholder('Valor').clear();
    await page.getByPlaceholder('Valor').pressSequentially("300,03");
    await page.waitForTimeout(3000);
    await page.screenshot({path:`Screen/Mov_edt_1.png`});
    await page.getByRole('button').getByText('Salvar').click();
    const msg =page.locator('.toast-message');
    await expect(msg).toHaveText("Movimentação alterada com sucesso!");
    await page.screenshot( {fullPage:true, path:`Screen/mov_edt2.png`});
    });


   //  Verificar se movimentação de conta é excluida com sucesso na aplicação Barriga 
   test('Efetua exclusão de movimento', async ({ page }) => {
    await barriga.reset();
    await page.getByTestId('menu-extrato').click();
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL('https://barrigareact.wcaquino.me/extrato');
    await page.locator(`//*[@id="root"]/div/div/div[2]/div[2]/li[3]/div/div[2]/a[2]/i`).click();
    await page.screenshot( {fullPage:true, path:`Screen/mov_excl.png`});
    const msg =page.locator('.toast-message').nth(0);
    await expect(msg).toHaveText("Movimentação removida com sucesso!");
    await page.screenshot( {fullPage:true, path:`Screen/mov_exc2.png`});
    });

   //  Verificar alteração de conta 
    test.only('Efetua edição de conta', async ({ page }) => {
      await barriga.reset();
      await page.getByTestId("menu-settings").click();
      page.getByRole('link').getByText('Contas').click();
      await page.locator(`//*[@id="root"]/div/div/div[2]/table/tbody/tr[1]/td[2]/a[1]/i`).click();
      await page.getByPlaceholder("Conta...").pressSequentially('editada');
      await page.getByAltText('Salvar').click();
      const msg =page.locator('.toast-message').nth(0);
      await expect(msg).toHaveText("Conta atualizada com sucesso!");
      await page.screenshot( {fullPage:true, path:`Screen/conta_edit_2.png`});
      });

});