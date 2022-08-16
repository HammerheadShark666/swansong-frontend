<template>
    <div> 
		<el-row class="el-row-album">
			<el-col :span="24">   
				<header class="jumbotron jumbotron-custom"> 
					<el-row>
						<el-col :span="24">   
							<artists-title-bar></artists-title-bar>
						</el-col>
					</el-row>        
					<el-row :gutter="7" style="margin-bottom: 12px"> 
						<el-col :span="24">  
							<artist></artist>
						</el-col>
					</el-row>                  
				</header>
			</el-col>
		</el-row>    
    </div>    
</template>

<script>  
import ArtistsTitleBar from './ArtistsTitleBar'
import Artist from './Artist'  

export default {
	name: "Artists", 
	components:{ 
		'artist': Artist,
		'artists-title-bar': ArtistsTitleBar 
	}, 
	created() {
		this.loadEmptyArtist();
	},
	methods: {
		async loadEmptyArtist() {			 
			this.$store.dispatch("artist/addArtist"); 
			this.$store.dispatch("member/clearMembers");
			this.$store.dispatch("album/clearAlbums");     
			this.$store.dispatch("albumSong/clearAlbumSongs");   
		}
	}
};

</script>

<style scoped>

.jumbotron-custom {
	padding: .35rem 1rem!important;
}

.el-row-album {
	margin-top: 12px;
}

</style>