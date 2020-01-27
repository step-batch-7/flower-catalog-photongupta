const {CONTENT_TYPES} = require('./mimeTypes');
const Response = require('./response');

const getResponse = function(reqUrl, content) {
  const extension = reqUrl.match(/.*\.(.*)$/)[1];
  const res = new Response();
  res.setHeader('Content-Type', CONTENT_TYPES[extension]);
  res.setHeader('Content-Length', content.length);
  res.statusCode = 200;
  res.body = content;
  return res;
};

module.exports = {getResponse};
