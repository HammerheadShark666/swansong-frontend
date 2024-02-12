<template>
    <div class="albums-title-bar">   
        <el-row>                  
            <el-col :span="14"><h4 class="page-title">{{ title }}</h4></el-col>
            <el-col :span="10">
                <album-search class="artist-search"></album-search>        
                <router-link :to="{ name: 'albums-album-add' }" class="nav-link">      
                    <el-button type="primary" class="add-albums-button">
                        Add Album
                    </el-button> 
                </router-link>       
                <el-popconfirm
                    v-if="album.id > 0"
                    confirmButtonText="Yes"
                    cancelButtonText="No"
                    icon="el-icon-info"
                    iconColor="red"
                    width="270px"
                    title="Are you sure to delete this album?"
                    @confirm="deleteAlbumOnClick">
                        <template #reference>
                            <el-button  type="primary" class="delete-album-button">
                                Delete Album
                            </el-button>
                        </template>
                </el-popconfirm>    
            </el-col>
        </el-row>             
        <dialog-messages @closeMessagesDialog="closeMessagesDialog" v-bind:visible="messages.length > 0" v-bind:messages="messages"></dialog-messages>  
    </div>
</template>

<script>  

import { defineComponent } from 'vue'
import AlbumSearch from './AlbumSearch.vue'
import { emitter } from '../../main'
import DialogMessages from '../library/DialogMessages.vue'
 
export default defineComponent({

	name: "Albums",
	data() {
		return {
            title: "Albums", 
            messages: []
		};
	},    
    computed: {
        album: {
            get() {
                return this.$store.state.album.album;
            } 
        }
    }, 
	components:{
		'album-search': AlbumSearch,
        'dialog-messages': DialogMessages
	},
    mounted() { 
        emitter.on("clear-album-messages", messages  => {
            this.messages = messages;
        }); 
    }, 
    methods: {   
        async deleteAlbumOnClick() {
            emitter.emit("clear-album-messages", []);
            await this.$store.dispatch("album/deleteAlbum").then(
                        (response) => {   
                            this.$router.push("/albums/album/add");                       
                            this.messages = response.data.messages;	  
						},
						(error) => {  
                            this.messages = error.data.messages;
						});
        },
        closeMessagesDialog() { 
            this.messages = [];
            this.$router.push("/albums/album/add");
        }
    }
});
</script>

<style scoped>

.albums-title-bar { 
    float:left;
    width:100%;
}

.page-title {
    width:40%;     
}

.add-albums-button {
    float: right;
    margin-right: 5px;
}

.nav-link {
    padding:0em!important;
}

.nav-link button {
    margin-right: 10px;
}

.album-search {
    float: right;
}

.delete-album-button {
    float: right;
    margin-right: 5px;
}

</style>