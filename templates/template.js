const commentDetail = `
<div class="commentDetail">
<div class="subscriber"><img src="img/icon.png" height="25" width="25" class="icon"/>
<p class="name">__name__</p></div>
<p class="commentDate">Date: __date__</p>
  <p class="comment">__comment__</p>
  </div>
`;

const guestBook = `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>GuestBook</title>
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body>
    <h1 class="heading"><a href="./index.html">&#60;&#60;</a> Guest Book</h1>
    <hr />
    <h1>Leave a comment</h1>
    <form method="GET">
      <label> Name: </label>
      <input type="text" name="name" required/> <br /><br />
      <label> Comment:</label>
      <textarea name="comment" cols="30" rows="8" required></textarea> <br /><br />
      <input type="submit" value="submit" class="submitButton" />
    </form>
    <div class="commentDetailBox">
      __comments__
    </div>
  </body>
</html>`;

module.exports = {commentDetail, guestBook};
