import ajax from '../helpers/http-common'

const mutation = {  
    SET_RECORD_LABELS: "SET_RECORD_LABELS",
    SET_RECORD_LABEL: "SET_RECORD_LABEL",
    SET_SAVED_RECORD_LABEL: "SET_SAVED_RECORD_LABEL",
    SET_UPDATED_RECORD_LABEL: "SET_UPDATED_RECORD_LABEL",
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
            state.recordLabels.push({id: recordLabel.id, name: recordLabel.name});
            state.recordLabel = getRecordLabelDetails();
        },
        SET_UPDATED_RECORD_LABEL(state, recordLabel) {
            let objIndex = state.recordLabels.findIndex((obj => obj.id == recordLabel.id)); 
            state.recordLabels[objIndex].name = recordLabel.name;
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

            const response = await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/record-labels`);
            commit(mutation.SET_RECORD_LABELS, response.data); 
            return;
        },        
        setRecordLabel({ commit }, recordLabel) {
            commit(mutation.SET_RECORD_LABEL, recordLabel); 
        },       
        async addRecordLabel ({ commit, state }) {  

            let url = `/${process.env.VUE_APP_DEFAULT_VERSION}/record-labels/record-label/add`;

            const response = await ajax.post(url, state.recordLabel);
            commit(mutation.SET_SAVED_RECORD_LABEL, response.data);
            return response;
        },
        async updateRecordLabel ({ commit, state }) {  

            let url = `/${process.env.VUE_APP_DEFAULT_VERSION}/record-labels/record-label/update`;

            const response = await ajax.put(url, state.recordLabel);
            commit(mutation.SET_UPDATED_RECORD_LABEL, state.recordLabel);  
            return response;
        },
        async deleteRecordLabel ({ commit, state }) { 

            let recordLabelId = state.recordLabel.id; 

            const response = await ajax.delete(`/${process.env.VUE_APP_DEFAULT_VERSION}/record-labels/record-label/` + recordLabelId);
            commit(mutation.SET_DELETED_RECORD_LABEL, response.data);  
            commit(mutation.REMOVE_RECORD_LABEL_FROM_RESULTS, recordLabelId); 
            return response;
        },
        add({ commit }) {
            commit(mutation.SET_RECORD_LABEL, getRecordLabelDetails()); 
        },
    },
    getters: {
        recordLabels: state => `${state.recordLabels}`
    }
} 

