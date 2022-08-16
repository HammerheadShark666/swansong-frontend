/* eslint-disable no-async-promise-executor */
import ajax from '../helpers/http-common' 

const mutation = { 

  CLEAR_PROFILE_PASSWORDS: "CLEAR_PROFILE_PASSWORDS",    
  SET_SAVED_PROFILE_PASSWORD_CHANGE: "SET_SAVED_PROFILE_PASSWORD_CHANGE",    
}

const getProfilePasswordChange = () => {
  return {
      "currentPassword": null, "password": null,  "confirmPassword": null, 
  }     
}

const defaults = {   
  profilePasswordChange: getProfilePasswordChange(),
}

export const profilePasswordChange = {
  namespaced: true,
  state: Object.assign({}, defaults),
  mutations: {
    CLEAR_PROFILE_PASSWORDS (state) {
      state.profilePasswordChange = getProfilePasswordChange(); 
    }, 
    SET_SAVED_PROFILE_PASSWORD_CHANGE (state, profilePasswordChange) {
      state.profilePasswordChange = profilePasswordChange;
    }
  },
  actions: {    
    async savePasswordChange ({ commit, state }) {

      return new Promise(async (resolve, reject) => {
        await ajax.post(`profile/password-change`, state.profilePasswordChange)  
                    .then(response => {
                        commit(mutation.SET_SAVED_PROFILE_PASSWORD_CHANGE, response.data);  
                        resolve(response);
                    }).catch(error => {
                        reject(error.response);
                    })
      });      
    }, 
    clearPasswords({ commit }) {
      commit (mutation.CLEAR_PROFILE_PASSWORDS);
    },
  }
}