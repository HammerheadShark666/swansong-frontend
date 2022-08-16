<template>
    <div> 
		<el-row class="el-row-lookups">
			<el-col :span="24">   
				<header class="jumbotron jumbotron-custom"> 
					<el-row>
						<el-col :span="24">   
							<lookups-title-bar></lookups-title-bar>
						</el-col>
					</el-row>        
					<el-row :gutter="7" style="margin-bottom: 12px"> 
						<el-col :span="24">  
							<lookup></lookup> 
						</el-col>
					</el-row>                  
				</header>
			</el-col>
		</el-row>    
    </div>    
</template>

<script>  

import LookupsTitleBar from './LookupsTitleBar' 
import Lookup from './Lookup'

export default {
  name: "Lookups", 
  components:{  
    'lookups-title-bar': LookupsTitleBar,
    'lookup': Lookup,
  }
};

</script>

<style scoped>

.jumbotron-custom {

    padding:0.35rem 1rem 1rem 1rem!important
}

.el-row-lookups {
	margin-top: 12px;
}

</style>
