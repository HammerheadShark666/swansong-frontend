import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/home/Home.vue";
import Albums from "./components/albums/Albums.vue";
import AlbumsAdd from "./components/albums/AlbumsAdd.vue";
import Songs from "./components/songs/Songs.vue";
import Login from "./components/authentication/Login.vue";
import Register from "./components/register/Register.vue";
import VerifyEmail from "./components/register/VerifyEmail.vue";
import ResetPassword from "./components/forgottenPassword/ResetPassword.vue"
import RequestResetPassword from "./components/forgottenPassword/RequestResetPassword"
import Artists from "./components/artists/Artists.vue";
import ArtistsAdd from "./components/artists/ArtistsAdd.vue";
import Members from "./components/members/Members"
import MembersAdd from "./components/members/MembersAdd"
import Profile from "./components/profile/Profile.vue" ;
import Lookups from "./components/lookups/Lookups.vue";
import Users from "./components/users/Users.vue";

import store from './store'

const routes = [
  {
    path: "/",
    name: "homeSlash",
    component: Home,
  },
  {
    path: "/home",
    name: "home", 
    component: Home,
  },
  {
    path: "/login",    
    name: "login",
    component: Login,
  },
  {
    path: "/albums",
    name: "albums", 
    component: Albums
  },
  { 
    path: "/albums/album/add",
    name: "albums-album-add",
    component: AlbumsAdd 
  },
  { 
    path: "/albums/album/:albumId",
    name: "albums-album",
    component: Albums 
  },
  {
    path: "/songs",
    name: "songs", 
    component: Songs,
  },
  { 
    path: "/songs/song/add",
    name: "songs-song-add",
    component: Songs 
  },
  {
    path: "/artists",
    name: "artists", 
    component: Artists,
  },
  { 
    path: "/artists/artist/add",
    name: "artists-artist-add",
    component: ArtistsAdd,
  },
  { 
    path: "/artists/artist/:artistId",
    name: "artists-artist",
    component: Artists,
  },
  {
    path: "/members",
    name: "members", 
    component: Members,
  },
  { 
    path: "/members/member/add",
    name: "members-member-add",
    component: MembersAdd,
  },
  { 
    path: "/members/member/:memberId",
    name: "members-member",
    component: Members,
  },
  {
    path: "/profile",
    name: "profile",  
    component: Profile,
  }, 
  {
    path: "/lookups",
    name: "lookups",  
    component: Lookups,
  }, 
  { 
    path: "/lookups/lookup/add",
    name: "lookups-lookup-add",
    component: Lookups
  },
  {
    path: "/users",
    name: "users",  
    component: Users,
  }, 
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  { 
    path: "/register/verify-email/:token", 
    component: VerifyEmail
  },
  { 
    path: "/reset-password/:token", 
    component: ResetPassword
  },
  { 
    path: "/forgotten-password", 
    name: "forgotten-password",  
    component: RequestResetPassword
  }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register', '/verify-email', '/reset-password', '/forgotten-password'];
  var authRequired = !publicPages.includes(to.path);
  const loggedIn = sessionStorage.getItem('user');
  
  store.dispatch("album/clearAlbum");
  store.dispatch("albumSong/clearAlbumSong");
  store.dispatch("artist/clearArtist");
  store.dispatch("member/clear");
  store.dispatch("song/clearSongs"); 

  if(authRequired == true && (to.path.includes("verify-email") || to.path.includes("reset-password")))
    authRequired = false;

  if (authRequired && !loggedIn) {
    store.dispatch("authentication/logout");
    return next('/login');
  }

  next();
})

export default router;