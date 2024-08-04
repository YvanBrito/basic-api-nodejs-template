import 'reflect-metadata';
import { createServer } from 'node:http';
import path from 'node:path';
import express from 'express';
import cors from 'cors';
import { engine } from 'express-handlebars';
import passport from 'passport';
import session from 'express-session';
import routes from './routes';
import { createChatServer } from './socket/chat';
import { AppDataSource } from './data-source';
import { errorHandler } from './middlewares/errorHandler';
import { localStrategy } from './utils/local-strategy';

const PORT = process.env.NODE_LOCAL_PORT;

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, './views'));
    app.use(express.static('public'));
    app.get('/', function (req, res) {
      res.render('home', { apiVersion: process.env.npm_package_version });
    });

    app.use(
      session({
        secret: process.env.PASSPORT_SECRET || '',
        resave: false,
        saveUninitialized: false,
        rolling: true,
        name: 'sid',
        cookie: {
          httpOnly: true,
          maxAge: 20 * 60 * 1000,
        },
      }),
    );
    passport.use(localStrategy);
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/api', routes);
    app.use(errorHandler);

    const server = createServer(app);

    createChatServer(server).listen();

    server.listen(PORT, () => {
      console.log(`server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
