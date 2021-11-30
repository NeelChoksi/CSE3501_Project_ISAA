import React,{useState,useEffect,useContext} from 'react';
import axios from 'axios';
import {useParams} from 'react-router';

import {AuthContext} from '../../context/AuthContext'
import './profile.css';
import Topbar from '../../components/Topbar/Topbar.js';
import Sidebar from '../../components/Sidebar/Sidebar.js';
import Rightbar from '../../components/Rightbar/Rightbar.js';

export default function Profile(){
	const DF = process.env.REACT_APP_PUBLIC_FOLDER;
	// console.log(`${DF}person/2.jpg`)
	const [user,setUser] = useState({});
	const username = useParams().username;
	console.log(username)
	const {user:userFromLogin} = useContext(AuthContext);
	useEffect(()=>{
		const fetchUser = async ()=>{
			const res = await axios.get(`/users?username=${username}`)
			setUser(res.data);
		}
		fetchUser();
	},[])


	return(
		<>
			<Topbar/>
			<div className="profileContainer">
				<Sidebar />

				<div className="profileRight">
					<div className="profileRightTop">

						<div className="profileCover">
							<img className="profileCoverImg" src={user.coverPicture?DF + user.coverPicture :`${DF}person/2.jpg`} alt="profileCover" />
							<img className="profileUserImg" src={user.profilePicture?DF + user.profilePicture :`${DF}person/1.svg`} alt="profileCover" />
						</div>
						<div className="profileInfo">
							<h4 className="profileInfoName">{user.username}</h4>
							<span className="profileInfoDesc">{user.description}</span>
						</div>

					</div>
					<div className="profileRightBottom">
						<Rightbar user={userFromLogin} />
					</div>
				</div>
			</div>
		</>
	)
}