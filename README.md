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

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
