<template>
    <div class="users-title-bar">   
      <el-row>       
        <el-col :span="19"><h4 class="page-title">{{ title }}</h4></el-col>         
        <el-col :span="2"> 
        </el-col>
      </el-row>        
    </div>
</template>

<script>  

import { defineComponent } from 'vue' 
 
export default defineComponent({

  name: "UsersTitleBar",
  data() {
    return {
      title: "Users", 
    };
  },
  methods: {
     
  }, 
});

</script>

<style scoped>

.users-title-bar {
    margin-bottom:5px;
    float:left;
    width:100%;
}

.page-title {
    width:40%;     
}
 
</style>