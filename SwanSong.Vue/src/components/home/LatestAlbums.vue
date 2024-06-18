<template>   
    <div>
        <el-row>
            <el-col>
                <h6 class="column-title">Albums</h6>
            </el-col> 
        </el-row>
        <el-row v-for="(page, index) of pages" :key="index">    
            <el-scrollbar>
                <div class="scrollbar-flex-content">
                    <div
                        v-for="(album, index) in page"
                        :key="index"
                        :span="24"
                        :offset="1"
                        >
                        <router-link :to="{ name: 'albums-album', params:{albumId:album.id} }" class="nav-link nav-link-album" @click.prevent="closeDrawer()">
                            <el-popover
                                placement="bottom-start" 
                                :width="200"                        
                                trigger="hover" 
                            >
                                <template #reference>
                                    <el-card :body-style="{ padding: '0px', width: '100px' }" class="album-card">
                                        <el-image v-if="album.photo" class="list-album-photo" v-bind:src="getImageUrl(album.photo)"></el-image>
                                        <el-image v-else class="list-album-photo" v-bind:src="getDefaultImageUrl()"></el-image>  
                                    </el-card>
                                </template>
                                <el-row>                             
                                    <el-col :span="24">
                                        <div class="popover-text">
                                            <el-row>
                                                <el-col :span="6">Title:</el-col>
                                                <el-col :span="18" class="custom-wrap-text"><p>{{album.name}}</p></el-col>
                                            </el-row> 
                                        </div>
                                    </el-col>    
                                    <el-col :span="24">
                                        <div class="popover-text">
                                            <el-row>
                                                <el-col :span="6">Artist:</el-col>
                                                <el-col :span="18" class="custom-wrap-text">{{ album.artistName }}</el-col>
                                            </el-row> 
                                        </div>
                                    </el-col>                        
                                    <el-col :span="24">
                                        <div class="popover-text">
                                            <el-row>
                                                <el-col :span="6">Tracks:</el-col>
                                                <el-col :span="18">{{ album.tracks }}</el-col>
                                            </el-row> 
                                        </div>
                                    </el-col>
                                    <el-col :span="24">
                                        <div class="popover-text">
                                            <el-row>
                                                <el-col :span="6">Length:</el-col>
                                                <el-col :span="18">{{ album.length }}</el-col>
                                            </el-row> 
                                        </div>
                                    </el-col>
                                </el-row>                      
                            </el-popover>                    
                        </router-link>     
                    </div>    
                </div>
            </el-scrollbar>     
            <div class="padding"></div>
        </el-row>
    </div>
</template>

<script> 

import { defineComponent } from '@vue/composition-api'  
import { formatDate, getPages } from '../../helpers/helper'
import { getAlbumImageUrl, getDefaultAlbumImageUrl } from '../../helpers/imageHelper'

export default defineComponent({      
    el: '#table',  
    emits: ["closeDrawer"],   
    data() {
		return {}
    },
    computed: {
        albums() {    
            if(this.$store.state.album.albums.length > 0)
                return this.$store.state.album.albums;
            else
                return [];
        },       
        pages () {
            return getPages(this.albums); 
        }
    }, 
    async created() { 
       
        await this.loadAlbums();

        this.$store.watch(
            (getters) => getters.album.albums,
            () => {            
                this.page = 1;
            })        
    },     
    methods: {
        formatDate,  
        getImageUrl: getAlbumImageUrl,
        getDefaultImageUrl: getDefaultAlbumImageUrl, 
        async loadAlbums() { 
            await this.$store.dispatch("album/random").then(
                    ( ) => {},
                    (error) => { 
                        this.errors = error;
                    });
        },      
        closeDrawer() {
            this.$emit('closeDrawer'); 
        }
    } 
})
</script>

<style scoped>

#album-album-results-table {
  margin-top: 10px;
}

#album-album-results-table th {
    display: none;
    margin-top: 20px;
}

#album-album-results-table td {
    padding-top: 0%;
    padding-bottom: 0%;
}

.list-album-photo { 
    width: 105px;
    height: 105px; 
    background-color: black; 
    border: 1px black solid;
    margin: 1px;
}

h5 {
    color: white;
}
 
.nav-link-album {
    padding: 5px!important;
    width:127px;
    height: 121px;
}
  
.column-title {
    font-size: 14px;
    color: white;
    margin-left: 16px;
}
  
.padding {
    height: 10px;
    width: 100%;
}
  
.scrollbar-flex-content {
  display: flex;
}

.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}

.el-card {
    padding: 5px!important;
    border-radius: 0!important;
}

.el-scrollbar {
    padding-bottom: 20px;
}

.popover-text {
    font-size: 12px;
    color: black;
    font-weight: bold;
}

.album-card {
    border: none;
}

.album-card:hover {
    background-color: #5ef1f167!important;
}

</style>