<template>
    <div>
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
                ref="memberDetailsForm" 
                :label-position="labelPosition" 
                :rules="rules" 
                :model="member"
                label-width="105px">               
                    <el-form-item label="Stage Name" prop="stageName">
                        <el-input class="member-name" placeholder="Stage Name" maxlength="150" show-word-limit v-model="member.stageName"></el-input>
                    </el-form-item> 
                    <el-form-item label="First Name" prop="firstName">
                        <el-input class="member-name" placeholder="First Name" maxlength="50" show-word-limit v-model="member.firstName"></el-input>
                    </el-form-item> 
                    <el-form-item label="Middle Name" prop="middleName">
                        <el-input class="member-name" placeholder="Middle Name" maxlength="50" show-word-limit v-model="member.middleName"></el-input>
                    </el-form-item> 
                    <el-form-item label="Surname" prop="surname">
                        <el-input class="member-name" placeholder="Surname" maxlength="50" show-word-limit v-model="member.surname"></el-input>
                    </el-form-item>  
                    <el-form-item label="Date of Birth" prop="dateOfBirth"> 
                        <el-date-picker   
                            class="date-picker"
                            v-model="member.dateOfBirth"
                            type="date"
                            placeholder="Pick a day">
                        </el-date-picker>   
                    </el-form-item>          
                    <el-form-item label="Date of Death" prop="dateOfDeath">
                        <el-date-picker 
                            class="date-picker"
                            v-model="member.dateOfDeath"
                            type="date"
                            placeholder="Pick a day">
                        </el-date-picker>
                    </el-form-item>       
                    <el-form-item label="Artist" prop="artistId">
                        <el-select v-model="member.artistId" placeholder="Select" class="artist-select">
                            <el-option
                                v-for="item in artists"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>     
                    <el-form-item class="form-item-button form-item-buttons">                    
                        <el-button type="primary" class="save-member-button" @click="submitForm()">Save</el-button>
                    </el-form-item>     
            </el-form>    
        </el-card>
    </div>
</template>

<script>

import { defineComponent } from 'vue'   
import { delayAlertRemove } from '../../helpers/helper' 
import { emitter } from '../../main'  
import Alerts from '../library/Alerts.vue' 
import { MESSAGE_INFO } from '../../helpers/helper'

export default defineComponent({  
    el: 'MemberDetails', 
    components:{  
        'alerts': Alerts
    }, 
    data() {               
        return {        
            memberId: 0,  
            messages: [],
            disabled: false,
            labelPosition: 'left',   
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
                artistId: [ { required: true, message: 'Please select an artist' }, 
                            { validator: this.artistSelected } ],
            }       
        }
    },  
    computed: {
        member: {
            get() {
                return this.$store.state.member.member;
            },   
            set(member) {
                this.$store.commit("SET_DETAILS", {member});
            }     
        },        
        artists: {
            get() {
                return this.$store.state.artist.lookups;
            },
        }
    },
    async created() {
        await this.$store.dispatch("member/addMember");  
        await this.$store.dispatch("artist/getLookups");        
    },
    mounted() {
        this.$store.dispatch("member/clear");  
        emitter.on("clear-member-messages", messages  => {
            this.messages = messages;
        }); 
    }, 
    methods: {            
        
        submitForm() {

            this.messages = [];
			this.$refs['memberDetailsForm'].validate((valid) => {
				if (valid) {
                        this.disabled = true;

                        let action = this.member.id > 0 ? "update": "addNew";

                        this.$store.dispatch("member/" + action + "Member").then(
                            (response) => {			

                                this.disabled = false;

                                if(action == "addNew")
                                    this.$router.push("/members/member/" + response.data.id);      
                                else     
                                    this.messages = [ {"text" : "Member Saved.", "severity": MESSAGE_INFO}]; // response.data.messages;
                                    
                                delayAlertRemove().then(function() {
                                    this.messages = [];
                                }.bind(this));
						},
						(error) => { 
                            this.messages = error.data.messages;
                            this.disabled = false;
						});
                }
            })
        },
        artistSelected(rule, value, callback) {
            if(value != null) {
                this.$store.dispatch("member/setArtistId", value)
                callback();
            } 
            callback(new Error("Please select an artist"));
        } 
    } 
})

</script>

<style scoped>
 
.card-margin-right {
    margin-right: 10px;
}
 
.save-member-button {
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