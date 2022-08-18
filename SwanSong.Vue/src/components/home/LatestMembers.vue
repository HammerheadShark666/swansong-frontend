<template>       
    <div>
        <el-row>
            <el-col>
                <h6 class="column-title">Members</h6>
            </el-col> 
        </el-row>
        <el-row v-for="(page, index) of pages" :key="index">        
            <el-scrollbar>
                <div class="scrollbar-flex-content">    
                    <div
                        v-for="(member, index) in page"
                        :key="index"
                        :span="24"
                        :offset="1" 
                        >
                        <router-link :to="{ name: 'members-member', params:{memberId:member.id} }" class="nav-link nav-link-member" @click.prevent="closeDrawer()">
                            <div class="member-card">
                                <div class="title-container">
                                    <span class="title">{{ member.stageName }}</span>   
                                </div> 
                                <el-image v-if="member.photo" class="list-member-photo" v-bind:src="getImageUrl(member.photo)"></el-image>
                                <el-image v-else class="list-member-photo" v-bind:src="getDefaultImageUrl()"></el-image>                     
                            </div>       
                        </router-link>     
                    </div>
                </div>  
            </el-scrollbar>     
            <div class="padding"></div>
        </el-row>
    </div>
</template>

<script> 

import { defineComponent } from '@vue/composition-api'  
import { formatDate, getPages } from '../../helpers/helper'
import { getMemberImageUrl, getDefaultMemberImageUrl } from '../../helpers/imageHelper'

export default defineComponent({      
    el: '#table',  
    emits: ["closeDrawer"],   
    data() {
		return {            
		}
    },
    computed: {
        members() {    
            if(this.$store.state.member.members.length > 0)
                return this.$store.state.member.members;
            else
                return [];
        },  
        pages () {
            return getPages(this.members);
        }
    }, 
    async created() { 
       
        await this.loadMembers();

        this.$store.watch(
            (getters) => getters.member.members,
            () => {            
                this.page = 1;
            })        
    },     
    methods: {
        formatDate, 
        getImageUrl: getMemberImageUrl,
        getDefaultImageUrl: getDefaultMemberImageUrl,        
        async loadMembers() {           
            await this.$store.dispatch("member/random").then(
                    ( ) => {},
                    (error) => { 
                        this.errors = error;
                    });
        },      
        closeDrawer() {
            this.$emit('closeDrawer'); 
        }
    } 
})
</script>

<style scoped>

#member-memberh-results-table {
  margin-top: 10px;
}

#member-memberh-results-table th {
    display: none;
    margin-top: 20px;
}

#member-memberh-results-table td {
    padding-top: 0%;
    padding-bottom: 0%;
}

.list-member-photo { 
    width:140px;
    height: 90px;
    background-color: black; 
}

h5 {
    color: white;
}
 
.nav-link-member {
    padding: 0px!important;
    width:152px;
    margin-right: 5px;
}
  
.column-title {
    font-size: 14px;
    color: white;
    margin-left: 16px;
}

.title {
    font-size: 12px;
    color: black;
    line-height: 0;
    margin-bottom: 2px;
}

.padding {
    height: 10px;
    width: 100%;
}

.member-card {
    padding: 1px 5px 1px 5px!important;
    border: 1px solid #000;
    background-color: white;
}
  
.member-card:hover {
    background-color: #5ef1f167!important;
}

.title-container {
    padding: 0px;
    line-height:17px;
    margin-bottom:5px;
}


.scrollbar-flex-content {
  display: flex;
}

.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}

.el-scrollbar {
    padding-bottom: 20px;
}

</style>