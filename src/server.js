/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import 'babel-core/polyfill';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from './routes';
import Html from './components/Html';
import http from 'http';
import io from 'socket.io'
import Poller from './core/poller'

const app = global.server = express();
const port = (process.env.PORT || 5000);

app.set('port', port);
app.use(express.static(path.join(__dirname, 'public')));

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use('/api/content', require('./api/content'));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    let statusCode = 200;
    const data = { title: '', description: '', css: '', body: '' };
    const css = [];
    const context = {
      onInsertCss: value => css.push(value),
      onSetTitle: value => data.title = value,
      onSetMeta: (key, value) => data[key] = value,
      onPageNotFound: () => statusCode = 404,
    };

    await Router.dispatch({ path: req.path, context }, (state, component) => {
      data.body = ReactDOM.renderToString(component);
      data.css = css.join('');
    });

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(statusCode).send('<!doctype html>\n' + html);
  } catch (err) {
    next(err);
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------
// Remove this, we need the port for the server instance below
// app.listen(app.get('port'), () => {
//   /* eslint-disable no-console */
//   console.log('The server is running at http://localhost:' + app.get('port'));
//   if (process.send) {
//     process.send('online');
//   }
// });

//
// Attach the socket.io server
// -----------------------------------------------------------------------------
const server = http.createServer(app);
server.listen(port);
const socket_io = io.listen(server);

let poller = new Poller(socket_io);
poller.execute();
