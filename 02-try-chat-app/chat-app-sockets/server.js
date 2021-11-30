const app = require('express')();

const httpServer = require('http').createServer(app);

// const options= {/*...*/};

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = 3040;

app.get('/',(req,res)=>{
	res.status(200).json({name:"server"})
})

const users ={};

io.on('connection',socket =>{
	console.log(`someone connected to socket id:${socket.id}`);


	socket.on("disconnect",()=>{
		console.log(`${socket.id} disconnected`)
		for(let user in users){
			if(users[user] === socket.id){
				delete users[user];
			}
		}
		io.emit("all_users",users);

	});

	socket.on("new_user",(username)=>{
		// console.log(username)
		users[username]=socket.id;

		//broadcast to all users that a user connected
		io.emit("all_users",users);
	})

	socket.on("send_message",(data)=>{
		console.log(data)

		const socketId = users[data.reciever]

		io.to(socketId).emit("new_message",data)
	})

});

httpServer.listen(PORT, ()=>{
	console.log(`server listening on port ${PORT}`);
});


