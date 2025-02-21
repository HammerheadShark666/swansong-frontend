
import ajax from '../helpers/http-common'
import _ from "lodash";

const mutation = { 
       
    SET_SEARCH_MEMBERS: "SET_SEARCH_MEMBERS", 
    SET_MEMBER: "SET_MEMBER",
    SET_MEMBERS_RESULTS: "SET_MEMBERS_RESULTS",
    SET_MEMBERS_BY_PAGING: "SET_MEMBERS_BY_PAGING", 
    SET_SAVED_MEMBER: "SET_SAVED_MEMBER",
    SET_SAVED_EDITED_MEMBER: "SET_SAVED_EDITED_MEMBER",
    SET_DELETED_MEMBER: "SET_DELETED_MEMBER", 
    SET_MEMBER_PHOTO: "SET_MEMBER_PHOTO",
    CLEAR_MEMBERS: "CLEAR_MEMBERS",
    CLEAR_MEMBER: "CLEAR_MEMBER",
    SET_ARTIST_ID: "SET_ARTIST_ID",
    RESET_MEMBER: "RESET_MEMBER"
}

const getMemberDetails = (artistId) => { 
    return { id: 0, artistId: artistId, stageName: "", firstName: "",
        middleName: "", surname: "", birthPlaceId: 0, dateOfBirth: null, dateOfDeath: null, photo: null,
    }
}

const getMembersByPaging = () => {
    return {
        "data": [],
        "errors": null,
        "message": null,
        "pageNumber": 1,
        "pageSize": 5,
        "succeeded":false,
        "totalPages":0,
        "totalRecords":0
    }
}

const defaults = {
    members: [], 
    member: getMemberDetails(0),
    membersByPaging: getMembersByPaging(),
    artistId: 0
}

export const member = {
    namespaced: true,
    state: Object.assign({}, defaults),
    mutations: {
        SET_SEARCH_MEMBERS (state, members) {
            state.members = members;
        }, 
        SET_MEMBER (state, member) {
            state.member = _.cloneDeep(member) 
        },
        SET_MEMBERS_RESULTS (state, results) {
            state.members = results; 
        },  
        SET_MEMBERS_BY_PAGING (state, members) {
            state.membersByPaging = members
        }, 
        SET_SAVED_MEMBER (state, response) {

            let member = state.member;
            member.id = response.id;

            state.members.push(member);
            state.member = member; 
        }, 
        SET_SAVED_EDITED_MEMBER (state) {

            let member = state.member;

            var members = state.members;
            members = members.map((mber) => {
                if (mber.id === member.id) {
                    mber = member;
                }            
                return mber;
            });

            state.members = members; 
        },  
        SET_DELETED_MEMBER (state, id) {
            state.members = state.members.filter(member => member.id != id);
            state.member = getMemberDetails(this.artistId);
        },  
        SET_MEMBER_PHOTO (state, { id, photoName}) {    

            state.member.photo = photoName

            var members = state.members;
            members = members.map((mber) => {
                if (mber.id === id) { 
                    mber.photo = photoName
                }            
                return mber;
            });

            state.members = members;
        }, 
        CLEAR_MEMBERS(state) {
            state.members = []
        },
        CLEAR_MEMBER(state) {
            state.member = getMemberDetails();
            state.artistId = 0;
        },
        SET_ARTIST_ID(state, artistId) {
            state.artistId = artistId
        },
        SET_MEMBER_ARTIST_ID(state, artistId) {
            state.member.artistId = artistId
        },
        RESET_MEMBER(state) {
            state.member = getMemberDetails(0)
        }
    },
    actions: {     
        async all ({ commit }, { pageNumber, pageSize }) { 

            const response = await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/members?pageNumber=` + pageNumber + '&pageSize=' + pageSize);
            commit(mutation.SET_MEMBERS_BY_PAGING, response.data);
            return;
        },     
        async random ({ commit }) { 

            const response = await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/members/random`);
            commit(mutation.SET_SEARCH_MEMBERS, response.data); 
            return;
        },     
        async search ({ commit }, criteria) {
            
            const response = await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/members/search/` + criteria);
            commit(mutation.SET_SEARCH_MEMBERS, response.data); 
            return;
        },  
        async searchByLetter ({ commit }, letter) {

            const response = await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/members/search-by-letter/` + letter);
            commit(mutation.SET_SEARCH_MEMBERS, response.data); 
            return;
        },   
        async getMember ({ commit }, id) { 
            
            const response = await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/members/member/` + id);
            commit(mutation.SET_MEMBER, response.data); 
            return;
        }, 
        addMember({commit}) {
            commit(mutation.SET_MEMBER, getMemberDetails(this.artistId));
        },
        async addNewMember ({  commit, state }) {  

            let url = `/${process.env.VUE_APP_DEFAULT_VERSION}/members/member/add`; 

            commit("SET_MEMBER_ARTIST_ID", state.artistId);           
            const response = await ajax.post(url, state.member);
            commit("SET_SAVED_MEMBER", response.data);
            return response;
        },     
        async updateMember ({  commit, state }) {   

            let url = `/${process.env.VUE_APP_DEFAULT_VERSION}/members/member/update`;

            const response = await ajax.put(url, state.member);
            commit("SET_SAVED_EDITED_MEMBER")
            return response.data;
        },
        async deleteMember ({ commit }, id) {

            const response = await ajax.delete(`/${process.env.VUE_APP_DEFAULT_VERSION}/members/member/` + id);
            commit(mutation.SET_DELETED_MEMBER, id);
            return response.data;
        },   
        async savePhoto ({ commit }, { id, formData }) {

            if(id != undefined) 
            {
                const response = await ajax.post(`/${process.env.VUE_APP_DEFAULT_VERSION}/members/member/upload-photo/` + id, formData,  {
                                    headers: {
                                        'Content-Type': 'multipart/form-data'
                                    }});
                var photoName = response.data.filename;
                commit(mutation.SET_MEMBER_PHOTO, { id, photoName});  
                return;
            } else
                throw new Error("No member id for photo.");
        },         
        editMember({ commit }, member) {
            commit(mutation.SET_MEMBER, member);
        }, 
        clearMembers ({ commit }) {
            commit(mutation.CLEAR_MEMBERS);
        },      
        clear ({ commit }) {
            commit(mutation.CLEAR_MEMBER);
            commit(mutation.CLEAR_MEMBERS);
        },
        setArtistId({ commit }, artistId) {
            commit (mutation.SET_ARTIST_ID, artistId);
        },
        resetMember({ commit }) {
            commit (mutation.RESET_MEMBER);
        }
    },
    getters: {
        members: state => `${state.members}`, 
        member: state => `${state.member}` 
    }
}