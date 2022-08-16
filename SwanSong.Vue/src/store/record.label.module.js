/* eslint-disable no-async-promise-executor */
import ajax from '../helpers/http-common'

const mutation = {  
    SET_RECORD_LABELS: "SET_RECORD_LABELS",
    SET_RECORD_LABEL: "SET_RECORD_LABEL",
    SET_SAVED_RECORD_LABEL: "SET_SAVED_RECORD_LABEL",
    SET_DELETED_RECORD_LABEL: "SET_DELETED_RECORD_LABEL",
    REMOVE_RECORD_LABEL_FROM_RESULTS: "REMOVE_RECORD_LABEL_FROM_RESULTS"
}

const getRecordLabelDetails = () => {
    return {
        "id": 0, "name": ""
    }     
}

const defaults = {
    recordLabels: [],
    recordLabel: getRecordLabelDetails()
}

export const recordLabel = {
    namespaced: true,
    state: Object.assign({}, defaults),
    mutations: {
        SET_RECORD_LABELS (state, recordLabels) {
            state.recordLabels = recordLabels; 
        },
        SET_RECORD_LABEL(state, recordLabel) {
            state.recordLabel = recordLabel;
        },
        SET_SAVED_RECORD_LABEL(state, recordLabel) {
            state.recordLabel = recordLabel;
            let objIndex = state.recordLabels.findIndex((obj => obj.id == recordLabel.id));  

            if(objIndex > -1)
                state.recordLabels[objIndex].name = recordLabel.name;
            else 
                state.recordLabels.push({id: recordLabel.id, name: recordLabel.name});

            state.recordLabel = getRecordLabelDetails();
        },
        SET_DELETED_RECORD_LABEL ( state ) {
            state.recordLabel = getRecordLabelDetails();
        }, 
        REMOVE_RECORD_LABEL_FROM_RESULTS(state, id) {
            let recordLabels = state.recordLabels;
            var newList = recordLabels.filter(x => {
                return x.id != id;
            })
            state.recordLabels = newList;
        }
    },
    actions: {
        async getAll ({ commit }) {

            return new Promise(async (resolve, reject) => {
                await ajax.get(`record-labels`)
                       .then(response => {
                           commit(mutation.SET_RECORD_LABELS, response.data); 
                           resolve();
                       })
                       .catch(error => {
                           reject(error.response);
                       })
            })
        },        
        setRecordLabel({ commit }, recordLabel) {
            commit(mutation.SET_RECORD_LABEL, recordLabel); 
        },
        async saveRecordLabel ({ commit, state }) {  

            return new Promise(async (resolve, reject) => {
                await ajax.post(`record-labels/record-label/save/`, state.recordLabel)  
                            .then(response => {
                                commit(mutation.SET_SAVED_RECORD_LABEL, response.data);   
                                resolve(response);
                            }).catch(error => {
                                reject(error.response);
                            })
            });
        },
        async deleteRecordLabel ({ commit, state }) { 

            let recordLabelId = state.recordLabel.id; 

            return new Promise(async (resolve, reject) => {
                await ajax.delete(`record-labels/record-label/` + recordLabelId)  
                            .then(response => {
                                commit(mutation.SET_DELETED_RECORD_LABEL, response.data);  
                                commit(mutation.REMOVE_RECORD_LABEL_FROM_RESULTS, recordLabelId); 
                                resolve(response);
                            }).catch(error => {
                                reject(error.response);
                            })

                });
        },
        add({ commit }) {
            commit(mutation.SET_RECORD_LABEL, getRecordLabelDetails()); 
        },
    },
    getters: {
        recordLabels: state => `${state.recordLabels}`
    }
} 

