# Backend API para Web Push Notifications
<h4>Este projeto é uma API backend criada com Express.js para enviar notificações web push. O projeto utiliza web-push para gerenciar as notificações e está configurado para ser executado dentro de um contêiner Docker.</h4><br/>


## Tecnologias Utilizadas
- Node.js
- Express.js
- Web Push (web-push library)
- Docker

<hr/>

## *Instalação e Configuração:* 
### Pré Requisitos 
 - Docker e Docker Compose
 - (caso em instancia local sem conteiner) Node.js v18^ e npm 
<br/>

### Passos para configuração (sem docker)
 1. Clone o Repositório
 ```sh
    git clone https://github.com/a32fred/notification-webpush.git
 ```

```sh
    cd notification-webpush/backend
    npm i
 ```

 2. Crie um arquivo .env na raiz do projeto /backend com o seguinte conteúdo:
```plaintext
    VAPID_PUBLIC_KEY=your-vapid-public-key
    VAPID_PRIVATE_KEY=your-vapid-private-key
```
 Substitua your-vapid-public-key e your-vapid-private-key pelas suas chaves VAPID.

 ### Executar o Projeto com Docker
1. Contruir a imagem Docker: (na raiz do projeto tem o arquivo 'docker-compose.yml')
```sh
docker-compose build
```

2. Incia os conteiner:
```sh
docker-compose up -d 
```

O servidor (backend) estará rodando na porta 3322.
    acesso da documentação via swagger da api na rota: localhost:3322/api-docs

### *Exemplo de uso*
<img src="/backend/public/Swagger-api.png" alt="Imagem de Exemplificação da api">
