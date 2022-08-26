/* eslint-disable no-async-promise-executor */
import ajax from '../helpers/http-common'

const mutation = { 
	REGISTER_SUCCESS: "REGISTER_SUCCESS",  
	REGISTER_FAILURE: "REGISTER_FAILURE"
}

const user = JSON.parse(sessionStorage.getItem('user'));
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
		async verifyRegistrationToken( commit, token) {			
			return new Promise(async (resolve, reject) => {
				await ajax.post(`/register/verify-email/`, { token: token })
						.then(response => {
							resolve(response.data.message);
						})
						.catch(error => {
							reject(error.response);
						})
			})
		},
	}	
};
