import { type Page, type Locator , expect } from '@playwright/test';
import { match } from 'assert';
import { randomInt } from 'crypto';
import Barrigapage from './Barrigapage';

class Barriga_Cadastro{
    readonly page: Page;
    readonly cad_email: Locator;
    readonly cad_nome: Locator;
    readonly cad_senha: Locator;
    readonly menu_registrar: Locator;
    readonly btn_registrar: Locator;
    readonly btn_copy_email: Locator;
    


    constructor(page: Page) { 
        this.page = page;
        this.menu_registrar =page.getByText('Registrar') ;
        this.cad_email= page.getByPlaceholder('Email');
        this.cad_nome = page.getByPlaceholder('Nome');
        this.cad_senha =page.getByPlaceholder('Senha')
        this.btn_registrar= page.getByRole('button').getByText('Registrar');
        this.btn_copy_email= page.locator('#click-to-copy');
        //.getByText(' Copiar');
    }

   async geradorRandon(){
    return Math.floor(Math.random() * 50);
   }

      async preenche_cadastro(){
     const nome="Teste_Playwrght"+(await this.geradorRandon()).toString();
     await this.page.goto('https://barrigareact.wcaquino.me');
     await this.menu_registrar.click();
     await this.cad_nome.pressSequentially(nome); 
     var fakemail="playwright"+(await this.geradorRandon()).toString()+"@mail.com.br"; 
     await this.cad_email.pressSequentially(fakemail);
     await this.cad_senha.pressSequentially("1234");
     await this.page.screenshot({path:`evidencia/dados_cadastro_pos.png`});
     await this.btn_registrar.click();
    
     }
     async preenche_cadastro_vazio(){
        await this.page.goto('https://barrigareact.wcaquino.me');
        await this.menu_registrar.click();
        this.btn_registrar.click(); 
      };

      async preenche_cadastro_neg(nome: string, email:string, senha:string){
        await this.page.goto('https://barrigareact.wcaquino.me');
        await this.menu_registrar.click();
        await this.cad_nome.pressSequentially(nome); 
        await this.cad_email.pressSequentially(email);
        await this.cad_senha.pressSequentially(senha);
        await this.page.screenshot({path:`evidencia/dados_cadastro_neg.png`});
        await this.btn_registrar.click();

        this.btn_registrar.click(); 
      };
      
}  export default Barriga_Cadastro;
