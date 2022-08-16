<template>
    <el-row>
        <el-col :span="24">
            <el-button type="primary" class="add-record-label-button" @click="addRecordLabel()">Add Record Label</el-button>
        </el-col>
        <el-col :span="24">
            <div class="table-container">
                <el-table
                    class="record-labels-table"
                    :data="recordLabels"
                    @row-click="selectRecordLabel"
                    :default-sort="{ prop: 'name', order: 'ascending' }">
                    <el-table-column prop="id" label="Id" sortable width="50" />
                    <el-table-column prop="name" sortable label="Name" /> 
                </el-table>  
            </div>
        </el-col>
    </el-row>   
</template>

<script>

import { defineComponent } from '@vue/composition-api'    
import { emitter } from '../../../main'

export default defineComponent({
   
    el: '#lookupsRecordLabelTable', 
    async created() {       
        await this.$store.dispatch("recordLabel/getAll")
    },
    computed: {
        recordLabels() { 
            return this.$store.state.recordLabel.recordLabels;        
        },
    },
	methods: {
        selectRecordLabel(row) {
            emitter.emit("clear-record-label-messages", []);
            this.$store.dispatch("recordLabel/setRecordLabel",  { id: row.id, name: row.name});
        },
        addRecordLabel() {
            emitter.emit("clear-record-label-messages", []);
            this.$store.dispatch("recordLabel/add");
        }
    },
})
</script>

             
<style scoped>

.record-labels-table {     
    overflow: hidden;
    width: 100%
}

.table-container {
    max-height:300px; 
    overflow-y: auto;
}

.add-record-label-button {
    float: right;
    margin-right: 10px;
}

</style>