<template>
    <div> 
		<el-row class="el-row-artists">
			<el-col :span="24">   
				<header class="jumbotron jumbotron-custom"> 
					<el-row>
						<el-col :span="24" style="margin-top:5px;">   
							<artists-title-bar></artists-title-bar>
						</el-col>
					</el-row>        
					<el-row :gutter="7" > 
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
	watch: {
		"$route.params.artistId"(artistId) { 
			if(artistId != undefined)
				this.loadArtist(artistId);
		}		
	},
	created() {
		this.loadArtist(this.$route.params.artistId);
	},
	methods: {
		async loadArtist(id) {   
			this.$store.dispatch("artist/getArtist", id).then(
					() => {		
						this.$store.dispatch("artistMember/getMembersForArtist", id);
						this.$store.dispatch("album/getAlbumsForArtist", id);	
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

.el-row-artists {
	margin-top: 12px;
}

</style>