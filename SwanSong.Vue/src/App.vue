<template>
	<div>  
		<navigation-bar /> 
		<nav class="navbar navbar-expand navbar-light nav-bar-white" v-if="isLoggedIn"></nav> 
		<div class="container">
			<div class="main-padder"></div>
			<router-view />
		</div>
	</div>
</template>

<script>

import NavigationBar from "./NavigationBar.vue"

export default {
	components:{ 
		'navigation-bar': NavigationBar 
	},
	computed: { 
		isLoggedIn() {
			return this.$store.state.authentication.status.loggedIn;
		}
	} 
};
</script>