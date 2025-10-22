

# Micro-Blogging API - Projeto Web Back-End

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## Sobre o Projeto

CRUD para a plataforma de **micro-blogging**, similar ao Twitter, desenvolvida como parte do Projeto 1 da disciplina de **Programação Web Back-End (EC48B-C71)**.

A aplicação foi construída utilizando **Node.js** puro, sem o uso de frameworks como Express, para demonstrar um entendimento profundo do funcionamento do módulo `http` nativo. A interação com o banco de dados é gerenciada pelo **Mongoose**, que se conecta a uma instância do **MongoDB**.

O projeto implementa todas as funcionalidades essenciais de uma rede social, incluindo gerenciamento de usuários, criação e gerenciamento de postagens e um sistema de comentários aninhados a posts. Um dos focos principais do projeto é o robusto sistema de **tratamento de exceções e logging**, que captura e armazena todos os erros da aplicação em um arquivo de log para facilitar a depuração e monitoramento.

---

## Funcionalidades Principais

*   **👤 Gerenciamento de Usuários:** CRUD completo (Criar, Ler, Atualizar, Deletar) para usuários.
*   **📝 Gerenciamento de Postagens:** CRUD completo para as postagens dos usuários.
*   **💬 Gerenciamento de Comentários:** Sistema de comentários vinculados a postagens, com operações CRUD completas.
*   **⚙️ Validação de Dados:** Validação de campos obrigatórios e formato de dados diretamente no Schema do Mongoose, com feedback claro para o cliente em caso de erro.
*   **📄 Logging de Erros:** Um módulo de tratamento de erros centralizado que registra todas as exceções da aplicação em `logs/error.log`, incluindo timestamp, contexto do erro e stack trace.

---

## Estrutura do Projeto

O projeto está organizado da seguinte forma para garantir manutenibilidade e escalabilidade:

```
micro-blogging/
├── logs
│   └── error.log       # Arquivo onde os erros são registrados
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── app.js          # Ponto de entrada da aplicação (criação do servidor)
    ├── Comment.js
    ├── db.js           # Configuração da conexão com o banco de dados
    ├── errorHandler.js
    ├── Post.js
    └── User.js
```

---

## Tecnologias Utilizadas

*   **[Node.js](https://nodejs.org/)**: Ambiente de execução para o JavaScript no servidor.
*   **[MongoDB](https://www.mongodb.com/)**: Banco de dados NoSQL orientado a documentos.
*   **[Mongoose](https://mongoosejs.com/)**: Biblioteca de modelagem de objetos (ODM) para o MongoDB, utilizada para definir schemas e validações.

---

## Como Executar o Projeto

Siga os passos abaixo para configurar e rodar a aplicação em seu ambiente local.

### Pré-requisitos

*   **Node.js** (versão 14.x ou superior)
*   **npm** (geralmente instalado junto com o Node.js)
*   **MongoDB** (serviço precisa estar em execução na máquina local na porta padrão `27017`)

### Passos para Instalação

1.  **Clone o repositório:**
    ```sh
    git clone https://github.com/gasakiri/Projeto-Back-End-EC48B.git
    cd Projeto-Back-End-EC48B
    ```

2.  **Instale as dependências:**
    ```sh
    npm install
    ```
    *(Nota: Embora o projeto use módulos nativos, ele utiliza o `mongoose` como dependência, que precisa ser instalado).*

3.  **Configure a Conexão com o Banco de Dados:**
    O projeto está configurado para se conectar a um banco local por padrão. A string de conexão está no arquivo `src/db.js`:
    ```javascript
    const MONGO_URI = "mongodb://localhost:27017/micro-blogging-db";
    ```
    Certifique-se de que seu serviço MongoDB está ativo.

4.  **Inicie o servidor:**
    ```sh
    node src/app.js
    ```
---

## Tratamento de Erros e Logging

O sistema de tratamento de erros é um pilar deste projeto.

*   **Captura**: Todos os controladores utilizam blocos `try...catch` para capturar exceções que possam ocorrer durante o processamento da requisição (ex: falha no banco de dados, dados inválidos).
*   **Logging**: Ao capturar um erro, a função `logError` do módulo `src/errorHandler.js` é chamada. Ela formata uma mensagem de log detalhada e a anexa ao arquivo `logs/error.log`.
*   **Formato do Log**: Cada entrada de log contém:
    *   `Timestamp`: Data e hora exatas do erro.
    *   `Contexto`: Onde o erro ocorreu.
    *   `Mensagem do Erro`: A mensagem de erro original.
    *   `Stack Trace`: A pilha de chamadas que levou ao erro, essencial para depuração.

---

## Autores

- **[Gabriel Augusto Morisaki Rita](https://github.com/gasakiri)**
- **[Mateus Bernardi Alves](https://github.com/Mateus-Bernardi)**
