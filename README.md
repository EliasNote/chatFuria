<h1 align="center">FURIA Chatbot</h1>

<p align="center">
  <img src="https://raw.githubusercontent.com/EliasNote/chatFuria/main/chat-front/src/assets/logo.svg" alt="FURIA Logo" width="120" />
</p>

## 🚀 Overview

Este projeto integra dois aplicativos que entregam uma experiência conversacional para os fãs do time de CS da FURIA. A API (NestJS) gerencia as requisições e a interface (React/Vite) permite a interação dos usuários.

## 👨‍💻 Desenvolvedor

Elias Mathias Sand: [elias.coder1@gmail.com](mailto:elias.coder1@gmail.com) - [GitHub](https://github.com/EliasNote) - [LinkedIn](https://www.linkedin.com/in/elias-mathias-sand/)

## 📝 Descrição do Desafio

**Challenge #1 - Experiência Conversacional FURIA**  
_Nível: Normal_

Crie um chatbot ou interface conversacional para os fãs do time de CS da FURIA! Pode ser Telegram bot, web chat ou app.

Ambos os projetos foram desenvolvidos para cumprir este desafio, oferecendo:

- **API:** Controle e processamento das mensagens com integração ao Gemini.
- **Front:** Interface web interativa para envio e exibição de mensagens.

## 🔧 Recursos e Tecnologias

- **Frontend:**

  - React ⚛️
  - Vite ⚡
  - TypeScript 📝
  - CSS3 🎨
  - React Markdown

- **Backend:**

  - NestJS 🧩
  - TypeScript 📝
  - Gemini AI

## 📥 Instalação e Uso

### Pré-requisitos

- Node.js (v14+)
- npm ou yarn

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/EliasNote/chatFuria.git
   cd chatFuria
   ```

2. Instale as dependências da API:

   ```bash
   cd chat-api
   npm install
   # ou yarn install
   ```

3. Instale as dependências do Frontend:
   ```bash
   cd ../chat-front
   npm install
   # ou yarn install
   ```

### 🔑 Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na pasta `chat-api` com:

```
GEMINI_API_KEY=your_api_key_here
GEMINI_API_MODEL=your_model_here

# MODEL RECOMENDADO
gemini-2.5-pro-exp-03-25
```

Crie um arquivo `.env` na pasta `chat-front` com:

```
VITE_API_URL=http://localhost:8080
# Para produção / deploy:
# VITE_API_URL=https://chatfuria-j6xx.onrender.com
```

### Execução

- **API:**
  Para iniciar a API em modo de desenvolvimento:

  ```bash
  cd chat-api
  npm run start:dev
  ```

- **Frontend:**
  Para iniciar o frontend:
  ```bash
  cd chat-front
  npm run dev
  ```

Acesse a aplicação em: `http://localhost:5173`

📦 Deploy
🌐 Confira a versão pública em: [Data Furia 🚀](https://eliasnote.github.io/chatFuria/)

---

<p align="center">
  Desenvolvido por <strong>EliasNote</strong>
</p>
````
