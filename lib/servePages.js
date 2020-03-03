const fs = require('fs');
const redis = require('redis');
const client = redis.createClient();
const querystring = require('querystring');
const {formatComments, fileNotPresent} = require('./utils');
const {guestBook} = require('../templates/template');
const {CONTENT_TYPES} = require('./mimeTypes');
const NOT_FOUND = 404;
const METHOD_NOT_ALLOWED = 400;

const getResponse = function(reqUrl, content, res) {
  const extension = reqUrl.split('.').pop();
  res.setHeader('Content-Type', CONTENT_TYPES[extension]);
  res.setHeader('Content-Length', content.length);
  res.statusCode = 200;
  return res;
};

const parseBody = function(req) {
  req.body = '';
  req.on('data', text => {
    req.body += text;
  });
};

const serveSubmitPage = function(req, res) {
  parseBody(req);
  req.on('end', () => {
    const newComment = querystring.parse(req.body);
    newComment.date = new Date();

    client.get('comments', (err, commentsHistory) => {
      const comments = JSON.parse(commentsHistory);
      comments.unshift(newComment);
      client.set('comments', JSON.stringify(comments) || JSON.stringify([]));
    });

    res.setHeader('Location', '/guestBook.html');
    res.statusCode = 302;
    res.end();
  });
};

const serveGuestBook = function(req, res) {
  client.get('comments', (err, commentsHistory) => {
    const formattedComments = formatComments(JSON.parse(commentsHistory));
    const content = guestBook.replace('__comments__', formattedComments);
    const response = getResponse(req.url, content, res);
    response.end(content);
  });
};

const serveStaticFile = function(req, res, next) {
  req.url = req.url === '/' ? '/index.html' : req.url;
  const path = `${__dirname}/../public${req.url}`;
  if (fileNotPresent(path)) {
    next();
    return;
  }
  const content = fs.readFileSync(path);
  const response = getResponse(req.url, content, res);
  response.end(content);
};

const notFound = function(req, res) {
  res.writeHead(NOT_FOUND);
  res.end('Not Found');
};

const methodNotAllowed = function(req, res) {
  res.writeHead(METHOD_NOT_ALLOWED);
  res.end('Method Not Allowed');
};

module.exports = {
  serveGuestBook,
  serveStaticFile,
  serveSubmitPage,
  notFound,
  methodNotAllowed
};
