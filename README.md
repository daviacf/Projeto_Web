
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

Claro\! Aqui está o tutorial ajustado para ser claro e funcional tanto para usuários de Linux quanto de Windows. As principais alterações estão nos comandos de ativação do ambiente virtual e na referência ao executável do Python (`python` vs. `python3`).

-----

## Instruções de Execução (Linux e Windows)

Siga os passos abaixo para configurar e executar o projeto localmente no seu sistema operacional.

### Pré-requisitos

  * **Node.js:** versão 20.x LTS ou superior.
  * **Python:** versão 3.x.
  * **Servidor MySQL:** Um servidor de banco de dados como XAMPP (Windows/Linux), MAMP (macOS/Windows), ou uma instalação nativa do MySQL.
  * **Git:** Para clonar o repositório.

### Executando o Back-end

Abra o seu terminal de preferência. No Windows, você pode usar o **Prompt de Comando (CMD)**, **PowerShell** ou **Git Bash**. No Linux, use o **Terminal**.

1.  **Clone o Repositório:**
    Navegue até o diretório onde deseja salvar o projeto e execute o comando abaixo.

    ```bash
    git clone https://github.com/daviacf/Projeto_Web.git
    ```

    Em seguida, entre na pasta do back-end.

    ```bash
    cd Projeto_Web/backend
    ```

2.  **Crie e Ative um Ambiente Virtual (Recomendado):**
    Um ambiente virtual isola as dependências do projeto.

      * **Crie o ambiente:**

        ```bash
        # Na maioria dos sistemas (Windows e muitas distribuições Linux)
        python -m venv venv

        # Se o comando acima não funcionar em seu Linux, use python3
        # python3 -m venv venv
        ```

      * **Ative o ambiente:** O comando para ativar varia conforme o sistema operacional.

          * **No Windows (CMD / PowerShell):**

            ```powershell
            venv\Scripts\activate
            ```

          * **No Linux / macOS (bash):**

            ```bash
            source venv/bin/activate
            ```

        Após a ativação, você verá `(venv)` no início da linha do seu terminal.

3.  **Instale as Dependências:**
    Com o ambiente virtual ativado, instale as bibliotecas Python necessárias.

    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure o Banco de Dados:**

      * Inicie seu servidor MySQL (pelo painel do XAMPP, por exemplo).
      * Acesse seu gerenciador de banco de dados (como o phpMyAdmin) e crie um novo banco de dados com o nome `projeto_web`.
      * Importe o arquivo `projeto_web.sql` (localizado na raiz do projeto) para dentro do banco de dados recém-criado. Isso criará as tabelas e adicionará os dados iniciais.

5.  **Inicie o Servidor:**
    Execute o script principal para iniciar a aplicação.

    ```bash
    # Use 'python' no Windows e na maioria dos sistemas
    python run.py

    # Ou 'python3' se for o padrão no seu Linux
    # python3 run.py
    ```

    O back-end estará em execução e acessível no endereço `http://localhost:5000`.

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
