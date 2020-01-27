const fs = require('fs');
const {getResponse} = require('./getResponse');
const {allReplace} = require('./addComment');
const {commentDetail, guestBook} = require('../templates/template');

const formatDate = function(dateObject) {
  dateObject = new Date(dateObject);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  const time = `Time: ${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`;
  const date = `Date:  ${dateObject.getDate()}
  -${months[dateObject.getMonth()]}
  -${dateObject.getFullYear()}`;
  return `${date}______${time}`;
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

const serveDefault = function() {
  return new Response();
};

module.exports = {
  serveGuestBook,
  serveStaticFile,
  serveDefault
};
