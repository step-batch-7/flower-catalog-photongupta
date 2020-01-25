const collectHeadersAndContent = (result, line) => {
  if (line === '' && !result.body) {
    result.body = '';
  }
  if ('body' in result) {
    result.body += line;
    return result;
  }
  const [key, value] = line.split(': ');
  result.headers[key] = value;
  return result;
};

const getKeyValue = function(query, keyValue) {
  const [key, value] = keyValue.split('=');
  query[key] = value;
  return query;
};

const readParameter = function(keyValue) {
  const keyValuePair = keyValue.split('&');
  return keyValuePair.reduce(getKeyValue, {});
};

const parseQueryParameters = function(entireUrl) {
  const [url, queryText] = entireUrl.split('?');
  const query = queryText && readParameter(queryText);
  return {url, query};
};

class Request {
  constructor(method, url, query, headers, body) {
    this.method = method;
    this.url = url;
    this.query = query;
    this.headers = headers;
    this.body = body;
  }
  static parse(requestText) {
    const [requestLine, ...headersAndBody] = requestText.split('\r\n');
    const [method, entireUrl, protocol] = requestLine.split(' ');
    const {url, query} = parseQueryParameters(entireUrl);
    let {headers, body} = headersAndBody.reduce(collectHeadersAndContent, {
      headers: {}
    });
    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      body = readParameter(body);
    }
    return new Request(method, url, query, headers, body);
  }
}

module.exports = Request;
