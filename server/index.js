const express = require('express');
const app = express();
const http = require('http');

const cors = require('cors');

const server = http.createServer(app);

server.listen(3001, () => {
    console.log('the server is running');
})
