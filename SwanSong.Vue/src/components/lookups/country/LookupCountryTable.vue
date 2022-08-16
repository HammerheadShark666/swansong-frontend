<template>
    <el-row>
        <el-col :span="24">
            <el-button type="primary" class="add-country-button" @click="addCountry()">Add Country</el-button>
        </el-col>
        <el-col :span="24">
            <div class="table-container">
                <el-table
                    class="countries-table"
                    :data="countries"
                    @row-click="selectCountry"
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
   
    el: '#lookupsCountryTable', 
	async created() {       
        await this.$store.dispatch("country/getAll");
    },
    computed: {
        countries() { 
            return this.$store.state.country.countries;        
        },
    },
	methods: {
        selectCountry(row) {
            emitter.emit("clear-country-messages", []);
            this.$store.dispatch("country/setCountry",  { id: row.id, name: row.name});
        },
        addCountry() {
            emitter.emit("clear-country-messages", []);
            this.$store.dispatch("country/add");
        }
    },
})
</script>

             
<style scoped>

.countries-table {     
    overflow: hidden;
    width: 100%
}

.table-container {
    max-height:300px; 
    overflow-y: auto;
    margin-top:10px;
}

.add-country-button {
    float: right;
    margin-right: 10px;
}

</style>