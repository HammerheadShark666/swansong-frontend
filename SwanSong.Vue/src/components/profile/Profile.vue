<template>
    <div> 
      <el-row class="el-row-profile">
        <el-col :span="24">   
          <header class="jumbotron jumbotron-custom"> 
            <el-row>
              <el-col :span="24">   
                <profile-title-bar></profile-title-bar>
              </el-col>
            </el-row>        
            <el-row :gutter="7"> 
              <el-col :span="12">   
                <profile-details></profile-details>
              </el-col>
              <el-col :span="12">   
                <profile-change-password></profile-change-password>
              </el-col>
            </el-row>                  
          </header>
        </el-col>
      </el-row>    
    </div>    
</template>

<script>  

import ProfileTitleBar from './ProfileTitleBar' 
import ProfileDetails from './ProfileDetails';
import ProfileChangePassword from './ProfileChangePassword';

export default {
  name: "Profile", 
  components:{  
    'profile-title-bar': ProfileTitleBar,
    'profile-details': ProfileDetails,
    'profile-change-password': ProfileChangePassword
  }
};

</script>

<style scoped>

.el-row-profile {
	margin-top: 12px;
}

</style>