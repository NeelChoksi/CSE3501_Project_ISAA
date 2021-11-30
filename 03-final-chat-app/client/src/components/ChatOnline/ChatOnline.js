import './chatonline.css';

import React from 'react';

export default function ChatOnline(){
	return(
		<div className="chatOnline">
			<div className="chatOnlineFriend">
				<div className="chatOnlineImgContainer">
					<img src="/assets/person/2.png" alt="" className="chatOnlineImg"/>
					<div className="chatOnlineBadge"></div>
				</div>
				<span className="chatOnlineName">User 33</span>

			</div>
		</div>
	)
}