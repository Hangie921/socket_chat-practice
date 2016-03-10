var socket = io.connect(null,{port:3000});

$("form").submit(function(){
	socket.emit('chat message',$('#m').val());
	$("#m").val('');
	return false;
});

socket.on('chat message',function(msg){
	$('#messages').append($('<li>').text(msg));
});

var ctx;

var canvas = $("#canvas");
if(canvas[0].getContext){
	var ctx = canvas[0].getContext("2d");
}else{
	console.log("canvas problem");
}

$(document).ready(function(){
	var down = false;
	canvas.mousedown(function(){ //mouse down, start to record the path
		down = true;
		ctx.beginPath();
		socket.send("dn");
		
	});

	canvas.mouseup(function(){
		down = false;
		socket.send("up");
	});

	canvas.mousemove(function(e){
		if(down == true){
			ctx.strokeStyle = "#000";
			ctx.lineWidth = 2;
			ctx.lineJoin = "round";
			ctx.lineTo( e.pageX , e.pageY);
			ctx.stroke();
			socket.emit("message",e.pageX + ":" + e.pageY);
		}
	});



	//################ handle the socket #####//
	socket.on("message",function(msg){
		var mh = msg.n;
		if(mh == 'dn'){
			ctx.beginPath();
		}else if(mh == 'up'){

		}else{
			arr = msg.split(":");
			
			ctx.strokeStyle = "#000";
			ctx.lineWidth = 15;
			ctx.lineJoin = "round";
			ctx.lineTo(arr[0],arr[1]);
			ctx.stroke();
			console.log(arr[0]);
			console.log(arr[1]);
		}
		
		
		
	});


});// end of the document ready











