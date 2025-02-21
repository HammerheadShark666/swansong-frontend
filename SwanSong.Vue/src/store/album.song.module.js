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
            state.albumSong.id = albumSong.id;
            state.albumSong.song.id = albumSong.songId;
            state.albumSongs.push(state.albumSong); 
            state.albumSong = getAlbumSong(state.albumSong.albumId);
        },          
        SET_SAVED_EDITED_ALBUM_SONG (state, albumSong) {

            var songs = state.albumSongs;
            songs = songs.map((song) => {
                if (song.id === albumSong.id) {
                    song = state.albumSong;
                }            
                return song;
            });

            state.albumSongs = songs;  
        },   
        SET_DELETED_ALBUM_SONG (state, {id}) {
            state.albumSongs = state.albumSongs.filter(albumSong => albumSong.id != id);
            state.albumSong = getAlbumSong(0);
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
            const response = await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/album/songs/` + albumId);
            commit(mutation.SET_ALBUM_SONGS, response.data);
        },
        async addNewAlbumSong ({  commit, state }) {
            let url = `/${process.env.VUE_APP_DEFAULT_VERSION}/album/songs/song/add`;
            const response = await ajax.post(url, state.albumSong);
            commit("SET_SAVED_ALBUM_SONG", response.data);
            return response;
        },     
        async updateAlbumSong ({  commit, state }) {   
            let url = `/${process.env.VUE_APP_DEFAULT_VERSION}/album/songs/song/update`;
            const response = await ajax.put(url, state.albumSong);
            commit("SET_SAVED_EDITED_ALBUM_SONG", state.albumSong);
            return response.data;
        },          
        async deleteAlbumSong ({ commit }, id) {
            const response = await ajax.delete(`/${process.env.VUE_APP_DEFAULT_VERSION}/album/songs/song/` + id);
            commit(mutation.SET_DELETED_ALBUM_SONG, { id });
            return response;
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