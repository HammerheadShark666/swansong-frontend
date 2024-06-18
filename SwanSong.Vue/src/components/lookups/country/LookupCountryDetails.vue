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
            @submit.prevent
            :rules="rules" 
            :model="country"
            label-width="120px">    
            <el-form-item label="Name" prop="name">
                <el-input placeholder="Country Name" maxlength="50" show-word-limit v-model="country.name" @keyup.enter.native="saveOnReturnKey"></el-input>
            </el-form-item>  
            <el-row>
                <el-col :span="24">    
                    <el-popconfirm
                        v-if="country.id > 0"
                        confirmButtonText="Yes"
                        cancelButtonText="No"
                        icon="el-icon-info"
                        iconColor="red"
                        width="300px"
                        title="Are you sure to delete this country?"
                        @confirm="deleteCountryOnClick">
                            <template #reference>                                
                                <el-button  type="primary" class="delete-country-button">
                                    <el-icon style="vertical-align: middle;">
                                        <Delete />
                                    </el-icon>  
                                </el-button>  
                            </template>
                    </el-popconfirm> 
                    <el-button type="primary" :disabled="disabled" class="save-country-button" @click="saveCountryOnClick()">Save</el-button>
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
import { Delete } from '@element-plus/icons'
import { MESSAGE_INFO } from '../../../helpers/helper'

export default defineComponent({
   
    el: 'CountryDetails',  
    components:{  
        'alerts': Alerts,
        Delete
    }, 
    data() {
        return {        
            countryId: 0,
            formName: 'countryDetailsForm',
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
        saveCountryOnClick() {
            this.messages = [];
			this.$refs[this.formName].validate((valid) => {
				if (valid) {
                    this.disabled = true;

                    let action = this.country.id > 0 ? "update": "add";


                    this.$store.dispatch("country/" + action + "Country").then(
                    () => {			
                        this.messages = [ {"text" : "Country Saved.", "severity": MESSAGE_INFO}];
                        this.resetForm();
                        delayAlertRemove().then(function() {
                            this.messages = [];                               
                        }.bind(this));                             
                    },
                    (error) => { 
                        this.messages = error.data.messages;
                        this.disabled = false;
                    });
                }
            })
        },        
        async deleteCountryOnClick() {
            this.messages = []; 
            await this.$store.dispatch("country/deleteCountry").then(
                        () => {                         
                            this.messages = [ {"text" : "Country deleted.", "severity": MESSAGE_INFO}]; 
                            this.disabled = false;    
                            this.resetForm();                              
                            delayAlertRemove().then(function() {
                               this.messages = [];                               
                            }.bind(this)); 
						},
						(error) => {  
                            this.messages = error.data.messages;
						});
        },
        resetForm() {  
            this.$refs[this.formName].resetFields();  
            this.disabled = false;
        },
        saveOnReturnKey(event) { 
			if(event.key == "Enter")
			{
				this.saveCountryOnClick(); 
			} 
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