# Projeto Web de Flashcards

Este projeto foi desenvolvido para a disciplina de Programação para Web da Universidade de Pernambuco, sob a orientação do professor Augusto César Oliveira.

## Principais Funcionalidades 

O sistema é uma aplicação web completa de flashcards (cartões de estudo) que permite aos usuários se cadastrarem, criarem e gerenciarem baralhos de estudo. O objetivo é facilitar o aprendizado e a memorização de diversos assuntos. 

* **Autenticação de Usuários:** Cadastro e login com sistema de token JWT para acesso seguro. 
* **Gerenciamento de Baralhos (CRUD):** Usuários logados podem criar, visualizar, editar e excluir seus próprios baralhos. 
* **Gerenciamento de Cartões (CRUD):** Dentro de cada baralho, o usuário pode adicionar, visualizar, editar e remover cartões de estudo. 

## Características do Sistema Desenvolvido 

O projeto foi construído utilizando uma arquitetura de aplicação web moderna, separando claramente as responsabilidades entre o front-end, o back-end e o banco de dados. 

* **Arquitetura:**
    * **Front-end:** Uma Single Page Application (SPA) com 3 páginas distintas. A aplicação consome dados da API (`GET`) e envia dados para a API (`POST`/`PUT`), implementando fluxos completos de ponta a ponta.
    * **Back-end:** Uma API RESTful desenvolvida em Python com o framework Flask. O código é organizado em uma arquitetura de 3 camadas: Controle (Controllers), Serviços (Services) e Acesso a Dados (Repositories). 
    * **Banco de Dados:** Banco de dados relacional MySQL com 3 tabelas (`usuarios`, `baralhos`, `cartoes`) ]que possuem relacionamentos entre si. 

* **Tecnologias Utilizadas:**
    * **Front-end:** React, React Router, Axios
    * **Back-end:** Python, Flask, Flask-CORS, PyJWT, Passlib
    * **Banco de Dados:** MySQL
    * **Gerenciamento de Versão:** Git e GitHub

## Instruções de Execução 

Siga os passos abaixo para configurar e executar o projeto localmente.

### Pré-requisitos

* Node.js (versão 20.x LTS recomendada)
* Python (versão 3.x)
* Um servidor de banco de dados MySQL (XAMPP, MAMP, etc.)
* Git

### Executando o Back-end

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/daviacf/Projeto_Web.git]
    cd [NOME_DA_PASTA_DO_PROJETO]/backend
    ```

2.  **Crie e Ative um Ambiente Virtual (Recomendado):**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Instale as Dependências:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure o Banco de Dados:**
    * Inicie seu servidor MySQL.
    * Crie um banco de dados chamado `projeto_web`.
    * Importe o arquivo `projeto_web.sql` fornecido na raiz do projeto para criar as tabelas e os dados iniciais.

5.  **Inicie o Servidor:**
    ```bash
    python3 run.py
    ```
    O back-end estará rodando em `http://localhost:5000`.

### Executando o Front-end

1.  **Navegue até a Pasta do Front-end:**
    ```bash
    # Em um novo terminal, a partir da raiz do projeto
    cd frontend
    ```

2.  **Instale as Dependências:**
    ```bash
    npm install
    ```

3.  **Inicie a Aplicação React:**
    ```bash
    npm start
    ```
    O front-end estará acessível em `http://localhost:3000`.