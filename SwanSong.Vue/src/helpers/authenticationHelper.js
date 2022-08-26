
export function getAccessToken() {
	let user = window.sessionStorage.getItem("user");
	user = JSON.parse(user);
	if ((user) && (user.jwtToken)) {
		return user.jwtToken;
	}
	return "";
}

export function getRefreshToken() {
	let user = window.sessionStorage.getItem("user");
	user = JSON.parse(user);
	if ((user) && (user.refreshToken)) {
		return { 
			refreshToken: user.refreshToken
		};
	}
	return ""; 
}