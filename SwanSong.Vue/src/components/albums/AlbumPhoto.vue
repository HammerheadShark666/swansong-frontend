<template>
    <div>
        <el-card class="box-card">
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
                <el-col :span="6"> 
                    <el-image v-if="album.photo" class="album-photo" v-bind:src="getImageUrl(album.photo)"></el-image>
                    <el-image v-else class="album-photo" v-bind:src="getDefaultImageUrl()"></el-image>
                </el-col>
                <el-col :span="17" class="upload">
                    <el-upload
                        class="upload-demo" 
                        action="#"
                        :http-request="uploadFile" 
                        :file-list="fileList"
                        list-type="picture"
                        ref="albumPhotoUpload"
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

import { defineComponent } from '@vue/composition-api'    
import Alerts from '../library/Alerts.vue' 
import { MESSAGE_ERROR, MESSAGE_INFO, delayAlertRemove } from '../../helpers/helper'
import { getAlbumImageUrl, getDefaultAlbumImageUrl } from '../../helpers/imageHelper'

export default defineComponent({
   
    el: 'AlbumPhoto',    
    data() {
		return {   
			fileList: [],
			albumId: 0,
            messages: [],  
		}
    },  
    components:{  
        'alerts': Alerts
    },  
    computed: {
        album: {
            get() {
                return this.$store.state.album.album;
            }   
        }
    },    
    methods: {   
        getImageUrl: getAlbumImageUrl,
        getDefaultImageUrl: getDefaultAlbumImageUrl,     
		async uploadFile(param) {
            this.messages = [];
			let formData = new FormData();
			formData.append("file", param.file);
			let albumId = this.album.id; 	 
            
            await this.$store.dispatch("album/savePhoto", { albumId, formData }).then(
						() => {		 
                            this.$refs.albumPhotoUpload.clearFiles();  
                            this.messages.push({text: "The album photo was saved", severity: MESSAGE_INFO });  
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

.album-photo {
	width:100%;	
	margin-right:15px;
}

.album-photo img {
	object-fit: cover;
}

.upload {
	padding-left: 20px;
}

</style>