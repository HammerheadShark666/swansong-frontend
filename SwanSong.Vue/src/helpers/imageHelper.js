export function getAlbumImageUrl(filename) {
  return `${process.env.VUE_APP_IMAGE_STORAGE}` + '/' + `${process.env.VUE_APP_SITE_ALBUMS}` + '/' + filename  
}

export function getDefaultAlbumImageUrl() {
  return `${process.env.VUE_APP_IMAGE_STORAGE}` + '/' + `${process.env.VUE_APP_SITE_ALBUMS}` + '/default-album-image.jpg' 
}

export function getArtistImageUrl(filename) {
  return `${process.env.VUE_APP_IMAGE_STORAGE}` + '/' + `${process.env.VUE_APP_SITE_ARTISTS}` + '/' + filename  
}

export function getDefaultArtistImageUrl() {
  return `${process.env.VUE_APP_IMAGE_STORAGE}` + '/' + `${process.env.VUE_APP_SITE_ARTISTS}` + '/default-artist-image.jpg' 
}

export function getMemberImageUrl(filename) {
  return `${process.env.VUE_APP_IMAGE_STORAGE}` + '/' + `${process.env.VUE_APP_SITE_MEMBERS}` + '/' + filename  
}

export function getDefaultMemberImageUrl() {
  return `${process.env.VUE_APP_IMAGE_STORAGE}` + '/' + `${process.env.VUE_APP_SITE_MEMBERS}` + '/default-member-image.jpg' 
}

export function getLogoImageUrl() {
  return `${process.env.VUE_APP_IMAGE_STORAGE}` + '/' + `${process.env.VUE_APP_SITE_IMAGES}` + '/SwanSongLogo2.png' 
}