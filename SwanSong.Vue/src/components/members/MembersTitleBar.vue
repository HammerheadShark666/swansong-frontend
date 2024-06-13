<template>
    <div class="members-title-bar">   
        <el-row>                  
            <el-col :span="14"><h4 class="page-title">{{ title }}</h4></el-col>
            <el-col :span="10">
                <member-search class="artist-search"></member-search>        
                <router-link :to="{ name: 'members-member-add' }" class="nav-link">      
                    <el-button type="primary" class="add-members-button">
                        Add Member
                    </el-button> 
                </router-link>       
                <el-popconfirm
                    v-if="member.id > 0"
                    confirmButtonText="Yes"
                    cancelButtonText="No"
                    icon="el-icon-info"
                    width="290px"
                    iconColor="red"
                    title="Are you sure to delete this member?"
                    @confirm="deleteMemberOnClick">
                        <template #reference>
                            <el-button  type="primary" class="delete-member-button">
                                Delete Member
                            </el-button>
                        </template>
                </el-popconfirm>    
            </el-col>
        </el-row>             
        <dialog-messages @closeMessagesDialog="closeMessagesDialog" v-bind:visible="messages.length > 0" v-bind:messages="messages"></dialog-messages>  
    </div>
</template>

<script>  

import { defineComponent } from 'vue'
import MemberSearch from './MemberSearch.vue'
import { emitter } from '../../main'
import DialogMessages from '../library/DialogMessages.vue'
 
export default defineComponent({
    inheritAttrs: false, 
	name: "Members",
	data() {
		return {
            title: "Members", 
            messages: []
		};
	},    
    computed: {
        member: {
            get() {
                return this.$store.state.member.member;
            } 
        }
    }, 
	components:{
		'member-search': MemberSearch,
        'dialog-messages': DialogMessages
	},
    mounted() { 
        emitter.on("clear-member-messages", messages  => {
            this.messages = messages;
        }); 
    }, 
    methods: {   
        async deleteMemberOnClick() {
            emitter.emit("clear-member-messages", []);
            await this.$store.dispatch("member/deleteMember", this.member.id).then(
                        (response) => {   
                            this.$router.push("/members/member/add");                       
                            this.messages = response.messages;	  
						},
						(error) => {  
                            this.messages = error.messages;
						});
        },
        closeMessagesDialog() { 
            this.messages = [];
            this.$router.push("/members/member/add");
        }
    }
});
</script>

<style scoped>

.members-title-bar { 
    float:left;
    width:100%;
}

.page-title {
    width:40%;     
}

.add-members-button {
    float: right;
    margin-right: 5px;
}

.nav-link {
    padding:0em!important;
}

.nav-link button {
    margin-right: 10px;
}

.member-search {
    float: right;
}

.delete-member-button {
    float: right;
    margin-right: 5px;
}

</style>