<template>
	<el-card class="box-card">
		<template #header>
			<div class="card-header">				 
			</div>
		</template>
		<el-row>    
			<el-col :span="24">	
				<users-table></users-table>
			</el-col>
		</el-row>		
	</el-card>
</template>

<script>

import { defineComponent } from 'vue'  
import UsersTable from './UsersTable.vue'

export default defineComponent({
   
    el: '#User', 
	data() {
		return {
			activeName: 'country',
		}
	},  
    components:{
		'users-table': UsersTable,
	},      
    computed: {
		details: {
			get() {
				return null;
			},           
		},     
    },
	methods: {},
})

</script>

<style scoped>
 
.card-margin-right {
    margin-right: 10px;
}
 
</style>