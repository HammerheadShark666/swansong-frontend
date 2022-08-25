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
            ref="changePasswordForm"  
            :rules="rules"  
            :model="changePasswordForm"
            label-width="133px">  
                <el-form-item label="Current Password" prop="currentpassword">
                    <el-input type="password" show-password v-model="changePasswordForm.currentpassword"></el-input>
                </el-form-item>			
                <el-form-item label="Password" prop="password">
                    <el-input type="password" show-password v-model="changePasswordForm.password"></el-input>
                </el-form-item>									
                <el-form-item label="Confirm Password" prop="confirmpassword">
                    <el-input type="password" show-password v-model="changePasswordForm.confirmpassword"></el-input>
                </el-form-item>	
                <el-form-item class="form-item-button form-item-buttons">                    
                    <el-button type="primary" :disabled="disabled" class="save-change-password-button" @click="submitForm()">Save</el-button>
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
			messages: [],	
			message: "",
            disabled: false,
            changePasswordForm: {
                currentpassword: '', 
                password: '', 
                confirmpassword: ''
			},		 
            rules: { 	
                        currentpassword: [{required: true, message: 'Please input current password', trigger: 'blur'},
                                     {min: 8, max: 50, message: 'Length should be 8 to 50', trigger: 'blur'}],
                        password: [{required: true, message: 'Please input password', trigger: 'blur'},
                                     {min: 8, max: 50, message: 'Length should be 8 to 50', trigger: 'blur'}],
                        confirmpassword: [{required: true, message: 'Please input confirm password', trigger: 'blur'},
                                             {min: 8, max: 50, message: 'Length should be 8 to 50', trigger: 'blur'},
                                             {validator: this.confirmPasswordsSame}] 
            }
        }
    },  
    components:{  
        'alerts': Alerts
    },       
    computed: {	        
    },
    methods: {	
        submitForm() {
            this.messages = [];            
            this.$refs.changePasswordForm.validate((valid) => {
				if (valid) {
                    this.disabled = true;
                    this.$store.dispatch("profilePasswordChange/savePasswordChange", this.changePasswordForm).then(
                    (response) => {			
                        this.messages = response.data.messages;
                        this.resetForm();    
                        delayAlertRemove().then(function() {
                            this.messages = [];                                      
                        }.bind(this));            
                    },
                    (error) => { 
                        this.messages = error.data;
                        this.disabled = false;
                    });
                } 
            })
        },	
		confirmPasswordsSame(rule, value, callback) {
			if (value === '') {
				callback(new Error('Please input the confirm password again'));
			} else if (value !== this.changePasswordForm.password) {
				callback(new Error("Password and confirm password don't match!"));
			} else {
				callback();
			}
        },
        resetForm() {  
            this.$refs["changePasswordForm"].resetFields();
            this.disabled = false;
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