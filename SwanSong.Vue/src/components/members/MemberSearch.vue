<template>
    <div>
        <el-button @click="drawerOpen = true" type="primary" class="search-members-button">
            Search
        </el-button>
        <el-drawer
            title="Search Members"
            v-model="drawerOpen"           
            @opened="openedDrawer" 
            :direction="direction"
            :before-close="closeOnClick" size="25%"> 
            <el-card class="box-card">
                <search-by-letter-selector @searchByLetter="searchByLetterOnClick"></search-by-letter-selector>
                <el-row> 
                    <el-form 
                        ref="memberSearchForm"  
                        :rules="rules" 
                        class="search-form"
                        :model="memberSearchForm">
                        <el-row>
                            <el-col :span="20">
                                <el-form-item prop="searchText" class="search-text">
                                    <el-input ref="searchMembers" placeholder="Search For..." minlength="3" maxlength="100" show-word-limit v-model="memberSearchForm.searchText"></el-input>
                                </el-form-item> 
                            </el-col>
                            <el-col :span="4">
                                <el-form-item class="form-item-button">                                      
                                    <el-button type="primary" class="search-button" @click="submitForm('memberSearchForm')">                                        
                                        <el-icon style="vertical-align:middle;">
                                            <search />
                                        </el-icon>                             
                                    </el-button>
                                </el-form-item>     
                            </el-col>
                        </el-row>
                    </el-form>
                </el-row>              
                <member-search-results ref="memberSearchResults" @closeDrawer="onLoadMember"></member-search-results>
            </el-card>
        </el-drawer>
    </div>
</template>

<script>

import MemberSearchResults from './MemberSearchResults.vue'  
import { getAlphabet } from '../../helpers/helper'
import SearchByLetterSelector from '../library/SearchByLetterSelector.vue'
import { Edit } from '@element-plus/icons'

export default {
    data() {
        return {
            memberSearchForm: {
                searchText: ''
            },
            drawerOpen: false,
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
        'member-search-results': MemberSearchResults,
        'search-by-letter-selector': SearchByLetterSelector,
        [Edit.name]: Edit
    },        
    methods: {
        closeOnClick(done) {       
            done();
        },     
        searchByLetterOnClick(letter) {    
            this.memberSearchForm.searchMembers = '';
            this.$refs.memberSearchResults.searchMembersByLetter(letter);
        },
        openedDrawer() {
            this.$refs.searchMembers.focus();
        },
        onLoadMember() {
            this.drawerOpen = false;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$refs.memberSearchResults.searchMembers(this.memberSearchForm.searchText); 
                } else { 
                    return false;
                }
            })
        }
    }
};
</script>

<style scoped>

.search-members-button {
    float: right;
} 

.search-button { 
    border-radius:0%;
    float:right; 
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