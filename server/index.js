const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
//importing the server class from the socket.io library
const { Server } = require('socket.io');


app.use(cors());
// created an HTTP server insted of node server
const server = http.createServer(app);

//creating a new object of the server library and giving it the server we created using the http and also specifing some of the CORS paramaters for our server like what requets shoud are we going to make.
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

// so what this server instance does is it looks for the type of event we psecify in it and listen to the event accordingly,,, basically it works upon the event it requires it for the processing
io.on('connection', (socket) => {
    console.log(`User Connected : ${socket.id}`);
    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`User joined ${socket.id} room id ${data}`);
    })
    // the event when the user will disconnect from the server

    socket.on('send_message', (data) => {
        console.log(data);
    });
    socket.on('disconnect', () => {
        console.log('User Disonnected', socket.id);
    })
});


server.listen(3001, () => {
    console.log('the server is running');
})
