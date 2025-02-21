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

            const response = await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/songs/by-album/` + albumId);
            commit(mutation.SET_ALBUM_SONGS_RESULTS, response.data);  
            return;
        },         
        async saveSong ({ commit, state }) {
            
            const response = ajax.post(`/${process.env.VUE_APP_DEFAULT_VERSION}/songs/song/save/`, state.song);
            commit("SET_SAVED_SONG", response.data); 
            return;
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