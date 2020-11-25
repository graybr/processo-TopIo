var express = require('express');
var app = express();
var axios = require('axios').default;
var Fs = require('fs')
var Path = require('path')
// eslint-disable-next-line no-undef
var port = process.env.PORT || 8080;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testTOP', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

async function downloadJson(id='python') {  
  console.log('entrei')
  const url = `https://api.github.com/search/repositories?q=language:${id}&sort=stars&per_page=100&page=1&order=desc`
  const path = Path.resolve(__dirname, 'data', `${id}.json`)
  const writer = Fs.createWriteStream(path)

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

downloadJson()

// Serve static files
// eslint-disable-next-line no-undef
app.use(express.static(`${__dirname}/public`));
app.post('/public/', function (req, res) {
  res.send(downloadJson())
})
// Serve your app
console.log('Served: http://localhost:' + port);
app.listen(port);