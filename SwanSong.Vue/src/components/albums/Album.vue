<template>
	<div>
		<el-card class="box-card">
			<template #header>
				<div class="card-header">
					<el-row class="card-header-row">
						<el-col :span="12">
							<span>{{album.name}}</span>
						</el-col>
						<el-col :span="12" class="album-artist-title" v-if="album.artistId != null">
							<router-link :to="{ name: 'artists-artist', params:{artistId: album.artistId} }" class="nav-link nav-link-artist"> 
								<span>{{album.artistName}}</span> 
							</router-link>
						</el-col>
					</el-row>       
				</div>
			</template>
			<el-row>    
				<el-col :span="14" class="album-details">
					<album-details></album-details>
				</el-col>
				<el-col :span="10"> 
					<album-photo  v-if="album.id > 0"></album-photo>
					<album-songs v-if="album.id > 0"></album-songs>   
				</el-col>
			</el-row>    
		</el-card>
	</div>
</template>

<script>

import { defineComponent } from '@vue/composition-api'   
import AlbumDetails from './AlbumDetails'
import AlbumPhoto from './AlbumPhoto'
import AlbumSongs from './AlbumSongs.vue'

export default defineComponent({
   
    el: 'Album',  
    components:{ 
		'album-details': AlbumDetails,
		'album-photo': AlbumPhoto,
		'album-songs': AlbumSongs
    },      
    computed: {
		album: {
			get() {
				return this.$store.state.album.album;
			},           
		},  
    }
})

</script>

<style scoped>

.album-artist-title {
    text-align: right;
}

.card-margin-right {
    margin-right: 10px;
}

.nav-link-artist {
	margin-top:0px;
	color:white;
	padding: 0px!important;
} 

.card-header-row {
	margin-top: 0px;
}

.album-details {
	margin-bottom: 12px;
}
 
</style>