import React,{useRef,useContext} from 'react';
import {useHistory} from 'react-router';
import axios from 'axios';
import {Link} from 'react-router-dom'

import {AuthContext} from '../../context/AuthContext';
import {loginCall} from '../../apiCalls';
import './register.css';

export default function Register(){

	const username = useRef();
	const email = useRef();
	const password = useRef();
	const passwordAgain = useRef();
	const history = useHistory();

	const {isFetching,error,dispatch} = useContext(AuthContext);


	const handleClick = async (e)=>{
		e.preventDefault();
		if(passwordAgain.current.value !== password.current.value){
			password.current.setCustomValidity("Passwords dont match")
		}else{
			const user = {
				username : username.current.value,
				email : email.current.value,
				password : password.current.value,

			}

			try{
				await axios.post("/auth/register",user);
				// history.push("/login")
			    await loginCall(
			      { email: email.current.value, password: password.current.value },
			      dispatch
			    );


			}catch(err){
				console.log(err)
			}

		}

	}

	return(
		<div className="register">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">Realtime ChatAPP</h3>
					<span className="loginDesc">Digital Signature with RSA , ECDH , ModpDH</span>
				</div>
				<div className="loginRight">
					<form className="loginBox" onSubmit={handleClick}>
						<input type="email" placeholder="Enter Email" className="loginInput" required ref={email}/>
						<input type="username" placeholder="Enter Username" className="loginInput" required ref={username} />
						<input type="password" placeholder="Enter Password" className="loginInput" minLength="6" required ref={password} />
						<input type="password" placeholder="Enter Password Again" className="loginInput" required ref={passwordAgain} />
						<button className="loginButton" type="submit">Signup</button>
						<Link to="/login"><button className="loginRegisterButton">Already Have an account? Login</button></Link>

					</form>
				</div>
			</div>
		</div>	
	)

}