'use strict';

const http = require('http');
const {app} = require('./lib/handler');
const defaultPort = 5000;

const main = function(port = defaultPort) {
  const server = http.createServer();
  server.on('request', app.serve.bind(app));
  server.listen(port, () =>
    process.stdout.write('server is listing', server.address())
  );
};

main();
