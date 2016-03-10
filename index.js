var express = require("express");
var app = express();
var http = require("http").Server(app);
var path = require("path");
var io = require("socket.io")(http);

app.get('/',function(req,res){
	res.render("index");
})

io.on('connection',function(socket){
	console.log("a user connected");
	socket.on("disconnect",function(){
		console.log("user disconnected");
	});
	socket.on('chat message',function(msg){
		io.emit('chat message',msg);
	});
});




app.set("views",path.join(path.dirname(process.argv[1]),"view"));
app.set("view engine","jade");
app.use(express.static(path.join( path.dirname(process.argv[1]),"static") ));

http.listen(3000,function(){
	console.log("listen on *:3000");
});