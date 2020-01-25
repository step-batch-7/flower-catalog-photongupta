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

module.exports = Response;
