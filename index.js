// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", function (req, res) {
  const date = new Date()
  const unix = Math.floor(date.getTime());
  const utc = `${date.toUTCString()}`
  res.json(
      {unix: unix, utc: utc,}
  );
});


app.get("/api/:date", function (req, res) {
    const date = new Date(req.params.date)
    const date2 = new Date(req.params.date*1);
    if (date instanceof Date && !isNaN(date)){
      const unix = Math.floor(date.getTime());
      const utc = `${date.toUTCString()}`
      res.json(
          {unix: unix, utc: utc,}
      );
    }
    if (date2 instanceof Date && !isNaN(date2)){
      const unix = req.params.date*1;
      const utc = `${date2.toUTCString()}`
      res.json(
          {unix: unix, utc: utc,}
      )
    }
    res.json({error: "Invalid date"});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
