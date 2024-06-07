<template>
	<div class="vertical-center-outer">
		<div class="vertical-center-middle">
			<div class="vertical-center-inner">   
				<el-row>
					<el-col :span="24">
						<div class="card card-container">       
							<el-card class="box-card box-card-request-reset-password">
								<template #header>
									<div class="card-header">      
										<el-row>       
											<el-col :span="24"><span>Request Reset Password</span></el-col>                            
										</el-row>  
									</div>
								</template>	 
								<el-row class="messages">
									<el-col :span="24">                 
										<alerts v-bind:visible="messages.length > 0" v-bind:messages="messages"></alerts>
									</el-col>
								</el-row>   
								<el-form 									
									ref="requestResetPasswordForm" 
									:label-position="labelPosition" 
									:rules="rules" 
									:model="requestResetPasswordForm"
									label-width="120px">
									<el-row>
										<el-col :span="24" class="reg-col">
											<el-form-item label="Email" prop="email">
												<el-input type="email" v-model="requestResetPasswordForm.email"></el-input>
											</el-form-item>				
										</el-col>
									</el-row>	
									<el-row>
										<el-col :span="12" class="reg-col">	
												<router-link :to="{ name: 'login' }" class="cancel-request-reset-password-button"> 											
													<el-button class="register-button" type="primary">Cancel</el-button>
												</router-link>
											</el-col>		
										<el-col :span="12" class="reg-col">
											<el-form-item class="form-item-button">
												<el-button :disabled="disabled" type="primary" class="request-reset-password-button" @click="submitForm()">Send</el-button>
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
	name: "RequestResetPassword",
	data() {
          
		return {
			successful: false, 
			disabled: false,
			messages: [],			
			labelPosition: 'top', 
			requestResetPasswordForm: {
				email: ''
			},
			rules: { email: [ 	{required: true, message: 'Please input Email', trigger: 'blur'},
								{min: 5, max: 150, message: 'Length should be 5 to 150', trigger: 'blur'},
								{type: 'email', message: 'Please input correct Email'}] }
		};
	},
	components:{    
        'alerts': Alerts
    },	
	methods: {
		submitForm() {
			this.$refs.requestResetPasswordForm.validate((valid) => {
				if (valid) {
					this.disabled = true;
					this.messages = [];
					this.successful = false;  
					var email = this.requestResetPasswordForm.email;			

					this.$store.dispatch("forgottenPassword/forgottenPassword", email).then(
						() => {							
							this.successful = true;	
							this.resetForm();						
							this.messages.push({ text: "A reset password email has been sent", severity:"info" });
						},
						(error) => {	
							this.messages = error.messages; 
							this.disabled = false;
						});
				} else { 
					return false;
				}
			})
		},
		resetForm() {
			this.$refs["requestResetPasswordForm"].resetFields(); 
			this.disabled = false;
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
  
.box-card-request-reset-password {
	width: 100%;
}
  
.request-reset-password-button {
	float: right;
	margin-bottom: 5px;
}

.cancel-request-reset-password-button {
	float: left;
	margin-bottom: 5px;
}

.form-item-button {
	margin-bottom:0px!important;
}

.vertical-center-inner { 
    width: 30%; 
}

</style>