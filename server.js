const {Server} = require('net');
const fs = require('fs');

const CONTENT_TYPES = {
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  jpg: 'image/jpg',
  gif: 'image/gif'
};

const collectHeadersAndContent = (result, line) => {
  if (line === '') {
    result.body = '';
    return result;
  }
  if ('body' in result) {
    result.body += line;
    return result;
  }
  const [key, value] = line.split(': ');
  result.headers[key] = value;
  return result;
};

class Request {
  constructor(method, url, headers, body) {
    this.method = method;
    this.url = url;
    this.headers = headers;
    this.body = body;
  }

  static parse(requestText) {
    const [request, ...headersAndBody] = requestText.split('\r\n');
    const [method, url, protocol] = request.split(' ');
    const {headers, body} = headersAndBody.reduce(collectHeadersAndContent, {
      headers: {}
    });
    const req = new Request(method, url, headers, body);
    return req;
  }
}

class Response {
  constructor() {
    this.statusCode = 404;
    this.headers = [{key: 'Content-Length', value: 0}];
  }

  setHeader(key, value) {
    let header = this.headers.find(header => header.key === key);
    if (header) header.value = value;
    else this.headers.push({key, value});
  }

  generateHeader() {
    const lines = this.headers.map(header => `${header.key}: ${header.value}`);
    return lines.join('\r\n');
  }

  writeTo(socket) {
    socket.write(`HTTP/1.1 ${this.statusCode}\r\n`);
    socket.write(this.generateHeader());
    socket.write('\r\n\r\n');
    this.body && socket.write(this.body);
  }
}

const servePage = req => {
  console.log(req.url);
  const path = `${__dirname}${req.url}`;
  const content = fs.readFileSync(path);
  const extension = req.url.split('.').reverse()[0];
  const res = new Response();
  res.setHeader('Content-Type', CONTENT_TYPES[extension]);
  res.setHeader('Content-Length', content.length);
  res.statusCode = 200;
  res.body = content;
  return res;
};

const findHandler = req => {
  if (req.method === 'GET' && req.url === '/') {
    req.url = '/home.html';
    return servePage;
  }
  if (req.method === 'GET') return servePage;
  return () => new Response();
};

const handleConnection = function(socket) {
  const remote = `${socket.remoteAddress}is listening on port ${socket.remotePort}`;
  socket.setEncoding('utf8');
  socket.on('close', () => console.warn(`${remote} closed `));
  socket.on('end', () => console.warn(`${remote} ended`));
  socket.on('error', err => console.error('Error', err));
  socket.on('data', text => {
    console.warn(`${remote} data =>\n`);
    const req = Request.parse(text);
    const handler = findHandler(req);
    const res = handler(req);
    res.writeTo(socket);
  });
};

const main = port => {
  const server = new Server();
  server.on('connection', handleConnection);
  server.on('listening', () =>
    console.warn('server is listing', server.address())
  );
  server.listen(port);
};

main(9000);
