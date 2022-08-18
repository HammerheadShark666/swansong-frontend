/* eslint-disable no-async-promise-executor */
import ajax from '../helpers/http-common' 
 
export const profilePasswordChange = {
  namespaced: true,
  actions: {    
    async savePasswordChange (context, passwordChange) {

      return new Promise(async (resolve, reject) => {
        await ajax.post(`profile/password-change`, passwordChange)  
                    .then(response => {
                        resolve(response);
                    }).catch(error => {
                        reject(error.response);
                    })
      });      
    }, 
  }
}