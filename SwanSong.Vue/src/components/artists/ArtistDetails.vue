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
            ref="artistDetailsForm" 
            :label-position="labelPosition" 
            :rules="rules" 
            :model="artist"
            label-width="120px">    
            <el-form-item label="Name" prop="name">
                <el-input placeholder="Artist Name" maxlength="100" show-word-limit v-model="artist.name"></el-input>
            </el-form-item>         
            <el-form-item label="Formation Year" prop="formationYear">
                <el-select v-model="artist.formationYear" placeholder="Select" class="formation-year-select">
                    <el-option
                    v-for="item in years"
                    :key="item"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item> 
            <el-form-item label="Disband Year" prop="disbandYear">
                <el-select v-model="artist.disbandYear" placeholder="Select" class="disband-year-select">
                    <el-option
                    v-for="item in years"
                    :key="item"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>  
            <el-form-item label="Country" prop="country">
                <el-select v-model="artist.countryId" placeholder="Select" class="country-select">
                    <el-option
                    v-for="item in countries"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>  
            <el-form-item class="form-item-button form-item-buttons">                    
                <el-button type="primary" :disabled="disabled" class="save-artist-button" @click="submitForm('artistDetailsForm')">Save</el-button>
            </el-form-item>        
        </el-form>
    </el-card>
</template>

<script>

import { defineComponent } from 'vue'   
import { getListOfNumbers, delayAlertRemove } from '../../helpers/helper' 
import { emitter } from '../../main'
import Alerts from '../library/Alerts.vue'  

export default defineComponent({
   
    el: 'ArtistDetails',       
    components:{  
        'alerts': Alerts
    },
    data() {
        return {        
            artistId: 0,
            messages: [],
            disabled: false,
            labelPosition: 'left',   
            rules: {				
                name: [ { required: true, message: 'Please input name' },		
                        { min: 2, max: 100, message: 'Length should be 2 to 100' }
                ],	
                disbandYear: [ { validator: this.confirmFormationYearBeforeDisbandYear }                    
                ],			
            } 
        }
    },    
    computed: {
        artist: {
            get() {
                return this.$store.state.artist.artist;
            },   
            set(artist) {
                this.$store.commit("SET_ARTIST", { artist });
            }     
        },
        countries: {
            get() {
                return this.$store.state.country.countries;
            },
        },
        members: {
            get() {
                return [];
            },
        },
        years: {
            get() {   
                return getListOfNumbers(1900, 2021);
            }
        }
    },
    async created() {
       
        await this.$store.dispatch("country/getAll");
   
        this.$store.watch(
            (getters) => getters.artist.artist.artist,
            (artist) => {
            
                try {       
                    if(artist.photo == '' || artist.photo == undefined)
                        this.artistImage = "/images/artists/default-band-image.jpg";
                    else 
                        this.artistImage = "/images/artists/${artist.photo}"; 

                } catch (error) {
                    this.artistImage = "/images/artists/default-band-image.jpg";
                }

                this.artistId = artist.id;
            })        
    },
    mounted() {
        this.$store.dispatch("artist/clear"); 
        emitter.on("clear-album-messages", messages  => {
            this.messages = messages;
        });
    }, 
    methods: {     
        
        submitForm(formName) {
            this.messages = [];
			this.$refs[formName].validate((valid) => {
				if (valid) {
                        this.disabled = true;
                        this.$store.dispatch("artist/saveArtist").then(
						(response) => {			
                            this.messages = response.data.messages;	 
                            this.resetForm();
                            if(this.$router.currentRoute.value.path == "/artists/artist/add")
                                this.$router.push("/artists/artist/" + this.artist.id);               
 
                            delayAlertRemove().then(function() {
                                this.messages = [];       
                            }.bind(this));                

						},
						(error) => { 
                            this.messages = error.data;
                            this.disabled = false;
						});
                }
            })
        },
        confirmFormationYearBeforeDisbandYear(rule, value, callback) {

            let form = this.$store.state.artist.artist;

            if (value !== '' && form.formationYear !== '') {
                if (parseInt(value) < parseInt(form.formationYear))  
                    callback(new Error("Disband year cannot be before formation year"));            
            }

            callback();
        },
        resetForm() {   
            this.disabled = false;
        }
    } 
})
</script>

<style scoped>
 
.card-margin-right {
    margin-right: 10px;
}

.country-select {
    width:75%;
}

.save-artist-button {
    float: right;
    margin-bottom: 5px;
}

.alert {
    margin-bottom: 5px;
} 

.formation-year-select {
    width:100px
}

.disband-year-select {
   width:100px 
}

</style>