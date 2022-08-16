<template>
    <el-card class="box-card card-margin-right">
        <template #header>
            <div class="card-header">
                <span>Change Password</span> 
            </div>
        </template> 
        <el-row class="messages">
            <el-col :span="24">                 
                <alerts v-bind:visible="messages.length > 0" v-bind:messages="messages"></alerts>
            </el-col>
        </el-row> 
        <el-form 
            ref="profileChangePasswordForm"  
            :rules="rules" 
            :model="profilePasswordChange"
            label-width="133px">  
                <el-form-item label="Current Password" prop="currentPassword">
                    <el-input type="password" show-password v-model="profilePasswordChange.currentPassword"></el-input>
                </el-form-item>			
                <el-form-item label="Password" prop="password">
                    <el-input type="password" show-password v-model="profilePasswordChange.password"></el-input>
                </el-form-item>									
                <el-form-item label="Confirm Password" prop="confirmPassword">
                    <el-input type="password" show-password v-model="profilePasswordChange.confirmPassword"></el-input>
                </el-form-item>	
                <el-form-item class="form-item-button form-item-buttons">                    
                    <el-button type="primary" class="save-change-password-button" @click="submitForm('profileChangePasswordForm')">Save</el-button>
                </el-form-item>   
        </el-form>   
	</el-card>
</template>

<script>

import Alerts from '../library/Alerts.vue' 
import { defineComponent } from '@vue/composition-api'    
import { delayAlertRemove } from '../../helpers/helper'

export default defineComponent({
   
    el: 'ChangePassword', 
    data() {
        return {  
            successful: false, 
			messages: [],	
			message: "",	 
            rules: { 	currentPassword: [{required: true, message: 'Please input current password', trigger: 'blur'},
                                    {min: 8, max: 50, message: 'Length should be 8 to 50', trigger: 'blur'}],
                        password: [{required: true, message: 'Please input password', trigger: 'blur'},
                                    {min: 8, max: 50, message: 'Length should be 8 to 50', trigger: 'blur'}],
                        confirmPassword: [{required: true, message: 'Please input confirm password', trigger: 'blur'},
                                            {min: 8, max: 50, message: 'Length should be 8 to 50', trigger: 'blur'},
                                            {validator: this.confirmPasswordsSame}] 
            }
        }
    },  
    components:{  
        'alerts': Alerts
    },       
    computed: {	
         profilePasswordChange: {
            get() {
                return this.$store.state.profilePasswordChange.profilePasswordChange
            },   
            set(profilePasswordChange) {
                this.$store.commit("SET_PROFILE_PASSWORD_CHANGE", { profilePasswordChange });
            }     
        }
    },
    methods: {	
        submitForm(formName) {
            this.messages = [];
			this.$refs[formName].validate((valid) => {
				if (valid) {
                        this.$store.dispatch("profilePasswordChange/savePasswordChange").then(
						(response) => {			
                            this.messages = response.data.messages;
                            this.$store.dispatch("profilePasswordChange/clearPasswords");	   
                            delayAlertRemove().then(function() {
                                this.messages = [];                                      
                            }.bind(this));                

						},
						(error) => { 
                            this.messages = error.data;
						});
                }
            })
        },	
		confirmPasswordsSame(rule, value, callback) {
			if (value === '') {
				callback(new Error('Please input the confirm password again'));
			} else if (value !== this.profile.password) {
				callback(new Error("Password and confirm password don't match!"));
			} else {
				callback();
			}
		}	
	},
})

</script>


<style scoped> 
.card-margin-right {
    margin-right: 10px;
} 
.save-change-password-button {
	float: right;
	margin-bottom: 5px;
}
 
</style>