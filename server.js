var http = require('http');
var express = require("express");
var path = require("path");
var useragent = require("useragent")

var app = express();

var server = http.createServer(app)

var json = {
            unix :0,
            natural : ""
        };

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', function(req,res) {
  res.status(200).sendFile('index.html', { root: path.join(__dirname, 'client') });
});

app.get('/api/whoami', function(req, res){
    res.status(200).send(JSON.stringify({
        IP: req.headers['x-forwarded-for'],
        language: req.headers["accept-language"],
        software:  useragent.parse(req.headers['user-agent']).os.toString()
    }))
});



server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Request headr server listening at", addr.address + ":" + addr.port);
});
