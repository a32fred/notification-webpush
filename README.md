# Projeto de Notificações Push

Este projeto tem como objetivo demonstrar a implementação de notificações push em uma aplicação web utilizando JavaScript, Node.js, Express e Web Push.


>no momento não funciona em IOS 

![preview](https://cdn.discordapp.com/attachments/1088804898117795945/1166304613935357983/image.png?ex=654a00d0&is=65378bd0&hm=a415b3d509af64bb4d11dc1c28fa04218ceb059a6dfd90472c50288ac710e280&)

## Funcionalidades

- Registro de Service Worker para habilitar notificações push no navegador.
- Geração de chaves de autenticação para Web Push.
- Envio de notificações push do servidor para o cliente.

## instalação

###  Clonando o Repositório

- Clone este repositório para o seu ambiente local:

```bash
git clone https://github.com/a32fred/notification-webpush.git
```

- Instalação de Dependências
Execute o seguinte comando para instalar as dependências do projeto:

```bash
cd notification-webpush 
npm install
```


```bash
npm run dev
```
-O servidor estará disponível em [localhost:3000](localhost:3000)

## Criação do back end

 1.  Crie um novo projeto Node.js para o servidor backend.
    
2.  Copie o código do arquivo `server.js` deste projeto para o novo projeto Node.js.
    
3.  Instalação de Dependências no novo projeto:
    
```bash 
npm install express web-push cors http
```

4. Dentro do front altere as url para o seu back end 
5. codigo de exemplo  do back end funcional para o aplicação desse repo
```javascript
const express = require('express');
const app = express();
const cors = require("cors");
const webpush = require('web-push');
const server = require('http').createServer(app);

//chaves podem ser geradas com: web-push generate-vapid-keys --json
//no proprio terminal dps so anotar

const publicKey = 'SUA_CHAVE_PUBLICA'; 
const privateKey = 'SUA_CHAVE_PRIVADA';

webpush.setVapidDetails('mailto:example@email.com', publicKey, privateKey);

app.use(cors());
app.use(express.json());

app.get('/key', (req, res) => {
  res.json({ publicKey });
});

app.post('/registerFCMToken', (req, res) => {
  console.log(req.body);
  res.json({ success: true });
});

app.post('/sendNotification', async (req, res) => {
  const { subscription } = req.body;
  setTimeout(()=> {
    try {
      webpush.sendNotification(subscription, 'Mensagem enviada pelo back end');
      res.sendStatus(200); 
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
      res.sendStatus(500); 
    }
  }, 10000)

});

server.listen(3322, () => {
  console.log('Servidor iniciado na porta 3322');
});

```
# contribuições

Sinta-se à vontade para contribuir com melhorias ou correções de bugs. Abra uma issue ou envie um pull request.
