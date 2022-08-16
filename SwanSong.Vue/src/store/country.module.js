/* eslint-disable no-async-promise-executor */
import ajax from '../helpers/http-common'

const mutation = {  
    SET_COUNTRIES: "SET_COUNTRIES",
    SET_COUNTRY: "SET_COUNTRY",
    SET_SAVED_COUNTRY: "SET_SAVED_COUNTRY",
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
            state.country = country;
            let objIndex = state.countries.findIndex((obj => obj.id == country.id));  

            if(objIndex > -1)
                state.countries[objIndex].name = country.name;
            else 
                state.countries.push({id: country.id, name: country.name});

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

            return new Promise(async (resolve, reject) => {
                await ajax.get(`countries`)
                       .then(response => {
                           commit(mutation.SET_COUNTRIES, response.data); 
                           resolve();
                       })
                       .catch(error => {
                           reject(error.response);
                       })
            })
        },        
        setCountry({ commit }, country) {
            commit(mutation.SET_COUNTRY, country); 
        },
        async saveCountry ({ commit, state }) {  

            return new Promise(async (resolve, reject) => {
                await ajax.post(`countries/country/save/`, state.country)  
                            .then(response => {
                                commit(mutation.SET_SAVED_COUNTRY, response.data);   
                                resolve(response);
                            }).catch(error => {
                                reject(error.response);
                            })
            });
        },
        async deleteCountry ({ commit, state }) { 

            let countryId = state.country.id; 

            return new Promise(async (resolve, reject) => {
                await ajax.delete(`countries/country/` + countryId)  
                            .then(response => {
                                commit(mutation.SET_DELETED_COUNTRY, response.data);  
                                commit(mutation.REMOVE_COUNTRY_FROM_RESULTS, countryId); 
                                resolve(response);
                            }).catch(error => {
                                reject(error.response);
                            })

                });
        },
        add({ commit }) {
            commit(mutation.SET_COUNTRY, getCountryDetails()); 
        },
    },
    getters: {
        countries: state => `${state.countries}`
    }
}