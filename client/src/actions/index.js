import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { 
		AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE, FETCH_POLLS, FETCH_POLL,
		CREATE_POLL, DELETE_POLL, EDIT_POLL, FETCH_USER, ADD_VOTE, ALREADY_VOTED, NEW_OPTION 
	   } from './types';

const ROOT_URL = 'http://localhost:3090';


export function fetchPolls(){
	return function(dispatch){
		axios.get(`${ROOT_URL}/polls`)
			.then(response => {
				dispatch({
					type: FETCH_POLLS,
					payload: 
						response.data
				});
			});
	}
}

export function fetchPoll(id){
	return function(dispatch){
		axios.get(`${ROOT_URL}/polls/${id}`)
			.then(response => {
				dispatch({
					type: FETCH_POLL,
					payload: 
						response.data
				});
			});
	}
}


export function createPoll(values, callback){
	return function(dispatch){
		axios.post(`${ROOT_URL}/polls`, values, {
			headers: {authorization: localStorage.getItem('token')}
		})
			.then(response => {
				dispatch({
					type: CREATE_POLL,
					payload: response.data
				});
				callback();
			})
	}
}

export function editPoll(values, id, callback){
	return function(dispatch){
		axios.put(`${ROOT_URL}/polls/${id}`, values, {
			headers: {authorization: localStorage.getItem('token')}
		})
			.then(response => {
				dispatch({
					type: EDIT_POLL,
					payload: response.data
				});
				callback();
			})
	}
}

export function deletePoll(id, callback){
	return function(dispatch){
		axios.delete(`${ROOT_URL}/polls/${id}`, {headers: {authorization: localStorage.getItem('token')}})
			.then(response => {
				dispatch({
					type: DELETE_POLL,
					payload: id
				});
				callback();
			});
	}
}


export function addNewOption(id, values, callback){
	return function(dispatch){
		axios.put(`${ROOT_URL}/polls/${id}/newoption`, values)
			.then(response => {
				dispatch({
					type: NEW_OPTION,
					payload: response.data
				});
				callback();
			});
	}

}

export function addVote(id, option){
	if(localStorage.getItem('votes')!==null){
		var array = JSON.parse(localStorage.getItem('votes'));
		if(array.indexOf(id)>-1){
			return function(dispatch){
				dispatch({
					type: ALREADY_VOTED,
					payload:null
				});
			}
		}
		array.push(id);
		localStorage.setItem('votes', JSON.stringify(array));
	} else{
		var array = [id];
		localStorage.setItem('votes', JSON.stringify(array));
	}
	return function(dispatch){
		axios.put(`${ROOT_URL}/polls/${id}/${option}`)
			.then(response => {
			
				dispatch({
					type: ADD_VOTE,
					payload: response.data
				});

			});
	}
}


export function fetchUser(callback){
	return function(dispatch){
		axios.get(`${ROOT_URL}/user`, {headers: {authorization: localStorage.getItem('token')}})
			.then(response => {
				dispatch({
					type: FETCH_USER,
					payload: 
						response.data
				});
				callback();
			});
	}
}


export function signinUser({ email, password }, callback ){
	//redux-thunk lets you return a function isntead of an object, this function has access to dispatch
	return function(dispatch){
		//Submit e-mail/password to the server
			//same as {email:email, password: password}
		axios.post(`${ROOT_URL}/signin`, {email, password})
			.then( response => {
				//If request is good
				//- update the state to indicate the user is authenticated
				dispatch({type: AUTH_USER});
				//- save JWT token
					//localStorage is on the scope of the window, allows storage to user's hdd/ssd/whatever
				localStorage.setItem('token', response.data.token);
				//- redirect to the router /feature
				// history.push("/feature");
				callback();
			})


			.catch( () => {
				//If request is bad
				//-show error to user
				dispatch(authError('Bad Login Info'));
			})
	}
}

export function signupUser({email,password}, callback){
	return function(dispatch){
		axios.post(`${ROOT_URL}/signup`, {email, password})
			.then( (response) =>{
				dispatch({type: AUTH_USER});
				localStorage.setItem('token', response.data.token);
				// history.push("/feature");
				callback();
			})
			.catch( response =>dispatch(authError(response.data.error)))   
	}
}

export function authError(error){
	return{
		type: AUTH_ERROR,
		payload: error
	};
}

export function signoutUser(){
	localStorage.removeItem('token');
	return {type: UNAUTH_USER};
}

export function fetchMessage(){
	return function(dispatch){
		axios.get(ROOT_URL, {
			headers: {authorization: localStorage.getItem('token')}
		})
			.then(response => {
				dispatch({
					type: FETCH_MESSAGE,
					payload: response.data.message
				});
			})
	}
}