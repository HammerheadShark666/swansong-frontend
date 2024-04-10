/* eslint-disable no-async-promise-executor */
import ajax from '../helpers/http-common' 

const mutation = { 

    SET_ARTIST_LOOKUPS: "SET_ARTIST_LOOKUPS",    
    SET_SEARCH_ARTISTS: "SET_SEARCH_ARTISTS",
    SET_ARTISTS_BY_PAGING: "SET_ARTISTS_BY_PAGING",
    SET_NEW_ARTIST: "SET_NEW_ARTIST",
    SET_SAVED_ARTIST: "SET_SAVED_ARTIST",
    SET_DELETED_ARTIST: "SET_DELETED_ARTIST",
    SET_ARTIST: "SET_ARTIST",       
    SET_ARTIST_ALBUM: "SET_ARTIST_ALBUM",               
    SET_ARTIST_PHOTO: "SET_ARTIST_PHOTO",
    REMOVE_ARTIST_FROM_SEARCH_RESULTS: "REMOVE_ARTIST_FROM_SEARCH_RESULTS",
    CLEAR_ARTIST: "CLEAR_ARTIST",
    CLEAR_ARTISTS: "CLEAR_ARTISTS"
}

const getArtistDetails = () => {
    return {
        "id": 0, "name": "", "formationYear": null, "disbandYear": null,
        "countryId": null, "photo": null
    }     
}

const getArtistsByPaging = () => {
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
    lookups: [],
    artistsByPaging: getArtistsByPaging(),
    artists: [],
    artist: getArtistDetails(),
}

export const artist = {
    namespaced: true,
    state: Object.assign({}, defaults),
    mutations: {
        SET_ARTIST_LOOKUPS (state, results) {
            state.lookups = results
        }, 
        SET_SEARCH_ARTISTS (state, artists) {
            state.artists = artists
        }, 
        SET_ARTISTS_BY_PAGING (state, artists) {
            state.artistsByPaging = artists
        }, 
        SET_NEW_ARTIST (state, artist) {
            state.artist = artist
        }, 
        SET_SAVED_ARTIST ( state, artist) {
            state.artist = artist
        },   
        SET_DELETED_ARTIST ( state ) {
            state.artist = getArtistDetails()
        }, 
        SET_ARTIST_PHOTO (state, photo) {   
            state.artist.photo = photo
            state.artist.photo = photo 
        },    
        SET_ARTIST (state, artist) {
            state.artist = artist 
            state.artist.photo = artist.photo 
        },  
        CLEAR_ARTIST(state) {
            state.artist = getArtistDetails(); 
        },
        CLEAR_ARTISTS(state) {
            state.artists = []; 
        },
        REMOVE_ARTIST_FROM_SEARCH_RESULTS(state, id) {
            let artists = state.artists;
            var searchResults = artists.filter(x => {
                return x.id != id;
            })
            state.artists = searchResults  
        }
    },
    actions: {
        async all ({ commit }, { pageNumber, pageSize }) { 

            return new Promise(async (resolve, reject) => {
                await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/artists?pageNumber=` + pageNumber + '&pageSize=' + pageSize)
                        .then(response => {
                            commit(mutation.SET_ARTISTS_BY_PAGING, response.data);  
                            resolve();
                        }).catch(error => { 
                           reject(error.response);
                        })
            });
        },  
        async random ({ commit }) { 

            return new Promise(async (resolve, reject) => {
                await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/artists/random`)
                        .then(response => {
                            commit(mutation.SET_SEARCH_ARTISTS, response.data);  
                            resolve();
                        }).catch(error => { 
                           reject(error.response);
                        })
            });
        },  
        async search ({ commit }, criteria) { 

            return new Promise(async (resolve, reject) => {
                await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/artists/search/` + criteria)
                        .then(response => {
                            commit(mutation.SET_SEARCH_ARTISTS, response.data);  
                            resolve();
                        }).catch(error => { 
                           reject(error.response);
                        })
            });
        },  
        async searchByLetter ({ commit }, letter) { 

            return new Promise(async (resolve, reject) => {
                await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/artists/search-by-letter/` + letter)
                            .then(response => {
                                commit(mutation.SET_SEARCH_ARTISTS, response.data);  
                                resolve();
                            }).catch(error => {
                                reject(error.response);
                            })
            });
        },  
        async getLookups ({ commit }) {

            return new Promise(async (resolve, reject) => {
                await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/artists/lookups`)
                        .then(response => {
                            commit(mutation.SET_ARTIST_LOOKUPS, response.data);   
                            resolve();
                        }).catch(error => {
                            reject(error.response);
                        })
            });
        }, 
        async getArtist ({ commit }, id) { 

            return new Promise(async (resolve, reject) => {
                await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/artists/artist/` + id)
                        .then(response => {
                            commit(mutation.SET_ARTIST, response.data);   
                            resolve();
                        }).catch(error => {                           
                            reject(error.response);
                        })
            });
        },     
        addArtist({commit}) {
            commit(mutation.SET_NEW_ARTIST, getArtistDetails());       
        }, 
        async saveArtist ({ state, dispatch }, id) {
 
            let url = `/${process.env.VUE_APP_DEFAULT_VERSION}/artists/artist/`  + (id > 0 ? 'update' : 'add');

            return new Promise(async (resolve, reject) => {
                await ajax.post(url, state.artist)
                            .then(response => {
                                dispatch("member/setArtistId", state.artist.id, { root:true });   
                                resolve(response);
                            }).catch(error => {
                                reject(error.response);
                            })
            });
        },        
        async deleteArtist ({ commit, state, dispatch }) {

            let artistId = state.artist.id; 

            return new Promise(async (resolve, reject) => {
                await ajax.delete(`/${process.env.VUE_APP_DEFAULT_VERSION}/artists/artist/` + state.artist.id)  
                            .then(response => {
                                commit(mutation.SET_DELETED_ARTIST, response.data);  
                                commit(mutation.REMOVE_ARTIST_FROM_SEARCH_RESULTS, artistId);
                                dispatch("member/clearMembers", '', { root:true }); 
                                dispatch("member/setArtistId", '0', { root:true });  
                                resolve(response);
                            }).catch(error => {
                                reject(error.response);
                            })

                });
        },
        async savePhoto ({ commit }, { artistId, formData }) {   

            return new Promise(async (resolve, reject) => {
                await ajax.post(`/${process.env.VUE_APP_DEFAULT_VERSION}/artists/artist/upload-photo/` + artistId, formData,  {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }}).then(response => {
                            commit(mutation.SET_ARTIST_PHOTO, response.data.filename);  
                            resolve();
                        }).catch(error => { 
                            reject(error.response);
                        })
            });
        },       
        clearArtist({ commit }) {
            commit (mutation.CLEAR_ARTIST);
        },
        clearArtists({ commit }) {
            commit (mutation.CLEAR_ARTISTS);
        },
        clear({ commit }) {
            commit (mutation.CLEAR_ARTIST);
            commit (mutation.CLEAR_ARTISTS);
        },
    },
    getters: {
        artists: state => `${state.artists}`,
        artistLookups: state => `${state.lookups}`
    }
}