<template>
    <div class="artists-title-bar">   
        <el-row>       
            <el-col :span="14"><h4 class="page-title">{{ getTitle() }}</h4></el-col>
            <el-col :span="10">
                <artist-search class="artist-search"></artist-search>
                <router-link :to="{ name: 'artists-artist-add' }" class="nav-link"> 
                    <el-button type="primary" class="add-artist-button" @click="addArtist()">
                        Add Artist
                    </el-button> 
                </router-link>
                <el-popconfirm
                    v-if="artist.id > 0"
                    confirmButtonText="Yes"
                    cancelButtonText="No"
                    icon="el-icon-info"
                    iconColor="red"
                    width="325px"
                    title="Are you sure you want to delete this artist?"
                    @confirm="deleteArtistOnClick">
                        <template #reference>
                        <el-button  type="primary" class="delete-artist-button">
                            Delete Artist
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
import ArtistSearch from './ArtistSearch.vue'
import DialogMessages from '../library/DialogMessages.vue' 

export default defineComponent({

	name: "ArtistsTitleBar",
	data() {
		return {
            title: "Artists", 
            messages: [],  
		};
	},     
	components:{
        'artist-search': ArtistSearch,
        'dialog-messages': DialogMessages
	}, 
    computed: {
        artist: {
            get() {
                return this.$store.state.artist.artist;
            },   
            set(artist) {
                this.$store.commit("SET_ARTIST", { artist });
            }     
        }
    },
    methods: {     
        
        async deleteArtistOnClick() { 
            this.messages = [];
            await this.$store.dispatch("artist/deleteArtist").then(
                        (response) => {                             
                            this.$router.push("/artists/artist/add");    
                            this.messages = response.data.messages; 
						},
						(error) => {  
                            this.messages = error.response.data.errors;
						});
        },
        getTitle() {
            return "Artists";
        },
        closeMessagesDialog() { 
            this.messages = [];
            this.$router.push("/artists/artist/add");
        },
        addArtist() {
            this.$store.dispatch("artist/addArtist");   
        }
    }
});

</script>

<style scoped>

.artists-title-bar {   
    float:left;
    width:100%;
}

.page-title {
    width:40%;     
}

.add-artist-button {
    float: right;
    margin-right: 5px;
}

.delete-artist-button {
    float: right;
    margin-right: 5px;
}

.nav-link {
    padding:0em!important;
}

.nav-link button {
    margin-right: 10px;
}

.artist-search {
    float: right;
}

</style>