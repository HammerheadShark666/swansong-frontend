<template>
    <div>
        <el-card class="box-card box">
            <template #header>
                <div class="card-header">
                <span>Country</span> 
                </div>
            </template>
            <el-row :gutter="10">       
                <el-col :span="11" class="left-column"> 
                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">				 
                            </div>
                        </template>
                        <lookup-country-table></lookup-country-table>
                    </el-card> 
                </el-col>
                <el-col :span="12">  
                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">	                            	 
                            </div>
                        </template> 
                        <lookup-country-details></lookup-country-details>	
                    </el-card> 
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>

import { defineComponent } from 'vue'    
import LookupCountryTable from '../country/LookupCountryTable.vue'; 
import LookupCountryDetails from '../country/LookupCountryDetails.vue'; 

export default defineComponent({
   
    el: '#lookupsCountry',  
    components:{ 
        'lookup-country-table': LookupCountryTable,
        'lookup-country-details': LookupCountryDetails
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