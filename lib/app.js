const Request = require('./request');
const {addComment} = require('./saveComment');
const {
  serveGuestBook,
  serveStaticFile,
  serveDefaultPage
} = require('./servePages');

const findHandler = function(req) {
  if (req.method === 'GET') {
    if (req.url === '/') {
      req.url = '/index.html';
    }
    if (req.url === '/guestBook.html') {
      return serveGuestBook;
    }
    return serveStaticFile;
  }
  if (req.method === 'POST' && req.url === '/guestBook.html')
    return serveGuestBook;
  return serveDefaultPage;
};

const handleData = function(text, socket) {
  const req = Request.parse(text);
  if (req.query || req.body) addComment(req);
  const handler = findHandler(req);
  const res = handler(req);
  res.writeTo(socket);
};

module.exports = {handleData};
