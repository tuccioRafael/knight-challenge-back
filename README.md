# Cadastro de Cavaleiros - Backend

Este projeto é uma API para o cadastro e gerenciamento de cavaleiros, desenvolvida usando [NestJS](https://nestjs.com/) com Mongoose para o banco de dados MongoDB.

## Índice

- [Recursos](#recursos)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Endpoints](#endpoints)
- [Testes](#testes)
- [Contribuição](#contribuição)

## Recursos

- **Cadastro de Cavaleiros:** Criação, leitura, atualização e exclusão (soft delete) de cavaleiros.
- **Gerenciamento de Armas:** Cada cavaleiro pode ter uma ou mais armas.
- **Validação de Dados:** Validação dos dados de entrada utilizando decorators.
- **Soft Delete:** Implementação de exclusão lógica (soft delete) para os cavaleiros.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **NestJS**: Framework para construir aplicações escaláveis e eficientes em Node.js.
- **Mongoose**: Biblioteca de modelagem de dados para MongoDB.
- **Class-Validator**: Biblioteca para validação de dados.
- **Swagger**: Documentação da API.

## Instalação

1. Preparando o ambiente:

   ## Instalação do Node.js e Inicialização do Projeto

### Pré-requisitos

Antes de iniciar, você precisará ter o Node.js instalado em sua máquina.

#### 1. Instalando o Node.js

Para instalar o Node.js, siga os passos abaixo:

1. Acesse o site oficial do Node.js: [Node.js](https://nodejs.org/)
2. Baixe a versão LTS recomendada para o seu sistema operacional.
3. Siga as instruções de instalação específicas para o seu sistema:

   - **Windows:**
     - Execute o instalador baixado (.msi) e siga as instruções na tela.
     - Certifique-se de marcar a opção para adicionar o Node.js ao PATH.
   - **macOS:**
     - Abra o pacote .pkg baixado e siga as instruções na tela.
   - **Linux:**
     - A instalação pode variar dependendo da distribuição. Em distribuições baseadas em Debian (como Ubuntu), você pode usar:

       ```bash
       sudo apt update
       sudo apt install nodejs npm
       ```

4. Após a instalação, verifique se o Node.js foi instalado corretamente, executando o seguinte comando no terminal:

   ```bash
   node -v



   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio

2. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio


3. Inicializando:

### Entre no diretório do projeto

   ```bash
   cd knight-challenge-back

   ```

### Instalar as Dependências

```bash
   cd npm install

   ```


### Configurar as Variáveis de Ambiente

   Crie um arquivo .env na raiz do projeto e configure as variáveis de ambiente necessárias. Você pode usar o arquivo .env.example como base:

```bash
   cp .env.example .env
   ```
   Edite o arquivo `.env`ccnforme o necessário.

### Executar o Projeto

   Após instalar as dependências e configurar as variáveis de ambiente, você pode iniciar o servidor NestJS com o comando:
```bash
   npm run start:dev | yarn start:dev
   ```

## Testando a API

Para testar as rotas e funcionalidades da API, você tem duas opções:

### 1. Utilizar o Postman

O Postman é uma ferramenta útil para testar APIs RESTful de forma rápida e fácil. 

- **Instalação do Postman:**
  - Você pode baixar e instalar o Postman a partir do site oficial: [Postman](https://www.postman.com/downloads/)
  
- **Como usar o Postman:**
  - Após a instalação, você pode criar uma nova coleção no Postman e adicionar as rotas da API do projeto.
  - Certifique-se de configurar corretamente o corpo das requisições (`body`) e os cabeçalhos (`headers`) conforme necessário para cada rota.

### 2. Baixar o Frontend

Se você preferir uma interface gráfica para interagir com a API, pode baixar o frontend do projeto:

- **Repositório do Frontend:**
  - Você pode clonar o repositório frontend a partir do GitHub: [Knight Challenge Frontend](https://github.com/tuccioRafael/knight-challenge-front)

- **Instalação e Execução:**
  - Siga as instruções no README do repositório frontend para instalar as dependências e iniciar o projeto.
  - Uma vez que o frontend esteja rodando, você poderá interagir com a API de forma visual.

Ambas as opções são viáveis para testar e interagir com as funcionalidades do cadastro de cavaleiros. Escolha a que melhor se adapta às suas necessidades.
