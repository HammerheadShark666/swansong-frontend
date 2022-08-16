<template>
	<div class="vertical-center-outer">
		<div class="vertical-center-middle">
			<div class="vertical-center-inner">   
				<el-row>
					<el-col :span="24">
						<div class="card card-container">       
							<el-card class="box-card box-card-reset-password">
								<template #header>
									<div class="card-header">      
										<el-row>       
											<el-col :span="24"><span>Reset Password</span></el-col>                            
										</el-row>  
									</div>
								</template> 
								<el-row v-if="!successful && messages.length > 0" class="messages">
									<el-col :span="24">                 
										<alerts v-bind:visible="messages.length > 0" v-bind:messages="messages"></alerts>
									</el-col>
								</el-row>      
								<el-alert show-icon class="alert success-message" v-if="successful" :class="'alert-success'" type="info">
									<span>Password saved - you can now  <router-link to='/login'>Login</router-link></span> 
								</el-alert> 
								<el-form
									v-if="!successful"									  
									ref="resetPasswordForm" 
									:label-position="labelPosition" 
									:rules="rules" 
									:model="resetPasswordForm"
									label-width="120px">
									<el-row>
										<el-col :span="24" class="reg-col">
											<el-form-item label="Password" prop="password">
												<el-input type="password" minlength="8" maxlength="25" show-password v-model="resetPasswordForm.password"></el-input>
                                            </el-form-item>									
                                            <el-form-item label="Confirm Password" prop="confirmPassword">
                                                <el-input type="password" minlength="8" maxlength="25"  show-password v-model="resetPasswordForm.confirmPassword"></el-input>
                                            </el-form-item>					
										</el-col>
									</el-row>	
									<el-row>
										<el-col :span="24" class="reg-col">
											<el-form-item class="form-item-button">
												<el-button type="primary" class="reset-password-button" @click="submitForm()">Send</el-button>
											</el-form-item>
										</el-col>
									</el-row>	
								</el-form>
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

export default {
	name: "ResetPassword",
	data() {
		return {
			successful: false, 
			messages: [],			
			labelPosition: 'top', 
			resetPasswordForm: {
				password: 'Password#1',				
				confirmPassword: 'Password#1',
				token: ''
			},
			rules: {
				password: [	{required: true, message: 'Please input Password', trigger: 'blur'},
							{min: 8, max: 50, message: 'Length should be 8 to 50', trigger: 'blur'}],
				confirmPassword: [	{required: true, message: 'Please input Password', trigger: 'blur'},
									{min: 8, max: 50, message: 'Length should be 8 to 50', trigger: 'blur'},
									{validator: this.confirmPasswordsSame}]
			}
		};
	},	
	components:{    
        'alerts': Alerts
    },
	mounted: function() {
		this.resetPasswordForm.token = this.$route.params.token; 
	},
	methods: {
		submitForm() { 
			this.$refs.resetPasswordForm.validate((valid) => {
				if (valid) {
					this.messages = [];
					this.successful = false; 		 
					this.$store.dispatch("forgottenPassword/resetPassword", this.resetPasswordForm).then(
						() => {							
							this.successful = true;
						},
						(error) => {			 
							this.messages = error.data;
						});
				} else { 
					return false;
				}
			})
		},
		confirmPasswordsSame(rule, value, callback) {
			if (value === '') {
				callback(new Error('Please input the confirm password again'));
			} else if (value !== this.resetPasswordForm.password) {
				callback(new Error("Password and confirm password don't match!"));
			} else {
				callback();
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

.box-card-reset-password {
	width: 100%;
}
  
.reset-password-button {
	float: right;
}

.form-item-button {
	margin-bottom:0px!important;
}

.vertical-center-inner { 
    width: 30%; 
}

</style>