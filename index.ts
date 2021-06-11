import config from './config/default.json';
import express from 'express';
import { create } from 'venom-bot';
import { catchQR, statusFind, start } from './venom/route';
import { routeBuilder } from './express/route';
import { addVenomOnRequest } from './express/helper';

const app = express();
const PORT = config.api.port;
app.use(express.json());
app.use(express.urlencoded());

create(config.sessionName, catchQR, statusFind)
    .then((client) => {
        start(client);
        app.use(addVenomOnRequest(client))

        app.use("/"+config.sessionName,routeBuilder(client));
    })
    .catch((erro) => {
      console.log(erro);
    });

app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});