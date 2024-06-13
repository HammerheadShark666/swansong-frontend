<template>
    <div>   
        <el-row class="messages">
            <el-col :span="24">                 
                <alerts v-bind:visible="messages.length > 0" v-bind:messages="messages"></alerts>
            </el-col>
        </el-row>    
        <el-form 
            ref="recordLabelDetailsForm" 
            :label-position="labelPosition" 
            :rules="rules" 
            :model="recordLabel"
            label-width="120px">    
            <el-form-item label="Name" prop="name">
                <el-input placeholder="Record Label Name" maxlength="50" show-word-limit v-model="recordLabel.name"></el-input>
            </el-form-item>  
            <el-row>
                <el-col :span="24">    
                    <el-popconfirm
                        v-if="recordLabel.id > 0"
                        confirmButtonText="Yes"
                        cancelButtonText="No"
                        icon="el-icon-info"
                        iconColor="red"
                        width="300px"
                        title="Are you sure to delete this record label?"
                        @confirm="deleteRecordLabelOnClick">
                            <template #reference> 
                                <el-button  type="primary" class="delete-record-label-button">
                                    <el-icon style="vertical-align: middle;">
                                        <Delete />
                                    </el-icon>  
                                </el-button>  
                            </template>
                    </el-popconfirm>      
                    <el-button type="primary" :disabled="disabled" class="save-record-label-button" @click="saveRecordLabelOnClick()">Save</el-button>
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
   
    el: 'RecordLabelDetails',  
    components:{  
        'alerts': Alerts,
        Delete
    }, 
    data() {
        return {        
            recordLabelId: 0,
            messages: [],
            disabled: false,
            labelPosition: 'left',   
            rules: {				
                name: [	{ required: true, message: 'Name is required' },		
                    { min: 1, max: 100, message: 'Length should be 1 to 100' }
                ]		
            } 
        }
    },    
    computed: {
        recordLabel: {
            get() {
                return this.$store.state.recordLabel.recordLabel;
            },   
            set(recordLabel) {
                this.$store.commit("SET_RECORD_LABEL", { recordLabel });
            }     
        }
    },   
    mounted() { 
        emitter.on("clear-recordLabel-messages", messages  => {
            this.messages = messages;
        });
    }, 
    methods: {     
        saveRecordLabelOnClick() {
            this.messages = [];
			this.$refs['recordLabelDetailsForm'].validate((valid) => {
				if (valid) {
                    this.disabled = true;

                    let action = this.recordLabel.id > 0 ? "update": "add";

                    this.$store.dispatch("recordLabel/" + action + "RecordLabel").then(
                    () => {
                        this.messages = [ {"text" : "Record label saved.", "severity": MESSAGE_INFO}];
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
        async deleteRecordLabelOnClick() {
            this.messages = []; 
            await this.$store.dispatch("recordLabel/deleteRecordLabel").then(
                        () => {                         
                            this.messages = [ {"text" : "Record label deleted.", "severity": MESSAGE_INFO}]; 
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
            this.$refs['recordLabelDetailsForm'].resetFields(); 
            this.disabled = false;
        }
    } 
})
</script>

<style scoped> 
 
.save-record-label-button {
    float: right;
    margin-bottom: 5px;
}

.delete-record-label-button {
    margin-left:120px;
    margin-bottom: 5px;
}

</style>