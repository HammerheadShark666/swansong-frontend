<template>
    <div class="artists-title-bar">   
      <el-row>       
        <el-col :span="19"><h3 class="page-title">{{ title }}</h3></el-col>         
        <el-col :span="2"> 
        </el-col>
      </el-row>    
    </div>
</template>

<script>  

import { defineComponent } from 'vue' 
 
export default defineComponent({

  name: "ProfileTitleBar",
  data() {
    return {
      title: "Profile", 
    };
  },    
});

</script>

<style scoped>

.home-title-bar {
    margin-bottom:5px;
    float:left;
    width:100%;
}

.page-title {
    width:40%;     
}
 
</style>