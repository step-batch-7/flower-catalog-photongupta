const fs = require('fs');
const {allReplace, formatDate} = require('./utils');
const {commentDetail, guestBook} = require('../templates/template');
const Response = require('./response');
const {CONTENT_TYPES} = require('./mimeTypes');

const getResponse = function(reqUrl, content) {
  const extension = reqUrl.match(/.*\.(.*)$/)[1];
  const res = new Response();
  res.setHeader('Content-Type', CONTENT_TYPES[extension]);
  res.setHeader('Content-Length', content.length);
  res.statusCode = 200;
  res.body = content;
  return res;
};

function formatComments(comments) {
  let allComments = '';
  comments.forEach(c => {
    let {name, comment, date} = c;
    date = formatDate(date);
    [name, comment] = [name, comment].map(text =>
      allReplace(text, {' ': '&nbsp', '\n': '<br />'})
    );
    allComments += allReplace(commentDetail, {
      __date__: date,
      __name__: name,
      __comment__: comment
    });
  });
  return allComments;
}

const serveGuestBook = function(req) {
  const comments = JSON.parse(fs.readFileSync('dataBase/commentDetail.json'));
  formattedComments = formatComments(comments);
  content = guestBook.replace('__comments__', formattedComments);
  return getResponse(req.url, content);
};

const serveStaticFile = function(req) {
  const path = `/Users/step29/my_work/html/flowerCatalogWeb/public${req.url}`;
  const content = fs.readFileSync(path);
  return getResponse(req.url, content);
};

const serveDefaultPage = function() {
  return new Response();
};

module.exports = {
  serveGuestBook,
  serveStaticFile,
  serveDefaultPage
};
