import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';

class MyPolls extends Component{

	componentDidMount(){
		this.props.fetchPolls()
	}


	renderPolls(){
		const { id } = this.props.match.params;
			if(this.props.authenticated){
				this.props.fetchUser(() =>{
				console.log(this.props.user);
			});
		}
		return _.map(this.props.polls, poll => {
			if(this.props.user==poll.author.id){
				return(
					
						<li className="list-group-item polls" key={poll._id}>
						<Link to={`/polls/${poll._id}`}>
							{poll.title}
						</Link>
						</li>
					
				
				);
			}
		});
	}

	render(){

			if(this.props.authenticated){
				return(
					<div>
						
						{this.renderPolls()}
						
					</div>
				);
			} else{
				return(
					<div>
						{this.renderPolls()}
					</div>

				);
			}

	}
}

function mapStateToProps(state){
	return {polls: state.polls, authenticated:state.auth.authenticated, user:state.auth.user};
}

export default connect(mapStateToProps, actions)(MyPolls);



