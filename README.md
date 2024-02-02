# Automação de Teste Barriga React

## Descrição 
<p align="left">Projeto desenvolvido para prática de criação de scripts de teste automatizado sobre a aplicação do "BARRIGA REACT" no playwright.
 
## Sobre o Barriga React:
 Aplicação desenvolvida pelo Francisco Wagner Costa Aquino, após efetuado cadastro do usuário no site permite efetuar a inclusçao e exclusão de contas de despesas pagas e pendentes para controle do SR. Barriga de seus aluguéis.

 -Site: https://barrigareact.wcaquino.me .
 -Código da aplicação: https://github.com/wcaquino/seubarriga-rest 

 # 📥  Softwares utilizados
- 🔗 [NodeJS](https://nodejs.org/en/download) -versão 12.22.9 .
- 🔗 [VSCode](https://code.visualstudio.com/) - versão 1.85.1 .
- 🔗 [Git e Git Bash](https://git-scm.com/downloads) 

# Para execução do Projeto:
- 1) Efetuar o fork do repositório;
- 2) Instalar nodejs ;
- 3) Instalar platwright  -versão 1.38 
Link para tutorial (Rodrigo de Brito)
🔗  (https://medium.com/@rodrigo.oliveiracabral/playwright-b%C3%A1sico-introdu%C3%A7%C3%A3o-%C3%A0-automa%C3%A7%C3%A3o-de-testes-web-e90428b176d2)
- 4) Após efetuado os passos anteriores basta executar o comando: npx playwright test

# Estrutura do projeto:
- //ui-pom/evidencia/ -> Screenshots da execução de cada testes
- /report -> relatório .zip da execução
- /tests -> Estrutura de testes da aplicação
   * BarrigaReact_negativo-test.spec.ts - Script de testes negativos.
   * BarrigaReact_negativo-test.spec.ts -Script de testes positivos.
- /ui-pom -> Page Objects do projeto:
   * Barriga_Cadastro - Mapeamento da página de Cadastro.
   * Barriga_Conta - Mapeamento da página de Cadastro.
   * Barriga_EXtrato - Mapeamento página de extrato.
   * Barriga_Movimento - Mapeamento página de Movimento.
   * Barrigapage - Mapeamento de metodos de setup e finalização do site (logon loff)

## Oportunidades de melhoria: 
- Geração de massa automatizada;
- Configuração de esteira CI/CD;
- Quantidade de timeout do projeto (diminuição);

## Plano de Teste utilzado: 
Neste projeto utilizaremos teste funcionais simples (caixa preta positivos e negativos),apenas via navegador Chrome conforme RTF abaixo: 

| Cenários de Teste                                                                         | Tipo de Teste       |
| ------------------------------------------------------------------------------------------|---------------------|
| Verificar se cadastro de usuário é efetuado com sucesso na aplicação Barriga              | Funcional POSITIVO  |
| Verificar se login com a conta cadastrada é efetuado com sucesso na aplicação Barriga     | Funcional POSITIVO  |
| Verificar se movimentação -PAGA de conta é inserida com sucesso na aplicação Barriga      | Funcional POSITIVO  |
| Verificar se movimentação -PENDENTE de conta é inserida com sucesso na aplicação Barriga  | Funcional POSITIVO  |
| Verificar se movimentação de conta é exibida no extrato com sucesso na aplicação Barriga  | Funcional POSITIVO  |
| Verificar se movimentação conta é excluida com sucesso na aplicação Barriga               | Funcional POSITIVO  |
| Verificar se movimentação conta é alterada com sucesso na aplicação Barriga               | Funcional POSITIVO  |
| Verificar se movimentação de conta é editada-STATUS com sucesso na aplicação Barriga      | Funcional POSITIVO  |
| Verificar se alteração de conta é efetuada com sucesso na aplicação Barriga               | Funcional POSITIVO  |
| Verificar se cadastro de usuário já inserido não é efetuado na aplicação Barriga          | Funcional NEGATIVO  |
| Verificar se cadastro de usuário vazio não é efetuado com sucesso                         | Funcional NEGATIVO  |
| Verificar se cadastro de usuário duplicado não é efetuado na aplicação Barriga            | Funcional NEGATIVO  |
| Verificar se cadastro de usuário nome vazio não é efetuado na aplicação Barriga           | Funcional NEGATIVO  |
| Verificar se cadastro de usuário email vazio não é efetuado na aplicação Barriga          | Funcional NEGATIVO  |
| Verificar se cadastro de usuário senha vazio não é efetuadona aplicação Barriga           | Funcional NEGATIVO  |
| Verificar se login com usuário vazio não é efetuado na aplicação Barriga                  | Funcional NEGATIVO  |
| Verificar se login com email vazio não é efetuado na aplicação Barriga                    | Funcional NEGATIVO  |
| Verificar se login com senha vazio não é efetuado na aplicação Barriga                    | Funcional NEGATIVO  |
| Verificar se login com usuário sem cadastro não é efetuado na aplicação Barriga           | Funcional NEGATIVO  |
| Verificar se movimento de conta vazio não registrado na aplicação Barriga                 | Funcional NEGATIVO  |
| Verificar se movimento de conta valor vazio não é efetuado na aplicação Barriga           | Funcional NEGATIVO  |
| Verificar se movimento de conta descrição vazio não é efetuado na aplicação Barriga       | Funcional NEGATIVO  |
| Verificar se movimento de conta interessado vazio não é efetuado na aplicação Barriga     | Funcional NEGATIVO  |
| Verificar se cadastro de conta  vazio não é efetuado na aplicação Barriga                 | Funcional NEGATIVO  |





