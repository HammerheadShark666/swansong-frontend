<template>
    <div>   
        <el-row class="messages">
            <el-col :span="24">                 
                <alerts v-bind:visible="messages.length > 0" v-bind:messages="messages"></alerts>
            </el-col>
        </el-row>    
        <el-form 
            ref="studioDetailsForm" 
            :label-position="labelPosition" 
            @submit.prevent
            :rules="rules" 
            :model="studio"
            label-width="120px">    
            <el-form-item label="Name" prop="name">
                <el-input placeholder="Studio Name" maxlength="50" show-word-limit v-model="studio.name" @keyup.enter.native="saveOnReturnKey"></el-input>
            </el-form-item>  
            <el-row>
                <el-col :span="24">    
                    <el-popconfirm
                        v-if="studio.id > 0"
                        confirmButtonText="Yes"
                        cancelButtonText="No"
                        icon="el-icon-info"
                        iconColor="red"
                        width="270px"
                        title="Are you sure to delete this studio?"
                        @confirm="deleteStudioOnClick">
                            <template #reference>
                                <el-button  type="primary" class="delete-studio-button">
                                    <el-icon style="vertical-align: middle;">
                                        <Delete />
                                    </el-icon>  
                                </el-button>  
                            </template>
                    </el-popconfirm>      
                    <el-button type="primary" :disabled="disabled" class="save-studio-button" @click="saveStudioOnClick()">Save</el-button>
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
   
    el: 'StudioDetails',
    components:{  
        'alerts': Alerts,
        Delete
    }, 
    data() {
        return {        
            studioId: 0,
            messages: [],
            formName: 'studioDetailsForm',
            disabled: false,
            labelPosition: 'left',   
            rules:  {				
                name: [	{ required: true, message: 'Name is required' },		
                        { min: 1, max: 250, message: 'Length should be 1 to 250' }
                ]		
            } 
        }
    },    
    computed: {
        studio: {
            get() {
                return this.$store.state.studio.studio;
            },   
            set(studio) {
                this.$store.commit("SET_STUDIO", { studio });
            }     
        }
    },   
    mounted() { 
        emitter.on("clear-studio-messages", messages  => {
            this.messages = messages;
        });
    }, 
    methods: {          
        saveStudioOnClick() {
            this.messages = [];
			this.$refs[this.formName].validate((valid) => {
				if (valid) {
                    this.disabled = true;

                    let action = this.studio.id > 0 ? "update": "add";

                    this.$store.dispatch("studio/" + action + "Studio").then(
                    () => {
                        this.messages = [ {"text" : "Studio saved.", "severity": MESSAGE_INFO}];
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
        async deleteStudioOnClick() {
            this.messages = []; 
            await this.$store.dispatch("studio/deleteStudio").then(
                () => {                         
                    this.messages = [ {"text" : "Studio deleted.", "severity": MESSAGE_INFO}]; 
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
				this.saveStudioOnClick(); 
			} 
		}
    } 
})
</script>

<style scoped> 
 
.save-studio-button {
    float: right;
    margin-bottom: 5px;
}

.delete-studio-button {
    margin-left:120px;
    margin-bottom: 5px;
}

</style>