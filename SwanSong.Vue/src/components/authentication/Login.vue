<template>
	<div class="vertical-center-outer">
		<div class="vertical-center-middle">
			<div class="vertical-center-inner">   
				<el-row>
					<el-col :span="24">
						<div class="card card-container">       
							<el-card class="box-card box-card-login">
								<template #header>
									<div class="card-header">      
										<el-row>       
											<el-col :span="24"><span>Login</span></el-col>                            
										</el-row>  
									</div>
								</template>
								<el-row class="messages">
									<el-col :span="24">
										<alerts v-bind:visible="messages.length > 0" v-bind:messages="messages"></alerts>										 
									</el-col>
								</el-row>  
								<el-form 
									ref="loginForm" 
									:label-position="labelPosition" 
									:rules="rules" 
									:model="loginForm"
									label-width="120px">
									<el-row>
										<el-col :span="24" class="reg-col">
											<el-form-item label="Email" prop="email">
												<el-input type="email" v-model="loginForm.email"></el-input>
											</el-form-item>				
											<el-form-item label="Password" prop="password">
												<el-input type="password" show-password v-model="loginForm.password"></el-input>
											</el-form-item>					
										</el-col>
									</el-row>	
									<el-row>
										<el-col :span="24" class="reg-col">
											<el-form-item class="form-item-button">
												<el-button type="primary" class="login-button" @click="submitForm()">Login</el-button>
											</el-form-item>
										</el-col>
									</el-row>	
								</el-form>
							</el-card>
							<el-row>
								<el-col :span="12" class="reg-col">
									<router-link :to="{ name: 'forgotten-password' }" class="nav-link"> 
										Forgotten Password
									</router-link>
								</el-col>
								<el-col :span="12" class="reg-col">
									<router-link :to="{ name: 'register' }" class="nav-link"> 
										Register
									</router-link>									
								</el-col>
							</el-row>
						</div> 
					</el-col>
				</el-row>	
			</div>
		</div>
	</div>  
</template>

<script>
 
import Alerts from '../library/Alerts.vue'  

export default {
	name: "Login",
	components:{  
        'alerts': Alerts
    },
	data() {  
		return {
			messages: [],	
			successful: false, 					
			labelPosition: 'top',
			loginForm: {
				email: '',				
				password: ''
			},
			rules: {
				email: [{required: true, message: 'Please input Email', trigger: 'blur'},
						{min: 5, max: 150, message: 'Length should be 5 to 150', trigger: 'blur'},
						{type: 'email', message: 'Please input correct Email'}],	
				password: [{required: true, message: 'Please input Password', trigger: 'blur'},
							{min: 8, max: 50, message: 'Length should be 8 to 50', trigger: 'blur'}]
			}
		};
	},	
	computed: {
		loggedIn() {
			return this.$store.state.authentication.status.loggedIn;
		}
	},
	created() {
		if (this.loggedIn) {
			this.$router.push("/");
		}
	},
	methods: {
		submitForm() {
			this.$refs.loginForm.validate((valid) => {
				if (valid) {
					this.messages = [];
					this.successful = false; 
 
					this.$store.dispatch("authentication/login", this.loginForm).then(
						() => {			
                            this.$router.push("/");          
						},
						(error) => {							  
							this.messages.push({message: error.response.data[0].message, severity: error.response.data[0].severity}); 					
						}); 
				} else { 
					return false
				}
			})
		}		
	},
};

</script>

<style scoped>

label {
	display: block;
	margin-top: 10px;	
}

.card-container.card { 
	padding: 20px 20px;
}

.card {
	background-color: #f7f7f7;
	padding: 20px 25px 30px;
	margin: 0 auto 25px;
	margin-top: 50px;
	-moz-border-radius: 2px;
	-webkit-border-radius: 2px;
	border-radius: 2px;
	-moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
	-webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
} 
 
.box-card-login {
	width: 100%;
}
  
.login-button {
	float: right;
	margin-bottom: 5px;
}

.form-item-button {
	margin-bottom:0px!important;
}

.vertical-center-inner { 
    width: 30%; 
}

</style>