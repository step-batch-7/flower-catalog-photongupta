const fs = require('fs');

const DATA_BASE = `${__dirname}/../dataBase/commentDetail.json`;

const addComment = function(req) {
  const commentsHistory = JSON.parse(fs.readFileSync(DATA_BASE));
  const newComment = req.query;
  newComment.date = new Date();
  commentsHistory.unshift(newComment);
  fs.writeFileSync(DATA_BASE, JSON.stringify(commentsHistory, null, 2));
};

module.exports = {addComment};
