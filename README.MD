# Web Push Notifications Project

Este projeto consiste em um sistema de notificações web push, dividido em dois serviços principais: o frontend, desenvolvido com Next.js, e o backend, desenvolvido com Express.js. O projeto é totalmente contêinerizado usando Docker e Docker Compose.

## Tecnologias Utilizadas

- **Frontend:**
  - Next.js
  - Tailwind CSS

- **Backend:**
  - Node.js
  - Express.js
  - Web Push (web-push library)

- **Outros:**
  - Docker
  - Docker Compose

## Estrutura do Projeto

```plaintext
/web-push-notification
  ├── /backend
  │   ├── .dockerignore
  │   ├── Dockerfile
  │   ├── package.json
  │   ├── package-lock.json
  │   ├── index.js
  │   └── README.md
  ├── /frontend
  │   ├── .dockerignore
  │   ├── Dockerfile
  │   ├── package.json
  │   ├── next.config.js
  │   ├── tailwind.config.js
  │   ├── jsconfig.json
  │   ├── postcss.config.js
  │   ├── /public
  │   │   └── service-worker.js
  │   ├── /pages
  │   ├── /app
  │   │   ├── layout.js
  │   │   ├── page.js
  │   │   └── globals.css
  │   └── README.md
  ├── docker-compose.yml
  ├── .gitignore
  └── README.md
```

## *Instalação e Configuração:* 
### Pré Requisitos 
 - Docker e Docker Compose
 - (caso em instancia local sem conteiner) Node.js v18^ e npm 
<br/>

### Passos para configuração
 1. Clone o Repositório
 ```sh
    git clone https://github.com/a32fred/notification-webpush.git
 ```

```sh
    cd notification-webpush/
 ```

2. Crie um arquivo .env na raiz de cada serviço (/backend e /frontend) com as seguintes variáveis:
    *backend (`/backend/.env`):*
```plaintext
    VAPID_PUBLIC_KEY=your-vapid-public-key
    VAPID_PRIVATE_KEY=your-vapid-private-key
```
    Substitua your-vapid-public-key e your-vapid-private-key pelas suas chaves VAPID.

*frontend (`/frontend/.env`):*
```plaintext
NEXT_PUBLIC_BACKEND_URL=http://localhost:3322
```
<hr/>

## *Substituindo as Chaves:*
No arquivo docker-compose.yml, substitua os seguintes valores pelas suas próprias chaves VAPID:

 - your-public-key: Substitua pelo valor da sua chave pública VAPID.
 - your-private-key: Substitua pelo valor da sua chave privada VAPID.
Estas chaves são necessárias para o backend poder enviar notificações web push corretamente. Certifique-se de que estas chaves estejam corretamente configuradas para que o serviço funcione como esperado.


### Executar o Projeto com Docker
1. Contruir a imagem Docker: 
```sh
docker-compose build
```

2. Incia os conteiner:
```sh
docker-compose up -d 
```

O servidor (frontend) estará rodando na porta 3000.
O servidor (backend) estará rodando na porta 3322.
    acesso da documentação via swagger da api na rota: localhost:3322/api-docs

### *Exemplo de uso*

<img src="/frontend/public/App.png" alt="Imagem de Exemplificação">