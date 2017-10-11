import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPoll, deletePoll } from '../actions';
import { Link } from 'react-router-dom';

class PollsShow extends Component{

	componentDidMount(){
		const { id } = this.props.match.params;
		this.props.fetchPoll(id);
	}

	onDeleteClick(){
		const { id } = this.props.match.params;
		this.props.deletePoll(id, () =>{
			this.props.history.push('/');
		});
	}

	render(){
		const { poll } = this.props;
		const { id } = this.props.match.params;

		if(!poll){
			return <div>Loading...</div>
		}
		return(
			<div>
			
				
				<button
					className="btn btn-danger float-right"
					onClick = {this.onDeleteClick.bind(this)}
				>
					Delete Poll
				</button>
				<Link className="btn btn-warning" to={`/posts/${id}/edit`}>
					Edit Poll
				</Link>
					<div className="card card-block">
						<div className="card-body">
							<h3 className="card-title">{poll.title}</h3>
							<ul className="list-group">
								{poll.options.map( (option, index) => {
									return(
										<li className="list-group-item" key={index}>{option.text} <button className="btn btn-primary float-right">Vote</button></li>
									);
								})}
							</ul>
						</div>
					
					</div>
			</div>
		);
	}
}


function mapStateToProps({ polls }, ownProps){
	return {poll:polls[ownProps.match.params.id]};
}
export default connect(mapStateToProps, { fetchPoll, deletePoll })(PollsShow);






// function mapStateToProps({ posts }, ownProps){
// 	return {post:posts[ownProps.match.params.id]};
// }
// export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);