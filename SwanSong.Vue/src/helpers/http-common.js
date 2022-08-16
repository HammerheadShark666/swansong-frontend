import axios from 'axios';  
import router from '../router';
import store from '../store'; 
import { getLocalAccessToken, getLocalRefreshToken } from "./authenticationHelper"
  
function refreshToken() {
	return ajax.post(`refresh-token`, getLocalRefreshToken())
				.then(response => {   
					if ((response.status === 400) && (response.data.Message === "Invalid token") && (response.config.url == "refresh-token")) {
						localStorage.removeItem('user');    
						store.dispatch('authentication/logout');
						router.replace({
							path: '/login',
							query: {redirect: router.currentRoute.fullPath}
						});
					} else if (response.data.jwtToken) {
						localStorage.setItem('user', JSON.stringify(response.data));
					}
				})
}

const ajax = axios.create({
    baseURL: (process.env.VUE_APP_BASE_URL !== undefined) ? process.env.VUE_APP_BASE_URL : ''
});
 
ajax.CancelToken = axios.CancelToken
ajax.isCancel = axios.isCancel
  
ajax.interceptors.request.use(
	(config) => {
		const token = getLocalAccessToken();
		if (token) {			
			config.headers['Authorization'] = `Bearer ${ token }`
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

ajax.interceptors.response.use(
	(res) => {
		return res;
	},
	async (error) => {

		const publicPages = ['login', 'register', '/verify-email', '/reset-password', '/forgotten-password'];
		let authRequired = !publicPages.includes(error.response.config.url); 

		if(authRequired == true && (error.response.config.url.includes("verify-email") || error.response.config.url.includes("reset-password"))) 
			authRequired = false;

		if(authRequired) {
			
			let originalConfig = error.config;

			if (error.response != undefined) { 
				//Refresh token expired
				if ((error.response.data.Message === "Invalid token") && (error.config.url == "refresh-token")) {			
					return error.response;				
				}
				
				//Refresh token valid
				if ((error.response.status === 401) && (typeof originalConfig._retry != undefined)) { 
					originalConfig["_retry"] = true;
				
					try {
						await refreshToken();
	
						//After refreshing token, rerun api call
						const config = error.config;
						config.headers = { Authorization: `Bearer ${ getLocalAccessToken() }` }

						return new Promise((resolve, reject) => {
							axios.request(config).then(response => {
								resolve(response);
							}).catch((error) => {
								reject(error);
							})
						});
					} catch (_error) {
						if ((_error.response) && (_error.response.data)) { 
							localStorage.removeItem('user');
							router.push('/login');
							return Promise.reject(_error.response.data);
						}
						return Promise.reject(_error);
					}
				}       
			}
		}
		return Promise.reject(error);
	}
);
 
export default ajax