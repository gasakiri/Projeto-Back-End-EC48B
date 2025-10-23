
# Micro-Blogging - Projeto Web Back-End

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## Sobre o Projeto

Biblioteca de classes para acesso a banco de dados MongoDB, desenvolvida como **Projeto 1 (Recuperação)** da disciplina de **Programação Web Back-End (EC48B-C71)**.

O projeto implementa um conjunto de **três classes** que representam entidades de um sistema de **micro-blogging** (similar ao Twitter), cada uma com métodos completos de **CRUD** (Create, Read, Update, Delete) para manipulação de dados no MongoDB.

A aplicação utiliza o **driver nativo do MongoDB** para Node.js, **sem frameworks** como Express ou ODMs como Mongoose, demonstrando manipulação direta de operações de banco de dados. Inclui também um sistema robusto de **tratamento de exceções e logging** que captura e armazena erros em arquivo.

## Funcionalidades Principais

*   **👤 Classe User:** CRUD completo para gerenciamento de usuários (username, email, password).
*   **📝 Classe Post:** CRUD completo para gerenciamento de postagens (content, authorId).
*   **💬 Classe Comment:** CRUD completo para gerenciamento de comentários (content, authorId, postId).
*   **⚙️ Validação de Dados:** Validação de campos obrigatórios em todas as operações de criação.
*   **🔒 Tratamento de Exceções:** Blocos try/catch em todos os métodos com propagação adequada de erros.
*   **📄 Logging de Erros:** Módulo centralizado que registra todas as exceções em `logs/error.log`, incluindo timestamp, contexto e stack trace.
*   **✅ Script de Testes:** app.js executa testes automatizados de todos os métodos CRUD das três classes.

---
## Estrutura do Projeto

```

micro-blogging/
├── logs/
│   └── error.log           \# Registro de erros da aplicação
├── app.js                  \# Script de testes das classes
├── User.js                 \# Classe de usuários com CRUD
├── Post.js                 \# Classe de postagens com CRUD
├── Comment.js              \# Classe de comentários com CRUD
├── db.js                   \# Módulo de conexão com MongoDB
├── errorHandler.js         \# Módulo de logging de erros
├── package.json
├── package-lock.json
└── README.md

```


## Tecnologias Utilizadas

*   **[Node.js](https://nodejs.org/)**: Ambiente de execução JavaScript no servidor.
*   **[MongoDB](https://www.mongodb.com/)**: Banco de dados NoSQL orientado a documentos.
*   **[Driver Nativo MongoDB](https://www.npmjs.com/package/mongodb)**: Cliente oficial do MongoDB para Node.js.


## Como Executar o Projeto

### Pré-requisitos

*   **Node.js** (versão 14.x ou superior)
*   **npm** (geralmente instalado junto com o Node.js)
*   **MongoDB** rodando localmente na porta padrão `27017`

### Instalação

1.  **Clone o repositório:**
    ```
    git clone https://github.com/gasakiri/Projeto-Back-End-EC48B.git
    cd Projeto-Back-End-EC48B
    ```

2.  **Instale as dependências:**
    ```
    npm install
    ```

3.  **Verifique a conexão com o banco:**
    O projeto se conecta ao MongoDB local. A configuração está em `db.js`:
    ```
    const MONGO_URI = "mongodb://localhost:27017";
    const DB_NAME = "micro-blogging-db";
    ```
    Certifique-se de que o serviço MongoDB está ativo antes de executar.

4.  **Execute os testes:**
    ```
    node src/app.js
    ```
    O script criará, lerá, atualizará e deletará documentos das três coleções (users, posts, comments), exibindo os resultados no console e gravando logs de erro em `logs/error.log`.


## Métodos Implementados

### User.js

*   `User.create(userData)` - Cria novo usuário com validação de campos obrigatórios e unicidade de username/email.
*   `User.findById(id)` - Busca usuário por ID.
*   `User.findByIdAndUpdate(id, updateData)` - Atualiza dados de um usuário existente.
*   `User.findByIdAndDelete(id)` - Remove usuário do banco.

### Post.js

*   `Post.create(postData)` - Cria nova postagem vinculada a um autor.
*   `Post.findById(id)` - Busca postagem por ID.
*   `Post.findByIdAndUpdate(id, updateData)` - Atualiza conteúdo de uma postagem.
*   `Post.findByIdAndDelete(id)` - Remove postagem do banco.

### Comment.js

*   `Comment.create(commentData)` - Cria novo comentário vinculado a um post e autor.
*   `Comment.findById(id)` - Busca comentário por ID.
*   `Comment.findByIdAndUpdate(id, updateData)` - Atualiza conteúdo de um comentário.
*   `Comment.findByIdAndDelete(id)` - Remove comentário do banco.


## Tratamento de Erros e Logging

O sistema de tratamento de erros segue as boas práticas de captura e registro:

*   **Captura**: Cada método das classes utiliza blocos `try...catch` para capturar exceções durante operações de banco de dados ou validações.
*   **Logging**: Ao capturar um erro, a função `logError` do módulo `errorHandler.js` é invocada, gravando o erro em `logs/error.log`.
*   **Formato do Log**:
    *   **Timestamp**: Data e hora exatas do erro (ISO 8601).
    *   **Contexto**: Identificação do método onde o erro ocorreu (ex: "User.create").
    *   **Mensagem**: Descrição do erro.
    *   **Stack Trace**: Pilha de chamadas completa para depuração.

**Exemplo de entrada no log:**
```

[2025-10-23T18:30:45.123Z] [Contexto: User.create]
Erro: O e-mail é obrigatório.
Stack: Error: O e-mail é obrigatório.
at User.create (User.js:15:13)
...

```

## Conformidade com os Requisitos

Este projeto atende aos requisitos do **Projeto 1 - Recuperação** conforme feedback dos professores:

✅ Três classes de armazenamento (User, Post, Comment)  
✅ Métodos completos de CRUD em todas as classes  
✅ Validação de campos obrigatórios  
✅ Tratamento de exceções com try/catch  
✅ Módulo de logging de erros (errorHandler.js)  
✅ Módulo de conexão com banco (db.js)  
✅ Script de testes (app.js)  
✅ **SEM** arquitetura MVC, rotas ou servidor HTTP (conforme solicitado)

---

## Autores

- **[Gabriel Augusto Morisaki Rita](https://github.com/gasakiri)**
- **[Mateus Bernardi Alves](https://github.com/Mateus-Bernardi)**


## Licença

Este projeto foi desenvolvido para fins acadêmicos como parte da disciplina EC48B-C71 - Programação Web Back-End.



