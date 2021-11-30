import React,{useState,useEffect,useContext} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import {AuthContext} from '../../context/AuthContext';
import './rightbar.css';
import Online from '../Online/Online.js';
import { Users } from "../../dummyData";
// import {Add} from 'material-ui/icon';

export default function Rightbar({user}){
	
	const [friends,setFriends] = useState([]); 
	const DF = process.env.REACT_APP_PUBLIC_FOLDER;
	const {user:currUser,dispatch} = useContext(AuthContext);
	const [followed,setFollowed] = useState(false);

	useEffect(()=>{
		setFollowed(currUser.followings.includes(user?.id));
	},[currUser,user.id]);

	useEffect(()=>{
		const getFriends = async ()=>{
			try{
				const friendList = await axios.get("/users/friends/"+user._id)
				setFriends(friendList.data);
			}catch(err){
				console.log(err)
			}
		}
		getFriends();
	},[user])

	const handleClick = async ()=>{
		try{
			if(followed){
				await axios.put("/users/"+user._id+"/unfollow",{userId:currUser._id})
				dispatch({type:"UNFOLLOW",payload:user._id})
			}else{
				await axios.put("/users/"+user._id+"/follow",{userId:currUser._id})
				dispatch({type:"FOLLOW",payload:user._id})

			}
		}catch(err){
			console.log(err)
		}
		setFollowed(!followed)
	}

	const HomeRightBar = () =>{
		return(
			<>
				<h1>Online Friends</h1>
		        <ul className="rightbarFriendList">
		          {Users.map((u) => (
		            <Online key={u.id} user={u} />
		          ))}
		        </ul>

			</>
		)
	}

	const ProfileRightBar = () =>{

		return (
			<>	{user.username !==  currUser.username &&
					<button className="rightbarFollowButton" onClick={handleClick}>
						{followed ? "Unfollow" : "Follow"}
					</button>
			}
				<h4 className="rightbarTitle">User Information</h4>
				<div className="rightbarInfo">
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">City:</span>
						<span className="rightbarInfoValue">{user.city}</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">From:</span>
						<span className="rightbarInfoValue">{user.from}</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Email:</span>
						<span className="rightbarInfoValue">{user.email}</span>
					</div>
				</div>	
				<h4 className="rightbarTitle">User Friends</h4>
				<div className="rightbarFollowings">

					{friends.map(friend=>(
						<Link to={`/profile/`+friend.username} style={{textDecoration:"none"}}>
						<div className="rightbarFollowing">
							<img src={friend.profilePicture ? DF+friend.profilePicture : DF+"person/1.svg"} alt="" className="rightbarFollowingImg" />
						<span className="rightbarFollowingName">{friend.username}</span>
					</div>
						</Link>

					))}
					
					
				</div>

			</>
		)
	}

	return(
	
		<div className="rightbar">
			<div className="rightbarWrapper">
				
				{/**/}
				{user ? <ProfileRightBar /> : <HomeRightBar />}

			</div>
		</div>
        
      
	)
}