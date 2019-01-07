class Server {
  constructor(port) {
    const app = require('express')();
    const server = require('http').createServer(app);
    const io = require('socket.io')(server);
    const bodyParser = require('body-parser');

    app.use(bodyParser.json());

    app.get('/', function(req, res, next) {
      res.send("Server is ok!")
    });

    app.post('/broadcast', function(req, res, next) {
      console.log(req.body);
      io.emit('broadcast', "dasd");
    });

    server.listen(port);
    console.log("Server is listening on port", port);
  }
};

module.exports = Server;
