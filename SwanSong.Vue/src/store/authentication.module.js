
import ajax from '../helpers/http-common'

const mutation = { 
	LOGIN_SUCCESS: "LOGIN_SUCCESS", 
	LOGIN_FAILURE: "LOGIN_FAILURE",  
	LOGOUT: "LOGOUT",  
	REGISTER_SUCCESS: "REGISTER_SUCCESS",  
	REGISTER_FAILURE: "REGISTER_FAILURE", 
}

const user = JSON.parse(sessionStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true, registrationVerified: false, registrationIsBeenVerified: false }, user }
  : { status: { loggedIn: false, registrationVerified: false, registrationIsBeenVerified: false }, user: null };

export const authentication = {
	namespaced: true,
	state: initialState,
	mutations: {
		LOGIN_SUCCESS(state, user) {
			state.status.loggedIn = true;
			state.user = user;
		},
		LOGIN_FAILURE(state) {
			state.status.loggedIn = false;
			state.user = null;
		},
		LOGOUT(state) {
			state.status.loggedIn = false;
			state.user = null;
		},
	},
	actions: {
		async login({ commit, dispatch }, loginForm) {

			try
			{
				const response = await ajax.post(`/${process.env.VUE_APP_DEFAULT_VERSION}/login`, loginForm)
				if (response.data.jwtToken) {
					sessionStorage.setItem('user', JSON.stringify(response.data));
				}				 
				commit(mutation.LOGIN_SUCCESS, response.data);  
				dispatch("profile/setProfile", response.data.profile);
				dispatch("profile/getProfile", '', { root:true });   
				return response;
			} 
			catch(error)
			{
				commit(mutation.LOGIN_FAILURE);
				throw error;
			}
		},
		logout({ commit }) {
			sessionStorage.removeItem('user');
			commit(mutation.LOGOUT);
		},	 
	}	
};
