//Testes positivos do site Barriga React Francisco Aquino com playwright

import { test, expect } from '@playwright/test';
import { describe } from 'node:test';
import { isDate } from 'util/types';
import Barrigapage from './ui-pom/Barrigapage';
import Barriga_Extrato from './ui-pom/Barriga_Extrato';
import Barriga_Movimentacao from './ui-pom/Barriga_Movimentacao';
import Barriga_Conta from './ui-pom/Barriga_Conta';
import Barriga_Cadastro from './ui-pom/Barriga_Cadastro';
import { randomInt } from 'crypto';


test.describe('Barriga React - Testes Positivo', () => {
    
  let barriga : Barrigapage;
  let extrato: Barriga_Extrato;
  let movimento: Barriga_Movimentacao;
  let conta : Barriga_Conta;
  let cadastro: Barriga_Cadastro;


  test.beforeEach('Inicializacao',async ({page}, testInfo)=>{
    console.log(`Rodando: ${testInfo.title}`);
    barriga = new Barrigapage (page);
    extrato = new Barriga_Extrato(page);
    movimento= new Barriga_Movimentacao(page);
    conta= new Barriga_Conta(page);
    cadastro= new Barriga_Cadastro(page);
 
    barriga.logon("with-student@em00lc11h.mailosaur.net", "1234");
  });

  test.afterEach('Finalizacao', async ({page})=>{
     await page.close();
  });

  test('Efetuar cadastro de Usuário', async ({ page }) => {
   
    cadastro.preenche_cadastro();
    const mensagem =page.locator('.toast-message');
    await expect(mensagem).toHaveText("Usuário adicionado com sucesso");
    await page.screenshot({path:`cadastro_msg.png`}); 
  });

  test('Efetuar cadastro de Movimento Pago ', async ({ page }) => {
    await barriga.reset();
    await expect (page).toHaveURL('https://barrigareact.wcaquino.me/movimentacao');
    await movimento.preenche_movimento('2024-01-02','2024-01-12', "Conta Playwright_PAGO","300,01","Playwright Barriga", 'Conta para movimentacoes', true);
    const mensagem =page.locator('.toast-message').nth(0);
    await expect(mensagem).toHaveText("Movimentação inserida com sucesso!");
    await page.screenshot({path:`Screen/mov_PAG_msg.png`});
  });

  test ('Efetuar cadastro de Movimento Pendente ', async ({ page }) => {
    await barriga.reset();
    await movimento.preenche_movimento('2024-01-02','2024-01-12',"Conta Playwright_PENDENTE","300,01","Playwright Barriga", 'Conta para movimentacoes', false);
    await expect(page).toHaveURL('https://barrigareact.wcaquino.me/movimentacao');
    const mensagem =page.locator('.toast-message').nth(0);
    await expect(mensagem).toHaveText("Movimentação inserida com sucesso!");
    await page.screenshot({path:`Screen/mov_PEN_msg.png`});
  });
  
  test('Valida Movimento de Conta', async ({ page }) => {
     await extrato.busca_movimento("Conta Playwright_PAGO");
  });

  test('Efetuar edição de movimento de conta', async ({ page }) => {
    await extrato.edita_dados_mov(2,"movimento editado","300,03");
    const mensagem =page.locator('.toast-message');
    await expect(mensagem).toHaveText("Movimentação alterada com sucesso!");
    await page.screenshot( {fullPage:true, path:`Screen/mov_edt_msg.png`});
  });

  test('Efetuar edição de movimento de conta - Status', async ({ page }) => {
    await barriga.reset();
    await page.waitForTimeout(3000);
    await extrato.edita_status_mov();
    const mensagem =page.locator('.toast-message').nth(0);
    await expect(mensagem).toHaveText("Movimentação alterada com sucesso!");
    await page.screenshot( {fullPage:true, path:`Screen/mov_edt_status_msg.png`});
  });

  test('Efetuar exclusão de movimento', async ({ page }) => {
    await barriga.reset(); 
    await page.waitForTimeout(3000);
    await extrato.exclui_mov();
    const mensagem =page.locator('.toast-message');
    await expect(mensagem).toHaveText("Movimentação removida com sucesso!");
    await page.screenshot({fullPage:true , path:`Screen/excl_mov_msg.png`});
  });

  test('Efetuar edição de conta', async ({ page }) => {
    await barriga.reset();
    const mensagem =page.locator('.toast-message').nth(0);
    await expect(mensagem).toHaveText("Conta atualizada com sucesso!");
    await page.screenshot( {fullPage:true, path:`Screen/conta_edit_msg.png`});
  });

  test('Efetuar exclusão de conta', async ({ page }) => {
    await barriga.reset();
    const mensagem =page.locator('.toast-message').nth(0);
    await expect(mensagem).toHaveText("Conta excluída com sucesso!");
    await page.screenshot( {fullPage:true, path:`Screen/conta_excl_msg.png`});
  });

});