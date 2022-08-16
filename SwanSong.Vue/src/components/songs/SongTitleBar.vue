<template>
    <div class="songs-title-bar">   
		<el-row>       
			<el-col :span="18"><h4 class="page-title">{{ title }}</h4></el-col>         
			<el-col :span="6">
				<song-search class="song-search"></song-search>
				<router-link :to="{ name: 'songs-song-add' }" class="nav-link"> 
                    <el-button type="primary" class="add-songs-button" v-on:click="addNewSong($event)">
                        Add Song
                    </el-button>
                </router-link>     				
			</el-col>
		</el-row>        
    </div>
</template>

<script>  

import { defineComponent } from 'vue'
import SongSearch from './SongSearch.vue'
 
export default defineComponent({

  name: "SongTitleBar",
  data() {
    return {
      title: "Songs", 
    };
  },     
   components:{
     'song-search': SongSearch
  },
  methods: {
    addNewSong: function addNewSong() {       
      this.$store.dispatch("song/addSong"); 
    }  
  }, 
});

</script>

<style scoped>

.songs-title-bar { 
    float:left;
    width:100%;
}

.page-title {
    width:40%;     
}

.add-songs-button {
    float: right;
}

.nav-link {
    padding:0em!important;
}

.nav-link button {
    margin-right: 10px;
}

.song-search {
    float: right;
}
 
</style>