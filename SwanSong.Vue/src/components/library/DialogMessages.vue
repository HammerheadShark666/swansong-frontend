<template>
    <el-dialog        
        v-model="show"   
        :show-close="false" 
        custom-class="messages-dialog"
        width="30%"> 
        <el-card class="box-card box-card-songs">
                <template #header>
                    <div class="card-header">      
                        <el-row>       
                            <el-col :span="24">
                                <span>Messages</span> 
                            </el-col>                            
                        </el-row>  
                    </div>
                </template>
                <el-alert :closable="false" class="alert" v-for="info in infoMessages()" v-bind:key="info" show-icon type="info">{{info.message}}</el-alert>
                <el-alert :closable="false" class="alert" v-for="warning in warningMessages()" v-bind:key="warning" show-icon type="warning">{{warning.message}}</el-alert>
                <el-alert :closable="false" class="alert" v-for="error in errorMessages()" v-bind:key="error" show-icon type="error">{{error.message}}</el-alert>
                <div class="form-item-button form-item-buttons">                              
                    <el-button class="close-button" type="primary" @click="closeMessagesDialogBox">Close</el-button>    
                </div>
            </el-card>    
    </el-dialog>
</template> 

<script>   

import { getMessagesBySeverity } from '../../helpers/helper'
import { MESSAGE_ERROR, MESSAGE_INFO, MESSAGE_WARNING } from '../../helpers/helper'

export default {
	name: "DialogMessages", 
    props: ['visible', 'messages'],   
    emits: ['closeMessagesDialog'], 
    computed: {
        show() { 
            return this.visible;     
        },
    },
	methods: {         
        closeMessagesDialogBox() {
            this.$emit('closeMessagesDialog');
        },        
        infoMessages() {      
            return getMessagesBySeverity(this.messages, MESSAGE_INFO); 
        },
        warningMessages() { 
            return getMessagesBySeverity(this.messages, MESSAGE_WARNING); 
        },
        errorMessages() { 
            return getMessagesBySeverity(this.messages, MESSAGE_ERROR); 
        } 
	}
};

</script>

<style scoped>

.alert {
    margin-bottom: 5px;
}

.form-item-buttons {
    margin-top: 10px;
    margin-bottom: 10px!important;
    padding-bottom: 10px;
}
 
.card-header {
    padding: .17rem .63rem .37rem .63rem!important;
}

.messages-dialog .el-dialog__header {
    display: none!important;
}

.messages-dialog .el-dialog__body {
    padding: 0px!important;
}

.close-button {
    float: right;
}

</style>