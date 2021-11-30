const app = require('express')();

const httpServer = require('http').createServer(app);

// const options= {/*...*/};


const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});

const PORT = 3040;

app.get('/',(req,res)=>{
	res.status(200).json({name:"server"})
})


io.on('connection',socket =>{
	console.log(`someone connected to socket id:${socket.id}`);
});

httpServer.listen(PORT, ()=>{
	console.log(`server listening on port ${PORT}`);
});


