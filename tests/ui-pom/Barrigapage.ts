import { type Page, type Locator , expect } from '@playwright/test';


 class Barrigapage {
  readonly page: Page;
  readonly settings: Locator ;
  readonly email: Locator;
  readonly senha: Locator;
  readonly btn_reset: Locator;
  readonly btn_entrar: Locator;
  readonly mensagem: Locator;

  constructor(page: Page) { 
    this.page = page;
    this.settings = page.getByTitle('settings');
    this.email = page.getByTestId('email');
    this.senha = page.getByTestId('passwd');
    this.btn_reset= page.getByRole('link').getByText('Resetar');
    this.btn_entrar= page.getByRole('button').getByText('Entrar');
    this.mensagem = page.locator('.toast-message');
   
  }

  async logon (  email :string,senha:string ) {
    await this.page.goto('https://barrigareact.wcaquino.me');
    await this.email.pressSequentially(email);
    await this.senha.pressSequentially(senha);
    await this.btn_entrar.click()
  };

  async reset () {
    await this.settings.click();
    await this.btn_reset.nth(0).click();
;
  };

  


 }
  export default Barrigapage;
