import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class PollsIndex extends Component{
	render(){

		return(

			<div>You don't fuckin' care</div>

		);
	}
}

function mapStateToProps(state){

}

export default connect(mapStateToProps, actions)(PollsIndex);