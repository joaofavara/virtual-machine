const express = require('express');
const serverStatic = require('serve-static');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/read_file', (req, res) => {
  const codigo = fs.readFileSync(req.query.file, 'utf-8');
  res.status(200).json({ codigo });
});

app.use('/', serverStatic(path.join(__dirname, '/dist')));

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`server started ${port}`);
