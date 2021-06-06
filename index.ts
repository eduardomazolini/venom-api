import config from './config/default.json';
import express from 'express';
import venom from 'venom-bot';
import {catchQR, statusFind, start} from './venom/route';
import {routeBuilder} from './express/route';
const app = express();
const PORT = config.api.port;

venom
    .create('meucelular', catchQR, statusFind)
    .then((client) => {
        start(client);
        routeBuilder(client);
    })
    .catch((erro) => {
      console.log(erro);
    });
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});