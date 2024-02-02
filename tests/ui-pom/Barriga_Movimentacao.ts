import { type Page, type Locator , expect } from '@playwright/test';
import { describe } from 'node:test';
import { isDate } from 'util/types';
import Barriga_Setup from './Barriga_Setup';


class Barriga_Movimentacao {
  readonly page: Page;
  readonly menu_movimento : Locator;
  readonly dt_transacao: Locator;
  readonly dt_pagamento: Locator;
  readonly descricao: Locator;
  readonly valor: Locator;
  readonly interessado: Locator;
  readonly select_conta: Locator;
  readonly btn_status: Locator;
  readonly btn_salvar: Locator;


  constructor(page: Page) {
  
  this.page = page;
  this.menu_movimento= page.getByTitle('Cadastrar movimentação');
  this.dt_transacao=page.getByTestId('data-transacao');
  this.dt_pagamento= page.getByTestId('data-pagamento');
  this.descricao= page.getByPlaceholder('Descrição...');
  this.valor= page.getByTestId('valor') ; 
  this.interessado= page.getByPlaceholder('Interessado...');
  this.select_conta= page.getByTestId('conta');
  this.btn_status = page.getByTestId('status');
  this.btn_salvar=  page.getByRole('button').getByText('Salvar');

}

 async preenche_movimento( dt_trans:string,dt_pag:string,descricao : string, valor: string,interess: string, conta: string,flag_status:boolean){
    await this.menu_movimento.click();
    expect(this.descricao).toBeVisible();
    await this.dt_transacao.fill(dt_trans);
    await this.dt_pagamento.fill(dt_pag);
    await this.descricao.pressSequentially(descricao);
    await this.valor.pressSequentially(valor) ; 
    await this.interessado.fill(interess);
    await this.select_conta.selectOption(conta);
     if(flag_status== true){
    await this.btn_status.click();
    }
    await this.page.screenshot({path:`evidencia/dados_mov_pos.png`});
    this.btn_salvar.click();
  };

  async preenche_movimento_vazio(){
    await this.menu_movimento.click();
    this.btn_salvar.click(); 
  };

   async preenche_movimento_neg( dt_trans:string,dt_pag:string,descricao : string, valor: string,interess: string, conta: string,flag_status:boolean){
    await this.menu_movimento.click();
    expect(this.descricao).toBeEditable();
    await this.dt_transacao.fill(dt_trans);
    await this.dt_pagamento.fill(dt_pag);
    await this.descricao.pressSequentially(descricao);
    await this.valor.pressSequentially(valor) ; 
    await this.interessado.pressSequentially(interess);
    await this.select_conta.selectOption(conta);
     if(flag_status== true){
      await this.btn_status.click();
     }
    await this.page.screenshot({path:`evidencia/dados_mov_neg.png`});
    this.btn_salvar.click();
  };
}
export default Barriga_Movimentacao;