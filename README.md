

# Micro-Blogging API - Projeto Web Back-End

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## Sobre o Projeto

Esta é uma API RESTful completa para uma plataforma de **micro-blogging**, similar ao Twitter, desenvolvida como parte do Projeto 1 da disciplina de **Programação Web Back-End (EC48B-C71)**.

A aplicação foi construída utilizando **Node.js** puro, sem o uso de frameworks como Express, para demonstrar um entendimento profundo do funcionamento do módulo `http` nativo. A interação com o banco de dados é gerenciada pelo **Mongoose**, que se conecta a uma instância do **MongoDB**.

O projeto implementa todas as funcionalidades essenciais de uma rede social, incluindo gerenciamento de usuários, criação e gerenciamento de postagens e um sistema de comentários aninhados a posts. Um dos focos principais do projeto é o robusto sistema de **tratamento de exceções e logging**, que captura e armazena todos os erros da aplicação em um arquivo de log para facilitar a depuração e monitoramento.

---

## Funcionalidades Principais

*   **👤 Gerenciamento de Usuários:** CRUD completo (Criar, Ler, Atualizar, Deletar) para usuários.
*   **📝 Gerenciamento de Postagens:** CRUD completo para as postagens dos usuários.
*   **💬 Gerenciamento de Comentários:** Sistema de comentários vinculados a postagens, com operações CRUD completas.
*   **⚙️ Validação de Dados:** Validação de campos obrigatórios e formato de dados diretamente no Schema do Mongoose, com feedback claro para o cliente em caso de erro.
*   **📄 Logging de Erros:** Um módulo de tratamento de erros centralizado que registra todas as exceções da aplicação em `logs/error.log`, incluindo timestamp, contexto do erro e stack trace.
*   **🔌 Arquitetura Organizada:** O código é estruturado de forma modular e clara, seguindo o padrão MVC (Model-View-Controller) para separar as responsabilidades.

---

## Estrutura do Projeto

O projeto está organizado da seguinte forma para garantir manutenibilidade e escalabilidade:

```
micro-blogging-api/
├── src/
│   ├── controllers/      # Camada de controle (lógica de negócio)
│   │   ├── UserController.js
│   │   ├── PostController.js
│   │   └── CommentController.js
│   ├── models/           # Camada de modelo (schemas do banco de dados)
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Comment.js
│   ├── database/         # Configuração da conexão com o banco de dados
│   │   └── db.js
│   └── utils/            # Módulos utilitários (ex: error handler)
│       └── errorHandler.js
├── routes/
│   └── routes.js         # Definição e gerenciamento de todas as rotas da API
├── logs/
│   └── error.log         # Arquivo onde os erros são registrados
├── app.js                # Ponto de entrada da aplicação (criação do servidor)
└── package.json
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
    O projeto está configurado para se conectar a um banco local por padrão. A string de conexão está no arquivo `src/database/db.js`:
    ```javascript
    const MONGO_URI = "mongodb://localhost:27017/micro-blogging-db";
    ```
    Certifique-se de que seu serviço MongoDB está ativo.

4.  **Inicie o servidor:**
    ```sh
    node app.js
    ```

5.  O servidor estará em execução em `http://localhost:3000`.

---

##  API Endpoints (Documentação)

A seguir estão todos os endpoints disponíveis na API.

### 👤 Rotas de Usuários (`/users`)

| Método | Rota         | Descrição                    | Corpo da Requisição (Exemplo)                                    |
| :----- | :----------- | :----------------------------- | :--------------------------------------------------------------- |
| `GET`    | `/users`     | Lista todos os usuários.       | N/A                                                              |
| `GET`    | `/users/:id` | Busca um usuário por ID.       | N/A                                                              |
| `POST`   | `/users`     | Cria um novo usuário.          | `{ "username": "jane_doe", "email": "jane@email.com", "password": "123" }` |
| `PUT`    | `/users/:id` | Atualiza um usuário existente. | `{ "email": "new_email@email.com" }`                               |
| `DELETE` | `/users/:id` | Deleta um usuário.             | N/A                                                              |

### 📝 Rotas de Postagens (`/posts`)

| Método | Rota         | Descrição                     | Corpo da Requisição (Exemplo)                                 |
| :----- | :----------- | :------------------------------ | :------------------------------------------------------------ |
| `POST`   | `/posts`     | Cria uma nova postagem.         | `{ "content": "Este é o meu primeiro post!", "authorId": "60d..." }` |
| `GET`    | `/posts/:id` | Busca uma postagem por ID.      | N/A                                                           |
| `PUT`    | `/posts/:id` | Atualiza uma postagem existente.| `{ "content": "Meu post foi atualizado." }`                     |
| `DELETE` | `/posts/:id` | Deleta uma postagem.            | N/A                                                           |

### 💬 Rotas de Comentários (`/posts/:postId/comments`)

| Método | Rota                                  | Descrição                                 | Corpo da Requisição (Exemplo)                                  |
| :----- | :------------------------------------ | :------------------------------------------ | :------------------------------------------------------------- |
| `POST`   | `/posts/:postId/comments`             | Cria um novo comentário em uma postagem.    | `{ "content": "Ótimo post!", "authorId": "60d...", "postId": "..." }` |
| `GET`    | `/posts/:postId/comments`             | Lista todos os comentários de uma postagem. | N/A                                                            |
| `GET`    | `/posts/:postId/comments/:commentId`  | Busca um comentário específico.           | N/A                                                            |
| `PUT`    | `/posts/:postId/comments/:commentId`  | Atualiza um comentário específico.        | `{ "content": "Gostei muito deste post!" }`                      |
| `DELETE` | `/posts/:postId/comments/:commentId`  | Deleta um comentário específico.          | N/A                                                            |

---

## Tratamento de Erros e Logging

O sistema de tratamento de erros é um pilar deste projeto.

*   **Captura**: Todos os controladores utilizam blocos `try...catch` para capturar exceções que possam ocorrer durante o processamento da requisição (ex: falha no banco de dados, dados inválidos).
*   **Logging**: Ao capturar um erro, a função `logError` do módulo `src/utils/errorHandler.js` é chamada. Ela formata uma mensagem de log detalhada e a anexa ao arquivo `logs/error.log`.
*   **Formato do Log**: Cada entrada de log contém:
    *   `Timestamp`: Data e hora exatas do erro.
    *   `Contexto`: Onde o erro ocorreu (ex: `UserController.createUser`).
    *   `Mensagem do Erro`: A mensagem de erro original.
    *   `Stack Trace`: A pilha de chamadas que levou ao erro, essencial para depuração.
*   **Resposta ao Cliente**: Além de registrar o erro, a API sempre retorna uma resposta JSON com um código de status HTTP apropriado (`400`, `404`, `500`) para informar ao cliente sobre o problema.

---

## Autores

- **[Gabriel Augusto Morisaki Rita](https://github.com/gasakiri)**
- **[Mateus Bernardi Alves](https://github.com/Mateus-Bernardi)**
