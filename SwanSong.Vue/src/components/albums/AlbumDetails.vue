<template>
    <el-card class="box-card card-margin-right">
        <template #header>
            <div class="card-header">
                <span>Details</span> 
            </div>
        </template>
        <el-row class="messages">
            <el-col :span="24">                 
                <alerts v-bind:visible="messages.length > 0" v-bind:messages="messages"></alerts>
            </el-col>
        </el-row>   
        <el-form 
            ref="albumDetailsForm" 
            :label-position="labelPosition" 
            :rules="rules" 
            :model="album"
            label-width="105px">               
                <el-form-item label="Name" prop="name">
                    <el-input class="album-name" placeholder="Album Name" maxlength="120" show-word-limit v-model="album.name"></el-input>
                </el-form-item> 
                <el-form-item  label="Artist" prop="artistId">
                    <el-select v-model="album.artistId" placeholder="Select" class="artist-select" v-on:change="loadArtistInTitleBar($event)">
                        <el-option
                            v-for="item in artists"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>    
                <el-form-item label="Release Date" prop="releaseDate"> 
                    <el-date-picker   
                        class="date-picker"
                        v-model="album.releaseDate"
                        type="date"
                        placeholder="Pick a day">
                    </el-date-picker>   
                </el-form-item>          
                <el-form-item label="Recorded Date" prop="recordedDate">
                    <el-date-picker 
                        class="date-picker"
                        v-model="album.recordedDate"
                        type="date"
                        placeholder="Pick a day">
                    </el-date-picker>
                </el-form-item>       
                <el-form-item label="Record Label" prop="recordLabel">
                    <el-select v-model="album.labelId" placeholder="Select" class="record-label-select">
                        <el-option
                            v-for="item in recordLabels"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Recorded At" prop="recordedAt">
                    <el-select v-model="album.studioId" placeholder="Select" class="studio-select">
                        <el-option
                            v-for="studio in studios"
                            :key="studio.id"
                            :label="studio.name"
                            :value="studio.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Length" prop="length">
                    <el-input placeholder="mm:ss" v-model="album.length" maxlength="5" class="album-length-select"></el-input>
                </el-form-item>           
                <el-form-item label="Producers" prop="producers">
                    <el-input placeholder="Producers" maxlength="250" show-word-limit v-model="album.producers"></el-input>
                </el-form-item>          
                <el-form-item label="Arrangers" prop="arrangers">
                    <el-input  placeholder="Arrangers" maxlength="250" show-word-limit v-model="album.arrangers"></el-input>
                </el-form-item>          
                <el-form-item label="Artwork" prop="artwork">
                    <el-input placeholder="Artwork" maxlength="100" show-word-limit v-model="album.artwork"></el-input>
                </el-form-item>           
                <el-form-item class="form-item-button form-item-buttons">                    
                    <el-button type="primary" class="save-album-button" @click="submitForm('albumDetailsForm')">Save</el-button>
                </el-form-item>     
        </el-form>    
    </el-card>
</template>

<script>

import { defineComponent } from 'vue'   
import { validateLength, delayAlertRemove } from '../../helpers/helper' 
import { emitter } from '../../main'  
import Alerts from '../library/Alerts.vue' 

export default defineComponent({   
    el: 'AlbumDetails', 
    components:{  
        'alerts': Alerts,
    }, 
    data() {               
        return {        
            albumId: 0, 
            messages: [],
            labelPosition: 'left',   
            rules: {				
                name: [	{ required: true, message: 'Please input name' },		
                        { min: 5, max: 150, message: 'Length should be 5 to 150' } ],	
                artistId: [ { required: true, message: 'Please select an artist' }, 
                            { validator: this.artistSelected } ],		
                length: [ { required: true, message: 'Please input length' },
                            { min: 5, max: 5, message: 'Length should be 5' },
                            { validator: this.confirmLengthCorrect } ],				       
                producers: [ { min: 1, max: 250, message: 'Length should be 1 to 250', trigger: 'change' } ],
                arrangers: [ { min: 1, max: 250, message: 'Length should be 1 to 250', trigger: 'change' } ],
                artwork: [ { min: 1, max: 100, message: 'Length should be 1 to 100', trigger: 'change' } ],
            }       
        }
    },  
    computed: {
        album: {
            get() {
                return this.$store.state.album.album;
            },   
            set(album) {
                this.$store.commit("SET_DETAILS", {album});
            }     
        },
        recordLabels: {
            get() {
                return this.$store.state.recordLabel.recordLabels;
            },
        },
        artists: {
            get() {
                return this.$store.state.artist.lookups;
            },
        },
        studios: {
            get() {
                return this.$store.state.studio.studios;
            },
        }
    },
    async created() {
        await this.$store.dispatch("album/addAlbum"); 
        await this.$store.dispatch("recordLabel/getAll"); 
        await this.$store.dispatch("artist/getLookups"); 
        await this.$store.dispatch("studio/getAll");            
    },
    mounted() {
        this.$store.dispatch("album/clear"); 
        this.$store.dispatch("albumSong/clear");

        emitter.on("clear-album-messages", messages  => {
            this.messages = messages;
        }); 
    }, 
    methods: {               
        submitForm(formName) {
            this.messages = [];
			this.$refs[formName].validate((valid) => {
				if (valid) {
                        this.$store.dispatch("album/saveAlbum").then(
						(response) => {	 
                            this.messages = response.data.messages;	 
                            delayAlertRemove().then(function() {
                                this.messages = [];
                            }.bind(this));

                            if(this.$router.currentRoute.value.path == "/albums/album/add")
                                    this.$router.push("/albums/album/" + this.album.id);                                     
						},
						(error) => {  
                            this.messages = error.data;
						}).bind(this)        
                }
            })
        },
        loadArtistInTitleBar(key) {    
            this.$store.dispatch("album/updateArtistName", key); 
        },
        confirmLengthCorrect(rule, value, callback) {
            if(!validateLength(value))
                callback(new Error("Please input correct length, 'mm:ss'"));                            
            callback();
        },
        artistSelected(rule, value, callback) {
            if(value != null)
                callback();
            callback(new Error("Please select an artist")); 
        }
    } 
})

</script>

<style scoped>
 
.card-margin-right {
    margin-right: 10px;
}

.studio-select {
    width:100%;
} 

.record-label-select {
    width:100%;
}

.album-length-select {
    width: 40%;
}

.save-album-button {
    float: right!important;
    margin-bottom: 5px;
} 

.alert {
    margin-bottom: 5px;
}

.date-picker {
    width: 150px;
}

</style>