const {
  serveGuestBook,
  serveStaticFile,
  serveSubmitPage,
  notFound
} = require('./servePages');

const getHandler = {
  '/index.html': serveStaticFile,
  '/guestBook.html': serveGuestBook,
  defaultHandler: serveStaticFile
};

const postHandler = {
  '/guestBook.html': serveSubmitPage,
  defaultHandler: serveStaticFile
};

const methodHandler = {
  GET: getHandler,
  POST: postHandler,
  notPresent: {defaultHandler: notFound}
};

const findHandler = function(req) {
  const handlers = methodHandler[req.method] || methodHandler.notPresent;
  const handler = handlers[req.url] || handlers['defaultHandler'];
  return handler;
};

module.exports = {findHandler};
