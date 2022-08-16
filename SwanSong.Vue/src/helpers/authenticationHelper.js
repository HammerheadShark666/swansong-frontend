
export function getLocalAccessToken() {
	let user = window.localStorage.getItem("user");
	user = JSON.parse(user);
	if ((user) && (user.jwtToken)) {
		return user.jwtToken;
	}
	return "";
}

export function getLocalRefreshToken() {
	let user = window.localStorage.getItem("user");
	user = JSON.parse(user);
	if ((user) && (user.refreshToken)) {
		return { 
			refreshToken: user.refreshToken
		};
	}
	return ""; 
}