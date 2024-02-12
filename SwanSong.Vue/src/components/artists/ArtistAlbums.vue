<template>
    <el-card class="box-card box-card-songs">
        <template #header>
            <div class="card-header">
                <span>Albums</span> 
            </div>
        </template>
       <el-row>
            <el-col :span="7" v-for="album in albums" :key="album.id" :offset="0.5" class="album-column">                
                <router-link :to="{ name: 'albums-album', params:{albumId: album.id} }"> 	 
                    <div class="album-details">
                        <div style="padding: 0px;">
                            <el-row>                          
                                <el-col :span="6">    
                                    <el-image v-if="album.photo != null" class="album-photo" v-bind:src="getImageUrl(album.photo)"></el-image>
                                    <el-image v-else class="album-photo" v-bind:src="getDefaultImageUrl()"></el-image>
                                </el-col>  
                                <el-col :span="18" class="details">                                    
                                    <h6 class="album-title">{{ album.name }}</h6>   
                                </el-col>                 
                            </el-row>  
                        </div>
                    </div> 
                </router-link>
            </el-col>
        </el-row>       
    </el-card>
</template>

<script>  

import { defineComponent } from 'vue' 
import { getAlbumImageUrl, getDefaultAlbumImageUrl } from '../../helpers/imageHelper'
 
export default defineComponent({

	name: "AlbumSongs",
	data() {
		return {
            title: "Album Songs", 
		};
	},   
    computed: {
        albums() { 
            return this.$store.state.album.albums;   
        },  
    }, 
    created() {       
        this.$store.dispatch("album/clearAlbums"); 
    }, 
    methods: {  
        getImageUrl: getAlbumImageUrl,
        getDefaultImageUrl: getDefaultAlbumImageUrl
    }
});

</script>

<style scoped>

el-row {
    margin-top: 0px;
}

.box-card-songs {
    margin-top: 10px;
}

#album-songs-table {
    width: 100%;
    margin-bottom:15px;
}

.album-photo {
	width:100%;  
    background-color: black!important;;
	margin-right:15px;
}

.album-photo img {
	object-fit: cover;    
} 

.details {
    padding-right: 10px;
}

.album-title {
    white-space: pre-wrap;
    word-break: keep-all;
    color:black;
    font-size: 15px;
}
  
.album-column {
    margin-bottom:5px;
    margin-right:20px;
}

.album-details {
    border:#d7c5c8 1px solid;
    padding: 5px;
    border-radius: 5px;
    height: 82px;
}

.album-details:hover {
    cursor:pointer; 
    background-color: #5ef1f167;
}
 
</style>