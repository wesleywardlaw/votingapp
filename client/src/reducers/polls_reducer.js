import _ from 'lodash';
import { FETCH_POLLS, FETCH_POLL, DELETE_POLL } from '../actions/types';

export default function(state={}, action){
	switch(action.type){
		case DELETE_POLL:
			return _.omit(state, action.payload);
		case FETCH_POLL:
			// const post = action.payload.data;
			// const newState =  {...state }
			// newState[post.id] = post;
			// return newState;
			return {...state, [action.payload._id]:action.payload};
		case FETCH_POLLS:
			return action.payload;

		default: 
			return state;
	}

	
}