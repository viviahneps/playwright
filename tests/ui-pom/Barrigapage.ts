import { type Page, type Locator , expect } from '@playwright/test';


 class Barrigapage {
  readonly page: Page;
  readonly menu_settings: Locator ;
  readonly menu_registrar: Locator ;
  readonly email: Locator;
  readonly senha: Locator;
  readonly cad_email: Locator;
  readonly cad_nome: Locator;
  readonly cad_senha: Locator;
  readonly mensagem: Locator;
  readonly btn_reset: Locator;
  readonly btn_entrar: Locator;
  readonly btn_registrar: Locator;


  constructor(page: Page) { 
    this.page = page;
    this.menu_settings = page.getByTitle('settings');
    this.menu_registrar =page.getByText('Registrar') ;
    this.email = page.getByTestId('email');
    this.senha = page.getByTestId('passwd');
    this.cad_email= page.getByPlaceholder('Email');
    this.cad_nome = page.getByPlaceholder('Nome');
    this.cad_senha =page.getByPlaceholder('Email')
    this.mensagem = page.locator('.toast-message');
    this.btn_reset= page.getByRole('link').getByText('Resetar');
    this.btn_entrar= page.getByRole('button').getByText('Entrar');
    this.btn_registrar= page.getByRole('button').getByText('Registrar');

  }

  async logon (  email :string,senha:string ) {
    await this.page.goto('https://barrigareact.wcaquino.me');
    await this.email.pressSequentially(email);
    await this.senha.pressSequentially(senha);
    await this.btn_entrar.click()
  };

  async reset () {
    await this.menu_settings.click();
    await this.btn_reset.nth(0).click();
  };

  async preenche_cadastro(nome:string, email: string, senha:string){
    await this.btn_registrar.click();
    await this.cad_nome.pressSequentially(nome);
    await this.cad_email.pressSequentially(email);
    await this.cad_senha.pressSequentially(senha);
    await this.page.screenshot({path:`Screen/mensagem_PENDENTE.png`});
    await this.btn_registrar.click();

  };


 }
  export default Barrigapage;
