<template>
    <div> 
      <el-row>
        <el-col :span="24">   
          <header class="jumbotron jumbotron-custom"> 
            <el-row>
              <el-col :span="24">   
                <users-title-bar></users-title-bar>
              </el-col>
            </el-row>        
            <el-row :gutter="7" style="margin-bottom: 12px"> 
              <el-col :span="24">   
                <user></user>
              </el-col>
            </el-row>                  
          </header>
        </el-col>
      </el-row>    
    </div>    
</template>

<script>  

import UsersTitleBar from './UsersTitleBar' 
import User from './User'

export default {
  name: "Users", 
  components:{  
    'users-title-bar': UsersTitleBar,
    'user': User

  }
};

</script>
