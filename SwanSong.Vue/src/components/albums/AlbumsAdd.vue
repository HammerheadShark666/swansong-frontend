<template>
    <div> 
		<el-row class="el-row-album">
			<el-col :span="24">   
				<header class="jumbotron jumbotron-custom"> 
					<el-row>
						<el-col :span="24">   
							<albums-title-bar></albums-title-bar>                
						</el-col>
					</el-row>        
					<el-row :gutter="7"  class="album"> 
						<el-col :span="24">  
							<album></album>
						</el-col>
					</el-row>                  
				</header>
			</el-col>
		</el-row>    
    </div>    
</template>

<script>  
import AlbumsTitleBar from './AlbumsTitleBar'
import Album from './Album'  

export default {
	name: "Albums",  
	components:{ 
		'album': Album, 
		'albums-title-bar': AlbumsTitleBar 
	}, 
	created() {
		this.loadEmptyAlbum();
	},
	methods: {
		async loadEmptyAlbum() { 			 
			this.$store.dispatch("album/addAlbum"); 
			this.$store.dispatch("albumSong/clearAlbumSong"); 
			this.$store.dispatch("albumSong/clearAlbumSongs"); 			 
		}
	}
};

</script>

<style scoped>

.jumbotron-custom {
	padding: .35rem 1rem!important;
}
 
.album {
	margin-bottom: 12px!important;
}

.el-row-album {
	margin-top: 12px;
}

</style>