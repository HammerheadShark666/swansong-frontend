/* eslint-disable no-async-promise-executor */
import ajax from '../helpers/http-common' 

const mutation = { 

  SET_PROFILE: "SET_PROFILE",    
  CLEAR_MESSAGES: "CLEAR_MESSAGES"   
}

const getProfile = () => {
  return {
    "firstName": "", "lastName": null, "email": null, "messages": []
  }     
}

const defaults = {   
  profile: getProfile(),
}

export const profile = {
  namespaced: true,
  state: Object.assign({}, defaults),
  mutations: {   
    SET_PROFILE (state, profile) {
      state.profile.lastName = profile.lastName;
      state.profile.firstName = profile.firstName;
      state.profile.email = profile.email;
    },    
    CLEAR_MESSAGES (state) {
      state.profile.messages = [];
    }
  },
  actions: {     
    async getProfile ({ commit, state }) {
      return new Promise(async (resolve, reject) => {
        await ajax.get(`profile`, state.profile)  
                    .then(response => {
                        commit(mutation.SET_PROFILE, response.data);  
                        resolve(response);
                    }).catch(error => {
                        reject(error.response);
                    })
      });    
    },
    async saveProfile ({ commit, state }) {

      return new Promise(async (resolve, reject) => {
          await ajax.post(`profile/update`, state.profile)  
                      .then(response => {
                          commit(mutation.SET_PROFILE, response.data);  
                          resolve(response);
                      }).catch(error => {
                          reject(error.response);
                      })
      });      
    }, 
    clearMessages ({ commit }) {
      commit(mutation.CLEAR_MESSAGES);  
    }
  }
}