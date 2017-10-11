import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE, FETCH_POLLS, FETCH_POLL, CREATE_POLL, DELETE_POLL } from './types';

const ROOT_URL = 'http://localhost:3090';


export function fetchPolls(){
	return function(dispatch){
		axios.get(`${ROOT_URL}/polls`)
			.then(response => {
				dispatch({
					type: FETCH_POLLS,
					payload: //{
						// 1:{_id:1, title:'Who is the best super hero?', options:['Spider-Man', 'Superman', 'Batman', 'Flash']},
						// 2:{_id:2, title:'What is the best book?', options:['The Hobbit', 'The Catcher in the Rye', 'The Giver']},
						// 3:{_id:3, title:'What is the best video game?', options:['Crackdown', 'Super Mario World', 'Darksiders', 'Stardew Valley']}
						response.data

					//} 
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
					payload: //{
						// 1:{_id:1, title:'Who is the best super hero?', options:['Spider-Man', 'Superman', 'Batman', 'Flash']},
						// 2:{_id:2, title:'What is the best book?', options:['The Hobbit', 'The Catcher in the Rye', 'The Giver']},
						// 3:{_id:3, title:'What is the best video game?', options:['Crackdown', 'Super Mario World', 'Darksiders', 'Stardew Valley']}
						response.data

					//} 
				});
			});
	}
}



// export function fetchPoll(id){
// 	const request = axios.get(`${ROOT_URL}/polls/${id}`);

// 	return{

// 		type: FETCH_POLL,
// 		payload: request
// 	};
// }

export function createPoll(values, callback){
	return function(dispatch){
		axios.post(`${ROOT_URL}/polls`, values, {
			headers: {authorization: localStorage.getItem('token')}
		})
			.then(response => {
				dispatch({
					type: FETCH_MESSAGE,
					payload: response.data.message
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

// export function createPoll(values, callback){
// 	const request = axios.post(`${ROOT_URL}/polls`, {headers: {authorization: localStorage.getItem('token')}}, values)
// 		.then(() => callback());

// 	return{
// 		type: CREATE_POLL,
// 		payload: request
// 	};
// }


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