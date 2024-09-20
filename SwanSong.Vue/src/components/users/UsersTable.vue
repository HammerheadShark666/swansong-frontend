<template>   
    <div el-row>  
        <el-card class="box-card card-margin-right">
            <template #header>
                <div class="card-header">
                    <span>Users ({{this.noOfUsers}})</span> 
                </div>
            </template> 

            <el-table :data="tableData" height="250" style="width: 100%">
                <el-table-column prop="date" label="Surname" width="180" />
                <el-table-column prop="name" label="First Name" width="180" />
                <el-table-column prop="address" label="Email" />
                <el-table-column prop="role" label="Role" />
            </el-table>


            <!-- <el-table    
                :data="this.users"   
                :default-sort = "{prop: 'name', order: 'descending'}"                
                style="width: 100%"
                empty-text="No users"       
                id="user-results-table">          
                <el-table-column>
                    <template #default="props">                  
                        <router-link :to="{ name: 'users-user', params:{id:props.row.id} }" class="nav-link nav-link-user" @click.prevent="closeDrawer()"> 
                            <el-row>
                                <el-col :span="5" fixed>    
                                    <el-image v-if="props.row.photo" class="list-user-photo" v-bind:src="'/images/users/' + props.row.photo"></el-image>
                                    <el-image v-else class="list-user-photo" v-bind:src="'/images/users/default-user-image.jpg'"></el-image>
                                </el-col> 
                                <el-col :span="19" fixed class="list-user-text-container">    
                                    <h6 class="user-title">{{ props.row.name }} <span v-if=props.row.releaseDate>({{ getYear(props.row.releaseDate) }})</span></h6>                          
                                    
                                </el-col>  
                            </el-row>    
                        </router-link>   
                    </template>
                </el-table-column>
            </el-table>  -->

            <el-pagination
                    background
                    small
                    layout="prev, pager, next" 
                    :total="this.noOfUsers"
                    :page-size="pageSize" 
                    :hide-on-single-page=false
                    :page-sizes="[5, 10, 15, 20]"
                    :current-page="this.pageNumber"
                    @size-change="sizeChange"
                    @current-change="pageChange" >
            </el-pagination>  
        </el-card>  
    </div>
</template>

<script> 

import { defineComponent } from 'vue'  
import { formatDate, getYear } from '../../helpers/helper'

export default defineComponent({      
    el: '#table',  
    emits: ["closeDrawer"],   
    data() {
		return {
            pageNumber: 1,
            pageSize: 10,  
            total: 0,
            tableData: [
                {
                date: '2016-05-03',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                role: 'Admin'
                },
                {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                },
                {
                date: '2016-05-04',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                },
                {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                },
                {
                date: '2016-05-08',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                },
                {
                date: '2016-05-06',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                },
                {
                date: '2016-05-07',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                },
            ],
		}
    },
    computed: {
        users() {    
            if(this.$store.state.user.usersByPaging.data.length > 0)
                return this.$store.state.user.usersByPaging.data;
            else
                return [];
        }, 
        noOfUsers() {
            return 10;
        }
    }, 
    async created() {          
    },     
    methods: {
        formatDate,  
        getYear,      
        async pageChange(val){
            this.pageNumber = val;
            await this.loadUsers();
        },
        async sizeChange(val) {
            this.pageSize = val;
            await this.loadUsers();
        },
        async loadUsers() {
            var pageSize = this.pageSize;
            var pageNumber = this.pageNumber;
        
            await this.$store.dispatch("user/all",  { pageNumber, pageSize }).then(
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

<style>
 
.paragraph-no-bottom-margin {
    margin-bottom: 0px;
}

.results-table {
  width: 100%;
}

#user-userh-results-table {
  margin-top: 10px;
}

#user-userh-results-table th {
    display: none;
    margin-top: 20px;
}

#user-userh-results-table td {
    padding-top: 0%;
    padding-bottom: 0%;
}

.list-user-photo {
    height: 33px;
    width: 33px; 
    background-color: black; 
}

.user-photo img {
	object-fit: cover;
}

.results { 
    height:620px;
    overflow-x: auto;
    padding-bottom: 75px;
}
 
.el-pagination__sizes {
    width: 75px!important;
    margin: 0 5px 0 0!important;
}
 
.user-title {
    white-space: pre-wrap;
    word-break: keep-all; 
    font-size:1.0em;
}

.list-user-text-container {
    padding-left:10px;
    color: black;
    padding-top:6px;
}   

.el-pagination {    
    margin-top: 5px;
}

.el-table td, .el-table th {
    padding: 0px!important;
}

.el-table .cell {
    padding-left: 0px!important;  
}

h5 {
    color: white;
}
 
.nav-link-user {
    padding: 0px!important;
}

</style>