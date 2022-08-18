/* eslint-disable no-async-promise-executor */
import ajax from '../helpers/http-common'

const mutation = { 
	REGISTER_SUCCESS: "REGISTER_SUCCESS",  
	REGISTER_FAILURE: "REGISTER_FAILURE",
	VERIFY_REGISTRATION_TOKEN_SUCCESS: "VERIFY_REGISTRATION_TOKEN_SUCCESS",
	VERIFYING_REGISTRATION_TOKEN: "VERIFYING_REGISTRATION_TOKEN"
}

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true, registrationVerified: false, registrationIsBeenVerified: false }, user }
  : { status: { loggedIn: false, registrationVerified: false, registrationIsBeenVerified: false }, user: null };

export const register = {
	namespaced: true,
	state: initialState,
	mutations: {
		REGISTER_SUCCESS(state) {
			state.status.loggedIn = false;
		},
		REGISTER_FAILURE(state) {
			state.status.loggedIn = false;
		},
	},
	actions: {
    async register({ commit }, user) {

			var data = {
				title: "Mr",
				email: user.email,
				lastname: user.lastname,
				firstname: user.firstname,
				password: user.password,
				confirmpassword: user.confirmpassword,
				acceptterms: true
			}

			return new Promise(async (resolve, reject) => {
				await ajax.post(`/register`, data)
						.then(response => {
							commit(mutation.REGISTER_SUCCESS);
							resolve(response.data);
						})
						.catch(error => {
							commit(mutation.REGISTER_FAILURE);
							reject(error.response);
						})    
			})
		},
		async verifyRegistrationToken({ commit }, token) {
						
			commit(mutation.VERIFYING_REGISTRATION_TOKEN);					 

			return new Promise(async (resolve, reject) => {
				await ajax.post(`/register/verify-email/`, { token: token })
						.then(response => {
							commit(mutation.VERIFY_REGISTRATION_TOKEN_SUCCESS, response.data);
							resolve(response.data.message);
						})
						.catch(error => {
							reject(error.response);
						})
			})
		},
	}	
};
