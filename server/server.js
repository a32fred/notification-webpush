const express = require('express');
const webpush = require('web-push');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Configuração das chaves do VAPID
const vapidKeys = {
  publicKey: 'BCM9uLyX4xMfDk_GUFcSKQNP4qliB9__xRvIEaJUIdNEl99ntVpA4j3-FKDHxwN63z9Dh-ZWOdc3GD7tuzJRrDk',
  privateKey: 'iDBu0vK06_2ow8Qf9Lnv-oECIroX5jpDngdyf-nln-c' // Substitua com a sua Private Key
};

webpush.setVapidDetails(
  'mailto:zurtrah@gmail.com', // Substitua com o seu e-mail
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

app.post('/subscribe', (req, res) => {
  const subscription = req.body;

  res.status(201).json({});

  const payload = JSON.stringify({ title: 'Notificação de Teste' });

  webpush.sendNotification(subscription, payload)
    .catch(error => console.error('Erro ao enviar notificação:', error));
});

app.use(express.static(path.join(__dirname, '../public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
