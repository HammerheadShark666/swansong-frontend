
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

            const response = await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/artists?pageNumber=` + pageNumber + '&pageSize=' + pageSize);
            commit(mutation.SET_ARTISTS_BY_PAGING, response.data);  
            return;
        },  
        async random ({ commit }) { 

            const response = await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/artists/random`);
            commit(mutation.SET_SEARCH_ARTISTS, response.data);  
            return;
        },  
        async search ({ commit }, criteria) { 

            const response = await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/artists/search/` + criteria);
            commit(mutation.SET_SEARCH_ARTISTS, response.data);  
            return;
        },  
        async searchByLetter ({ commit }, letter) { 

            const response = await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/artists/search-by-letter/` + letter);
            commit(mutation.SET_SEARCH_ARTISTS, response.data); 
            return;
        },  
        async getLookups ({ commit }) {

            const response = await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/artists/lookups`);
            commit(mutation.SET_ARTIST_LOOKUPS, response.data);   
            return;
        }, 
        async getArtist ({ commit }, id) { 

            const response = await ajax.get(`/${process.env.VUE_APP_DEFAULT_VERSION}/artists/artist/` + id);
            commit(mutation.SET_ARTIST, response.data); 
            return;
        },     
        addArtist({commit}) {
            commit(mutation.SET_NEW_ARTIST, getArtistDetails());       
        }, 
        async addNewArtist ({ state, dispatch }) {
 
            let url = `/${process.env.VUE_APP_DEFAULT_VERSION}/artists/artist/add`;

            const response = await ajax.post(url, state.artist);
            dispatch("member/setArtistId", state.artist.id, { root:true });   
            return response;
        },     
        async updateArtist ({ state }) {   

            let url = `/${process.env.VUE_APP_DEFAULT_VERSION}/artists/artist/update`;

            const response = await ajax.put(url, state.artist);
            return response;
        },   
        async deleteArtist ({ commit, state, dispatch }) {

            let artistId = state.artist.id; 

            const response = await ajax.delete(`/${process.env.VUE_APP_DEFAULT_VERSION}/artists/artist/` + state.artist.id);
            commit(mutation.SET_DELETED_ARTIST, response.data);  
            commit(mutation.REMOVE_ARTIST_FROM_SEARCH_RESULTS, artistId);
            dispatch("member/clearMembers", '', { root:true }); 
            dispatch("member/setArtistId", '0', { root:true });  
            return response;
        },
        async savePhoto ({ commit }, { artistId, formData }) {   

            const response = await ajax.post(`/${process.env.VUE_APP_DEFAULT_VERSION}/artists/artist/upload-photo/` + artistId, formData,  {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            commit(mutation.SET_ARTIST_PHOTO, response.data.filename);  
            return;
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