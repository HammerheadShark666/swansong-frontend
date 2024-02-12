<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-button type="primary" class="add-studio-button" @click="addStudio()">Add Studio</el-button>
            </el-col>
            <el-col :span="24">
                <div class="table-container">
                    <el-table
                        class="studios-table"
                        :data="studios"
                        @row-click="selectStudio"
                        :default-sort="{ prop: 'name', order: 'ascending' }">
                        <el-table-column prop="id" label="Id" sortable width="50" />
                        <el-table-column prop="name" sortable label="Name" /> 
                    </el-table>  
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

import { defineComponent } from '@vue/composition-api'    
import { emitter } from '../../../main'

export default defineComponent({
   
    el: '#lookupsStudioTable',
    async created() {       
        await this.$store.dispatch("studio/getAll")
    },
    computed: {
        studios() { 
            return this.$store.state.studio.studios;        
        },
    },
	methods: {
        selectStudio(row) {
            emitter.emit("clear-studio-messages", []);
            this.$store.dispatch("studio/setStudio",  { id: row.id, name: row.name});
        },
        addStudio() {
            emitter.emit("clear-studio-messages", []);
            this.$store.dispatch("studio/add");
        }
    },
})
</script>

             
<style scoped>

.studios-table {     
    overflow: hidden;
    width: 100%
}

.table-container {
    max-height:300px; 
    overflow-y: auto;
    margin-top:10px;
}

.add-studio-button {
    float: right;
    margin-right: 10px;
}

</style>