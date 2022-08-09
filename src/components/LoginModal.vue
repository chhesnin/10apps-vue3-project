<template lang="pug">
.login-modal
  section(@click="closeLoginModal")
  form(@submit.prevent="submit")
    h1.title Login Modal
    label User:
    input(v-model="form.user", placeholder="enter your email or username")
    label Password:
    input(
      type="password",
      v-model="form.password",
      placeholder="enter your password"
    )
    button.login(type="submit") 
      //- *運用span更換文字
      span(v-if="!isLoading") Login
      span(v-else="isLoading") Loading
</template>

<script>
import auth from "../utilities/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
    return {
      form: {
        user: "tp6vup@hotmail.com",
        password: "password",
      },
      isLoading: false,
    };
  },
  methods: {
    submit() {
      // console.log("success submit");
      this.isLoading = true;
      signInWithEmailAndPassword(auth, this.form.user, this.form.password)
        .then(() => {
          // console.log(userCredential);
          this.isLoading = false;
          this.form.user = "";
          this.form.password = "";
          this.closeLoginModal();
        })
        .catch(() => {
          // console.log(error);
          this.isLoading = false;
        });
    },
    closeLoginModal() {
      // *this.$emit("")
      this.$emit("close-login-modal");
    },
  },
};
</script>

<style lang="sass">
.login-modal
  section
    width: 100vw
    height: 100vh
    // border: 1px solid #000
    // *pof+top: 0
    position: fixed
    top: 0px
    background-color: black
    opacity: 0.8
    z-index: 2
  form
    width: 330px
    background-color: #fff
    position: absolute
    z-index: 3
    left: 50%
    top: 50%
    transform: translate(-50%,-50%)
    border: 2px solid #aaa
    border-radius: 5px
    background-color: #eee
    padding: 20px 35px
    box-sizing: border-box
    *
      box-sizing: border-box
    h1.title
      text-align: center
    label
      margin-bottom: 100px
    input
      margin:
        top: 5px
        bottom: 30px
      width: 100%
      padding: 5px 10px
    button.login
      width: 100%
      margin: 15px 0px 30px 0px
      padding: 6px
    h6
      margin: 0
      text-align: center
</style>