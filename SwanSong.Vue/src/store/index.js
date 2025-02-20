import { createStore } from "vuex";

import { album } from "./album.module";
import { artist } from "./artist.module";
import { albumSong } from "./album.song.module";
import { authentication } from "./authentication.module";
import { country } from "./country.module";
import { forgottenPassword } from "./forgotten.password.module"
import { member } from "./member.module";
import { recordLabel } from "./record.label.module";
import { register } from "./register.module";
import { song } from "./song.module";
import { studio } from "./studio.module";
import { profile } from "./profile.module";
import { profilePasswordChange } from "./profile.password.change.module"
import { artistMember } from "./artist.member.module";

const store = createStore({
  modules: {
    album,
    albumSong,
    artist,
    artistMember,
    authentication,
    country,
    forgottenPassword,
    member,
    profile,
    profilePasswordChange,
    recordLabel,
    register,
    song,
    studio
  },
});

export default store;
