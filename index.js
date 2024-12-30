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

app.get("/api/whoami", function (req, res) {
  // Extract IP address
  const ipAddress = req.ip.includes("::ffff:")
    ? req.ip.split("::ffff:")[1]
    : req.ip;

  // Extract language from the 'Accept-Language' header
  const language = req.headers["accept-language"];

  // Extract software (user-agent) from the 'User-Agent' header
  const software = req.headers["user-agent"];

  // Respond with the required information
  res.json({
    ipaddress: ipAddress,
    language: language,
    software: software,
  });
});

app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date; // Extract the "date" parameter from the route
  let date;

  if (!dateParam) {
   date = new Date()
  } else {
   date = new Date(isNaN(dateParam) ? dateParam : parseInt(dateParam))
  }

  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    "unix":date.getTime(),
    "utc":date.toUTCString()}); // Respond with a message containing the date
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
