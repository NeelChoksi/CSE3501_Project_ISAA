const express = require('express');

const app = express();


const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const usersRoute = require("./routes/users.js");
const authRoute = require("./routes/auth.js");
const conversationsRoute = require("./routes/conversations.js");
const messagesRoute = require("./routes/messages.js");

dotenv.config();

mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true})
	.then((data)=>{
		console.log(`Mongodb connected with server: ${data.connection.host}`)

	}).catch((err)=>{
		console.log(err)
})

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.get("/",(req,res)=>{
	res.send("welcome to homepage");
})


app.use("/api/users",usersRoute);
app.use("/api/auth",authRoute);
app.use("/api/conversations",conversationsRoute);
app.use("/api/messages",messagesRoute);

app.listen(8800,()=>{
	console.log("backend running");
})