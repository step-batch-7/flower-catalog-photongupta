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

module.exports = Request;
