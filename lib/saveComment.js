const fs = require('fs');
const DATA_BASE = `${__dirname}/../dataBase/commentDetail.json`;
const {allReplace} = require('./utils');

const addComment = function(req) {
  const commentsHistory = JSON.parse(fs.readFileSync(DATA_BASE));
  let {name, comment} = req.query || req.body;
  [name, comment] = [name, comment].map(content => {
    const text = decodeURIComponent(content);
    return allReplace(text, {'+': ' '});
  });
  const date = new Date();
  const newComment = {date, name, comment};
  commentsHistory.unshift(newComment);
  fs.writeFileSync(DATA_BASE, JSON.stringify(commentsHistory, null, 2));
};

module.exports = {addComment, allReplace};
