/* eslint-disable no-async-promise-executor */
import ajax from '../helpers/http-common'

const mutation = { 
	VERIFY_REGISTRATION_TOKEN_SUCCESS: "VERIFY_REGISTRATION_TOKEN_SUCCESS", 
	VERIFYING_REGISTRATION_TOKEN: "VERIFYING_REGISTRATION_TOKEN"
}

const user = JSON.parse(sessionStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true, registrationVerified: false, registrationIsBeenVerified: false }, user }
  : { status: { loggedIn: false, registrationVerified: false, registrationIsBeenVerified: false }, user: null };

export const forgottenPassword = {
	namespaced: true,
	state: initialState,
	mutations: {		 
		VERIFYING_REGISTRATION_TOKEN(state) {
			state.status.registrationIsBeenVerified = true;
		},
		VERIFY_REGISTRATION_TOKEN_SUCCESS(state) {
			state.status.registrationIsBeenVerified = false;
			state.status.registrationVerified = true;
		} 
	},
	actions: {		 
		async forgottenPassword({commit }, email) {						
			commit(mutation.VERIFYING_REGISTRATION_TOKEN);	
			return new Promise(async (resolve, reject) => {
				await ajax.post(`/forgot-password/`, { email: email })
						.then(() => {
							commit(mutation.VERIFY_REGISTRATION_TOKEN_SUCCESS, "");
							resolve();
						})
						.catch(error => {
							reject(error.response.data);
						})
			})
		},
		async resetPassword({commit }, form) {						
			commit(mutation.VERIFYING_REGISTRATION_TOKEN);	
			return new Promise(async (resolve, reject) => {
				await ajax.post(`/forgot-password/reset-password/`, form)
						.then(() => {
							commit(mutation.VERIFY_REGISTRATION_TOKEN_SUCCESS, "");
							resolve();
						})
						.catch(error => {
							reject(error.response);
						})
			})
		},		
	}	
};
