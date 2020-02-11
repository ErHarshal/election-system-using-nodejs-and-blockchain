const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const app = express();
var http = require('http');
const bodyParser = require('body-parser');

const authentication = require('./routes/authentication/index'); 
const hello = require('./routes/authentication/index'); 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  'extended': false
}));
// app.use((req, res, next) => {
//   res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//   next();
// });

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authentication);
app.use('/hello', hello);

app.engine('hbs', hbs({
  'extname': 'hbs'
  // defaultLayout: 'main',   //if you want you can specify
  // partialsDir: path.join(__dirname, 'views/partials'),
  // layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


var port = 8888;
app.set('port', port);
var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);



function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }
  

function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }


  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    
    console.log('Web App server started on', bind);
  }
  