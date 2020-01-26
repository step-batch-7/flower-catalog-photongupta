const fs = require('fs');

const DATA_BASE = `${__dirname}/../dataBase/commentDetail.json`;

String.prototype.allReplace = function(replacement) {
  let content = this;
  for (let target in replacement) {
    const replacer = replacement[target];
    content = content.split(target).join(replacer);
  }
  return content;
};

const addComment = function(req) {
  const commentsHistory = JSON.parse(fs.readFileSync(DATA_BASE));
  const newComment = req.query;
  newComment.name = newComment.name.allReplace({'+': ' ', '%0D%0A': '\n'});
  newComment.comment = newComment.comment.allReplace({
    '+': ' ',
    '%0D%0A': '\n'
  });
  newComment.date = new Date();
  commentsHistory.unshift(newComment);
  fs.writeFileSync(DATA_BASE, JSON.stringify(commentsHistory, null, 2));
};

module.exports = {addComment};
