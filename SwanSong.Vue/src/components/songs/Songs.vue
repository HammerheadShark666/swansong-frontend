<template>
    <div> 
		<el-row>
			<el-col :span="24">   
				<header class="jumbotron jumbotron-custom"> 
					<el-row>
						<el-col :span="24">   
							<song-title-bar></song-title-bar>
						</el-col>
					</el-row>        
					<el-row :gutter="7" style="margin-bottom: 12px"> 
						<el-col :span="24">   
							<song-form></song-form>
						</el-col>
					</el-row>                  
				</header>
			</el-col>
		</el-row>    
    </div>    
</template>

<script>  
import SongTitleBar from './SongTitleBar' 
import SongForm from './SongForm'

export default {
  name: "Song", 
  components:{  
    'song-title-bar': SongTitleBar,
	'song-form': SongForm
  }
};
</script>

<style scoped>

.jumbotron-custom {
	padding: .35rem 1rem!important;
}

</style>