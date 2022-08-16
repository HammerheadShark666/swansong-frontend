<template>
    <el-row>
        <el-col :span="24" class="alpha-col">  
            <el-space wrap :size="4" alignment="start">      
                <el-button v-for="item in alphabet" v-bind:key="item" @click="searchByLetterOnClick(item)" type="primary" class="search-button alphabet-button">
                    {{item}}
                </el-button>
            </el-space>
        </el-col>
    </el-row> 
</template>

<script>   

import { getAlphabet } from '../../helpers/helper'

export default {
	name: "SearchByLetterSelector", 
    emits: ['searchByLetter'],
    data() {
        return {         
            alphabet: getAlphabet()
        };
    },    
    methods: {          
        searchByLetterOnClick(letter) {     
            this.$emit('searchByLetter', letter);
        }, 
    }
}

</script>

<style scoped>

.alphabet-button {
    width: 20px;
    height: 22px;
    padding: 0px 2px;
    min-height: 0px!important; 
}

.search-button {
    float: right;
}

</style>