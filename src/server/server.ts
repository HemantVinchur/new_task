import http2 from 'http2';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import koaBody from 'koa-body';
import cors from '@koa/cors';
import { Middleware } from 'koa-compose';
import convert from 'koa-convert';
import helmet from 'koa-helmet';
import logger from 'koa-logger';
import mount from 'koa-mount';
import passport from 'koa-passport';
import serve from 'koa-static';
import 'reflect-metadata';
import errorMiddleware from '../app/core/middleware/ErrorMiddleware';
import routes from '../app/routes';
import config from '../resources/config';

const app: Koa = new Koa();
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);

// Socket.IO events
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle messages from clients
  socket.on('message', (data) => {
    console.log('Message from client:', data);

    // Broadcast the message to all connected clients
    io.emit('message', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

const _use: Function = app.use;
app.use = (x: Middleware<any>) => _use.call(app, convert(x));

app.use(async (ctx, next) => {
  await next();
});

app.use(helmet());
app.use(logger());
app.use(bodyParser());
app.use(errorMiddleware.errorMiddleware());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));

routes(app);

app.listen(config.PORT, () => {
  console.log(`Server started on ${config.PORT}`);
});
