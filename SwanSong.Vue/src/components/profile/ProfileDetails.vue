<template>
    <el-card class="box-card card-margin-right">
        <template #header>
            <div class="card-header">
                <span>Details</span> 
            </div>
        </template> 
        <el-row class="messages">
            <el-col :span="24">
                <alerts v-bind:visible="messages.length > 0" v-bind:messages="messages"></alerts>
            </el-col>
        </el-row> 
        <el-form 
            ref="profileDetailsForm" 
            :label-position="labelPosition" 
            :rules="rules" 
            :model="profile"
            label-width="120px">    
 
                <el-form-item label="First Name" prop="firstName">
                    <el-input placeholder="First Name" maxlength="32" show-word-limit v-model="profile.firstName"></el-input>
                </el-form-item>    

                <el-form-item label="Last Name" prop="lastName">
                    <el-input placeholder="Last Name" maxlength="100" show-word-limit v-model="profile.lastName"></el-input>
                </el-form-item>    

                <el-form-item label="Email/Username" prop="email">
                    <el-input type="email" placeholder="Email" show-word-limit v-model="profile.email"></el-input>
                </el-form-item>  

                <el-form-item>
                    <el-button type="primary" @click="submitForm('profileDetailsForm')">
                        Save
                    </el-button>
                    <el-button @click="resetForm()">Reset</el-button>
                </el-form-item>  
    
                <!-- <el-form-item class="form-item-button form-item-buttons">                    
                    <el-button type="primary" :disabled="disabled" class="save-profile-details-button" @click="submitForm('profileDetailsForm')">Save</el-button>
                    <el-button type="primary" :disabled="disabled" class="reset-profile-details-button" @click="resetForm()">Reset</el-button>
                </el-form-item>   -->
        </el-form>   
	</el-card>
</template>

<script>

import { defineComponent } from 'vue'    
import { delayAlertRemove } from '../../helpers/helper' 
import Alerts from '../library/Alerts.vue' 

export default defineComponent({
   
    el: 'ProfileDetails', 
    components:{  
        'alerts': Alerts,
    },
    data() {
        return {   
            messages: [],  
            labelPosition: 'left',   
            disabled: false,      
            rules: { 	email: [{required: true, message: 'Please input Email', trigger: 'blur'},
								{min: 5, max: 150, message: 'Length should be 5 to 150', trigger: 'blur'},
								{type: 'email', message: 'Please input correct Email'}],
						lastName: [{required: true, message: 'Please input Last Name', trigger: 'blur'},
									{min: 2, max: 50, message: 'Length should be 1 to 50', trigger: 'blur'}],
						firstName: [{required: true, message: 'Please input First Name', trigger: 'blur'},
									{min: 2, max: 50, message: 'Length should be 1 to 50', trigger: 'blur'}],
			}
        }
    },         
    computed: {	
        profile: {
            get() {
                let profile = this.$store.state.profile.profile;

                if(profile.email == null) {
                    profile = JSON.parse(sessionStorage.getItem('user')).profile; 
                }

                return profile;
            },   
            set(profile) {
                this.$store.commit("SET_PROFILE", { profile });
            }     
        }
    }, 
    methods: {     
        submitForm(formName) {
            this.messages = [];
			this.$refs[formName].validate((valid) => {
				if (valid) {
                        this.disabled = true;
                        this.$store.dispatch("profile/saveProfile").then(
						(response) => {			
                            this.messages = response.data.messages;	  
                            this.resetForm();
                            delayAlertRemove().then(function() {
                                this.messages = [];  
                                this.$store.dispatch("profile/clearMessages");   
                            }.bind(this));        
						},
						(error) => { 
                            this.messages = error.data.messages;
                            this.disabled = false;
						});
                }
            })
        },
        resetForm() {  
            this.$refs["profileDetailsForm"].resetFields();
            this.disabled = false;
        }
    }
})

</script>


<style scoped>
 
.card-margin-right {
    margin-right: 10px;
} 

.save-profile-details-button {
	float: left;
	margin-bottom: 5px;
}

.reset-profile-details-button {
    float:right;
}
 
.box-card {
    height: 250px;
}

</style>