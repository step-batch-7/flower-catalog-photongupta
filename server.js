const {Server} = require('net');
const fs = require('fs');
const Request = require('./lib/request');
const Response = require('./lib/response');
const {addComment} = require('./lib/AddComment');

const CONTENT_TYPES = {
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  jpg: 'image/jpg',
  gif: 'image/gif'
};

const servePage = function(req) {
  const path = `${__dirname}/public${req.url}`;
  const content = fs.readFileSync(path);
  const extension = req.url.split('.').reverse()[0];
  const res = new Response();
  res.setHeader('Content-Type', CONTENT_TYPES[extension]);
  res.setHeader('Content-Length', content.length);
  res.statusCode = 200;
  res.body = content;
  return res;
};

const findHandler = function(req) {
  if (req.method === 'GET' && req.url === '/') {
    req.url = '/index.html';
  }
  if (req.method === 'GET') return servePage;
  return () => new Response();
};

const handleData = function(text, socket) {
  const req = Request.parse(text);
  if (req.query) addComment(req);
  const handler = findHandler(req);
  const res = handler(req);
  res.writeTo(socket);
};

const handleConnection = function(socket) {
  const remote = `${socket.remoteAddress}is listening on port ${socket.remotePort}`;
  socket.setEncoding('utf8');
  socket.on('close', () => console.warn(`${remote} closed `));
  socket.on('end', () => console.warn(`${remote} ended`));
  socket.on('error', err => console.error('Error', err));
  socket.on('data', text => handleData(text, socket));
};

const main = function(port = 8000) {
  const server = new Server();
  server.on('connection', handleConnection);
  server.on('listening', () =>
    console.warn('server is listing', server.address())
  );
  server.listen(port);
};

main(9000);
