const express = require('express');
const app = express();
const cors = require("cors");
const webpush = require('web-push');
const http = require('http');
const cluster = require('cluster');
const os = require('os');
const winston = require('winston');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const numCPUs = os.cpus().length;
const publicKey = process.env.VAPID_PUBLIC_KEY;
const privateKey = process.env.VAPID_PRIVATE_KEY;


webpush.setVapidDetails('mailto:fredericocarlos.a32@gmail.com', publicKey, privateKey);

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });

  app.use(cors());
  app.use(express.json());

  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Notification API',
        version: '1.0.0',
        description: 'API para envio de notificações',
        contact: {
          name: 'Seu Nome',
          email: 'fredericocarlos.a32@gmail.com'
        },
      },
    },
    apis: ['./index.js'], // Caminho para os comentários JSDoc
  };

  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  /**
   * @swagger
   * /key:
   *   get:
   *     summary: Obtém a chave pública
   *     responses:
   *       200:
   *         description: Chave pública retornada com sucesso
   */
  app.get('/key', (req, res) => {
    logger.info('Rota /key acessada');
    res.json({ publicKey });
  });

  /**
   * @swagger
   * /registerFCMToken:
   *   post:
   *     summary: Registra o token do FCM
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               token:
   *                 type: string
   *     responses:
   *       200:
   *         description: Token registrado com sucesso
   */
  app.post('/registerFCMToken', (req, res) => {
    logger.info('Rota /registerFCMToken acessada', { body: req.body });
    res.json({ success: true });
  });

  /**
   * @swagger
   * /sendNotification:
   *   post:
   *     summary: Envia uma notificação
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               subscription:
   *                 type: object
   *     responses:
   *       200:
   *         description: Notificação enviada com sucesso
   *       500:
   *         description: Erro ao enviar notificação
   */
  app.post('/sendNotification', async (req, res) => {
    logger.info('Rota /sendNotification acessada', { body: req.body });
    const { subscription } = req.body;
    // Verifique se subscription está definida e contém o endpoint
    if (!subscription || !subscription.endpoint) {
        logger.error('Subscription inválida');
        return res.status(400).send('Subscription inválida');
    }

    // Envio da notificação
    setTimeout(() => {
        try {
            webpush.sendNotification(subscription, 'Mensagem enviada pelo back end');
            logger.info('Notificação enviada', { subscription });
            res.sendStatus(200);
        } catch (error) {
            logger.error('Erro ao enviar notificação', { error });
            res.sendStatus(500);
        }
    }, 10000);
});

  const server = http.createServer(app);

  server.listen(3322, () => {
    console.log(`Worker ${process.pid} started`);
    logger.info(`Servidor iniciado na porta 3322 pelo worker ${process.pid}`);
  });
}
