import React,{useContext} from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect
} from 'react-router-dom'


import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import Login from './pages/login/Login.js'
import Register from './pages/register/Register.js'
import Messenger from './pages/messenger/Messenger.js'
import {AuthContext} from './context/AuthContext';

function App(){

	const {user} = useContext(AuthContext)

	return(
		<>
			<Router>
				<Switch>
					<Route exact path="/">
						{user ? <Home /> : <Register/>}
					</Route>
					<Route path="/profile/:username">
						<Profile />
					</Route>
					<Route path="/login">
						{user ? <Redirect to="/" /> : <Login />}
					</Route>
					<Route path="/register">
						{user? <Redirect to="/"/> : <Register />}
					</Route>
					<Route path="/messenger">
						{user ? <Messenger /> : <Redirect to="/login"/>}
					</Route>
{/*					<Route path="/messenger">
						{user ? <MessengerMODP /> : <Redirect to="/login"/>}
					</Route>
					<Route path="/messenger">
						{user ? <MessengerECDH /> : <Redirect to="/login"/>}
					</Route>*/}
				</Switch>

			</Router>

			{/*<Home />*/}
			{/*<Profile />*/}
			{/*<Login />*/}
			{/*<Register />*/}
		</>
	)
}
export default App;