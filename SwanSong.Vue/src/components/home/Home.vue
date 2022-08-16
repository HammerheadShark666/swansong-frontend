<template>
    <div>  
		<el-row :gutter="20" class="home-row"> 			 
			<el-col :span="8">
				<latest-artists></latest-artists>
			</el-col>			
			<el-col :span="8">
				<latest-members></latest-members>
			</el-col>
			<el-col :span="8">
				<latest-albums></latest-albums>
			</el-col>
		</el-row>
	</div>    
</template>

<script>   
 
import LatestAlbums from './LatestAlbums.vue';
import LatestArtists from './LatestArtists.vue';
import LatestMembers from './LatestMembers.vue';

export default {
	name: "Home",  
	data() {
		return {
            title: "Album Songs", 
		}
	},   
	components:{       
		'latest-albums': LatestAlbums,
		'latest-artists': LatestArtists,
		'latest-members': LatestMembers
	}, 
};

</script>


<style scoped>

.home-row {
	margin-top: 10px;
}
 
</style>