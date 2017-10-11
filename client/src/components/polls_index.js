import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';

class PollsIndex extends Component{

	componentDidMount(){
		this.props.fetchPolls()
	}


	renderPolls(){
		return _.map(this.props.polls, poll => {
			return(
				<li className="list-group-item polls" key={poll._id}>
						<Link to={`/polls/${poll._id}`}>
							{poll.title}
						</Link>
				</li>
			);
		});
	}

	render(){

			if(this.props.authenticated){
				return(
					<div>
						<Link className="btn btn-primary" to={"/pollsnew"}>Create New Poll</Link>
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
	return {polls: state.polls, authenticated:state.auth.authenticated};
}

export default connect(mapStateToProps, actions)(PollsIndex);



