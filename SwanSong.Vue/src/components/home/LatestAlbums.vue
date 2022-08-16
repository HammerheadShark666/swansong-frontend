<template>   
    <div>
        <el-row>
            <el-col>
                <h6 class="column-title">Latest Albums</h6>
            </el-col> 
        </el-row>
        <el-row v-for="(page, index) of pages" :key="index">        
            <el-col
                v-for="(album, index) in page"
                :key="index"
                :span="8"
                :offset="1"
                >
                <router-link :to="{ name: 'albums-album', params:{albumId:album.id} }" class="nav-link nav-link-album" @click.prevent="closeDrawer()">
                    <div class="album-card">
                        <div class="title-container">
                            <span class="title">{{ album.name }}</span>   
                        </div> 
                        <el-image v-if="album.photo" class="list-album-photo" v-bind:src="getImageUrl(album.photo)"></el-image>
                        <el-image v-else class="list-album-photo" v-bind:src="getDefaultImageUrl()"></el-image>                     
                    </div>       
                </router-link>     
            </el-col>        
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
    width: 107px; 
    height: 108px; 
    background-color: black; 
}

h5 {
    color: white;
}
 
.nav-link-album {
    padding: 0px!important;
}
  
.column-title {
    font-size: 14px;
    color: white;
    margin-left: 16px;
}

.title {
    font-size: 12px;
    color: black;    
    margin-bottom: 2px;
    line-height: 0;
}

.padding {
    height: 10px;
    width: 100%;
}

.album-card {
    padding: 1px 5px 1px 5px!important;
    border: 1px solid #000;
    background-color: white;
}
  
.album-card:hover {
    background-color: #5ef1f167!important;
}

.title-container {
    padding: 0px;
    line-height:17px;
    margin-bottom:5px;
}

</style>