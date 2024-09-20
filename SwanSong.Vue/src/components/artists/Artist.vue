<template>
	<el-card class="box-card"> 
		<template #header>
			<div class="card-header">
				<el-row class="card-header-row">
					<el-col :span="12">
						<span>{{artist.name}}</span>
					</el-col>				
				</el-row>       
			</div>
		</template>
		<el-row>    
			<el-col :span="14"> 
				<artist-details></artist-details>
				<artist-photo v-if="artist.id > 0"></artist-photo> 
			</el-col>
			<el-col :span="10">
				<artist-members v-if="artist.id > 0"></artist-members>
				
			</el-col>
		</el-row>
		<el-row class="albums">    
			<el-col :span="24"> 
				<artist-albums v-if="artist.id > 0"></artist-albums>  	
			</el-col>
		</el-row>
		
	</el-card>
</template>

<script>

import { defineComponent } from 'vue';
import ArtistDetails from './ArtistDetails'
import ArtistPhoto from './ArtistPhoto'
import ArtistAlbums from './ArtistAlbums.vue'
import ArtistMembers from './ArtistMembers.vue'

export default defineComponent({
   
    el: 'Artist', 
    components:{ 
		'artist-details': ArtistDetails,
		'artist-photo': ArtistPhoto,
		'artist-albums': ArtistAlbums,
		'artist-members': ArtistMembers
    },      
    computed: {
		artist: {
			get() {
				return this.$store.state.artist.artist;
			},           
		},     
    }
})
</script>

<style scoped> 

.albums {
	margin-bottom: 12px;
}

</style>