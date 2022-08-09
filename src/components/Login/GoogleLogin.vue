<template lang="pug">
.google-login
  h4(@click="loginWithGoogle") Login With Google
</template>

<script>
import auth from "@/utilities/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
export default {
  methods: {
    loginWithGoogle() {
      const provider = new GoogleAuthProvider();

      signInWithPopup(auth, provider)
        .then(() => {
          this.$emit("close-login-modal-from-google");
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