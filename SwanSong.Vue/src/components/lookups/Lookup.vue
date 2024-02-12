<template>
	<div>
		<el-card class="box-card">
			<template #header>
				<div class="card-header">				 
				</div>
			</template>
			<el-row>    
				<el-col :span="24">				
					<el-tabs v-model="activeName"> 
						<el-tab-pane label="Country" name="country"><lookup-country></lookup-country></el-tab-pane>
						<el-tab-pane label="Record Label" name="recordLabel"><lookup-record-label></lookup-record-label></el-tab-pane>
						<el-tab-pane label="Studio" name="studio"><lookup-studio></lookup-studio></el-tab-pane> 
					</el-tabs> 
				</el-col>
			</el-row>		
		</el-card>
	</div>
</template>

<script>

import { defineComponent } from '@vue/composition-api'   
import LookupCountry from './country/LookupCountry.vue'; 
import LookupRecordLabel from './recordLabel/LookupRecordLabel.vue'; 
import LookupStudio from './studio/LookupStudio.vue';  

export default defineComponent({
   
    el: '#lookupForm',
	data() {
		return {
			activeName: 'country',
		}
	},  
    components:{ 
		'lookup-country': LookupCountry,
		'lookup-record-label': LookupRecordLabel,
		'lookup-studio': LookupStudio 
    },          
})
</script>

<style scoped>
 
.card-margin-right {
    margin-right: 10px;
}
 
</style>