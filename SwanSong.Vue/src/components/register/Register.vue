<template>
	<div class="vertical-center-outer">
		<div class="vertical-center-middle">
			<div class="vertical-center-inner">  
				<el-row>
					<el-col :span="24">
						<div class="card card-container">       
							<el-card class="box-card box-card-register">
								<template #header>
									<div class="card-header">      
										<el-row  class="register-row">       
											<el-col :span="24"><span>Register</span></el-col>                            
										</el-row>  
									</div>
								</template>			
								<div>									
									<el-row class="messages">
										<el-col :span="24">
											<alerts v-bind:visible="messages.length > 0" v-bind:messages="messages"></alerts>
										</el-col>
									</el-row> 
									<el-form 
										v-if="!successful"
										ref="registerForm" 
										:label-position="labelPosition" 
										:rules="rules" 
										:model="registerForm"
										label-width="120px">
										<el-row>
											<el-col :span="12" class="reg-col">
												<el-form-item label="Email" prop="email">
													<el-input type="email" v-model="registerForm.email"></el-input>
												</el-form-item>								
												<el-form-item label="First Name" prop="firstname">
													<el-input v-model="registerForm.firstname"></el-input>
												</el-form-item>								
												<el-form-item label="Last Name" prop="lastname">
													<el-input v-model="registerForm.lastname"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12" class="reg-col">									
												<el-form-item label="Password" prop="password">
													<el-input type="password" show-password v-model="registerForm.password"></el-input>
												</el-form-item>									
												<el-form-item label="Confirm Password" prop="confirmpassword">
													<el-input type="password" show-password v-model="registerForm.confirmpassword" v-on:keyup="registerOnReturnKey"></el-input>
												</el-form-item>									
											</el-col>
										</el-row>	
										<el-row>	
											<el-col :span="12" class="reg-col">	
												<router-link :to="{ name: 'login' }" class="cancel-register-button"> 											
													<el-button class="register-button" type="primary">Cancel</el-button>
												</router-link>
											</el-col>											
											<el-col :span="12" class="reg-col">												
												<el-button :disabled="disabled" class="register-button" type="primary" @click="submitForm()">Register</el-button>												
											</el-col>
										</el-row>	
									</el-form>
								</div>	
								<div
									v-if="message"
									class="alert success-message"
									:class="successful ? 'alert-success' : 'alert-danger'">
									{{ message }}
								</div>		
							</el-card>
						</div> 
					</el-col>
				</el-row>	
			</div>
		</div>
	</div>  
</template>

<script>

import Alerts from '../library/Alerts.vue' 
import { MESSAGE_INFO } from '../../helpers/helper'

export default {
	name: "Register",
	data() {  
		return {
			successful: false, 
			messages: [],	
			message: "",	
			labelPosition: 'top',
			disabled: false,
			registerForm: {
				email: '',
				firstname: '',
				lastname: '',
				password: '',
				confirmpassword: ''
			},			 
			rules: { 	email: [{required: true, message: 'Please input Email', trigger: 'blur'},
								{min: 5, max: 150, message: 'Length should be 5 to 150', trigger: 'blur'},
								{type: 'email', message: 'Please input correct Email'}],
						lastname: [{required: true, message: 'Please input Last Name', trigger: 'blur'},
									{min: 2, max: 50, message: 'Length should be 1 to 50', trigger: 'blur'}],
						firstname: [{required: true, message: 'Please input First Name', trigger: 'blur'},
									{min: 2, max: 50, message: 'Length should be 1 to 50', trigger: 'blur'}],
						password: [{required: true, message: 'Please input Password', trigger: 'blur'},
									{min: 8, max: 50, message: 'Length should be 8 to 50', trigger: 'blur'}],
						confirmpassword: [{required: true, message: 'Please input Confirm Password', trigger: 'blur'},
											{min: 8, max: 50, message: 'Length should be 8 to 50', trigger: 'blur'}, 
											{validator: this.confirmPasswordsSame}]
			}
		};
	},
	components:{  
        'alerts': Alerts
    },
	computed: {
		loggedIn() {
			return this.$store.state.authentication.status.loggedIn;
		},
	},
	mounted() {
		if (this.loggedIn)
			this.$router.push("/profile");		
	},	
	methods: {
		submitForm() {
			this.$refs.registerForm.validate((valid) => {
				if (valid) {
					this.message = "";
					this.messages = [];
					this.successful = false; 
					this.disabled = true;

					this.$store.dispatch("register/register", this.registerForm).then(
						() => {  							 
							this.messages = [ {"text" : "Registration successful, please check your email for verification instructions.", "severity": MESSAGE_INFO}];
							this.successful = true;   
						},
						(error) => {
							this.messages = error.data.messages;
							this.successful = false; 
							this.disabled = false;
						});
				} else { 
					return false
				}
			})
		},
		confirmPasswordsSame(rule, value, callback) {
			if (value === '') {
				callback(new Error('Please input the confirm password again'));
			} else if (value !== this.registerForm.password) {
				callback(new Error("Password and confirm password don't match!"));
			} else {
				callback();
			}
		},
		resetForm() {  
            this.$refs["registerForm"].resetFields();
            this.disabled = false;
        },		
		registerOnReturnKey: function(event) { 
			if(event.key == "Enter")
			{
				this.submitForm();
			}
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
 
.box-card-register {
	width: 100%;
}

.reg-col {
	padding-left: 10px;
    padding-right: 10px;
}

.register-button {
	float: right;
	margin-bottom: 5px;
}

.cancel-register-button {
	float: left;
	margin-bottom: 5px;
}

.vertical-center-inner { 
    width: 50%; 
}

.register-row {
	margin-top: 0px!important;
}

.success-message {
	margin-top: 15px;
}

</style>