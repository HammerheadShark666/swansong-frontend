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

			try
			{
				const response = await ajax.post(`/${process.env.VUE_APP_DEFAULT_VERSION}/register`, data);
				commit(mutation.REGISTER_SUCCESS);
				return response.data;
			}
			catch(error)
			{
				console.log(error);
				commit(mutation.REGISTER_FAILURE); 
				throw error;
			}
		},
		async verifyRegistrationToken( commit, token) {			

			return await ajax.post(`/${process.env.VUE_APP_DEFAULT_VERSION}/register/verify-email/`, { token: token });
		},
	}	
};
