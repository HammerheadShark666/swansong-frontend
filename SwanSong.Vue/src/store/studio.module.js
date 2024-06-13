/* eslint-disable no-async-promise-executor */
import ajax from '../helpers/http-common'

const mutation = {  
    SET_STUDIOS: "SET_STUDIOS",
    SET_STUDIO: "SET_STUDIO",
    SET_UPDATED_STUDIO: "SET_UPDATED_STUDIO",
    SET_SAVED_STUDIO: "SET_SAVED_STUDIO",
    SET_DELETED_STUDIO: "SET_DELETED_STUDIO",
    REMOVE_STUDIO_FROM_RESULTS: "REMOVE_STUDIO_FROM_RESULTS"
}

const getStudioDetails = () => {
    return {
        "id": 0, "name": ""
    }     
}

const defaults = {
    studios: [],
    studio: getStudioDetails()
}

export const studio = {
    namespaced: true,
    state: Object.assign({}, defaults),
    mutations: {
        SET_STUDIOS (state, studios) {
            state.studios = studios; 
        },
        SET_STUDIO(state, studio) {
            state.studio = studio;
        },       
        SET_SAVED_STUDIO(state, studio) {            
            state.studios.push({id: studio.id, name: studio.name});
            state.studio = getStudioDetails();
        },
        SET_UPDATED_STUDIO(state, studio) {
            let objIndex = state.studios.findIndex((obj => obj.id == studio.id));
            state.studios[objIndex].name = studio.name;
            state.studio = getStudioDetails();
        },
        SET_DELETED_STUDIO ( state ) {
            state.studio = getStudioDetails();
        }, 
        REMOVE_STUDIO_FROM_RESULTS(state, id) {
            let studios = state.studios;
            var newList = studios.filter(x => {
                return x.id != id;
            })
            state.studios = newList;
        }
    },
    actions: {
        async getAll ({ commit }) {

            return new Promise(async (resolve, reject) => {
                await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/studios`)
                       .then(response => {
                           commit(mutation.SET_STUDIOS, response.data); 
                           resolve();
                       })
                       .catch(error => {
                           reject(error.response);
                       })
            })
        },        
        setStudio({ commit }, studio) {
            commit(mutation.SET_STUDIO, studio); 
        },     
        async addStudio ({ commit, state }) {  

            let url = `/${process.env.VUE_APP_DEFAULT_VERSION}/studios/studio/add`;

            return new Promise(async (resolve, reject) => {
                await ajax.post(url, state.studio )  
                            .then(response => {
                                commit(mutation.SET_SAVED_STUDIO, response.data);   
                                resolve(response);
                            }).catch(error => {
                                reject(error.response);
                            })
            });
        },
        async updateStudio ({ commit, state }) {  

            let url = `/${process.env.VUE_APP_DEFAULT_VERSION}/studios/studio/update`;

            return new Promise(async (resolve, reject) => {
                await ajax.put(url, state.studio )  
                            .then(response => {
                                commit(mutation.SET_UPDATED_STUDIO, state.studio);   
                                resolve(response);
                            }).catch(error => {
                                reject(error.response);
                            })
            });
        },
        async deleteStudio ({ commit, state }) { 

            let studioId = state.studio.id; 

            return new Promise(async (resolve, reject) => {
                await ajax.delete(`/${process.env.VUE_APP_DEFAULT_VERSION}/studios/studio/` + studioId)  
                            .then(response => {
                                commit(mutation.SET_DELETED_STUDIO, response.data);  
                                commit(mutation.REMOVE_STUDIO_FROM_RESULTS, studioId); 
                                resolve(response);
                            }).catch(error => {
                                reject(error.response);
                            })

                });
        },
        add({ commit }) {
            commit(mutation.SET_STUDIO, getStudioDetails()); 
        },
    },
    getters: {
        studios: state => `${state.studios}`
    }
}