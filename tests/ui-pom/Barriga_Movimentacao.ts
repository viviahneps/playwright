import { type Page, type Locator , expect } from '@playwright/test';


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
  this.valor= page.getByPlaceholder('Valor') ; 
  this.interessado= page.getByPlaceholder('Interessado...');
  this.select_conta= page.getByTestId('conta');
  this.btn_status = page.getByTestId('status');
  this.btn_salvar=  page.getByRole('button').getByText('Salvar');
}

async preenche_movimento( dt_transac:string, dt_pag: string, descricao : string, valor: string,interess: string, conta: string,flag:boolean){
    await this.menu_movimento.click();
    await this.dt_transacao.pressSequentially(dt_transac);
    await this.dt_pagamento.pressSequentially(dt_pag);
    await this.descricao.fill(descricao);
    await this.valor.fill(valor) ; 
    await this.interessado.fill(interess);
    await this.select_conta.selectOption(conta);
     if(flag== true){
    await this.btn_status.click();
    }
    await this.page.screenshot({path:`Screen/mov_antes.png`});
    this.btn_salvar.click();
  };


}
export default Barriga_Movimentacao;