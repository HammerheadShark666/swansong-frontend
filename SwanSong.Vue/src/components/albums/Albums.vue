<template>
    <div> 
		<el-row class="el-row-album">
			<el-col :span="24">   
				<header class="jumbotron jumbotron-custom"> 
					<el-row>
						<el-col :span="24" style="margin-top:5px;">   
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
	watch: {
		"$route.params.albumId"(albumId) {
			if(albumId != undefined)
				this.loadAlbum(albumId); 
		},	
    },
	created() {
		this.loadAlbum(this.$route.params.albumId);		
	},
	methods: {
		async loadAlbum(id) { 			 			
			await this.$store.dispatch("album/getAlbum", id).then(
					() => {		
						this.$store.dispatch("albumSong/getSongsForAlbum", id);	
					},
					(error) => { 
						console.log(error); 
					});	
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