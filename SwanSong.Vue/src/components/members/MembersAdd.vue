<template>
    <div> 
		<el-row class="el-row-album">
			<el-col :span="24">   
				<header class="jumbotron jumbotron-custom"> 
					<el-row>
						<el-col :span="24">   
							<members-title-bar></members-title-bar>                
						</el-col>
					</el-row>        
					<el-row :gutter="7"  class="member"> 
						<el-col :span="24">  
							<member></member>
						</el-col>
					</el-row>                  
				</header>
			</el-col>
		</el-row>    
    </div>    
</template>

<script>  
import MembersTitleBar from './MembersTitleBar'
import Member from './Member'  

export default {
	name: "Members",  
	components:{ 
		'member': Member, 
		'members-title-bar': MembersTitleBar 
	}, 
	created() {
		this.loadEmptyMember();
	},
	methods: {
		async loadEmptyMember() { 			 
			this.$store.dispatch("member/addMember");  	 
		}
	}
};

</script>

<style scoped>

.jumbotron-custom {
	padding: .35rem 1rem!important;
}
 
.member {
	margin-bottom: 12px!important;
}

.el-row-album {
	margin-top: 12px;
}

</style>