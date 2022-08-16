<template>
    <el-card class="box-card box-card-songs">
        <template #header>
            <div class="card-header">      
                <el-row class="header-row">       
                    <el-col :span="15" class="title-col"><span>Songs</span></el-col>
                    <el-col :span="9">                  
                        <album-song-dialog ref="albumSongDialog"></album-song-dialog>
                    </el-col>                     
                </el-row>  
            </div>
        </template> 
        <el-table                  
            :summary-method="getSummaries"  
            show-summary
            :data="songs"   
            :default-sort = "{prop: 'side', order: 'ascending'}"      
            empty-text="No Songs" 
            id="album-songs-table">             
                <el-table-column                   
                    label="Title"                    
                    width="260">
                    <template #default="scope">
                        <span class="song-title">{{ scope.row.song.title }}</span>
                    </template>
                </el-table-column>   
                <el-table-column
                    prop="song.length"
                    label="Length"
                    width="60">
                </el-table-column>    
                <el-table-column 
                    label=""
                    width="35">
                    <template #default="scope">
                        <i class="el-icon-edit" @click="editAlbumSongOnClick(scope.row)"></i>
                    </template>
                </el-table-column>     
                <el-table-column 
                    label=""
                    width="35">
                    <template #default="scope">
                    <el-popconfirm
                        v-if="scope.row.id > 0"
                        confirmButtonText="Yes"
                        cancelButtonText="No"
                        icon="el-icon-info"
                        iconColor="red"
                        title="Are you sure to delete this song from the album?"
                        @confirm="deleteAlbumSongOnClick(scope.row.id)" 
                    >
                    <template #reference>
                        <i class="el-icon-delete"></i>
                    </template>
                </el-popconfirm>    
                </template>   
                </el-table-column>                      
        </el-table>        
        <dialog-messages @closeMessagesDialog="closeMessagesDialog" v-bind:visible="messages.length > 0" v-bind:messages="messages"></dialog-messages>
    </el-card>
</template>

<script>  

import { defineComponent } from 'vue' 
import AlbumSongDialog from './AlbumSongDialog.vue' 
import DialogMessages from '../library/DialogMessages.vue'
import { getAlbumSongsTotalLength } from '../../helpers/helper'
 
export default defineComponent({

	name: "AlbumSongs",
	data() {
		return {
            title: "Album Songs",  
            messages: []
		};
	},   
    components:{ 
		'album-song-dialog': AlbumSongDialog,
        'dialog-messages': DialogMessages
    },
    computed: {
        songs() { 
            return this.$store.state.albumSong.albumSongs;     
        }
    },      
	methods: {
    
        async editAlbumSongOnClick(row) {
            await this.$store.dispatch("albumSong/editAlbumSong", row).then(
						() => {
                            this.$refs.albumSongDialog.openDialog('Edit');
						},
						(error) => { 
                            this.errors = error;
						});
        },
        async deleteAlbumSongOnClick(id) {
            await this.$store.dispatch("albumSong/deleteAlbumSong", id).then(
						(response) => {	                            
                            this.messages = response;
						},
						(error) => { 
                            this.errors = error;
						});
        },
        getSummaries(param) {      
            return ["Total Length", getAlbumSongsTotalLength(param), "", ""];
        },         
        closeMessagesDialog() { 
            this.messages = [];
        }
	}, 
});
</script>

<style scoped>

.box-card-songs {
    margin-top: 10px;
}

#album-songs-table {
    width: 100%;
    margin-bottom:15px;
} 

.el-table tr>:nth-child(1) {
    color:white; 
    background-color: #000;
}

.song-title {
    white-space: pre-wrap;
    word-break: keep-all;
} 

.title-col {
    margin-top:3px;
}

.el-icon-delete:hover, .el-icon-edit:hover {
    cursor: pointer
}

.header-row {
    margin-top: 0px!important;
}

</style>