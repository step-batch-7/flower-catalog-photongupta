const fs = require('fs');
const {formatDate, allReplace} = require('./utils');
const {commentDetail, guestBook} = require('../templates/template');
const {CONTENT_TYPES} = require('./mimeTypes');
const commentsHistory = require('../dataBase/commentDetail.json');
const querystring = require('querystring');

const getResponse = function(reqUrl, content, res) {
  const extension = reqUrl.match(/.*\.(.*)$/)[1];
  res.setHeader('Content-Type', CONTENT_TYPES[extension]);
  res.setHeader('Content-Length', content.length);
  res.statusCode = 200;
  return res;
};

function formatComments(comments) {
  let allComments = '';
  comments.forEach(c => {
    let {name, comment, date} = c;
    [name, comment] = [name, comment].map(text =>
      allReplace(text, {' ': '&nbsp', '\n': '<br />'})
    );
    date = formatDate(date);
    allComments += allReplace(commentDetail, {
      __date__: date,
      __name__: name,
      __comment__: comment
    });
  });
  return allComments;
}

const serveSubmitPage = function(req, res) {
  let data = '';
  req.on('data', text => (data = data += text));
  req.on('end', () => {
    const newComment = querystring.parse(data);
    newComment.date = new Date();
    commentsHistory.unshift(newComment);
    fs.writeFileSync(
      './dataBase/commentDetail.json',
      JSON.stringify(commentsHistory, null, 2),
      'utf8'
    );
    res.setHeader('Location', '/guestBook.html');
    res.statusCode = 302;
    res.end();
  });
};

const serveGuestBook = function(req, res) {
  formattedComments = formatComments(commentsHistory);
  content = guestBook.replace('__comments__', formattedComments);
  res = getResponse(req.url, content, res);
  res.end(content);
};

const serveStaticFile = function(req, res) {
  req.url = req.url === '/' ? '/index.html' : req.url;
  const path = `/Users/step29/my_work/html/flowerCatalogWeb/public${req.url}`;
  const stat = fs.existsSync(path) && fs.statSync(path);
  if (!stat || !stat.isFile()) {
    notFound(req, res);
    return;
  }
  const content = fs.readFileSync(path);
  res = getResponse(req.url, content, res);
  res.end(content);
};

const notFound = function(req, res) {
  res.writeHead(404);
  res.end('Not Found');
};

module.exports = {
  serveGuestBook,
  serveStaticFile,
  serveSubmitPage,
  notFound
};
