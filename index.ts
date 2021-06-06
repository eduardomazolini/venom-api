import config from './config/default.json';
import express from 'express';
var bodyParser = require('body-parser')
import { create } from 'venom-bot';
import {catchQR, statusFind, start} from './venom/route';
import {routeBuilder} from './express/route';
const app = express();
const PORT = config.api.port;
app.use(bodyParser.json())

create(config.sessionName, catchQR, statusFind)
    .then((client) => {
        start(client);
        app.use(routeBuilder(client));
    })
    .catch((erro) => {
      console.log(erro);
    });
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});