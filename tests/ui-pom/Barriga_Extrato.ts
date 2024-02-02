import { type Page, type Locator , expect } from '@playwright/test';
import { parse } from 'path';

class Barriga_Extrato {
 readonly page: Page;
 readonly menu_extrato: Locator;
 readonly select_conta : Locator;
 readonly btn_editar:Locator;
 readonly btn_excluir: Locator;
 readonly ext_descricao : Locator;
 readonly ext_valor : Locator;
 readonly ext_btn_status: Locator;
 readonly btn_ext_salvar: Locator; 
 readonly interessado: Locator;
 
 



 constructor(page: Page) { 
    this.page = page;
    this.ext_descricao = page.getByPlaceholder('Descrição...');
    this.ext_valor = page.getByTestId('valor');
    this.btn_ext_salvar = page.getByRole('button').getByText('Salvar');
    this.menu_extrato =page.getByTestId('menu-extrato');
    this.select_conta = page.getByTestId('conta');
    this.btn_editar= page.locator(`//*[@id="root"]/div/div/div[2]/div[2]/li[3]/div/div[2]/a[1]/i`);
    this.btn_excluir = page.locator(`//*[@id="root"]/div/div/div[2]/div[2]/li[1]/div/div[2]/a[2]/i`);
    this.ext_btn_status = page.getByTestId('status');
    this.interessado= page.getByPlaceholder('Interessado...');
  }

async busca_movimento (nome_mov: string){
  await this.menu_extrato.click();
  await this.page.screenshot({fullPage:true , path:`evidencia/lista_mov_pos.png`});
}

async edita_dados_mov (nome_mov:string,descricao:string,valor){
    await this.menu_extrato.click();
    await this.page.waitForTimeout(4000);
    await this.btn_editar.click();
    await expect(this.ext_descricao).not.toBeEmpty();
    //await this.page.waitForTimeout(4000);
    await this.ext_descricao.clear();
    await this.ext_descricao.pressSequentially(descricao);
    await this.ext_valor.clear();
    await this.ext_valor.pressSequentially(valor);
    await this.interessado.pressSequentially("editado");
    await this.select_conta.selectOption('Conta para alterar');
    await this.ext_btn_status.click();
    await this.btn_ext_salvar.click();
    await this.page.screenshot({fullPage:true , path:`evidencia/edit_mov_pos.png`});
   }
   
   async edita_status_mov (){
    await this.menu_extrato.click();
    await expect(this.page).toHaveURL('/extrato');
    await this.btn_editar.click();
    await expect(this.ext_descricao).not.toBeEmpty();
    await this.ext_btn_status.click();
    await this.btn_ext_salvar.click();
    await this.page.screenshot({fullPage:true , path:`evidencia/edit_status.png`});
   } 
   
    async exclui_mov(nome_mov:string){
    await this.menu_extrato.click();
    await this.page.waitForTimeout(3000);
    await expect(this.page).toHaveURL('/extrato');
    await this.btn_excluir.click();
    await this.page.screenshot({fullPage:true , path:`evidencia/excl_mov_pos.png`});
   };

}  
export default Barriga_Extrato;