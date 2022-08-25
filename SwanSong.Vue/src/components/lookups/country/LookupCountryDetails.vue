<template>
    <div>   
        <el-row class="messages">
            <el-col :span="24">                 
                <alerts v-bind:visible="messages.length > 0" v-bind:messages="messages"></alerts>
            </el-col>
        </el-row>    
        <el-form 
            ref="countryDetailsForm" 
            :label-position="labelPosition" 
            :rules="rules" 
            :model="country"
            label-width="120px">    
            <el-form-item label="Name" prop="name">
                <el-input placeholder="Country Name" maxlength="50" show-word-limit v-model="country.name"></el-input>
            </el-form-item>  
            <el-row>
                <el-col :span="24">    
                    <el-popconfirm
                        v-if="country.id > 0"
                        confirmButtonText="Yes"
                        cancelButtonText="No"
                        icon="el-icon-info"
                        iconColor="red"
                        title="Are you sure to delete this?"
                        @confirm="deleteCountryOnClick">
                            <template #reference>
                                <el-button  type="primary" class="delete-country-button">
                                    Delete Country
                                </el-button>
                            </template>
                    </el-popconfirm>      
                    <el-button type="primary" :disabled="disabled" class="save-country-button" @click="saveCountryOnClick('countryDetailsForm')">Save</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div> 
</template>

<script>

import { defineComponent } from 'vue'   
import { delayAlertRemove } from '../../../helpers/helper'
import Alerts from '../../library/Alerts.vue'
import { emitter } from '../../../main' 

export default defineComponent({
   
    el: 'CountryDetails', 
    components:{  
        'alerts': Alerts
    }, 
    data() {
        return {        
            countryId: 0,
            messages: [],
            disabled: false,
            labelPosition: 'left',   
            rules: {				
                name: [	{ required: true, message: 'Name is required' },		
                    { min: 1, max: 50, message: 'Length should be 1 to 50' }
                ]		
            }
        }
    },    
    computed: {
        country: {
            get() {
                return this.$store.state.country.country;
            },   
            set(country) {
                this.$store.commit("SET_COUNTRY", { country });
            }     
        }
    },   
    mounted() { 
        emitter.on("clear-country-messages", messages  => {
            this.messages = messages;
        });
    }, 
    methods: {     
        
        saveCountryOnClick(formName) {
            this.messages = [];
			this.$refs[formName].validate((valid) => {
				if (valid) {
                    this.disabled = true;
                    this.$store.dispatch("country/saveCountry").then(
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
        async deleteCountryOnClick() {
            this.messages = []; 
            await this.$store.dispatch("country/deleteCountry").then(
                        (response) => {                         
                            this.messages = response.data.messages;
                            this.$refs['countryDetailsForm'].resetFields();                                                 
                            delayAlertRemove().then(function() {
                               this.messages = [];                               
                            }.bind(this)); 
						},
						(error) => {  
                            this.messages = error.data;
						});
        },
        resetForm() {  
            this.$refs['countryDetailsForm'].resetFields(); 
            this.disabled = false;
        }
    } 
})
</script>

<style scoped> 
 
.save-country-button {
    float: right;
    margin-bottom: 5px;
}

.delete-country-button {
    margin-left:120px;
    margin-bottom: 5px;
}

</style>