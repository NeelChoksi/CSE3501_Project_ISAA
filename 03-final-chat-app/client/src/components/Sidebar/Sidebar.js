import React from 'react';
import {Link} from 'react-router-dom';

import './sidebar.css';
import {Chat} from '@material-ui/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
export default function Sidebar(){
	return(
		<div className="sidebar">
			<h1>Chat with Digital Signature</h1>
			<div className="sidebarWrapper">
				<ul className="sidebarList">
					<Link to="/messenger">	
						<li className="sidebarListItem">
							<Chat className="sidebarIcon" />
							
							<span className="sidebarListItemText">
								RSA Encryption 
							</span>
						</li>
					</Link>
							<li className="sidebarListItem">
							<Chat className="sidebarIcon" />
							
							<span className="sidebarListItemText">
								Modp Diffie Hellman Encryption 
							</span>
						</li>
						<li className="sidebarListItem">
							<Chat className="sidebarIcon" />
							
							<span className="sidebarListItemText">
								Elliptic Curve Diffie Hellman Encryption 
							</span>
						</li>
						<li className="sidebarListItem">
							<ExitToAppIcon className="sidebarIcon" />
							
							<span className="sidebarListItemText">
								Logout 
							</span>
						</li>
				</ul>
{/*				<button className="sidebarButton">Show more</button>
				<hr className="sidbarHr"/>
				<ul className="sidebarFriendList">
					<li className="sidebarFriend">
					 <img className="sidebarFriendImg" alt="friend1" src="/assets/person/1.svg" />
					 <span className="sidebarFriendName">Friend1</span>
					</li>
					<li className="sidebarFriend">
					 <img className="sidebarFriendImg" alt="friend1" src="/assets/person/1.svg" />
					 <span className="sidebarFriendName">Friend2</span>
					</li>
				</ul>*/}
			</div>
		</div>
	)
}