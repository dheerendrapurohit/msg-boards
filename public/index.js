const express = require('express');
const path = require('path');
const app = express();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { title: 'Mini Messageboard', messages: messages });
});

app.get('/new', (req, res) => {
  res.render('form', { title: 'New Message' });
});

app.post('/new', (req, res) => {
  const messageText = req.body.messageText;
  const messageUser = req.body.messageUser;
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.redirect('/');
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.get('/message/:id', (req, res) => {
  const messageId = req.params.id;
  const message = messages[messageId];
  if (message) {
    res.render('message', { title: 'Message Details', message: message });
  } else {
    res.redirect('/');
  }
});
