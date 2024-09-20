<template>
    <div>
        <el-card class="box-card card-margin-right">
            <template #header>
                <div class="card-header">
                <span>Photo</span> 
                </div>
            </template>
            <el-row class="messages">
                <el-col :span="24">                 
                    <alerts v-bind:visible="messages.length > 0" v-bind:messages="messages"></alerts>
                </el-col>
            </el-row>    
            <el-row :gutter="20">                     
                <el-col :span="5" class="photo-column"> 
                    <el-image v-if="member.photo" class="member-photo" v-bind:src="getImageUrl(member.photo)"></el-image>
                    <el-image v-else class="member-photo" v-bind:src="getDefaultImageUrl()"></el-image>
                </el-col>
                <el-col :span="19" class="upload">
                    <el-upload
                        class="upload-demo" 
                        :before-upload="isImageValid"
                        action="#"
                        :http-request="uploadFile" 
                        :file-list="fileList"
                        list-type="picture"
                        ref="memberPhotoUpload"
                        single>
                        <el-button size="small" type="primary">Click to upload</el-button>
                        <template #tip>
                        <div class="el-upload__tip">
                            jpg/png files with a size less than 500kb
                        </div>
                        </template>
                    </el-upload> 
                </el-col>
            </el-row>     
        </el-card>
    </div>
</template>

<script>

import { defineComponent } from 'vue'
import Alerts from '../library/Alerts.vue' 
import { MESSAGE_ERROR, MESSAGE_INFO, delayAlertRemove } from '../../helpers/helper'
import { getMemberImageUrl, getDefaultMemberImageUrl } from '../../helpers/imageHelper'

export default defineComponent({
    el: 'MemberPhoto',    
    data() {
		return {         			
			fileList: [],			
            messages: [], 	 
		}
    }, 
    components:{  
        'alerts': Alerts
    },  
    computed: {
        member: {
            get() {
                return this.$store.state.member.member;
            }   
        }
    },    
    methods: {   
        isImageValid(image) {             
            if((image.size / Math.pow(1024, 2)) > .5) {
                this.messages.push({text: "Photo can not be greater than 500kb", severity: MESSAGE_ERROR }); 
                return false;
            } 
            return true;    
        }, 
        getImageUrl: getMemberImageUrl,
        getDefaultImageUrl: getDefaultMemberImageUrl,        
		async uploadFile(param){
            this.messages = [];
			let formData = new FormData();
			formData.append("file", param.file);
			let id = this.member.id; 	 
			await this.$store.dispatch("member/savePhoto", { id, formData }).then(
						() => {	  
                            this.$refs.memberPhotoUpload.clearFiles();  
                            this.messages.push({text: "The member photo was saved", severity: MESSAGE_INFO }); 
                            delayAlertRemove().then(function() {
                                this.messages = [];       
                            }.bind(this));                                
						},
						(error) => {                             
                            this.messages.push({text: error.data, severity: MESSAGE_ERROR }); 
						});
		}
    } 
})
</script>

<style scoped>
 
.member-photo {
	width:100%; 
	margin-right:15px;
}

.photo-column {
    padding-left: 0px!important;
    padding-right: 0px!important;
}
 
.upload {
	padding-left: 20px;
    padding-top: 7px;
}

.card-margin-right {
    margin-right: 0px!important; 
} 

</style>