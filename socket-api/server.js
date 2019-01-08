class Server {
  constructor(port) {
    const app = require('express')();
    const server = require('http').createServer(app);
    const io = require('socket.io')(server);
    const bodyParser = require('body-parser');

    app.use(bodyParser.json());

    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.get('/', (req, res) => {
      res.send("Server is ok!")
    });

    app.post('/broadcast', (req, res) => {
      console.log("Received message for broadcast to all clients", req.body.message);
      io.emit('broadcast', req.body.message);
      res.sendStatus(200);
    });

    server.listen(port);
    console.log("Server is listening on port", port);
  }
}

module.exports = Server;
