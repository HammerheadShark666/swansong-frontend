<template>
	<div>
		<el-card class="box-card">
			<template #header>
				<div class="card-header">
					<el-row class="card-header-row">
						<el-col :span="12">
							<span>{{member.stageName}}</span>
						</el-col>
						<el-col :span="12" class="member-member-title" v-if="member.artistId != null">
							<router-link :to="{ name: 'artists-artist', params:{artistId: member.artistId} }" class="nav-link nav-link-member"> 
								<span>{{artistName}}</span> 
							</router-link>
						</el-col>
					</el-row>       
				</div>
			</template>
			<el-row>    
				<el-col :span="14" class="member-details">
					<member-details></member-details>
				</el-col>
				<el-col :span="10"> 
					<member-photo  v-if="member.id > 0"></member-photo> 
				</el-col>
			</el-row>    
		</el-card>
	</div>
</template>

<script>

import { defineComponent } from '@vue/composition-api'   
import MemberDetails from './MemberDetails'
import MemberPhoto from './MemberPhoto' 

export default defineComponent({ 
    el: 'Member',  
    components:{ 
		'member-details': MemberDetails,
		'member-photo': MemberPhoto,
    },      
    computed: {
		member: {
			get() {
				return this.$store.state.member.member;
			},           
		},  
		artistName: { 
			get() {
				let artist = this.$store.state.artist.lookups.find(x => x.id === this.member.artistId);
				return artist != undefined ? artist.name : '';
			}
		}
    }
})

</script>

<style scoped>

.member-member-title {
    text-align: right;
}

.card-margin-right {
    margin-right: 10px;
}

.nav-link-member {
	margin-top:0px;
	color:white;
	padding: 0px!important;
} 

.nav-link-member:hover {
	color: #B68D40;
}

.card-header-row {
	margin-top: 0px;
}

.member-details {
	margin-bottom: 12px;
}
 
</style>