<template>    
    <div>
        <el-button type="primary" class="add-song-button" @click="addOnClick">
            {{ songState }} Song
        </el-button>
        <el-dialog v-model="showDialog" width="30%" @close="closeOnClick" :close-on-click-modal="false">
            <el-card class="box-card box-card-songs">
                <template #header>
                    <div class="card-header">      
                        <el-row class="title-row">       
                            <el-col :span="24">
                                <span v-if="albumSong.id == 0">Add Song</span>
                                <span v-if="albumSong.id > 0">Edit Song</span>
                            </el-col>                            
                        </el-row>  
                    </div>
                </template> 
                <el-row class="messages">
                    <el-col :span="24">                 
                        <alerts v-bind:visible="messages.length > 0" v-bind:messages="messages"></alerts>
                    </el-col>
                </el-row>   
                <el-form 
                    ref="songForm" 
                    :label-position="labelPosition" 
                    :rules="rules" 
                    :model="albumSong"                    
                    label-width="120px">
                        <el-form-item label="Title" :label-width="formLabelWidth" prop="song.title">
                            <el-input v-model="albumSong.song.title" minlength="1" maxlength="150" show-word-limit class="title"></el-input>
                        </el-form-item>
                        <el-form-item label="Length" :label-width="formLabelWidth" prop="song.lenth">
                            <el-input v-model="albumSong.song.length" maxlength="5" show-word-limit class="length"></el-input>
                        </el-form-item>
                        <el-form-item label="Side" :label-width="formLabelWidth">
                            <el-select v-model="albumSong.side" placeholder="Select">
                                <el-option
                                    v-for="item in sides"
                                    :key="item"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Order" :label-width="formLabelWidth">
                            <el-select v-model="albumSong.order" placeholder="Select">
                                <el-option
                                    v-for="item in orders"
                                    :key="item"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <div class="form-item-button form-item-buttons">  
                            <el-button type="primary" class="cancel-save-button" @click="closeOnClick">Cancel</el-button>     
                            <el-button :disabled="disabled" class="song-save-button" type="primary" @click="submitForm('songForm')">Save</el-button>
                        </div>
                </el-form> 
            </el-card>           
        </el-dialog> 
    </div>
</template>

<script>

import { defineComponent } from '@vue/composition-api'   
import { getListOfNumbers, validateLength, delayAlertRemove } from '../../helpers/helper' 
import { emitter } from '../../main'
import Alerts from '../library/Alerts.vue' 

export default defineComponent({   
    el: 'AlbumSongDialog', 
    data() {      
        return {           
            showDialog: false,
            formLabelWidth: '70px', 
            messages: [], 	
			labelPosition: 'left',
            songState: 'Add',
            disabled: false,  
			rules: {				
                'song.title': [ { required: true, message: 'Please input title', trigger: 'blur' },
                                { max: 150, message: 'Title can be up to 150 characters', trigger: 'blur' } 
                ],
                'song.length': [ { min: 5, max: 5, message: 'Length should be 5', trigger: 'blur' },
                               { validator: this.confirmLengthCorrect, trigger: 'blur' }                    
                ],		
            }   
        };
    },
    components: {          
        'alerts': Alerts
    },
    computed: {
        albumSong: {
            get() {
                return this.$store.state.albumSong.albumSong;
            },   
            set(albumSong) {
                this.$store.commit("SET_ALBUM_SONG_DETAILS", { albumSong });
            }     
        },
        sides: {
            get() {
                return getListOfNumbers(1, 10);
            }
        },
        orders: {
            get() {                
                return getListOfNumbers(1, 10);
            }
        },
        showAddEditDialog: {
            get() {
                return this.$store.state.albumSong.showAddEditDialog;
            }, 
        } 
    },  
    mounted() { 

        emitter.on("clear-album-messages", messages  => {
            this.messages = messages;
        }); 
    }, 
    methods: {   
        addOnClick() {
            this.showDialog = true;
            this.songState = 'Add';
            this.$store.dispatch("albumSong/addAlbumSong", this.$store.state.album.album.id);  
        }, 
        submitForm(formName) {
            this.messages = [];
			this.$refs[formName].validate((valid) => {
				if (valid) { 
                    this.disabled = true;
					this.$store.dispatch("albumSong/saveAlbumSong").then(
						(response) => {
                            this.messages = response.messages;
                            this.resetForm();
                            delayAlertRemove().then(function() {
                                this.messages = [];                                
                            }.bind(this));  
                            this.$store.dispatch("albumSong/addAlbumSong", this.$store.state.album.album.id); 
                            this.songState = 'Add';
						},
						(error) => {
                            this.messages = error.data.messages;
                            this.disabled = false;
						});
				} else { 
					return false
				}
			})
		},    
        closeMessagesDialog() { 
            this.messages = [];
            this.showDialog = false;
        },
        closeOnClick() { 
            this.showDialog = false;
            this.messages = [];
            this.$store.dispatch("albumSong/resetAlbumSong"); 
        },
        openDialog(songState) {
            this.showDialog = true;
            this.songState = songState;
        },
        confirmLengthCorrect(rule, value, callback) {
            if(!validateLength(value))
                callback(new Error("Please input correct length, 'mm:ss'"));                            
            callback();
        },
        resetForm() {   
            this.disabled = false;
        }
     }
});
</script>

<style scoped>

.add-song-button {
    float: right;
    margin-top: 1px!important;
}

.title {
    width: 100%;
}

.length {
    width: 30%;
}

.alert {
    margin-bottom: 5px;
}

.song-save-button {
    float: right;
    margin-bottom: 5px;
}

.cancel-save-button {
    margin-bottom: 5px;
}

.messages {
    margin-bottom: 10px;
}

.card-header {
    padding: .17rem .63rem .37rem .63rem!important;
}
  
.title-row {
    padding-top: 5px;
}

</style>