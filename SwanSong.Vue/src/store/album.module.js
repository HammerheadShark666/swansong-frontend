/* eslint-disable no-async-promise-executor */
import ajax from '../helpers/http-common' 

const mutation = { 

    SET_SEARCH_ALBUMS: "SET_SEARCH_ALBUMS",     
    SET_ALBUM: "SET_ALBUM", 
    SET_ALBUMS_BY_PAGING: "SET_ALBUMS_BY_PAGING",     
    SET_NEW_ALBUM: "SET_NEW_ALBUM", 
    SET_SAVED_ALBUM: "SET_SAVED_ALBUM",   
    SET_ALBUM_PHOTO: "SET_ALBUM_PHOTO",    
    SET_ALBUM_DETAILS: "SET_ALBUM_DETAILS",
    SET_ALBUM_ARTIST_NAME: "SET_ALBUM_ARTIST_NAME",
    SET_ALBUM_ARTIST_ID: "SET_ALBUM_ARTIST_ID",
    SET_ARTIST_ALBUMS: "SET_ARTIST_ALBUMS",  
    SET_ARTIST_ID: "SET_ARTIST_ID",
    CLEAR_ALBUMS: "CLEAR_ALBUMS",
    CLEAR_ALBUM: "CLEAR_ALBUM",
    REMOVE_ALBUM_FROM_SEARCH_RESULTS: "REMOVE_ALBUM_FROM_SEARCH_RESULTS"
}

const getAlbum = () => {
    return {
        id: 0, name: "", releaseDate: null, recordedDate: null, labelId: null, 
        recordedAtId: null, producers: "", arrangers: "", engineers: "",
        artwork: "", artistId: null, photo: null
    }     
}

const getAlbumByPaging = () => {
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
    albums: [],
    albumsByPaging: getAlbumByPaging(),
    album: getAlbum()
}

