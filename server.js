const http = require('http');
const {findHandler} = require('./lib/app');

const handleRequest = function(req, res) {
  const remote = `req from port ${req.socket.remotePort}`;
  req.setEncoding('utf8');
  req.on('close', () => console.warn(`${remote}:closed `));
  req.on('error', err => console.error('Error', err));
  const handler = findHandler(req);
  handler(req, res);
};

const main = function(port = 8000) {
  const server = http.createServer();
  server.on('request', handleRequest);
  server.listen(port, () => console.log('server is listing', server.address()));
};

main(9000);
