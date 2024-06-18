<template>
    <div>
        <el-button @click="drawerOpen = true" type="primary" class="search-albums-button">
            Search
        </el-button>
        <el-drawer
            title="Search Albums"
            v-model="drawerOpen"           
            @opened="openedDrawer" 
            :direction="direction"
            :before-close="closeOnClick" size="25%"> 
            <el-card class="box-card">
                <search-by-letter-selector @searchByLetter="searchByLetterOnClick"></search-by-letter-selector>
                <el-row> 
                    <el-form 
                        ref="albumSearchForm"  
                        :rules="rules" 
                        class="search-form" 
                        @submit.prevent 
                        :model="albumSearchForm">
                        <el-row>
                            <el-col :span="20">
                                <el-form-item prop="searchText" class="search-text">
                                    <el-input ref="searchAlbums" placeholder="Search For..." minlength="3" 
                                                maxlength="100" show-word-limit v-model="albumSearchForm.searchText" @keyup.enter.native="searchOnReturnKey"></el-input>
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
                <album-search-results ref="albumSearchResults" @closeDrawer="onLoadAlbum"></album-search-results>
            </el-card>
        </el-drawer>
    </div>
</template>

<script>

import AlbumSearchResults from './AlbumSearchResults.vue'  
import { getAlphabet } from '../../helpers/helper'
import SearchByLetterSelector from '../library/SearchByLetterSelector.vue'
import { Edit } from '@element-plus/icons'

export default {
    data() {
        return {
            albumSearchForm: {
                searchText: ''
            },
            drawerOpen: false,
            formName: 'albumSearchForm',
            direction: 'rtl', 
            alphabet: getAlphabet(),
            rules: { 	
                searchText: [ { required: true, message: 'Please input search for', trigger: 'change' },
                                { min: 3, max: 100, message: 'Search for should be 3 to 100', trigger: 'change' }
                            ],
            }         
        };
    },    
    components:{
        'album-search-results': AlbumSearchResults,
        'search-by-letter-selector': SearchByLetterSelector,
        [Edit.name]: Edit
    },        
    methods: {
        closeOnClick(done) {       
            done();
        },     
        searchByLetterOnClick(letter) {    
            this.albumSearchForm.searchAlbums = '';
            this.$refs.albumSearchResults.searchAlbumsByLetter(letter);
        },
        openedDrawer() {
            this.$refs.searchAlbums.focus();
        },
        onLoadAlbum() {
            this.drawerOpen = false;
        },
        submitForm() {
            this.$refs[this.formName].validate((valid) => {
                if (valid) {
                    this.$refs.albumSearchResults.searchAlbums(this.albumSearchForm.searchText);
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

.search-albums-button {
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