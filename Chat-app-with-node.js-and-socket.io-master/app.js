const express = require("express");
const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get('/', (req, res) => {
	res.render('index');
})
server = app.listen("3000", () => console.log("Server is running..."));

const io = require("socket.io")(server);

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.username = "Anonymous";
	socket.broadcast.emit('add_mess', {message: "is connected!", username : socket.username});

    socket.on('change_username', (data) => {
        socket.username = data.username;
        socket.broadcast.emit('add_mess', {message: "not anonim!", username : socket.username});		
    })

    socket.on('new_message', (data) => {
        io.sockets.emit('add_mess', {message : data.message, username : socket.username, className:data.className});
    })

    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username});
    })
    socket.on('disconnect', function(){
    socket.broadcast.emit('add_mess', {message: "is disconnected!", username : socket.username});
});
})
