<template>
	<div class="vertical-center-outer">
		<div class="vertical-center-middle">
			<div class="vertical-center-inner">   
				<el-row>
					<el-col :span="24">
						<div class="card card-container">       
							<el-card class="box-card box-card-registration-verify">
								<template #header>
									<div class="card-header">      
										<el-row>       
											<el-col :span="24"><span>Registration Verification</span></el-col>                            
										</el-row>  
									</div>
								</template>
								<el-row class="messages">
										<el-col :span="24">
											<alerts v-bind:visible="messages.length > 0" v-bind:messages="messages"></alerts>
										</el-col>
									</el-row> 
								<el-alert show-icon class="alert success-message" v-if="successful" :class="'alert-success'" type="info">
									<span>Verification successful, you can now <router-link to='/login'>Login</router-link></span> 
								</el-alert>
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
import { getErrorMessages } from '../../helpers/helper' 

export default {
	name: "VerifyEmail",
	data() {		
		return {			 
			messages: [],	
			successful: false,	
			formLabelWidth: '70px', 
		};
	},	 
	components:{  
        'alerts': Alerts
    },
	mounted: function() {

		let token = this.$route.params.token; 
		if(token != undefined) {
			this.$store.dispatch("register/verifyRegistrationToken", token).then( 
				() => {
					this.messages = []; 
					this.successful = true; 
				},
				(error) => {
					this.successful = false; 
					this.messages = getErrorMessages(error);
				}
			);
		}		 		
	}
};
</script>

<style scoped>

.box-card-registration-verify {
	width: 100%; 
}

.vertical-center-inner { 
    width: 40%; 
}

.card-container.card { 
	padding: 20px 20px;
}

.success-message {
	margin-top: 12px;
	margin-bottom: 12px;
}

</style>
