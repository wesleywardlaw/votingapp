import { FETCH_POLLS, FETCH_POLL } from '../actions/types';

export default function(state={}, action){
	switch(action.type){
		case FETCH_POLL:
			// const post = action.payload.data;
			// const newState =  {...state }
			// newState[post.id] = post;
			// return newState;
			return {...state, [action.payload.data._id]:action.payload.data};
		case FETCH_POLLS:
			return action.payload;
		default: 
			return state;
	}

	
}