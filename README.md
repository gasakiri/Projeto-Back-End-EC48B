# Micro-Blogging API - Projeto Web Back-End

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## Sobre o Projeto

Este repositório contém o **Projeto 2** da disciplina de **Programação Web Back-End (EC48B-C71)**. O projeto consiste em uma **API RESTful** completa para uma plataforma de **micro-blogging**, similar ao Twitter.

Construído sobre o **Node.js** e o framework **Express.js**, o projeto evolui as classes de acesso a dados do Projeto 1 para criar um servidor web funcional. Ele implementa um sistema de autenticação baseado em sessões, rotas protegidas e operações completas de **CRUD** (Create, Read, Update, Delete) para usuários, postagens e comentários.

A API é projetada para servir como o back-end para qualquer aplicação front-end, retornando dados em formato **JSON** e utilizando códigos de status HTTP para comunicar os resultados das operações.

## Funcionalidades Principais

*   **👤 Autenticação de Usuários:** Sistema completo com rotas para cadastro (`signup`), login (`login`) e logout.
*   **🔐 Gerenciamento de Sessão:** Utiliza `express-session` para manter os usuários autenticados e proteger rotas.
*   **🛡️ Rotas Protegidas:** Middleware de autenticação (`requireAuth`) que garante que apenas usuários logados possam criar, editar ou deletar conteúdo.
*   **📝 Gerenciamento de Posts (CRUD):** Endpoints para criar, listar, visualizar, atualizar e deletar postagens.
*   **💬 Gerenciamento de Comentários (CRUD):** Endpoints para adicionar, listar, visualizar, atualizar e deletar comentários em uma postagem específica.
*   **⚙️ Validação de Dados:** Verificação de campos obrigatórios e retorno de mensagens de erro claras.
*   **📄 Logging de Erros:** Sistema robusto que registra todas as exceções em `logs/error.log` para facilitar a depuração.
*   **🏛️ Arquitetura Organizada:** O código é estruturado em Models, Views, Controllers (MVC), com separação clara de responsabilidades (rotas, controladores, modelos, middlewares).

---

## Estrutura do Projeto

```
micro-blogging-api/
├── logs/
│   └── error.log               # Registro de todos os erros da aplicação
├── src/
│   ├── config/
│   │   ├── db.js               # Módulo de conexão com o MongoDB
│   │   └── errorHandler.js     # Módulo de logging de erros
│   ├── controllers/
│   │   ├── authController.js   # Lógica para signup, login e logout
│   │   ├── postController.js   # Lógica CRUD para posts
│   │   └── commentController.js# Lógica CRUD para comentários
│   ├── middleware/
│   │   └── authMiddleware.js   # Middleware para proteger rotas
│   ├── models/
│   │   ├── User.js             # Classe de modelo para usuários
│   │   ├── Post.js             # Classe de modelo para postagens
│   │   └── Comment.js          # Classe de modelo para comentários
│   ├── routes/
│   │   ├── authRoutes.js       # Definição das rotas de autenticação
│   │   ├── postRoutes.js       # Definição das rotas de posts
│   │   └── commentRoutes.js    # Definição das rotas de comentários (aninhadas)
│   └── app.js                  # Ponto de entrada da aplicação, configuração do servidor Express
├── package.json
└── README.md
```

## Tecnologias Utilizadas

