import { type Page, type Locator , expect } from '@playwright/test';

class Barriga_Extrato {
 readonly page: Page;
 readonly menu_extrato: Locator;
 readonly linha_mov : Locator;
 readonly btn_editar:Locator;
 readonly btn_excluir: Locator;
 readonly linha: BigInt;
 readonly Ext_descricao : Locator;
 readonly Ext_valor : Locator;
 readonly Ext_btn_status: Locator;
 readonly btn_ext_salvar: Locator; 



 constructor(page: Page) { 
    this.page = page;
    this.Ext_descricao = page.getByPlaceholder('Descrição...');
    this.Ext_valor = page.getByPlaceholder('Valor');
    this.btn_ext_salvar = page.getByRole('button').getByText('Salvar');
    this.menu_extrato =page.getByTestId('menu-extrato');
    this.linha_mov = page.getByTestId('mov-row')
    this.btn_editar= page.locator(`//*[@id="root"]/div/div/div[2]/div[2]/li[4]/div/div[2]/a[1]/i`);
    this.btn_excluir = page.locator(`//*[@id="root"]/div/div/div[2]/div[2]/li[3]/div/div[2]/a[2]/i`);
    this.Ext_btn_status = page.getByTestId('status');
  }

async busca_movimento (nome_mov: string){
 await this.linha_mov.getByText(nome_mov);
 await this.page.screenshot({fullPage:true , path:`evidencia/lista_mov_pos.png`});
}

async edita_dados_mov (linha,descricao:string,valor){
    await this.menu_extrato.click();
    await expect(this.page).toHaveURL('https://barrigareact.wcaquino.me/extrato');
    await this.page.waitForTimeout(3000);
    await this.btn_editar.click();
    await this.Ext_descricao.clear();
    await this.Ext_descricao.pressSequentially(descricao);
    await this.page.waitForTimeout(3000);
    await this.Ext_valor.clear();
    await this.Ext_valor.pressSequentially(valor)
    await this.btn_ext_salvar.click();
    await this.page.screenshot({fullPage:true , path:`evidencia/edit_mov_pos.png`});
   }
   
   async edita_status_mov (){
    await this.menu_extrato.click();
    await expect(this.page).toHaveURL('https://barrigareact.wcaquino.me/extrato');
    await this.page.waitForTimeout(3000);
    await this.btn_editar.click();
    await this.page.waitForTimeout(3000);
    await this.Ext_btn_status.click();
    await this.btn_ext_salvar.click();
    await this.page.screenshot({fullPage:true , path:`evidencia/edit_status_pos.png`});
   } 
   
    async exclui_mov(){
    await  this.menu_extrato.click();
    await expect(this.page).toHaveURL('https://barrigareact.wcaquino.me/extrato');
    await  this.page.waitForTimeout(3000);
    await this.btn_excluir.click();
    await this.page.screenshot({fullPage:true , path:`evidencia/excl_mov_pos.png`});
   };

}  
export default Barriga_Extrato;