var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(process.env.PORT || 3000);

console.log("Server Running");

// Handling the default route.
app.get("/", function(request, response){
    response.sendFile(__dirname + "/index.html");
});

// When connection gets initiated.
io.sockets.on('connection', function(socket){
    console.log("A connection has been initiated!");

    // Handling disconnections
    socket.on('disconnect', function(data){
        console.log("A connection has been disconnected.");
    });

    // Sending Message
    socket.on("send message", function(data){
        io.sockets.emit("new message", {msg: data});
    });
});