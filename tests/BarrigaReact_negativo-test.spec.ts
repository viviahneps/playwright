///Testes negativos do site Barriga React com playwright
import { test, expect } from '@playwright/test';
import { describe } from 'node:test';
import { isDate } from 'util/types';
import Barrigapage from './ui-pom/Barrigapage';
import Barriga_Extrato from './ui-pom/Barriga_Extrato';
import Barriga_Movimentacao from './ui-pom/Barriga_Movimentacao';
import Barriga_Conta from './ui-pom/Barriga_Conta';
import Barriga_Cadastro from './ui-pom/Barriga_Cadastro';



test.describe('Barriga React - Testes Negativo', () => {
    
  let positivo: Barrigapage;
  let extrato: Barriga_Extrato;
  let movimento: Barriga_Movimentacao;
  let conta : Barriga_Conta;
  let cadastro: Barriga_Cadastro;

   

  test.beforeEach('Setup- Start',async ({page}, testInfo)=>{
    console.log(`Rodando: ${testInfo.title}`);
    extrato = new Barriga_Extrato(page);
    movimento= new Barriga_Movimentacao(page);
    conta= new Barriga_Conta(page);
    cadastro= new Barriga_Cadastro(page);
    positivo = new Barrigapage(page);
    
  });

  test.afterEach('Setup -OFF', async ({page})=>{
   await page.close();
  });
  
  test('Efetuar cadastro de usuario vazio', async ({ page }) => {
    await cadastro.preenche_cadastro_vazio();
    const mensagem =page.locator('.toast-message').nth(0);
    await expect(mensagem).toHaveText("Erro: Error: Request failed with status code 500");
    await page.screenshot( {fullPage:true, path:`evidencia/cadastro_vazio.png`});
  });
  
  test('Efetuar cadastro de usuario - nome vazio', async ({ page }) => {
    await cadastro.preenche_cadastro_neg(" ","with-student@em00lc11h.mailosaur.net", "1234");
    const mensagem =page.locator('.toast-message').nth(0);
    await expect(mensagem).toHaveText("Erro: Error: Request failed with status code 500");
    await page.screenshot( {fullPage:true, path:`evidencia/cadastro_nome_vazio.png`});
  });

  test('Efetuar cadastro de usuario - email vazio', async ({ page }) => {
    await cadastro.preenche_cadastro_neg("TestePlaywright"," ", "1234");
    const mensagem =page.locator('.toast-message').nth(0);
    await expect(mensagem).toHaveText("Erro: Error: Request failed with status code 500");
    await page.screenshot( {fullPage:true, path:`evidencia/cadastro_email_vazio.png`});
  });

  test('Efetuar cadastro de usuario - senha vazio', async ({ page }) => {
    await cadastro.preenche_cadastro_neg("TestePlaywright","with-student@em00lc11h.mailosaur.net", " ");
    const mensagem =page.locator('.toast-message').nth(0);
    await expect(mensagem).toHaveText("Erro: Error: Request failed with status code 500");
    await page.screenshot( {fullPage:true, path:`evidencia/cadastro_senha_vazio.png`});
  });
  
  test('Efetuar cadastro de usuario dupicado', async ({ page }) => {
    await cadastro.preenche_cadastro_neg("Teste_PlayWgth","with-student@em00lc11h.mailosaur.net", "1234");
    const mensagem =page.locator('.toast-message').nth(0);
    await expect(mensagem).toHaveText("Erro: Error: Request failed with status code 500");
    await page.screenshot( {fullPage:true, path:`evidencia/cadastro_duplicado.png`});
  });

  test('Efetuar login com dados vazio', async ({ page }) => { 
  await positivo.logon_negativo(" "," ");
  const mensagem =page.locator('.toast-message');
  await expect(mensagem).toHaveText("Erro: Error: Request failed with status code 400");
  await page.screenshot({path:`evidencia/login_vazio.png`}); 
  });

  test('Efetuar login com usuario vazio', async ({ page }) => { 
      await positivo.logon_negativo("  ","2233");
      await page.waitForTimeout(3000);
      const mensagem =page.locator('.toast-message');   
      await expect(mensagem).toHaveText("Erro: Error: Request failed with status code 400");
      await page.screenshot({path:`evidencia/login_usuario_vazio.png`}); 
  });

  test('Efetuar login com senha vazia', async ({ page }) => { 
    await positivo.logon_negativo("with-student@em00lc9h.mailosaur.net"," ");
    await page.waitForTimeout(3000);
    const mensagem =page.locator('.toast-message');
    await expect(mensagem).toHaveText("Erro: Error: Request failed with status code 401");
    await page.screenshot({path:`evidencia/login_senha_vazio.png`}); 
  });
   
  test('Efetuar login com usuario incorreto', async ({ page }) => { 
    await positivo.logon_negativo("with-student@em00l ","2233");
    await page.waitForTimeout(3000);
    const mensagem =page.locator('.toast-message');
    await expect(mensagem).toHaveText("Erro: Error: Request failed with status code 400");
    await page.screenshot({path:`evidencia/login_usuario_incorreto.png`}); 
  });

  test('Efetuar login com usuário não cadastrado', async ({ page }) => { 
    await positivo.logon_negativo("with-student@em205h.mailosaur.net"," 1234");
    await page.waitForTimeout(3000);
    const mensagem =page.locator('.toast-message');
    await expect(mensagem).toHaveText("Erro: Error: Request failed with status code 400");
    await page.screenshot({path:`evidencia/login_usuario_naocad.png`}); 
  });

  test('Efetuar cadastro de movimento-vazio', async ({ page }) => { 
    await positivo.logon_negativo("with-student@em00lc11h.mailosaur.net", "1234");
    await positivo.reset();
    await page.waitForTimeout(3000);
    await movimento.preenche_movimento_vazio();
    await page.waitForTimeout(3000);
    const mensagem =page.locator('.toast-message').nth(0);
    await expect(mensagem).toHaveText("Erro: Error: Request failed with status code 400");
    await page.screenshot({path:`evidencia/mov_vazio.png`});; 
  });
    
  test('Efetuar cadastro de movimento - Valor vazio', async ({ page }) => { 
    await positivo.logon_negativo("with-student@em00lc11h.mailosaur.net", "1234");
    await positivo.reset();
    await movimento.preenche_movimento('2024-01-23','2024-01-23', "Conta Playwright_PAGO"," ","Playwright Barriga", 'Conta para movimentacoes', true);
    await expect(page).toHaveURL('https://barrigareact.wcaquino.me/movimentacao');
    await page.waitForTimeout(3000);
    const mensagem =page.locator('.toast-message').nth(0);
    await expect(mensagem).toHaveText("Erro: Error: Request failed with status code 400");
    await page.screenshot({path:`evidencia/mov_valor_vazio.png`});; 
  }); 

  test('Efetuar cadastro de movimento - Descrição vazio', async ({ page }) => { 
    await positivo.logon_negativo("with-student@em00lc11h.mailosaur.net", "1234");
    await positivo.reset();
    await movimento.preenche_movimento('2024-01-23','2024-01-23', "Conta Playwright_PAGO","300,05 ","Playwright Barriga", 'Conta para movimentacoes', true);
    await expect (page).toHaveURL('https://barrigareact.wcaquino.me/movimentacao');
    await page.waitForTimeout(3000);
    const mensagem =page.locator('.toast-message').nth(0);
    await expect(mensagem).toHaveText("Erro: Error: Request failed with status code 400");
    await page.screenshot({path:`evidencia/mov_descricao_vazio.png`});; 
  }); 

  test('Efetuar cadastro de movimento - Interessado vazio', async ({ page }) => { 
    await positivo.logon_negativo("with-student@em00lc11h.mailosaur.net", "1234");
    await positivo.reset();
    await page.waitForTimeout(3000);
    await movimento.preenche_movimento('2024-01-23','2024-01-23', " ","300,05 ","Playwright Barriga", 'Conta para movimentacoes', true);
    await expect (page).toHaveURL('https://barrigareact.wcaquino.me/movimentacao');
    await page.waitForTimeout(3000);
    const mensagem =page.locator('.toast-message').nth(0);
    await expect(mensagem).toHaveText("Erro: Error: Request failed with status code 400");
    await page.screenshot({path:`evidencia/mov_interessado_vazio.png`});; 
  }); 

  test('Efetuar cadastro de conta vazio', async ({ page }) => {
    await positivo.logon_negativo("with-student@em00lc11h.mailosaur.net", "1234");
    await positivo.reset();
    await conta.preenche_conta_vazio();
    const mensagem =page.locator('.toast-message').nth(0);
    await expect(mensagem).toHaveText("Erro: Error: Request failed with status code 400");
    await page.screenshot( {fullPage:true, path:`evidencia/conta_vazio_msg.png`});
  });


});