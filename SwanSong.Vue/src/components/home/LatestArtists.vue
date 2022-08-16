<template>       
    <div>
        <el-row>
            <el-col>
                <h6 class="column-title">Latest Artists</h6>
            </el-col> 
        </el-row>
        <el-row v-for="(page, index) of pages" :key="index">        
            <el-col
                v-for="(artist, index) in page"
                :key="index"
                :span="11"
                :offset="1"
                >
                <router-link :to="{ name: 'artists-artist', params:{artistId:artist.id} }" class="nav-link nav-link-artist" @click.prevent="closeDrawer()">
                    <div class="artist-card">
                        <div class="title-container">
                            <span class="title">{{ artist.name }}</span>   
                        </div> 
                        <el-image v-if="artist.photo" class="list-artist-photo" v-bind:src="getImageUrl(artist.photo)"></el-image>
                        <el-image v-else class="list-artist-photo" v-bind:src="getDefaultImageUrl()"></el-image>                     
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
import { getArtistImageUrl, getDefaultArtistImageUrl } from '../../helpers/imageHelper'

export default defineComponent({      
    el: '#table',  
    emits: ["closeDrawer"],   
    data() {
		return {            
		}
    },
    computed: {
        artists() {    
            if(this.$store.state.artist.artists.length > 0)
                return this.$store.state.artist.artists;
            else
                return [];
        },  
        pages () {
            return getPages(this.artists); 
        }
    }, 
    async created() { 
       
        await this.loadArtists();

        this.$store.watch(
            (getters) => getters.artist.artists,
            () => {            
                this.page = 1;
            })        
    },     
    methods: {
        formatDate,  
        getImageUrl: getArtistImageUrl,
        getDefaultImageUrl: getDefaultArtistImageUrl,      
        async loadArtists() {           
            await this.$store.dispatch("artist/random").then(
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

#artist-artisth-results-table {
  margin-top: 10px;
}

#artist-artisth-results-table th {
    display: none;
    margin-top: 20px;
}

#artist-artisth-results-table td {
    padding-top: 0%;
    padding-bottom: 0%;
}

.list-member-photo { 
    width: 152px; 
    height: 100px; 
    background-color: black; 
}

h5 {
    color: white;
}
 
.nav-link-artist {
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
    line-height: 0;
    margin-bottom: 2px;
}

.padding {
    height: 10px;
    width: 100%;
}

.artist-card {
    padding: 1px 5px 1px 5px!important;
    border: 1px solid #000;
    background-color: white;
}
  
.artist-card:hover {
    background-color: #5ef1f167!important;
}

.title-container {
    padding: 0px;
    line-height:17px;
    margin-bottom:5px;
}


</style>