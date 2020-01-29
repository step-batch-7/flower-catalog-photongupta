const App = require('./app');
const {
  serveGuestBook,
  serveStaticFile,
  serveSubmitPage,
  notFound,
  methodNotAllowed
} = require('./servePages');

const app = new App();

app.get('/', serveStaticFile);
app.get('/guestBook.html', serveGuestBook);
app.post('guestBook.html', serveSubmitPage);
app.get('', notFound);
app.post('', notFound);
app.use(methodNotAllowed);

module.exports = {app};
