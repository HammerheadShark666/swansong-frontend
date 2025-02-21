
import ajax from '../helpers/http-common' 
 
export const profilePasswordChange = {
  namespaced: true,
  actions: {    
    async savePasswordChange (context, passwordChange) {

      try 
      {
        const response = await ajax.put(`/${process.env.VUE_APP_DEFAULT_VERSION}/profile/password-change`, passwordChange);
        return response;
      }
      catch(error)
      {
        console.log(error);
        throw error;
      }
    }, 
  }
}