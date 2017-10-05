import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password } ){
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
				browserHistory.push("/feature");
			})


			.catch( () => {
				//If request is bad
				//-show error to user
				dispatch(authError('Bad Login Info'));
			})
	}
}

export function signupUser({email,password}){
	return function(dispatch){
		axios.post(`${ROOT_URL}/signup`, {email, password})
			.then( response =>{
				dispatch({type: AUTH_USER});
				localStorage.setItem('token', response.data.token);
				browserHistory.push("/feature");
			})
			.catch( response => dispatch(authError(response.data.error)))
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