<template>
    <div class="lookups-title-bar">   
		<el-row>       
			<el-col :span="14"><h4 class="page-title">{{ title }}</h4></el-col>         
			<!-- <el-col :span="10">
				<lookup-search class="lookup-search"></lookup-search>
				<router-link :to="{ name: 'lookups-lookup-add' }" class="nav-link"> 
                    <el-button type="primary" class="add-lookups-button" v-on:click="addNewLookupOnClick($event)">
                        Add Lookup
                    </el-button>
                </router-link>     				
			</el-col> -->
		</el-row>        
    </div>
</template>

<script>  

import { defineComponent } from 'vue' 
 
export default defineComponent({

  name: "LookupTitleBar",
  data() {
    return {
      title: "Lookups", 
    };
  },
});
</script>

<style scoped>

.lookups-title-bar { 
    float:left;
    width:100%;
}

.page-title {
    width:40%;     
}

.add-lookups-button {
    float: right;
}

.nav-link {
    padding:0em!important;
}

.nav-link button {
    margin-right: 10px;
}

.lookup-search {
    float: right;
}
 
</style>