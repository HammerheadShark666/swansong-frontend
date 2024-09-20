<template>
    <div>
        <el-card class="box-card box">
            <template #header>
                <div class="card-header">
                <span>Studio</span> 
                </div>
            </template>
            <el-row :gutter="10">       
                <el-col :span="11" class="left-column"> 
                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">				 
                            </div>
                        </template>
                        <lookup-studio-table></lookup-studio-table>
                    </el-card> 
                </el-col>
                <el-col :span="12">  
                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">	                            	 
                            </div>
                        </template> 
                        <lookup-studio-details></lookup-studio-details>	
                    </el-card> 
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>

import { defineComponent } from 'vue'    
import LookupStudioTable from '../studio/LookupStudioTable.vue'; 
import LookupStudioDetails from '../studio/LookupStudioDetails.vue'; 

export default defineComponent({
   
    el: '#lookupsStudio',
    components:{ 
        'lookup-studio-table': LookupStudioTable,
        'lookup-studio-details': LookupStudioDetails
    }
})
</script>

<style scoped>

.left-column {
    margin-right:20px;
}

.box {
    padding-bottom: 10px;
}

</style>