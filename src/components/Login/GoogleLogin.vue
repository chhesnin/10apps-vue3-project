<template lang="pug">
.google-login
  h4(@click="loginWithGoogle") Login With Google
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
  h4
    margin: 0
    text-align: center
    font-weight: 300
    letter-spacing: 1px
    cursor: pointer
</style>