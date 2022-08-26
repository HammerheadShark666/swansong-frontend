/* eslint-disable no-async-promise-executor */
import ajax from '../helpers/http-common'
import { cloneDeep } from 'lodash-es'

const mutation = {
    
    SET_ALBUM_SONGS: "SET_ALBUM_SONGS", 
    SET_ALBUM_SONG_DETAILS: "SET_ALBUM_SONG_DETAILS",
    SET_SAVED_ALBUM_SONG: "SET_SAVED_ALBUM_SONG", 
    SET_DELETED_ALBUM_SONG: "SET_DELETED_ALBUM_SONG", 
    SET_SAVED_EDITED_ALBUM_SONG: "SET_SAVED_EDITED_ALBUM_SONG",
    CLEAR_ALBUM_SONGS: "CLEAR_ALBUM_SONGS",         
    SET_ALBUM_SONG_SHOW_DIALOG: "SET_ALBUM_SONG_SHOW_DIALOG",
    RESET_ALBUM_SONG: "RESET_ALBUM_SONG"
} 

const getAlbumSong = (albumId) => { 
    return {
        id: 0,
        albumId: albumId,
        side: 1,
        order: 1, 
        song: {
            id: 0,
            title: "",
            length: ""
        }
    }
}

const defaults = {   
    albumSongs: [],
    albumSong: getAlbumSong(0),
    showAlbumSongDialog: false
}

export const albumSong = {
    namespaced: true,
    state: Object.assign({}, defaults),
    mutations: {       
        SET_ALBUM_SONGS (state, results) { 
            state.albumSongs = results;
        },         
        SET_ALBUM_SONG_DETAILS (state, albumSong) {
            state.albumSong = albumSong;
        },        
        SET_SAVED_ALBUM_SONG (state, albumSong) {
            state.albumSongs.push(albumSong);
            state.albumSong = albumSong;           
        },   
        SET_DELETED_ALBUM_SONG (state, {id}) {
            state.albumSongs = state.albumSongs.filter(albumSong => albumSong.id != id);
            state.albumSong = getAlbumSong(0);
        },  
        SET_SAVED_EDITED_ALBUM_SONG (state, albumSong) {

            var songs = state.albumSongs;
            songs = songs.map((song) => {
                if (song.id === albumSong.id) {
                    song = albumSong;
                }            
                return song;
            });

            state.albumSongs = songs;
            state.albumSong = albumSong;
        },   
          
        CLEAR_ALBUM_SONGS(state) {
            state.albumSongs = [];
        },
        SET_ALBUM_SONG_SHOW_DIALOG (state, showDialog) {
            state.showAlbumSongDialog = showDialog;
        },
        RESET_ALBUM_SONG(state) {
            state.albumSong = getAlbumSong(0)
        }        
    },
    actions: {       
        async getSongsForAlbum ({ commit }, albumId) {            
            return new Promise(async (resolve, reject) => {
                await ajax.get(`album/songs/` + albumId)
                            .then(response => {
                                var results = response.data
                                commit(mutation.SET_ALBUM_SONGS, results);  
                                resolve();
                            })
                            .catch(error => { 
                                reject(error.response)
                            })
            })
        },
        async saveAlbumSong ({ commit, state }) {          
            var isEdit = state.albumSong.song.id == 0 ? false : true;             
            return new Promise(async (resolve, reject) => {
                await ajax.post(`album/songs/save/`, state.albumSong)  
                            .then(response => {
                                if(response.data.isValid) {
                                    !isEdit
                                        ? commit("SET_SAVED_ALBUM_SONG", response.data)                                 
                                        : commit("SET_SAVED_EDITED_ALBUM_SONG", response.data);  
                                }
                                resolve(response.data);
                            })
                            .catch(error => { 
                                reject(error.response);
                            })
            })
        },  
        async deleteAlbumSong ({ commit }, id) {
            return new Promise(async (resolve, reject) => {
                await ajax.delete(`album/songs/song/` + id)  
                            .then(response => {
                                if(response.data.isValid)                              
                                    commit(mutation.SET_DELETED_ALBUM_SONG, { id, response }); 
                                resolve(response);
                            })
                            .catch(error => {                          
                                reject(error.response);
                            })
            });
        },   
        addAlbumSong({ commit }, albumId) {
            commit(mutation.SET_ALBUM_SONG_DETAILS, getAlbumSong(albumId));  
        },      
        editAlbumSong({ commit }, albumSong) {
            commit(mutation.SET_ALBUM_SONG_DETAILS, cloneDeep(albumSong));    
        },  
        clearAlbumSongs ({ commit }) {
            commit(mutation.CLEAR_ALBUM_SONGS);
        },
        clearAlbumSong ({ commit }) {
            commit(mutation.SET_ALBUM_SONG_DETAILS, getAlbumSong(0));
        },
        clear({ commit }) {
            commit(mutation.SET_ALBUM_SONG_DETAILS, getAlbumSong(0));
            commit(mutation.CLEAR_ALBUM_SONGS);
        },      
        setShowAlbumSongDialog({ commit, state }, showDialog) {
            commit (mutation.SET_ALBUM_SONG_SHOW_DIALOG, showDialog);
            if(showDialog == false)
                commit(mutation.SET_ALBUM_SONG_DETAILS, getAlbumSong(state.albumSong.albumId));
        },
        resetAlbumSong({ commit }) {
            commit (mutation.RESET_ALBUM_SONG);
        }    
    },
    getters: {
        albumSongs: state => `${state.albumSongs}`, 
        albumSong: state => `${state.albumSong}`
    }
}