const {Server} = require('net');
const {handleData} = require('./lib/app');

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
