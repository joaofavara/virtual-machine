const express = require('express');
const serverStatic = require('serve-static');
const path = require('path');

const app = express();

app.use('/', serverStatic(path.join(__dirname, '/dist')));

app.listen(3000, () => {
  console.log('App is running at 3000');
});
