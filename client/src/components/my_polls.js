import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';
import { Bar as BarChart } from 'react-chartjs-v2';

class MyPolls extends Component{

	componentDidMount(){
		this.props.fetchPolls()
	}

	renderChart(props){
		
		const opt = props.poll.options.map( opt => {
			return opt.text;
		});
		const labelvotecount = props.poll.options.map( count => {
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
    	};
    	return(
    	<BarChart data={chartData} options={chartOptions} width="600" height="250"/>
    	);
	}


	renderPolls(){
		const { id } = this.props.match.params;
			if(this.props.authenticated){
				this.props.fetchUser(() =>{
				
			});
		}
		return _.map(this.props.polls, poll => {
			if(this.props.user==poll.author.id){
				return(
						<div key={poll._id}>
							<li className="list-group-item polls mypolls">
							<Link to={`/polls/${poll._id}`}>
								{poll.title}
							</Link>
							</li>
							{this.renderChart(poll={poll})}
						</div>
				
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



