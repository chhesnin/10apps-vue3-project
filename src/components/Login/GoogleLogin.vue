<template lang="pug">
.google-login
  //- *在 form 中的 button default type="submit"
  button.google(type="button", @click="loginWithGoogle") Login With Google
</template>

<script>
import { auth } from "@/plugins/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import store from "@/store";
export default {
  methods: {
    loginWithGoogle() {
      const provider = new GoogleAuthProvider();

      signInWithPopup(auth, provider)
        .then(() => {
          store.commit("setLoginModal", false);
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="sass">
.google-login
  button.google
    width: 100%
    margin: 5px 0px 0px 0px
    padding: 6px
    cursor: pointer
</style>