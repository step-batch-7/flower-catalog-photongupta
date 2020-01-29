const http = require('http');
const {app} = require('./lib/handler');

const main = function(port = 8000) {
  const server = http.createServer();
  server.on('request', app.serve.bind(app));
  server.listen(port, () => console.log('server is listing', server.address()));
};

main(9000);
