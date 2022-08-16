/* eslint-disable no-async-promise-executor */
import ajax from '../helpers/http-common'

const mutation = { 
    SET_ALBUM_SONGS_RESULTS: "SET_ALBUM_SONGS_RESULTS",  
    CLEAR_SONGS: "CLEAR_SONGS",
    SET_SONG_DETAILS: "SET_SONG_DETAILS"
} 

const newSong = { }

const defaults = {
    songs: [], 
    song: { 
                albumId: 0,
                side: "",
                order: "", 
                song: {
                    id: 0,
                    title: "",
                    length: ""
                }
            },    
}

export const song = {
    namespaced: true,
    state: Object.assign({}, defaults),
    mutations: {             
        SET_ALBUM_SONGS_RESULTS (state, results) {
            state.albumSongs = results;
        },          
        SET_SONG_DETAILS (state, song) {
            state.song = song;
        },        
        SET_SAVED_SONG (state, song) {
            state.song = song; 
        }, 
        CLEAR_SONGS(state) {
            state.albumSongs = [];
        }
    },
    actions: {
        async getSongsForAlbum ({ commit }, albumId) { 

           return new Promise(async (resolve, reject) => {
                await ajax.get(`songs/by-album/` + albumId)
                       .then(response => {
                            commit(mutation.SET_ALBUM_SONGS_RESULTS, response.data);  
                            resolve();
                       })
                       .catch(error => { 
                            reject(error.response);
                       })

            });
        },         
        async saveSong ({ commit, state }) {
            
            return new Promise((resolve, reject) => {
                ajax.post(`songs/song/save/`, state.song)  
                       .then(response => {
                            commit("SET_SAVED_SONG", response.data);  
                            resolve();
                       })
                       .catch(error => { 
                            reject(error.response);
                       })
            })
        },     
        addSong({commit}) {
            commit(mutation.SET_SONG_DETAILS, newSong);       
        },      
        clearSongs ({ commit }) {
            commit(mutation.CLEAR_SONGS);
        }
    },
    getters: {
        songs: state => `${state.songs}`, 
        details: state => `${state.song}`, 
        status: state => `${state.status}` 
    }
}