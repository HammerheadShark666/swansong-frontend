
import ajax from '../helpers/http-common'

const mutation = {  
    SET_COUNTRIES: "SET_COUNTRIES",
    SET_COUNTRY: "SET_COUNTRY",
    SET_SAVED_COUNTRY: "SET_SAVED_COUNTRY",
    SET_UPDATED_COUNTRY: "SET_UPDATED_COUNTRY",
    SET_DELETED_COUNTRY: "SET_DELETED_COUNTRY",
    REMOVE_COUNTRY_FROM_RESULTS: "REMOVE_COUNTRY_FROM_RESULTS"
}

const getCountryDetails = () => {
    return {
        "id": 0, "name": ""
    }     
}

const defaults = {
    countries: [],
    country: getCountryDetails()
}

export const country = {
    namespaced: true,
    state: Object.assign({}, defaults),
    mutations: {
        SET_COUNTRIES (state, countries) {
            state.countries = countries; 
        },
        SET_COUNTRY(state, country) {
            state.country = country;
        },
        SET_SAVED_COUNTRY(state, country) {
            state.countries.push({id: country.id, name: country.name});
            state.country = getCountryDetails();
        },
        SET_UPDATED_COUNTRY(state, country) { 
            let objIndex = state.countries.findIndex((obj => obj.id == country.id));  
            state.countries[objIndex].name = country.name; 
            state.country = getCountryDetails();
        },
        SET_DELETED_COUNTRY ( state ) {
            state.country = getCountryDetails();
        }, 
        REMOVE_COUNTRY_FROM_RESULTS(state, id) {
            let countries = state.countries;
            var newList = countries.filter(x => {
                return x.id != id;
            })
            state.countries = newList
        }
    },
    actions: {
        async getAll ({ commit }) {

            const response = await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/countries`);
            commit(mutation.SET_COUNTRIES, response.data); 
            return;
        },        
        setCountry({ commit }, country) {
            commit(mutation.SET_COUNTRY, country); 
        },
        async addCountry ({ commit, state }) {  

            let url = `/${process.env.VUE_APP_DEFAULT_VERSION}/countries/country/add`; // + (state.country.id > 0 ? 'update' : 'add');

            const response = await ajax.post(url, state.country);
            commit(mutation.SET_SAVED_COUNTRY, response.data); 
            return response;
        },
        async updateCountry ({ commit, state }) {  

            let url = `/${process.env.VUE_APP_DEFAULT_VERSION}/countries/country/update`;

            const response = await ajax.put(url, state.country);
            commit(mutation.SET_UPDATED_COUNTRY, state.country); 
            return response;
        },
        async deleteCountry ({ commit, state }) { 

            let countryId = state.country.id; 

            const response = await ajax.delete(`/${process.env.VUE_APP_DEFAULT_VERSION}/countries/country/` + countryId);
            commit(mutation.SET_DELETED_COUNTRY, response.data);  
            commit(mutation.REMOVE_COUNTRY_FROM_RESULTS, countryId); 
            return response;
        },
        add({ commit }) {
            commit(mutation.SET_COUNTRY, getCountryDetails()); 
        },
    },
    getters: {
        countries: state => `${state.countries}`
    }
}