import { type Page, type Locator , expect } from '@playwright/test';


 class Barriga_Setup {
  readonly page: Page;
  readonly menu_settings: Locator ;
  readonly email: Locator;
  readonly senha: Locator;
  readonly mensagem: Locator;
  readonly btn_reset: Locator;
  readonly btn_entrar: Locator;
  readonly btn_sair: Locator ;
 

  constructor(page: Page) { 
    this.page = page;
    this.menu_settings = page.getByTitle('settings');
    this.email = page.getByTestId('email');
    this.senha = page.getByTestId('passwd');
    this.mensagem = page.locator('.toast-message');
    this.btn_reset= page.getByRole('link').getByText('Resetar');
    this.btn_entrar= page.getByRole('button').getByText('Entrar');
    this.btn_sair =page.getByRole('link').getByText('Sair');
    

  }

  async logon ( dado_email :string,dado_senha:string ) {
    await this.page.goto('https://barrigareact.wcaquino.me');
   expect(this.email).toBeVisible();
    await this.email.fill(dado_email);
    await this.senha.fill(dado_senha);
    await this.btn_entrar.click() 
   
  };
  async logon_negativo( email :string,senha:string ) {
    await this.page.goto('https://barrigareact.wcaquino.me');
    await this.email.pressSequentially(email);
    await this.senha.pressSequentially(senha);
    await this.btn_entrar.click();
    await this.page.waitForTimeout(4000);

  };

  async reset () {
   await this.menu_settings.click();
   await this.btn_reset.click();
  };
 async sair(){
  await this.menu_settings.click();
  await this.btn_sair.click();
  await this.page.close();
 }

}
  export default Barriga_Setup;
