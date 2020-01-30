const {commentDetail} = require('../templates/template');
const fs = require('fs');

const allReplace = function(content, replacement) {
  let newContent = content;
  for (const target in replacement) {
    const replacer = replacement[target];
    newContent = newContent.split(target).join(replacer);
  }
  return newContent;
};

function formatComments(comments) {
  let allComments = '';
  comments.forEach(element => {
    let {name, comment, date} = element;
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

const formatDate = function(dateObject) {
  const date = new Date(dateObject);
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
  const formattedTime = `Time: ${date.getHours()}
  :${date.getMinutes()}
  :${date.getSeconds()}`;
  const formattedDate = `Date:  ${date.getDate()}
  -${months[date.getMonth()]}
  -${date.getFullYear()}`;
  return `${formattedDate}______${formattedTime}`;
};

const fileNotPresent = function(path) {
  const stat = fs.existsSync(path) && fs.statSync(path);
  return !stat || !stat.isFile();
};

module.exports = {allReplace, formatComments, fileNotPresent};
