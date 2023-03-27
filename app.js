const express = require('express');

const mongoose = require('mongoose');

const app = express();

const Note = require('./models/note');

const notesRouter = require('./routes/routes');

const path = require("path")

require('dotenv').config();

app.use('/css',express.static(path.join(__dirname,'../../../node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname,'../../../node_modules/bootstrap/dist/js')));
app.use('/jq',express.static(path.join(__dirname,'../../../node_modules/jquery/dist')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
// app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  const notes = await Note.find().sort('-createdAt');
  res.render('index', { notes: notes });
});

mongoose.connect('mongodb://localhost/notes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/', notesRouter);
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server Has Started`);
});

