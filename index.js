var express = require('express'),
    app = express();

app.get('/hello', function (req, res) {
  res.send('Hello World!');
});

app.listen(8080, function () {
  console.log('listening on port 8080...');
});
