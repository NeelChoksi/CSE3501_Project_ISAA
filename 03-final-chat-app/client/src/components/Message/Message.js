import './message.css'
import React from 'react';
// import {format} from "timeagojs"

export default function Message({message,own}){
	return(
		<div className={own? "message own" :"message"}>
			<div className="messageTop">
				<img src="/assets/person/2.jpg" alt="" className="messageImg" />
				<p className="messageText">
					{message?.text}
				</p>
			</div>
			<div className="messageBottom">
				{(message?.createdAt)}
			</div>
		</div>
	)
} 