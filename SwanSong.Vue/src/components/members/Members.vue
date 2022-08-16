<template>
    <div> 
		<el-row class="el-row-member">
			<el-col :span="24">   
				<header class="jumbotron jumbotron-custom"> 
					<el-row>
						<el-col :span="24" style="margin-top:5px;">   
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
import { ElMessage } from 'element-plus'

export default {
	name: "Members",  
	components:{ 
		'member': Member, 
		'members-title-bar': MembersTitleBar 
	},
	watch: {
		"$route.params.memberId"(memberId) {
			if(memberId != undefined)
				this.loadMember(memberId); 
		},	
    },
	created() {
		this.loadMember(this.$route.params.memberId);		
	},
	methods: {
		async loadMember(id) { 			 			
			await this.$store.dispatch("member/getMember", id).then(
					() => {},
					(error) => { 
						if(error.status == 404){
							ElMessage({
								duration:0,
								showClose: true, 
								type: 'error',
								message: 'Member not found.',
							});
						}								 
					});	
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

.el-row-member {
	margin-top: 12px;
}

</style>