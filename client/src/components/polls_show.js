import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPoll, deletePoll, fetchUser, addVote } from '../actions';
import { Link } from 'react-router-dom';
import { Bar as BarChart } from 'react-chartjs-v2';

class PollsShow extends Component{

	componentDidMount(){
		const { id } = this.props.match.params;
		this.props.fetchPoll(id);
		if(this.props.authenticated){
			if(this.props.authenticated){
				this.props.fetchUser(() =>{
				});
			}
		}
		
	}

	onDeleteClick(){
		const { id } = this.props.match.params;
		this.props.deletePoll(id, () =>{
			this.props.history.push('/');
		});
	}

	handleVote(index){
		const { id } = this.props.match.params;
		const option = index;
		this.props.addVote(id, option);
	}


	renderButtons(){
		const { id } = this.props.match.params;
			if(this.props.authenticated){
				this.props.fetchUser(() =>{
			});
		}
		
	
		if(this.props.authenticated && this.props.user==this.props.poll.author.id){
			return(
				<div>
					<button
						className="btn btn-danger float-right"
						onClick = {this.onDeleteClick.bind(this)}
					>
						Delete Poll
					</button>
					<Link className="btn btn-warning" to={`/polls/${id}/edit`}>
						Edit Poll
					</Link>
				</div>
			);
		}
	
	}

	renderNewOptions(){
		const { id } = this.props.match.params;
		if(this.props.authenticated){
			return(
				<Link className="btn btn-primary" to ={`/polls/${id}/newoption`}>Add a New Option</Link>
			);
		}
	}

	render(){
		const { poll } = this.props;
		const { id } = this.props.match.params;


		if(!poll){
			return <div>Loading...</div>
		}
		const opt = poll.options.map( opt => {
			return opt.text;
		});
		const labelvotecount = poll.options.map( count => {
			return count.votecount;
		});
		const chartData = {
			labels: opt,
	        datasets: [{
	            label: '# of Votes',
	            data: labelvotecount,
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255,99,132,1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1
	        }]
	    }
    	const chartOptions = {
    		legend:{
    			display:false
    		},
    		scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true
	                }
	            }]
        	}
    	}
    
    	


		if(localStorage.getItem('votes')!==null){
			var array = JSON.parse(localStorage.getItem('votes'));
			if(array.indexOf(id)!==-1){
				return(
					<div>
						{this.renderButtons()}
						<h1>{poll.title}</h1>
						<BarChart data={chartData} options={chartOptions} width="600" height="250"/>

					</div>
				);
			}
		}
		

		return(
			<div>
				{this.renderButtons()}
				
				
					<div className="card card-block">
						<div className="card-body">
							<h3 className="card-title">{poll.title}</h3>
							<ul className="list-group">
								{poll.options.map( (option, index) => {
									return(
										<li className="list-group-item" key={index}>{option.text} <button className="btn btn-primary float-right" onClick = {this.handleVote.bind(this,index)}>Vote</button></li>
									);
								})}
							</ul>
							{this.renderNewOptions()}
							<a className = "btn btn-primary" href="https://twitter.com/intent/tweet?url=http%3A%2F%2Fvotingapp.heroku.com&text=Vote%21" target="_blank">Tweet It</a>
						</div>
					
					</div>
			</div>
		);
	}
}


function mapStateToProps(state, ownProps){
	return {poll:state.polls[ownProps.match.params.id], authenticated:state.auth.authenticated, user: state.auth.user};
}
export default connect(mapStateToProps, { fetchPoll, deletePoll, fetchUser, addVote })(PollsShow);


