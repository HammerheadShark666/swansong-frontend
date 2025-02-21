<template>
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
        <el-row>      
            <el-col :span="4" :gutter="10"> 
                <el-image v-if="artistMember.member.photo" class="artist-member-photo" v-bind:src="getImageUrl(artistMember.member.photo)"></el-image>
                <el-image v-else class="artist-member-photo" v-bind:src="getDefaultImageUrl()"></el-image>
            </el-col>
            <el-col :span="20" class="upload">
                <el-upload
                    class="upload-demo" 
                    :before-upload="isImageValid"
                    action="#"
                    :http-request="uploadFile" 
                    :file-list="fileList"
                    list-type="picture"
                    ref="artistMemberPhotoUpload"
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
</template>

<script>

import { defineComponent } from 'vue'
import Alerts from '../library/Alerts.vue'  
import { MESSAGE_ERROR, MESSAGE_INFO, delayAlertRemove } from '../../helpers/helper'
import { getMemberImageUrl, getDefaultMemberImageUrl } from '../../helpers/imageHelper'

export default defineComponent({
   
    el: 'ArtistMemberPhoto',    
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
        artistMember: {
            get() {
                return this.$store.state.artistMember.artistMember;
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
		async uploadFile(param) {
            this.messages = [];
			let formData = new FormData();
			formData.append("file", param.file);
			let id = this.artistMember.member.id; 	 
			await this.$store.dispatch("artistMember/savePhoto", { id, formData }).then(
						() => {	  
                            this.$refs.artistMemberPhotoUpload.clearFiles();  
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
 
.artist-member-photo {
	width:100%; 
	margin-right:15px;
}

.artist-member-photo img {
	object-fit: cover;
}

.upload {
	padding-left: 20px;
}

.card-margin-right {    
	margin-top: 10px;
}

</style>