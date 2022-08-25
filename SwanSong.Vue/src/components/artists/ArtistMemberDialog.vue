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
                                <span v-if="member.id == 0">Add Member</span>
                                <span v-if="member.id > 0">Edit Member</span>
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
                    :model="member"                    
                    label-width="120px">

                    <el-form-item label="Stage Name" :label-width="formLabelWidth" prop="stageName">
                        <el-input v-model="member.stageName" maxlength="150" show-word-limit class="stage-name"></el-input>
                    </el-form-item>
                    <el-form-item label="First Name" :label-width="formLabelWidth" prop="firstName">
                        <el-input v-model="member.firstName" maxlength="50" show-word-limit class="first-name"></el-input>
                    </el-form-item>
                    <el-form-item label="Middle Name" :label-width="formLabelWidth" prop="middleName">
                        <el-input v-model="member.middleName" maxlength="50" show-word-limit class="middle-name"></el-input>
                    </el-form-item>
                    <el-form-item label="Surname" :label-width="formLabelWidth" prop="surname">
                        <el-input v-model="member.surname" maxlength="50" show-word-limit class="surname"></el-input>
                    </el-form-item>
                    <el-form-item label="Date of Birth" :label-width="formLabelWidth" prop="dateOfBirth">   
                        <el-date-picker
                            v-model="member.dateOfBirth"
                            type="date"
                            placeholder="Pick a day">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="Date of Death" :label-width="formLabelWidth" prop="dateOfDeath">   
                        <el-date-picker
                            v-model="member.dateOfDeath"
                            type="date"
                            placeholder="Pick a day">
                        </el-date-picker>
                    </el-form-item> 
                    <div class="form-item-button form-item-buttons">  
                        <el-button type="primary" class="cancel-member-button" @click="closeDialog">Cancel</el-button>     
                        <el-button class="member-save-button" :disabled="disabled" type="primary" @click="submitForm('memberForm')">Save</el-button>
                    </div>
                </el-form>
            </el-card>
            <artist-member-photo v-if="member.id > 0"></artist-member-photo>           
        </el-dialog> 
    </div>
</template>

<script>

import { defineComponent } from '@vue/composition-api'   
import { delayAlertRemove } from '../../helpers/helper' 
import { emitter } from '../../main'
import Alerts from '../library/Alerts.vue' 
import ArtistMemberPhoto from '../artists/ArtistMemberPhoto.vue'

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
        member: {
            get() {
                return this.$store.state.member.member;
            },  
        }
    },     
    mounted() {  
        emitter.on("clear-members-messages", messages  => {
            this.messages = messages;
        }); 
    }, 
    methods: {   
        submitForm(formName) {
            this.messages = [];
			this.$refs[formName].validate((valid) => {
				if (valid) { 
                    this.disabled = true;
					this.$store.dispatch("member/saveMember").then(
						(response) => {
                            this.messages = response.messages;
                            this.resetForm();
                            delayAlertRemove().then(function() {
                                this.messages = [];                                
                            }.bind(this));  
                            this.memberState = 'Add';
                            this.$store.dispatch("artistMember/addArtistMember", this.$store.state.artist.artist.id);                                
						},
						(error) => {
                            this.messages = error.data;
                            this.disabled = false;
						});
				} else { 
					return false
				}
			})
		},        
        addArtistMemberOnClick() {
            this.$store.dispatch("member/addMember"); 
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
        },
        resetForm() {   
            this.disabled = false;
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