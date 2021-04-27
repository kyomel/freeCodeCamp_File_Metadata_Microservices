'use strict'

let express = require('express');
let cors = require('cors');
let multer = require('multer');
require('dotenv').config()

let storage = multer.memoryStorage();
let upload = multer({ storage: storage });
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  res.json({
    'name': req.file.originalname,
    'type': req.file.mimetype,
    'size': req.file.size
  });
});

app.use(function(req, res, next) {
  res.status(404);
  res.type('txt').send('Not Found');
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
