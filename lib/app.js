const {
  serveGuestBook,
  serveStaticFile,
  serveDefaultPage,
  submit
} = require('./servePages');

const getHandler = {
  '/index.html': serveStaticFile,
  '/guestBook.html': serveGuestBook,
  defaultHandler: serveStaticFile
};

const postHandler = {
  '/guestBook.html': submit,
  defaultHandler: serveDefaultPage
};

const methodHandler = {
  GET: getHandler,
  POST: postHandler,
  notPresent: {defaultHandler: serveDefaultPage}
};

const findHandler = function(req) {
  if (req.url === '/') {
    req.url = '/index.html';
  }
  const handlers = methodHandler[req.method] || methodHandler.notPresent;
  const handler = handlers[req.url] || handlers['defaultHandler'];
  console.log(handler);
  return handler;
};

const handleData = function(req, res) {
  const handler = findHandler(req);
  handler(req, res);
};

module.exports = {handleData};
