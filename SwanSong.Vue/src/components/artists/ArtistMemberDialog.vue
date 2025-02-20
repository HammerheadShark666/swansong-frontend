<template>    
    <div>
        <el-button type="primary" class="add-member-button" @click="addArtistMemberOnClick">
            {{ memberState }} Member
        </el-button>
        <el-dialog v-model="showDialog" width="40%" @close="closeDialog" :close-on-click-modal="false">
             
            <el-card class="box-card box-card-songs">
                <template #header>
                    <div class="card-header">      
                        <el-row class="title-row">       
                            <el-col :span="24">
                                <span v-if="artistMember.id == 0">Add Member</span>
                                <span v-if="artistMember.id > 0">Edit Member</span>
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
                    ref="memberForm" 
                    :label-position="labelPosition" 
                    :rules="rules" 
                    :model="artistMember"                    
                    label-width="120px">

                    <el-form-item label="Stage Name" :label-width="formLabelWidth" prop="member.stageName">
                        <el-input v-model="artistMember.member.stageName" maxlength="150" show-word-limit class="stage-name"></el-input>
                    </el-form-item>
                    <el-form-item label="First Name" :label-width="formLabelWidth" prop="member.firstName">
                        <el-input v-model="artistMember.member.firstName" maxlength="50" show-word-limit class="first-name"></el-input>
                    </el-form-item>
                    <el-form-item label="Middle Name" :label-width="formLabelWidth" prop="member.middleName">
                        <el-input v-model="artistMember.member.middleName" maxlength="50" show-word-limit class="middle-name"></el-input>
                    </el-form-item>
                    <el-form-item label="Surname" :label-width="formLabelWidth" prop="member.surname">
                        <el-input v-model="artistMember.member.surname" maxlength="50" show-word-limit class="surname"></el-input>
                    </el-form-item>
                    <el-form-item label="Date of Birth" :label-width="formLabelWidth" prop="member.dateOfBirth">   
                        <el-date-picker
                            v-model="artistMember.member.dateOfBirth"
                            type="date"
                            placeholder="Pick a day">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="Date of Death" :label-width="formLabelWidth" prop="member.dateOfDeath">   
                        <el-date-picker
                            v-model="artistMember.member.dateOfDeath"
                            type="date"
                            placeholder="Pick a day">
                        </el-date-picker>
                    </el-form-item> 
                    <div class="form-item-button form-item-buttons">  
                        <el-button type="primary" class="cancel-member-button" @click="closeDialog">Cancel</el-button>     
                        <el-button class="member-save-button" :disabled="disabled" type="primary" @click="submitForm()">Save</el-button>
                    </div>
                </el-form>
            </el-card>
            <artist-member-photo v-if="artistMember.member.id > 0"></artist-member-photo>           
        </el-dialog> 
    </div>
</template>

<script>

import { defineComponent } from 'vue'  
import { delayAlertRemove } from '../../helpers/helper' 
import { emitter } from '../../main'
import Alerts from '../library/Alerts.vue' 
import ArtistMemberPhoto from '../artists/ArtistMemberPhoto.vue'
import { MESSAGE_INFO } from '../../helpers/helper'

export default defineComponent({   
    el: 'MemberDialog', 
    data() {
        return {                      
            showDialog: false,
            formLabelWidth: '100px', 
            fileList: [],
            messages: [], 	
            disabled: false,
			labelPosition: 'left',	 
            memberState: 'Add',          
			rules: {
                stageName: [ { required: true, message: 'Please input Stage Name', trigger: 'blur' },
                    {min: 1, max: 150, message: 'Length should be 1 to 150', trigger: 'blur' } 
                ],				
                firstName: [ { required: true, message: 'Please input First Name', trigger: 'blur' },
                    { min: 1, max: 50, message: 'Length should be 1 to 50', trigger: 'blur' } 
                ],
                middleName: [ { min: 1, max: 50, message: 'Length should be 1 to 50', trigger: 'blur' } 
                ],
                surname: [ { required: true, message: 'Please input Surname', trigger: 'blur' },
                    { min: 1, max: 50, message: 'Length should be 1 to 50', trigger: 'blur' } 
                ],
            }  
        };
    },
    components:{   
        'artist-member-photo': ArtistMemberPhoto,
        'alerts': Alerts
    },
    computed: {
        artistMember: {
            get() {
                return this.$store.state.artistMember.artistMember;
            },  
        }
    },     
    mounted() {  
        emitter.on("clear-members-messages", messages  => {
            this.messages = messages;
        }); 
    }, 
    methods: {   
        submitForm() {
            this.messages = [];
			this.$refs['memberForm'].validate((valid) => {
				if (valid) { 
                    this.disabled = true; 
                    let dispatchUrl = this.artistMember.member.id > 0 ?  "artistMember/saveUpdatedArtistMember":  "artistMember/saveNewArtistMember";
                   
					this.$store.dispatch(dispatchUrl).then(
						() => {
                            this.messages = [ {"text" : "Member Saved.", "severity": MESSAGE_INFO}];
                            this.disabled = false;
                            delayAlertRemove().then(function() {
                                this.messages = [];                                
                            }.bind(this));  
                            this.memberState = 'Add';                            
						},
						(error) => {
                            this.disabled = false;
                            this.messages = error.data.messages;
						});
				} else { 
					return false
				}
			})
		},        
        addArtistMemberOnClick() {
            this.$store.dispatch("artistMember/addArtistMember"); 
            this.memberState = 'Add';
            this.showDialog = true;
        },        
        closeMessagesDialog() { 
            this.messages = [];
            this.showDialog = false;
        },
        closeDialog() { 
            this.showDialog = false;
            this.messages = [];
            this.$store.dispatch("member/resetMember"); 
        },
        openDialog() {
            this.showDialog = true;
        }
     }
});

</script>

<style scoped>
 
.member-save-button {
    float: right;
}
.stage-name{
    width: 80%;
} 

.member-photo {
	width:100%; 
	border: solid black 1px;
	margin-right:15px;
}

.member-photo img {
	object-fit: cover;
} 
 
.alert {
    margin-bottom: 5px;
}

.messages {
    margin-bottom: 10px;
}

.card-header {
    padding: .17rem .63rem .37rem .63rem!important;
}

.add-member-button {
    float:right;
    margin-top: 1px!important; 
}

.cancel-member-button {
    margin-bottom: 5px;
}

.title-row {
    padding-top: 5px;
}
 
</style>