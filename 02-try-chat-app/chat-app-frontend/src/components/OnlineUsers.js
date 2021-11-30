import React from 'react';

const OnlineUsers = ({onUserSelect,users,username,countUnseenMessages})=>{

	return(
		 <div>
                <div className="online-users-header">
                  <div className="step2-header">Users Online</div>
                </div>
                <ul className="users-list">
                {users && Object.keys(users).map((user,index)=>(
  				  <>
  				  {
  				  	(user !== username) ? (
  				   	<li key={user} onClick={()=> onUserSelect(user)}>
	                    <span>{user}</span>
	                   {countUnseenMessages(user) !==0 ?( <span className="new-message-count">{countUnseenMessages(user)}</span>):null}
	                </li> 
					):null
  				  }	
  				  </>

                	))}  
                
                  
                </ul>
            </div>
	);
}


export default OnlineUsers;