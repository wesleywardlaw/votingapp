import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Header extends Component{

	renderLinks(){
		if(this.props.authenticated){
			//show link to sign out and link to mypolls
			return [
				<li className = "nav-item" key={1}>
					<Link to="/mypolls" className="nav-link">My Polls</Link>
				</li>,
				<li className="nav-item" key={2}>
					<Link to="/signout" className="nav-link">Sign out</Link>
				</li>
			];

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
			<nav className="navbar navbar-expand-lg navbar-light">
			  <Link to="/" className="navbar-brand">Vote Your Mind</Link>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>

			  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			    <ul className="navbar-nav mr-auto">
			     
			    </ul>
			    <ul className="navbar-nav">
			      {this.renderLinks()}
			    </ul>
			  </div>
			</nav>
		);
	}
}


function mapStateToProps(state){
	return{authenticated: state.auth.authenticated}
}

export default connect(mapStateToProps)(Header);