import React from 'react';


const CreateUser = ({value,onChange,onCreateUser})=>{
	return(
		<div className="username-container">
                      <form onSubmit={onCreateUser}>
                        <h4 className="username-label">Enter Username/email</h4>
                        <input type="text" value={value} onChange={onChange} className="input" />
                      </form>
                    </div>
	);
};

export default CreateUser;