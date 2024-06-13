<template>
    <div>
        <el-alert show-icon class="alert" v-for="error in errorMessages()" v-bind:key="error" type="error">{{error.text}}</el-alert>
        <el-alert show-icon class="alert" v-for="warning in warningMessages()" v-bind:key="warning" type="warning">{{warning.text}}</el-alert>
        <el-alert show-icon class="alert" v-for="info in infoMessages()" v-bind:key="info" type="info">{{info.text}}</el-alert>
    </div>
</template>

<script>   

import { getMessagesBySeverity } from '../../helpers/helper'
import { MESSAGE_ERROR, MESSAGE_INFO, MESSAGE_WARNING } from '../../helpers/helper'

export default {
	name: "Alerts", 
    props: ['messages'],
	methods: {    
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

</style>