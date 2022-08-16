<template>
	<nav class="navbar navbar-expand navbar-dark nav-bar-color" v-if="isLoggedIn">	
		<router-link :to="{ name: 'home' }" class="navbar-brand">
			<el-row class="el-row-table">
                <el-col :span="10" fixed>    
					<el-image class="logo" v-bind:src="getImageUrl()"></el-image>
				</el-col>
				<el-col :span="10" fixed>  
					<h4 class="logo-text">SwanSong</h4>
				</el-col>
			</el-row>	
		</router-link>		 
		<div class="navbar-nav mr-auto">
			<ul class=" nav navbar-nav navbar-center">
				<li class="nav-item">
					<router-link :to="{ name: 'albums-album-add' }" class="nav-link">Albums</router-link>
				</li>
				<li class="nav-item">
					<router-link :to="{ name: 'artists-artist-add' }" class="nav-link">Artists</router-link>
				</li>
				<li class="nav-item">
					<router-link :to="{ name: 'members-member-add' }" class="nav-link">Members</router-link>
				</li>
				<!-- <li class="nav-item">
					<router-link to="/songs" class="nav-link">Songs</router-link>
				</li> -->
				<li class="nav-item">
					<router-link to="/lookups" class="nav-link">Lookups</router-link>
				</li>
				<!-- <li class="nav-item">
					<router-link v-if="currentUser" to="/users" class="nav-link">Users</router-link>
				</li> -->
			</ul>
		</div>

		<div v-if="!currentUser" class="navbar-nav ml-auto">
			<li class="nav-item">
				<router-link to="/register" class="nav-link">
					<font-awesome-icon icon="user-plus" /> Sign Up
				</router-link>
			</li>
			<li class="nav-item">
				<router-link to="/login" class="nav-link">
					<font-awesome-icon icon="sign-in-alt" /> Login
				</router-link>
			</li>
		</div>

		<div v-if="currentUser" class="navbar-nav ml-auto">
			<li class="nav-item">
				<router-link to="/profile" class="nav-link">
					<font-awesome-icon icon="user" />
					{{ currentUser.username }}
				</router-link>
			</li>
			<li class="nav-item">
				<a class="nav-link" @click.prevent="logOut">
					<font-awesome-icon icon="sign-out-alt" /> LogOut
				</a>
			</li>
		</div>
	</nav>
</template>

<script>

import { getLogoImageUrl } from './helpers/imageHelper'

export default {	 
	computed: {
		currentUser() {
			return this.$store.state.authentication.user;
		},
		isLoggedIn() {
			return this.$store.state.authentication.status.loggedIn;
		}
	},  
	methods: {
		getImageUrl: getLogoImageUrl,
		logOut() {
			this.$store.dispatch('authentication/logout');
			this.$router.push('/login');
		}
	}
};
</script> 

<style scoped>

.nav-bar-color {
	height:50px!important;
}

.navbar-nav.navbar-center .nav-item {
    padding-top: 5px;
}

.logo-text {
	margin-top: 6px;
	font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.logo {
	margin-top: 6px;
    height: 33px;
    width: 50px; 
    background-color: black; 
}

</style>