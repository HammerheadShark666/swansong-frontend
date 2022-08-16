<template>
    <el-card class="box-card box">
        <template #header>
            <div class="card-header">
            <span>Record Label</span> 
            </div>
        </template>
        <el-row :gutter="10">    
            <el-col :span="11" class="left-column"> 
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">				 
                        </div>
                    </template>
                    <lookup-record-label-table></lookup-record-label-table>
                </el-card>                
            </el-col>
            <el-col :span="12"> 
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">	                            	 
                        </div>
                    </template> 
                    <lookup-record-label-details></lookup-record-label-details>	
                </el-card> 
            </el-col>
        </el-row>
    </el-card>
</template>

<script>

import { defineComponent } from '@vue/composition-api'    
import LookupRecordLabelTable from '../recordLabel/LookupRecordLabelTable.vue'; 
import LookupRecordLabelDetails from '../recordLabel/LookupRecordLabelDetails.vue'

export default defineComponent({
   
    el: '#lookupsRecordLabel', 
    components:{ 
        'lookup-record-label-table': LookupRecordLabelTable,
        'lookup-record-label-details': LookupRecordLabelDetails
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