import React,{useRef,useContext} from 'react';
import {Link} from 'react-router-dom'

import {AuthContext} from '../../context/AuthContext';
import {loginCall} from '../../apiCalls';
import './login.css';


export default function Login(){

	const email = useRef();
	const password = useRef();
	const {isFetching,error,dispatch} = useContext(AuthContext);

	// const handleClick = (e)=>{
	// 	e.preventDefault();
	// 	console.log("clicked")
	// 	console.log(email.current.value)
	// 	console.log(password.current.value)
	// 	loginCall({email:email.current.value,password:password.current.value},dispatch)
	// 	console.log(user);
	// }

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    // console.log(user)
  };

	return(
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">Realtime ChatAPP</h3>
					<span className="loginDesc">Digital Signature with RSA , ECDH , ModpDH</span>
				</div>
				<div className="loginRight">
					<form className="loginBox" onSubmit={handleClick}>
						<input type="email" placeholder="Enter Email" className="loginInput" required ref={email} />
						<input type="password" placeholder="Enter Password" className="loginInput" minLength="6" required ref={password}/>
						{isFetching ? "loading..." :<button className="loginButton">Log In</button>}
						<Link to="/register"><button className="loginRegisterButton">Create new account</button></Link>

					</form>
				</div>
			</div>
		</div>	
	)

}