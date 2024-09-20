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
                empty-text="No Members"       
                id="member-search-results-table">          
                <el-table-column>
                    <template #default="props">                  
                        <router-link :to="{ name: 'members-member', params:{memberId:props.row.id} }" class="nav-link nav-link-search" @click.prevent="closeDrawer()"> 
                            <el-row>
                                <el-col :span="4" fixed>    
                                    <el-image v-if="props.row.photo" class="search-member-photo" v-bind:src="getImageUrl(props.row.photo)"></el-image>
                                    <el-image v-else class="search-member-photo" v-bind:src="getDefaultImageUrl()"></el-image>
                                </el-col> 
                                <el-col :span="20" fixed class="member-text-container">    
                                    <h6 class="member-title">{{ props.row.stageName }}</h6>                         
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

import { defineComponent } from 'vue'  
import { formatDate } from '../../helpers/helper'
import { getMemberImageUrl, getDefaultMemberImageUrl } from '../../helpers/imageHelper'

export default defineComponent({    
    inheritAttrs: false,   
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
            return this.$store.state.member.members.slice(pageStart, pageEnd); 
        },
        searchResultsLength() {
            return this.$store.state.member.members.length;
        }
    },    
    async created() {
           
        this.$store.watch(
            (getters) => getters.member.members,
            () => {            
                this.page = 1;
            })        
    },
    methods: {
        formatDate,
        getImageUrl: getMemberImageUrl,
        getDefaultImageUrl: getDefaultMemberImageUrl,        
        async searchMembers(criteria) {      
                await this.$store.dispatch("member/search", criteria).then(
						( ) => {},
						(error) => { 
                            this.errors = error;
						});
        },
        async searchMembersByLetter(letter) {   
                await this.$store.dispatch("member/searchByLetter", letter).then(
						( ) => {},
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

.paragraph-no-bottom-margin {
    margin-bottom: 0px;
}

.results-table {
  width: 100%;
}

#member-search-results-table {
  margin-top: 10px;
}

#member-search-results-table th {
    display: none;
    margin-top: 20px;
}

#member-search-results-table td {
    padding-top: 0%;
    padding-bottom: 0%;
}

.search-member-photo {
    /* width: 50px; */
    border: solid black 1px;
    background-color: black; 
    margin-top: 2px;
    margin-left: 7px;

}

.member-photo img {
	object-fit: cover;
}

.results { 
    height:620px;
    overflow-x: auto;
    padding-bottom: 75px;
} 

.member-title {
    white-space: pre-wrap;
    word-break: keep-all; 
    font-size:1.0em;
    white-space: pre-wrap;
    word-break: keep-all;
    font-weight: 500;
    font-size:1.0em;
    margin-top:5px;
    margin-left:15px;
    font-size:100%;
}

.member-text-container { 
    color: black;
    /* padding-top:6px; */
    padding-left: 10px;
}   

.nav-link-search {
    padding: 0px!important;
    padding-top: 4px!important;
}

.search-results {
    margin-top: 15px;
}

</style>