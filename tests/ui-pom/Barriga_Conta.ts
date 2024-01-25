import { type Page, type Locator , expect } from '@playwright/test';

class Barriga_Conta {
 readonly page: Page;
 readonly menu_settings: Locator ;
 readonly menu_conta: Locator ;
 readonly conta: Locator ;
 readonly cnt_btn_editar: Locator ;
 readonly cnt_btn_excluir: Locator ;
 readonly cnt_btn_salvar :Locator; 
 readonly nome_conta :Locator;


 constructor(page: Page) { 
    this.page = page;
    this.menu_settings = page.getByTitle('settings');
    this.menu_conta = page.getByRole('link').getByText('Contas');
    this.cnt_btn_editar = page.locator(`//*[@id="root"]/div/div/div[2]/table/tbody/tr[1]/td[2]/a[1]/i`);
    this.cnt_btn_excluir = page.locator(`//*[@id="root"]/div/div/div[2]/table/tbody/tr[1]/td[2]/a[2]/i`);
    this.nome_conta = page.getByPlaceholder("Conta...");
    this.cnt_btn_salvar = page.getByAltText('Salvar');
  }

 async edita_conta (nome_mov: string){
 await this.menu_settings.click();
 await this.menu_conta.click();
 await this.cnt_btn_editar.click();
 await this.nome_conta.fill(nome_mov);
 await this.page.screenshot({path:`Screen/edit_conta_1.png`});
 await this.cnt_btn_salvar.click();
}

async exclui_conta (nome_mov: string){
    await this.menu_settings.click();
    await this.menu_conta.click();
    await this.cnt_btn_excluir.click();
    await this.page.screenshot({path:`Screen/excl_conta_1.png`});
   }
}  export default Barriga_Conta;