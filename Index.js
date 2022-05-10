var express = require("express"),
    app = express(),
    http = require("http"),
    server = http.createServer(app),
    io = require("socket.io")(server);

app.use(express.static(__dirname + "/public"));
app.get("/", function (req, res) {
    console.log(__dirname + "....Query Of Rokon");
    res.sendFile(__dirname + "/public/Index.html");
});

var usernames = {};
io.sockets.on("connection", function (socket) {

    socket.on("sendchat", function (data) {
        console.log(socket.username + "  " + data + "this is send chat");
        io.sockets.emit("updatechat", socket.username, data);
    }); 

    socket.on("adduser", function (user) {
        socket.username = user;
        usernames[user] = user;
        socket.emit("updatechat", 'SERVER', user + " , you have connected");
        socket.broadcast.emit("updatechat", 'SERVER', user + "  has connected");
        io.sockets.emit("updateusers", usernames);

    });

    socket.on("disconnect", function () {

        delete usernames[socket.username];
        socket.broadcast.emit("updatechat", 'SERVER', socket.username + "  has disconnected");
        io.sockets.emit("updateusers", usernames);

    });

    

});

var port = 3000;
server.listen(port);

console.log("Server Ready with http://localhost:3000");
