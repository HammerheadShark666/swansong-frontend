/* eslint-disable no-async-promise-executor */
import ajax from '../helpers/http-common'
import _ from "lodash";

const mutation = {       
   
  SET_ARTIST_MEMBERS_RESULTS: "SET_ARTIST_MEMBERS_RESULTS", 
  SET_ARTIST_ID: "SET_ARTIST_ID", 
  SET_SAVED_ARTIST_MEMBER: "SET_SAVED_ARTIST_MEMBER",
  SET_SAVED_EDITED_ARTIST_MEMBER: "SET_SAVED_EDITED_ARTIST_MEMBER",
  SET_ARTIST_MEMBER: "SET_ARTIST_MEMBER",
  RESET_ARTIST_MEMBER: "RESET_ARTIST_MEMBER",
  SET_DELETED_ARTIST_MEMBER: "SET_DELETED_ARTIST_MEMBER",
  SET_SAVED_EDITED_MEMBER: "SET_SAVED_EDITED_MEMBER"
}

const getArtistMemberDetails = (artistId) => { 
  return { id: 0, artistId: artistId, memberId: 0, member: { id: 0, stageName: "", firstName: "",
    middleName: "", surname: "", birthPlaceId: 0, dateOfBirth: null, dateOfDeath: null, photo: null},
  } 
}

const defaults = {
    members: [], 
    artistMember: getArtistMemberDetails(0), 
    artistId: 0
}
 
export const artistMember = {
  namespaced: true,
  state: Object.assign({}, defaults),
  mutations: {         
      SET_ARTIST_MEMBERS_RESULTS (state, results) {
          state.members = results; 
      },        
      SET_SAVED_ARTIST_MEMBER (state, response) {

          let artistMember = state.artistMember;
          artistMember.member.id = response.memberId;
          artistMember.memberId = response.memberId;
          artistMember.id = response.artistMemberId;

          state.members.push(artistMember);
          state.artistMember = artistMember; 
      }, 
      SET_SAVED_EDITED_ARTIST_MEMBER (state) {

          let artistMember = state.artistMember;

          var members = state.members;
          members = members.map((mber) => {
              if (mber.id === artistMember.id) {
                  mber = artistMember;
              }            
              return mber;
          });

          state.members = members; 
      },       
      SET_ARTIST_ID(state, artistId) {
          state.artistId = artistId;
          state.artistMember.artistId = artistId;
      },
      SET_ARTIST_MEMBER (state, artistMember) {
        state.artistMember = _.cloneDeep(artistMember);
      },
      RESET_ARTIST_MEMBER(state) {
        state.artistMember = getArtistMemberDetails(0);
      },
      SET_DELETED_ARTIST_MEMBER (state, id) {
          state.members = state.members.filter(member => member.id != id);
          state.artistMember = getArtistMemberDetails(this.artistId);
      }
},
  actions: { 
    async getMembersForArtist ({ commit }, artistId) {
      return new Promise(async (resolve, reject) => {
          await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/artist/members/` + artistId)
                 .then(response => {
                     commit(mutation.SET_ARTIST_MEMBERS_RESULTS, response.data); 
                     commit(mutation.SET_ARTIST_ID, artistId); 
                     resolve();
                 })
                 .catch(error => { 
                     reject(error.response);
                 })
      })
    },   
    async saveNewArtistMember ({  commit, state }) {  
    
      commit("SET_ARTIST_ID", state.artistId);

      let url = `/${process.env.VUE_APP_DEFAULT_VERSION}/artist/members/add`;


      return new Promise(async (resolve, reject) => {
          await ajax.post(url, state.artistMember)
                      .then(response => {
                          commit(mutation.SET_SAVED_ARTIST_MEMBER, response.data)   
                          resolve(response); 
                      }).catch(error => {
                          reject(error.response);
                      })
      });
    },     
    saveUpdatedArtistMember ({  commit, state }) {   
    
      let url = `/${process.env.VUE_APP_DEFAULT_VERSION}/artist/members/member/update`;

      return new Promise(async (resolve, reject) => {
        await ajax.put(url, state.artistMember)  
                    .then(response => { 
                        commit(mutation.SET_SAVED_EDITED_ARTIST_MEMBER)
                        resolve(response.data);  
                    })
                    .catch(error => {
                        reject(error.response);
                    })
      });
    },    
    async deleteArtistMember ({ commit }, id) {
 
      return new Promise(async (resolve, reject) => {
          await ajax.delete(`/${process.env.VUE_APP_DEFAULT_VERSION}/artist/members/member/` + id)  
                      .then(response => {                                                          
                          commit(mutation.SET_DELETED_ARTIST_MEMBER, id); 
                          resolve(response.data);
                      })
                      .catch(error => {                          
                          reject(error.response);
                      })
      });
    }, 
    addArtistMember({commit}) {
      commit(mutation.SET_ARTIST_MEMBER, getArtistMemberDetails(this.artistId));
    },  
    resetArtistMember({ commit }) {
      commit (mutation.RESET_ARTIST_MEMBER);
    },  
    editMember({ commit }, member) {
        commit(mutation.SET_ARTIST_MEMBER, member);
    }, 
  }
}