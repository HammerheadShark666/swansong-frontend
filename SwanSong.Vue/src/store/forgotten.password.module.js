
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
			
			try 
			{
				commit(mutation.VERIFYING_REGISTRATION_TOKEN);	
				await ajax.post(`/${process.env.VUE_APP_DEFAULT_VERSION}/forgot-password/`, { email: email })
				commit(mutation.VERIFY_REGISTRATION_TOKEN_SUCCESS, "");
				return;
			} 
			catch(error)
			{
				console.log(error);
				throw error;
			}
		},
		async resetPassword({commit }, form) {			
			
			try
			{
				commit(mutation.VERIFYING_REGISTRATION_TOKEN);
				await ajax.post(`/${process.env.VUE_APP_DEFAULT_VERSION}/forgot-password/reset-password/`, form)
				commit(mutation.VERIFY_REGISTRATION_TOKEN_SUCCESS, "");
				return;
			}
			catch(error)
			{
				console.log(error);
				throw error;
			}
		},		
	}	
};
