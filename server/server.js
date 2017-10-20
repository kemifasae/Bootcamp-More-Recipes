import http from 'http';
import app from './app';

const port = process.env.PORT || 8080;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log('App running');
});

export default server;
