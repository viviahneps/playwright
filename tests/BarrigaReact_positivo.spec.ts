//Testes positivos do site Barriga React Francisco Aquino com playwright

import { test, expect } from '@playwright/test';
import { describe } from 'node:test';
import { isDate } from 'util/types';
import Barriga_Setup from './ui-pom/Barriga_Setup';
import Barriga_Extrato from './ui-pom/Barriga_Extrato';
import Barriga_Movimentacao from './ui-pom/Barriga_Movimentacao';
import Barriga_Conta from './ui-pom/Barriga_Conta';
import Barriga_Cadastro from './ui-pom/Barriga_Cadastro';

    
  let barriga : Barriga_Setup;
  let extrato: Barriga_Extrato;
  let movimento: Barriga_Movimentacao;
  let conta : Barriga_Conta;
  let cadastro: Barriga_Cadastro;


test.describe('Testes Positivo',() =>{

  test.beforeEach('Inicializacao',async ({page}, testInfo)=>{
    console.log(`Rodando: ${testInfo.title}`);
    barriga = new Barriga_Setup (page);
    extrato = new Barriga_Extrato(page);
    movimento= new Barriga_Movimentacao(page);
    conta= new Barriga_Conta(page);
    cadastro= new Barriga_Cadastro(page);
    barriga.logon("with-student@em00lc11h.mailosaur.net", "1234");
    await page.waitForTimeout(300);
  });

   test.afterEach('Finalizacao', async ({page})=>{
     await barriga.sair();
     });

   test.skip('Efetuar cadastro de Usuário', async ({page}) =>{
    cadastro.preenche_cadastro();
    await page.waitForTimeout(3000);
    const mensagem =page.locator('.toast-message');
    await expect(mensagem).toHaveText("Usuário adicionado com sucesso");
    await page.screenshot({path:`evidencia/cadastro_msg.png`}); 
   });

  test('Efetuar cadastro de Movimento Pago ', async ({ page }) => {
    await movimento.preenche_movimento("2024-01-10","2024-01-31","Conta Playwright_PAGO","300,01","Playwright Barriga", 'Conta para movimentacoes', true);
    await expect (page).toHaveURL('https://barrigareact.wcaquino.me/movimentacao');
    await page.waitForTimeout(3000);
    const mensagem =page.locator('.toast-message').nth(0);
    await expect(mensagem).toHaveText("Movimentação inserida com sucesso!");
    await page.screenshot({path:`evidencia/mov_PAG_msg.png`});
  });

  test('Efetuar cadastro de Movimento Pendente ', async ({ page }) => {
    await barriga.reset();
    await page.waitForTimeout(3000);
    await movimento.preenche_movimento("2024-01-28","2024-01-31","Conta Playwright_PENDENTE","300,02","Playwright Barriga", 'Conta para movimentacoes', false);
    await page.waitForTimeout(3000);
    const mensagem =page.locator('.toast-message').nth(0);
    await expect(mensagem).toHaveText("Movimentação inserida com sucesso!");
    await page.screenshot({path:`evidencia/mov_PEN_msg.png`});
  });
  
  test('Valida Movimento de Conta', async ({ page }) => {
     await extrato.busca_movimento("Movimentacao 3, calculo saldo");
     await page.screenshot({fullPage:true,path:`evidencia//mov_msg.png`});
  });

  test('Efetuar edição de movimento de conta', async ({ page }) => {
    await extrato.edita_dados_mov("Movimentacao de conta","movimento editado","300,03");
    const mensagem =page.locator('.toast-message').nth(0);
    await page.screenshot( {fullPage:true, path:`evidencia/mov_edt_msg_1.png`});
    await expect(mensagem).toHaveText("Movimentação alterada com sucesso!");
    await page.screenshot( {fullPage:true, path:`evidencia/mov_edt_msg.png`});
  });

  test('Efetuar edição de movimento de conta - Status', async ({ page }) => {
    await barriga.reset();
    await extrato.edita_status_mov();
    const mensagem =page.locator('.toast-message').nth(0);
    await expect(mensagem).toHaveText("Movimentação alterada com sucesso!");
    await page.screenshot( {fullPage:true, path:`evidencia/mov_edt_status_msg.png`});
  });

  test('Efetuar exclusão de movimento', async ({ page }) => {
    await page.waitForTimeout(4000);
    await barriga.reset();
    await page.waitForTimeout(4000);
    await extrato.exclui_mov("Movimentacao para exclusao");
    await page.waitForTimeout(4000);
    const mensagem =page.locator('.toast-message');
    await expect(mensagem).toHaveText("Movimentação removida com sucesso!");
    await page.screenshot({fullPage:true , path:`evidencia/excl_mov_msg.png`});
  });

  test('Efetuar edição de conta', async ({ page }) => {
    await barriga.reset();
    await conta.edita_conta("Conta para alterar");
    await page.waitForTimeout(3000);
    const mensagem =page.locator('.toast-message').nth(0);
    await expect(mensagem).toHaveText("Conta atualizada com sucesso!");
    await page.screenshot( {fullPage:true, path:`evidencia/conta_edit_msg.png`});
  });

  test('Efetuar exclusão de conta', async ({ page }) => {
    await barriga.reset();
    await conta.exclui_conta("Conta para alterar");
    await page.waitForTimeout(3000);
    const mensagem =page.locator('.toast-message');
    await expect(mensagem).toHaveText("Conta excluída com sucesso!");
    await page.screenshot( {fullPage:true, path:`evidencia/conta_excl_msg.png`});
  });

});