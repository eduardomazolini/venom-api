import config from './config/default.json';
import express from 'express';
import { create } from 'venom-bot';
import { catchQR, statusFind, start } from './venom/route';
import { routeBuilder } from './express/route';
import { defaultOptions, CreateConfig } from 'venom-bot/dist/config/create-config';
import { puppeteerConfig } from 'venom-bot/dist/config/puppeteer.config';

const app = express();
const PORT = config.api.port;
app.use(express.json());
app.use(express.urlencoded());

create(config.sessionName, catchQR, statusFind,<CreateConfig>{
  folderNameToken: 'tokens',
  mkdirFolderToken: '',
  headless: false, //Default: true
  devtools: false,
  useChrome: true,
  debug: false,
  logQR: true,
  browserWS: '',
  browserArgs: puppeteerConfig.chromiumArgs,
  puppeteerOptions: {},
  disableSpins: true, //Default: false
  disableWelcome: true, //Default: false
  updatesLog: true,
  autoClose: 120000,
  createPathFileToken: true,
  waitForLogin: false, //Default: true
})
    .then((client) => {
        console.log("@@@@@@@@@@@@@@@@@@@@@@VENOM.THEN@@@@@@@@@@@@@@@@@");
        start(client);

        app.use("/"+config.sessionName,routeBuilder(client));
    })
    .catch((erro) => {
      console.log(erro);
    });

app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});