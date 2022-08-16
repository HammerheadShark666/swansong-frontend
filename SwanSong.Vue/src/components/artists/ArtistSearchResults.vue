<template> 
    <div el-row>
        <el-pagination
                    small
                    v-if="this.searchResultsLength > 0"
                    background layout="total, sizes, prev, pager, next" 
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
                empty-text="No Artists"
                id="artist-search-results-table">  
                    <el-table-column>
                        <template #default="props"> 
                            <router-link :to="{ name: 'artists-artist', params:{artistId:props.row.id} }" class="nav-link nav-link-search" @click.prevent="closeDrawer()"> 
                                <el-row :gutter="10">                           
                                    <el-col :span="4">    
                                        <el-image v-if="props.row.photo" class="search-artist-photo" v-bind:src="getImageUrl(props.row.photo)"></el-image>
                                        <el-image v-else class="search-artist-photo" v-bind:src="getDefaultImageUrl()"></el-image>
                                    </el-col>
                                    <el-col :span="20" class="artist-text-container">    
                                        <h6 class="artist-title">{{ props.row.name }}</h6>
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

import { defineComponent } from '@vue/composition-api'   
import { getArtistImageUrl, getDefaultArtistImageUrl } from '../../helpers/imageHelper'

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
            return this.$store.state.artist.artists.slice(pageStart, pageEnd); 
        },
        searchResultsLength() {
            return this.$store.state.artist.artists.length;
        }
    },    
    async created() {        
   
        this.$store.watch(
            (getters) => getters.artist.artists,
            () => {            
                this.page = 1;
            })        
    },
    methods: { 
        getImageUrl: getArtistImageUrl,
        getDefaultImageUrl: getDefaultArtistImageUrl,     
        async searchArtists(criteria) {       
                
            await this.$store.dispatch("artist/search", criteria).then(
                    () => {},
                    (error) => { 
                        this.errors = error;
                    });
        },
        async searchArtistsByLetter(letter) {     

            await this.$store.dispatch("artist/searchByLetter", letter).then(
                    () => {},
                    (error) => { 
                        this.errors = error;
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
 
.results-table {
  width: 100%;
}

#artist-search-results-table {
  margin-top: 10px;
}

#artist-search-results-table th {
    display: none;
    margin-top: 20px;
}

#artist-search-results-table td {
    padding-top: 0%;
    padding-bottom: 0%;
}

.search-artist-photo { 
    height: 33px; 
    border: solid black 1px;
    background-color: black; 
    margin-left: 5px;
    margin-top: 2px;
}

.artist-photo img {
	object-fit: cover;
}

.artist-text-container { 
    color: black; 
} 

.artist-title {
    white-space: pre-wrap;
    word-break: keep-all;
    font-weight: 500;
    font-size:1.0em;
    margin-top:5px;
    margin-left:15px;
    font-size:100%;
}

.results { 
    height:620px;
    overflow-x: auto;
    padding-bottom: 75px;
} 

.nav-link-search {
    padding: 0px!important;
    padding-top: 4px!important;
} 

</style>