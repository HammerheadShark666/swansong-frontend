<template>
	<el-card class="box-card">
		<template #header>
			<div class="card-header">
				<el-row>
					<el-col :span="12">
					<b>{{details.title}}</b>
					</el-col> 
				</el-row>       
			</div>
		</template>
		<el-row>   
		</el-row>		
	</el-card>
</template>

<script>

import { defineComponent } from '@vue/composition-api'    

export default defineComponent({
   
    el: 'Song',    
    computed: {
		details: {
			get() {
				return this.$store.state.albumSong.albumSong;
			},           
		},     
    }
})

</script>

<style scoped>
 
.card-margin-right {
    margin-right: 10px;
}
 
</style>