*   **[Node.js](https://nodejs.org/)**: Ambiente de execução JavaScript no servidor.
*   **[Express.js](https://expressjs.com/)**: Framework para construção de APIs e aplicações web.
*   **[Express-session](https://www.npmjs.com/package/express-session)**: Middleware para gerenciamento de sessões.
*   **[MongoDB](https://www.mongodb.com/)**: Banco de dados NoSQL orientado a documentos.
*   **[Driver Nativo MongoDB](https://www.npmjs.com/package/mongodb)**: Cliente oficial para interação com o banco.

## Como Executar o Projeto

### Pré-requisitos

*   **Node.js** (versão 14.x ou superior)
*   **npm** (instalado junto com o Node.js)
*   **MongoDB** rodando localmente na porta padrão `27017`.
*   Um cliente de API como **[Postman](https://www.postman.com/)** ou **[Insomnia](https://insomnia.rest/)** para testar os endpoints.

### Instalação e Configuração

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/gasakiri/Projeto-Back-End-EC48B.git
    cd Projeto-Back-End-EC48B
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    O projeto utiliza um arquivo `.env` para configurações sensíveis.
    *   Crie um arquivo chamado `.env` na raiz do projeto.
    *   Copie o conteúdo do arquivo `.env.example` ou use o modelo abaixo:

    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/micro-blogging-db
    SESSION_SECRET=sua_chave_secreta_super_segura
    ```

### Execução

1.  **Inicie o servidor:**
    ```bash
    node src/app.js
    ```
    Você verá a seguinte mensagem no console:
    ```
    Servidor rodando em http://localhost:3000
    ```

## Documentação da API (Endpoints)

A seguir estão todos os endpoints disponíveis na API.

---

### Autenticação

| Método | Rota             | Descrição                     | Proteção | Corpo da Requisição (JSON)                            |
| :----- | :--------------- | :---------------------------- | :------- | :---------------------------------------------------- |
| `POST` | `/auth/signup`   | Registra um novo usuário.       | Pública  | `{ "username": "...", "email": "...", "password": "..." }` |
| `POST` | `/auth/login`    | Autentica um usuário e cria uma sessão. | Pública  | `{ "email": "...", "password": "..." }`                 |
| `POST` | `/auth/logout`   | Encerra a sessão do usuário.    | Pública  | (Nenhum)                                              |

### Posts

| Método  | Rota            | Descrição                      | Proteção                | Corpo da Requisição (JSON)           |
| :------ | :-------------- | :----------------------------- | :---------------------- | :----------------------------------- |
| `POST`    | `/post`         | Cria uma nova postagem.        | Requer Autenticação     | `{ "content": "..." }`               |
| `GET`     | `/post`         | Lista todas as postagens.      | Pública                 | (Nenhum)                             |
| `GET`     | `/post/:id`     | Busca uma postagem específica. | Pública                 | (Nenhum)                             |
| `PATCH`   | `/post/:id`     | Atualiza uma postagem.         | Requer Autenticação (Autor) | `{ "content": "..." }`               |
| `DELETE`  | `/post/:id`     | Exclui uma postagem.           | Requer Autenticação (Autor) | (Nenhum)                             |

### Comentários

*As rotas de comentários são aninhadas sob as rotas de posts.*

| Método  | Rota                       | Descrição                        | Proteção                | Corpo da Requisição (JSON)           |
| :------ | :------------------------- | :------------------------------- | :---------------------- | :----------------------------------- |
| `POST`    | `/post/:id/comments`       | Adiciona um comentário a um post.    | Requer Autenticação     | `{ "content": "..." }`               |
| `GET`     | `/post/:id/comments`       | Lista todos os comentários de um post. | Pública                 | (Nenhum)                             |
| `GET`     | `/post/:id/comments/:commentId` | Busca um comentário específico.      | Pública                 | (Nenhum)                             |
| `PATCH`   | `/post/:id/comments/:commentId` | Atualiza um comentário.            | Requer Autenticação (Autor) | `{ "content": "..." }`               |
| `DELETE`  | `/post/:id/comments/:commentId` | Exclui um comentário.              | Requer Autenticação (Autor) | (Nenhum)                             |

---

## Conformidade com os Requisitos do Projeto 2

Este projeto atende a todos os requisitos da proposta:

✅ **Framework Express.js:** Utilizado como base para o servidor e gerenciamento de rotas.  
✅ **Rotas e Parâmetros (GET/POST):** Implementação completa de rotas RESTful com tratamento de `req.body` e `req.params`.  
✅ **Uso de Sessões para Autenticidade:** O sistema de login cria uma sessão que é validada em rotas protegidas.  
✅ **Retorno em Formato JSON:** Todas as respostas da API são enviadas no formato JSON.  
✅ **Implementação dos Casos de Uso:** Funcionalidades de CRUD para posts e comentários estão completas e seguem a lógica de um micro-blog.  
✅ **Validação de Campos e Mensagens de Erro:** Verificação de campos obrigatórios e retorno de respostas com códigos de status e mensagens claras.  
✅ **Rotina de Login e Permissão:** A rotina de login e o middleware de autenticação identificam e controlam o acesso dos usuários ao sistema.

---

## Autores

- **[Gabriel Augusto Morisaki Rita](https://github.com/gasakiri)**
- **[Mateus Bernardi Alves](https://github.com/Mateus-Bernardi)**

## Licença

Este projeto foi desenvolvido para fins acadêmicos como parte da disciplina EC48B-C71 - Programação Web Back-End.
