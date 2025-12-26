require('dotenv').config();
const connectDB = require('./config/db');
const app = require('./app');
const http = require('http');

// Connect to test database
async function runTest() {
  try {
    await connectDB();
    
    const server = app.listen(0, async () => {
      const port = server.address().port;
      console.log('Test server listening on port', port);

      http.get({ hostname: '127.0.0.1', port, path: '/api/complaints', agent: false }, res => {
        let data = '';
        res.on('data', d => data += d);
        res.on('end', () => {
          console.log('Status:', res.statusCode);
          console.log('Body:', data);
          server.close();
          process.exit(0);
        });
      }).on('error', err => {
        console.error('Request failed:', err.message);
        server.close();
        process.exit(1);
      });
    });
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

runTest();