export const album = {
    namespaced: true,
    state: Object.assign({}, defaults),
    mutations: {        
        SET_SEARCH_ALBUMS (state, albums) {
            state.albums = albums;
        }, 
        SET_ALBUM (state, album) {
            state.album = album;
        },      
        SET_ALBUMS_BY_PAGING (state, albums) {
            state.albumsByPaging = albums
        },       
        SET_NEW_ALBUM (state) {
            state.album = getAlbum();
        }, 
        SET_SAVED_ALBUM (state, album) {
            state.album = album;
        },  
        SET_ALBUM_PHOTO (state, photo) {   
            state.album.photo = photo
        }, 
        SET_ALBUM_DETAILS(state, album) {
            state.album = album;
        },
        SET_ALBUM_ARTIST_NAME(state, artistName) {
            state.album.artistName = artistName;
        },
        SET_ALBUM_ARTIST_ID(state, artistId) {
            state.album.artistId = artistId;
        },
        SET_ARTIST_ALBUMS(state, results) {
            state.albums = results; 
        }, 
        SET_ARTIST_ID(state, id) { 
            state.album.artistId = id;
        },     
        CLEAR_ALBUMS(state) {
            state.albums = [];
        },    
        CLEAR_ALBUM(state) {
            state.album = getAlbum();
        },
        REMOVE_ALBUM_FROM_SEARCH_RESULTS(state, id) {
            let albums = state.albums;
            var searchResults = albums.filter(x => {
                return x.id != id;
            })
            state.albums = searchResults
        }
    },
    actions: {
        async all ({ commit }, { pageNumber, pageSize }) { 

            return new Promise(async (resolve, reject) => {
                await ajax.get(`albums?pageNumber=` + pageNumber + '&pageSize=' + pageSize)
                        .then(response => {
                            commit(mutation.SET_ALBUMS_BY_PAGING, response.data);  
                            resolve();
                        }).catch(error => { 
                           reject(error.response);
                        })
            });
        }, 
        async random ({ commit }) { 

            return new Promise(async (resolve, reject) => {
                await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/albums/random`)
                        .then(response => {
                            commit(mutation.SET_SEARCH_ALBUMS, response.data);  
                            resolve();
                        }).catch(error => { 
                           reject(error.response);
                        })
            });
        },   
        async search ({ commit }, criteria) {   
            return new Promise(async (resolve, reject) => {
                await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/albums/search/` + criteria)
                        .then(response => {
                            commit(mutation.SET_SEARCH_ALBUMS, response.data);                             
                            resolve();
                        })
                        .catch(error => {
                            reject(error.response);
                        })
            });
        },
        async searchByLetter ({ commit }, letter) {
            return new Promise(async (resolve, reject) => {
                await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/albums/search-by-letter/` + letter)
                        .then(response => {
                            commit(mutation.SET_SEARCH_ALBUMS, response.data);   
                            resolve();
                        })
                        .catch(error => { 
                            reject(error.response);
                        })
            });
        },  
        async getAlbum ({ commit }, id) {   
            return new Promise(async (resolve, reject) => {
                await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/albums/album/` + id)
                       .then(response => {
                            commit(mutation.SET_ALBUM, response.data); 
                            resolve(); 
                       })
                       .catch(error => { 
                            reject(error.response);
                       })
            });
        },
        async addAlbum({commit}) {
            commit(mutation.SET_NEW_ALBUM);       
        },
        addNewAlbum ({ state }) {   

            let url = `/${process.env.VUE_APP_DEFAULT_VERSION}/albums/album/add`;

            return new Promise(async (resolve, reject) => {
                await ajax.post(url, state.album)  
                       .then(response => { 
                            resolve(response);  
                       })
                       .catch(error => {
                            reject(error.response);
                       })
            });
        },
        updateAlbum ({ state }) {   

            let url = `/${process.env.VUE_APP_DEFAULT_VERSION}/albums/album/update`;

            return new Promise(async (resolve, reject) => {
                await ajax.put(url, state.album)  
                       .then(response => { 
                            resolve(response);  
                       })
                       .catch(error => {
                            reject(error.response);
                       })
            });
        },      
        async deleteAlbum ({ commit, state, dispatch }) { 

            let albumId = state.album.id; 

            return new Promise(async (resolve, reject) => {
                await ajax.delete(`/${process.env.VUE_APP_DEFAULT_VERSION}/albums/album/` + state.album.id)  
                       .then(response => {                            
                            commit(mutation.CLEAR_ALBUM);  
                            commit(mutation.REMOVE_ALBUM_FROM_SEARCH_RESULTS, albumId);
                            dispatch("albumSong/clearAlbumSongs", '', { root:true });
                            resolve(response);
                       })
                       .catch(error => { 
                            reject(error.response);
                       })
            });
        },
        async savePhoto ({ commit }, { albumId, formData }) {
            return new Promise(async (resolve, reject) => {
                await ajax.post(`/${process.env.VUE_APP_DEFAULT_VERSION}/albums/album/upload-photo/` + albumId, formData,  {
                    headers: {}  
                    }).then(response => {
                        commit(mutation.SET_ALBUM_PHOTO, response.data.filename);  
                        resolve();
                    })
                    .catch(error => {
                        reject(error.response);
                    })
            });
        },
        async getAlbumsForArtist({ commit }, artistId) { 
            return new Promise(async (resolve, reject) => {
                await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/albums/artist/` + artistId)
                        .then(response => {
                            commit(mutation.SET_ARTIST_ALBUMS, response.data);  
                            resolve();
                        })
                        .catch(error => {
                            reject(error.response);
                        })
            });
        },
        updateArtistName({ commit, rootState }, id) {
            commit(mutation.SET_ALBUM_ARTIST_NAME, rootState.artist.lookups.find(x => x.id === id).name);
        },      
        clearAlbums ({ commit }) {
            commit(mutation.CLEAR_ALBUMS);
        },
        clearAlbum ({ commit }) {
            commit(mutation.CLEAR_ALBUM);
        },
        clear ({ commit }) {
            commit(mutation.CLEAR_ALBUM);
            commit(mutation.CLEAR_ALBUMS);
        },
        setArtistId ({ commit }, id) {
            commit(mutation.SET_ARTIST_ID, id);
        }
    },
    getters: {
        albums: state => `${state.albums}`, 
        album: state => `${state.album}`,
    }
}