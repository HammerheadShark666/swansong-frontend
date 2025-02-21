<template>   
    <div el-row class="search-results">
       <el-pagination
                    small
                    v-if="this.searchResultsLength > 0"
                    background layout="sizes, prev, pager, next" 
                    :total="this.searchResultsLength"
                    :page-size="pageSize" 
                    :hide-on-single-page=true
                    :page-sizes="[5, 10, 15, 20]"
                    :current-page="this.page"
                    @size-change="sizeChange"
                    @current-change="pageChange" >
        </el-pagination>   
        <div id="" class="results">
            <el-table    
                :data="this.searchResults"   
                :default-sort = "{prop: 'name', order: 'descending'}"   
                empty-text="No Albums"       
                id="album-search-results-table">          
                <el-table-column>
                    <template #default="props">                  
                        <router-link :to="{ name: 'albums-album', params:{albumId:props.row.id} }" class="nav-link nav-link-search" @click.prevent="closeDrawer()"> 
                            <el-row>
                                <el-col :span="4" fixed>    
                                    <el-image v-if="props.row.photo" class="search-album-photo" v-bind:src="getImageUrl(props.row.photo)"></el-image>
                                    <el-image v-else class="search-album-photo" v-bind:src="getDefaultImageUrl()"></el-image>
                                </el-col> 
                                <el-col :span="20" fixed class="album-text-container">    
                                    <div class="album-title">{{ props.row.name }}</div>                          
                                    <div class="paragraph-no-bottom-margin search-album-artist">{{ props.row.artistName }}</div>  
                                </el-col>  
                            </el-row>    
                        </router-link>   
                    </template>
                </el-table-column>
            </el-table> 
        </div>
    </div>
</template>

<script> 

import { defineComponent } from 'vue';
import { formatDate } from '../../helpers/helper'
import { getAlbumImageUrl, getDefaultAlbumImageUrl } from '../../helpers/imageHelper'

export default defineComponent({      
    el: '#table',  
    emits: ["closeDrawer"],   
    data() {
		return {
            page: 1,
            pageSize: 5,  
            noOfResults: 0
		}
    },
    computed: {
        searchResults() {     
            var pageStart = this.page == 1 ? 0 : ((this.page - 1) * this.pageSize);
            var pageEnd = pageStart + this.pageSize;             
            return this.$store.state.album.albums.slice(pageStart, pageEnd); 
        },
        searchResultsLength() {
            return this.$store.state.album.albums.length;
        }
    },    
    async created() {
           
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
        async searchAlbums(criteria) {      
                await this.$store.dispatch("album/search", criteria).then(
						( ) => {},
						(error) => { 
                            console.log(error); 
						});
        },
        async searchAlbumsByLetter(letter) {   
                await this.$store.dispatch("album/searchByLetter", letter).then(
						( ) => {},
						(error) => { 
                            console.log(error); 
						});
        },
        async pageChange(val){
            this.page = val;
        },
        async sizeChange(val) {
            this.pageSize = val;
        },
        closeDrawer() {
            this.$emit('closeDrawer'); 
        }
    } 
})
</script>

<style>

.paragraph-no-bottom-margin {
    margin-bottom: 0px;
}

.results-table {
  width: 100%;
}

#album-search-results-table {
  margin-top: 10px;
}

#album-search-results-table th {
    display: none;
    margin-top: 20px;
}

#album-search-results-table td {
    padding-top: 0%;
    padding-bottom: 0%;
}

.search-album-photo {    
    border: solid black 1px;
    background-color: black; 
    margin-top: 2px;
    margin-left: 7px;

}

.album-photo img {
	object-fit: cover;
}

.results { 
    height:620px;
    overflow-x: auto;
    padding-bottom: 75px;
} 

.album-title {
    white-space: pre-wrap;
    word-break: keep-all; 
    font-size:1.0em;
    white-space: pre-wrap;
    word-break: keep-all;
    font-weight: 500;
    font-size:1.0em;
    margin-left:15px;
    font-size:100%;
}

.album-text-container { 
    color: black; 
}   

.nav-link-search {
    padding: 0px!important;
    padding-top: 4px!important;
}

.search-results {
    margin-top: 15px;
} 

.search-album-artist {
    white-space: pre-wrap;
    word-break: keep-all; 
    font-size:1.0em;
    white-space: pre-wrap;
    word-break: keep-all; 
    font-size:1.0em; 
    margin-left:15px;
    font-size:100%;
}

</style>