const {
  serveGuestBook,
  serveStaticFile,
  serveSubmitPage,
  notFound
} = require('./servePages');
const App = require('./app');

const app = new App();

app.get('/', serveStaticFile);
app.get('/guestBook.html', serveGuestBook);
app.post('guestBook.html', serveSubmitPage);
app.get('', notFound);
app.post('', notFound);

module.exports = {app};
