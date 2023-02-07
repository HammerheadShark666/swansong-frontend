<template>
    <el-card class="box-card box-card-members" :body-style="{ padding: '10px'}">
        <template #header>
            <div class="card-header">
                <el-row class="header-row"> 
                    <el-col :span="15" class="title-col"><span>Members</span></el-col>
                    <el-col :span="9">                  
                        <artist-member-dialog  ref="artistMemberDialog"></artist-member-dialog>
                    </el-col>      
                </el-row> 
            </div>
        </template>
        <el-table                         
            :data="members"      
            :show-header=false    
            empty-text="No Members" 
            id="artist-members-table">            
                <el-table-column 
                    label="Photo"                    
                    width="95">                   
                     <template #default="scope"> 
                        <el-image v-if="scope.row.photo" class="member-photo" v-bind:src="getImageUrl(scope.row.photo)"></el-image>
                        <el-image v-else class="member-photo" v-bind:src="getDefaultImageUrl()"></el-image>                        
                    </template>
                </el-table-column>  
                <el-table-column                   
                    label="Name"                    
                    width="200">
                    <template #default="scope">
                        <span class="song-title">{{ scope.row.stageName }}</span>
                    </template>
                </el-table-column>  
                <el-table-column 
                    label=""
                    width="35">
                    <template #default="scope">
                        <el-popover
                            placement="left-start"                         
                            :width="300"
                            trigger="hover">
                            <template #reference>
                                <i class="el-icon-info"></i>
                            </template>
                            
                            <el-card class="box-card box-card-members">
                                <template #header>
                                    <div class="card-header">
                                        <el-row> 
                                            <el-col :span="24"><span>Member Details</span></el-col>                                                 
                                        </el-row> 
                                    </div>
                                </template>
                                <el-row>
                                    <el-col>
                                        <span>Stage name: {{scope.row.stageName}}</span>
                                    </el-col>
                                    <el-col>
                                        <span>Real name: {{scope.row.firstName}} {{scope.row.middleName}} {{scope.row.surname}}</span>
                                    </el-col>
                                    <el-col>
                                        <span>Date of birth: {{formatDate(scope.row.dateOfBirth)}}</span>
                                    </el-col>
                                    <el-col>
                                        <span>Date of death: {{formatDate(scope.row.dateOfDeath)}}</span>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-popover>
                    </template>                    
                </el-table-column>   
                <el-table-column 
                    label=""
                    width="35">
                    <template #default="scope">                       
                        <el-icon style="vertical-align: middle;" @click="editArtistMemberOnClick(scope.row)">
                            <Edit />
                        </el-icon>
                    </template>
                </el-table-column>   
                <el-table-column 
                    label=""
                    width="45">
                    <template #default="scope">
                    <el-popconfirm
                        v-if="scope.row.id > 0"
                        confirmButtonText="Yes"
                        cancelButtonText="No"
                        width="275px" 
                        :icon="InfoFilled"
                        icon-color="#626AEF"
                        title="Are you sure to delete this member?"
                        @confirm="deleteArtistMemberOnClick(scope.row.id)" 
                    >
                    <template #reference>
                        <el-icon style="vertical-align: middle;">
                            <Delete />  
                        </el-icon>     
                    </template>
                </el-popconfirm>    
                </template>   
                </el-table-column>    
        </el-table>   
        <dialog-messages @closeMessagesDialog="closeMessagesDialog" v-bind:visible="messages.length > 0" v-bind:messages="messages"></dialog-messages>
    </el-card>
</template>

<script>  

import { defineComponent } from 'vue' 
import ArtistMemberDialog from './ArtistMemberDialog.vue'  
import DialogMessages from '../library/DialogMessages.vue'
import { formatDate } from '../../helpers/helper'   
import { getMemberImageUrl, getDefaultMemberImageUrl } from '../../helpers/imageHelper'
import { Edit, Delete } from '@element-plus/icons'

export default defineComponent({

	name: "ArtistMembers",
	data() {
		return {
            title: "Artist Members",  
            messages: []
		};
	},   
    components:{ 
		'artist-member-dialog': ArtistMemberDialog, 
        'dialog-messages': DialogMessages,
        Edit,
        Delete
    },
    computed: {
        members() { 
            return this.$store.state.member.members;        
        }
    }, 
	methods: {	
        formatDate,
        getImageUrl: getMemberImageUrl,
        getDefaultImageUrl: getDefaultMemberImageUrl,     
        editArtistMemberOnClick(row) {
            this.$store.dispatch("member/editMember",  row);
            this.$refs.artistMemberDialog.openDialog(); 
        },
        async deleteArtistMemberOnClick(id) {
            await this.$store.dispatch("member/deleteMember", id).then(
						(response) => {	                            
                            this.messages =  response.messages;
						},
						(error) => { 
                            this.errors = error.data;
						});
        },        
        closeMessagesDialog() { 
            this.messages = [];
        }     
	}, 
});
</script>

<style scoped>
 
#artist-members-table {
    width: 100%!important;
    margin-bottom:15px;
}
 
.member-photo {	 
	margin-right:15px;
} 

.name {
    padding-left: 20px;
}
 
.header-row {
    margin-top: 0px!important;
}

.title-col {
    margin-top:3px;
}

.el-icon-edit:hover {
    cursor: pointer
}

.el-icon-delete:hover {
    cursor: pointer
}

.el-table__body {
    width: 100%!important;
}

</style>