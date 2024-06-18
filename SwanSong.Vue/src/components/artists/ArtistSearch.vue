<template>
    <div>
        <el-button @click="drawerOpen = true" type="primary" class="search-artists-button">
            Search
        </el-button>
        <el-drawer
            title="Search Artists"
            v-model="drawerOpen"
            @opened="openedDrawer" 
            :direction="direction"            
            :before-close="closeOnClick" size="25%"> 
            <el-card class="box-card" v-loading="loading">    
                <search-by-letter-selector @searchByLetter="searchByLetterOnClick"></search-by-letter-selector>
                <el-row>
                    <el-form 
                        ref="artistSearchForm"  
                        :rules="rules" 
                        class="search-form"
                        @submit.prevent
                        :model="artistSearchForm">
                        <el-row>
                            <el-col :span="20">
                                <el-form-item prop="searchText" class="search-text">
                                    <el-input ref="searchArtists" placeholder="Search For..." minlength="1" maxlength="100" show-word-limit 
                                        v-model="artistSearchForm.searchText" @keyup.enter.native="searchOnReturnKey"></el-input>
                                </el-form-item> 
                            </el-col>
                            <el-col :span="4">
                                <el-form-item class="form-item-button">
                                    <el-button type="primary" class="search-button" @click="submitForm()">                                        
                                        <el-icon style="vertical-align:middle;">
                                            <search />
                                        </el-icon>
                                    </el-button>
                                </el-form-item>     
                            </el-col>
                        </el-row>
                    </el-form>
                </el-row>              
                <artist-search-results ref="artistSearchResults" @closeDrawer="onLoadArtist"></artist-search-results>
            </el-card>
        </el-drawer>
    </div>
</template>

<script>

import ArtistSearchResults from './ArtistSearchResults.vue' 
import { getAlphabet } from '../../helpers/helper'
import SearchByLetterSelector from '../library/SearchByLetterSelector.vue'

  export default {
    data() {
        return {
            artistSearchForm: {
                searchText: ''
            },
            loading: false,
            drawerOpen: false,
            formName: 'artistSearchForm',
            direction: 'rtl', 
            alphabet: getAlphabet(),
            rules: {	
                searchText: [ { required: true, message: 'Please input search for', trigger: 'change' }],
            }   
        };
    },    
    components:{
        'artist-search-results': ArtistSearchResults,
        'search-by-letter-selector': SearchByLetterSelector
    },
    methods: {
        closeOnClick(done) {        
            done();
        },     
        searchByLetterOnClick(letter) {    
            this.artistSearchForm.searchText = ''     ;
            this.$refs.artistSearchResults.searchArtistsByLetter(letter);
        },
        openedDrawer() {
            this.$refs.searchArtists.focus();
        },      
        onLoadArtist() {
            this.drawerOpen = false;
        },
        submitForm() {
            this.$refs[this.formName].validate((valid) => {
                if (valid) {
                    this.$refs.artistSearchResults.searchArtists(this.artistSearchForm.searchText); 
                } else { 
                    return false;
                }
            })
        },
		searchOnReturnKey(event) { 
			if(event.key == "Enter")
			{
				this.submitForm(); 
			} 
		}
    }
  };
</script>

<style scoped>

.search-artists-button {
    float: right;
} 

.search-button { 
    border-radius:0%;
    float:right;
    /* height:39px; */
}

.search-form {
    width: 100%;
    margin-top: 10px;
}

.form-item-button { 
    margin-bottom: 5px!important;
    width: 20%;
}

.search-text {
    width: 98%;
    margin-bottom: 7px;
}

</style>