<template>
    <div>
        <el-button @click="drawer = true" type="primary" class="search-songs-button">
            Search
        </el-button>

        <el-drawer
            title="Search Songs"
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
                        <el-button v-on:click="searchSongs($event)"  class="search-button" type="primary">Search</el-button>      
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
    created() {
        this.$store.watch(
            (getters) => getters.song.status,
            (status) => {            
                if(status.loading == true)
                    this.drawer = false;             
            })  
    },
    methods: {
        handleClose(done) {        
            done();
        },
        searchSongs: function searchSongs() {       
            this.$store.dispatch("song/search", this.searchCriteria); 
        }          
    }
  };
  
</script>

<style scoped>

.search-songs-button {
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