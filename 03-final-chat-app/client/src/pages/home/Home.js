import React,{useContext} from 'react';
import Topbar from '../../components/Topbar/Topbar.js';
import Sidebar from '../../components/Sidebar/Sidebar.js';
import Rightbar from '../../components/Rightbar/Rightbar.js';

import './home.css';
import {AuthContext} from '../../context/AuthContext';


const Home =()=>{
	const {user} = useContext(AuthContext)

	return(
		<>
			<Topbar/>
			<div className="homeContainer">
				<Sidebar />
				<Rightbar user={user} />
			</div>
		</>
	)
}

export default Home;