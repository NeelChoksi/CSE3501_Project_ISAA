import "./conversation.css";

import {useState,useEffect} from 'react';
import axios from 'axios'
export default function Conversation({conversation,currentUser}){
	const [user,setUser] = useState(null);
	const DF = process.env.REACT_APP_PUBLIC_FOLDER;

	useEffect(()=>{
		const friendId = conversation.members.find((m)=> m!== currentUser._id);
		const getFriendUser = async ()=>{
			try{
				const res = await axios("/users?userId="+friendId);
				// console.log(res)
				setUser(res.data)
			}catch(err){
				console.log(err)
			}
		}
		getFriendUser();
	},[currentUser,conversation])

	console.log(user);
	console.log(currentUser);

	return(
		<div className="conversation">
		<img src={user?.profilePicture? DF +"person/1.svg" :"/assets/person/1.svg"} alt="" className="conversationImg" />
		<span className="conversationName">{user?.username}</span>
	</div>);
}
