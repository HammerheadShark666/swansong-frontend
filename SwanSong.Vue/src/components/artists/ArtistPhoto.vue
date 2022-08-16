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
        <el-row :gutter="20">      
            <el-col :span="5"> 
                <el-image v-if="artist.photo" class="artist-photo" v-bind:src="getImageUrl(artist.photo)"></el-image>
                <el-image v-else class="artist-photo" v-bind:src="getDefaultImageUrl()"></el-image>
            </el-col>
            <el-col :span="19" class="upload">
                <el-upload
                    class="upload-demo" 
                    action="#"
                    :http-request="uploadFile" 
                    :file-list="fileList"
                    list-type="picture"
                    ref="artistPhotoUpload"
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

import { defineComponent } from '@vue/composition-api'   
import Alerts from '../library/Alerts.vue' 
import { MESSAGE_ERROR, MESSAGE_INFO, delayAlertRemove } from '../../helpers/helper'
import { getArtistImageUrl, getDefaultArtistImageUrl } from '../../helpers/imageHelper'

export default defineComponent({
   
    el: 'ArtistPhoto',   
    data() {
		return {         			
			fileList: [],
			artistId: 0,
            messages: [],  
		}
    },  
    components:{  
        'alerts': Alerts
    },  
    computed: {
        artist: {
            get() {
                return this.$store.state.artist.artist;
            }   
        }
    }, 
    methods: {  
        getImageUrl: getArtistImageUrl,
        getDefaultImageUrl: getDefaultArtistImageUrl,     
		async uploadFile(param) {
            this.messages = [];
			let formData = new FormData();
			formData.append("file", param.file);
			let artistId = this.artist.id; 	 
			this.$store.dispatch("artist/savePhoto", { artistId, formData }).then(
						() => {		      
                            this.$refs.artistPhotoUpload.clearFiles();  
                            this.messages.push({message: "The artist photo was saved", severity: MESSAGE_INFO });   
                            delayAlertRemove().then(function() {
                                this.messages = [];       
                            }.bind(this));     
						},
						(error) => { 
                            this.messages.push({message: error.data, severity: MESSAGE_ERROR }); 
						});
		} 
    } 
})
</script>

<style scoped>
 
.artist-photo {
	width: 100%;  
	margin-right: 15px;
    margin-top: 4px;
}

.artist-photo img {
	object-fit: cover;
}

.upload {
	padding-left: 20px;
    margin-top: 4px;
}

.card-margin-right {
    margin-right: 10px;
	margin-top: 10px;
}

</style>