import React,{useContext} from 'react';
import './Topbar.css';
import {Search,Person,Chat , Notifications} from '@material-ui/icons';
import {Link} from 'react-router-dom';

import {AuthContext} from '../../context/AuthContext';

const Topbar = ()=>{

	const {user} = useContext(AuthContext)
	const DF = process.env.REACT_APP_PUBLIC_FOLDER;

	return(
		<div className="topbarContainer">
			<div className="topbarLeft">
				<Link to="/" style={{textDecoration:"none"}}>
					<span className="logo">Realtime ChatAPP</span>
				</Link>
			</div>
			<div className="topbarCenter">
				<div className="searchbar">
					<Search className="searchIcon" />
					<input className="searchInput" placeholder="search"/>
				</div>

			</div>
			<div className="topbarRight">
				<div className="topbarLinks">
					<span className="topbarLink">Hompage</span>
					<span className="topbarLink">Timeline</span>
				</div>
				
				<div className="topbarIcons">
					<div className="topbarIconItem">
						<Person />
						<span className="topbarIconBadge">1</span>
					</div>
					<div className="topbarIconItem">
						<Chat />
						<span className="topbarIconBadge">1</span>
					</div>
					<div className="topbarIconItem">
						<Notifications />
						<span className="topbarIconBadge">1</span>
					</div>
				</div>
				<Link to={`/profile/${user.username}`}>
					<img src={user.profilePicture ? DF + user.profilePicture: DF+ "person/1.svg"} alt="" className="topbarImg"  />
				</Link>

			</div>
		</div>
	)
}

export default Topbar;