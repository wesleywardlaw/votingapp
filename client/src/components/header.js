import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Header extends Component{

	renderLinks(){
		if(this.props.authenticated){
			//show link to sign out
			return <li className="nav-item">
				<Link to="/signout" className="nav-link">Sign out</Link>
			</li>
		} else{
			//show link to sign in or sign up
				//returning array so that we don't have to add in extra html elements to be able to return multiple lis
			return [
				<li className = "nav-item" key={1}>
					<Link to="/signin" className="nav-link">Sign in</Link>
				</li>,
				<li className = "nav-item" key={2}>
					<Link to="/signup" className="nav-link">Sign up</Link>
				</li>
			];

		}

		
	}


	render(){
		return(
			<nav className = "navbar navbar-light">
				<Link to="/" className="navbar-brand">Redux Auth</Link>
				<ul className = "nav navbar-nav">
					{this.renderLinks()}
				</ul>
			</nav>
		);
	}
}


function mapStateToProps(state){
	return{authenticated: state.auth.authenticated}
}

export default connect(mapStateToProps)(Header);