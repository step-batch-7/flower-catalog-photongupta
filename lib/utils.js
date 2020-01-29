const {commentDetail} = require('../templates/template');

const allReplace = function(content, replacement) {
  for (let target in replacement) {
    const replacer = replacement[target];
    content = content.split(target).join(replacer);
  }
  return content;
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

module.exports = {allReplace, formatComments};
