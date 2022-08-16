<template>
    <div>
        <el-button @click="drawer = true" type="primary" class="search-lookups-button">
            Search
        </el-button>

        <el-drawer
            title="Search Lookups"
            v-model="drawer"
            :direction="direction"
            :before-close="handleClose"> 

            <el-card class="box-card">
                 <el-row>
                    <el-col :span="20">    
                        <el-input              
                            id="searchCriteria"
                            class="search-input"
                            placeholder="Please input"
                            v-model="searchCriteria"
                            clearable>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button v-on:click="searchLookups($event)"  class="search-button" type="primary">Search</el-button>      
                    </el-col>                    
                </el-row>               
            </el-card>
        </el-drawer>
    </div>
</template>

<script>
 
  export default {
    data() {
      return {
        drawer: false,
        direction: 'rtl',
        searchCriteria: ''
      };
    },     
    methods: {
        handleClose(done) {        
            done();
        },
        searchLookups: function searchLookups() {       
            this.$store.dispatch("lookup/search", this.searchCriteria); 
        }          
    }
  };
</script>

<style scoped>

.search-lookups-button {
    float: right;
}

.search-input {
    width: 98%; 
}

.search-button { 
    border-radius:0%;
}

.el-drawer__header {
    background-color: #122620;
    color: white;
    padding:10px;
    margin-bottom:0px;
    font-size: 20px;
}

</style>