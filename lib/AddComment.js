const fs = require('fs');
const DATA_BASE = `${__dirname}/../dataBase/commentDetail.json`;

const allReplace = function(content, replacement) {
  for (let target in replacement) {
    const replacer = replacement[target];
    content = content.split(target).join(replacer);
  }
  return content;
};

const addComment = function(req) {
  const commentsHistory = JSON.parse(fs.readFileSync(DATA_BASE));
  let {name, comment} = req.query || req.body;
  [name, comment] = [name, comment].map(text =>
    allReplace(text, {'+': ' ', '%0D%0A': '\r\n'})
  );
  const date = new Date();
  const newComment = {date, name, comment};
  commentsHistory.unshift(newComment);
  fs.writeFileSync(DATA_BASE, JSON.stringify(commentsHistory, null, 2));
};

module.exports = {addComment, allReplace};
