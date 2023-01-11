<template lang="pug">
.login-modal
  section(@click="closeLoginModal")
  form(@submit.prevent="submit")
    h1.title Login Modal
    label User:
    input(
      v-model="form.user",
      placeholder="enter your email or username",
      ref="userRef"
    )
    label Password:
    input(
      type="password",
      v-model="form.password",
      placeholder="enter your password"
    )
    GoogleLogin
    button.login(type="submit") 
      //- *運用 span 更換文字
      span(v-if="!isLoading") Login
      span(v-else="isLoading") Loading
</template>

<script>
import { auth } from "../plugins/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import GoogleLogin from "./Login/GoogleLogin.vue";
import store from "../store";
export default {
  components: { GoogleLogin },
  data() {
    return {
      form: {
        user: "user2@gmail.com",
        password: "222222",
      },
      isLoading: false,
    };
  },
  mounted() {
    this.$refs.userRef.focus();
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
      store.commit("setLoginModal", false);
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
      margin-bottom: 35px
      letter-spacing: 1px
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
      margin: 15px 0px
      padding: 6px
</style>