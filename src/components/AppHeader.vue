<template lang='pug'>
nav.app-header 
  router-link.link(to="/") Home
  //- *v-for
  .apps
    router-link.link.right(
      v-for="page in pages",
      :to="page.to",
      :key="page.to"
    ) {{ page.title }}
    .logout.link.right(v-if="isLoggedIn", @click="logout") logout
    .login.link.right(v-else, @click="openLoginModal") login
</template>

<script>
import { auth } from "../utilities/firebase";
import { signOut } from "firebase/auth";
import store from "../store";
export default {
  // *type: Boolean有default值, 所以不需required
  // props: { isLoggedIn: { type: Boolean, required: true } },
  data() {
    return {
      pages: [
        { title: "MarvelHeroes", to: "/marvel-heroes" },
        { title: "Calendar", to: "/app-calendar" },
        { title: "Markdown", to: "/app-markdown" },
        { title: "Slider", to: "/app-slider" },
        { title: "Calculator", to: "/app-calculator" },
        { title: "ReModal", to: "/reusable-modal" },
        { title: "Chat", to: "/realtime-chat" },
        { title: "UserCrud", to: "/user-crud" },
      ],
    };
  },
  computed: {
    isLoggedIn() {
      return store.state.isLoggedIn;
    },
    isLoginOpen() {
      return store.state.isLoginOpen;
    },
  },
  methods: {
    logout() {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openLoginModal() {
      store.commit("setLoginModal", true);
    },
  },
};
</script>

<style lang='sass'>
.app-header
  // border: 1px solid #000
  width: 100%
  padding: 30px
  box-sizing: border-box
  background: linear-gradient(180deg, rgba(#177089,0.7) 0% 60%, transparent 100%)
  color: #eee
  display: flex
  justify-content: space-between
  .apps
    // *df可協助對齊
    display: flex
  .link
    margin-left: 20px
    // *移除a的預設樣式
    text-decoration: none
    color: #eee
    &:hover
      color: #333
    &.right
      // *2個element可用jc, 2個以上用float
      // float: right
      margin: 0px 10px
      font-size: 14px
  .login,.logout
    float: right
    cursor: pointer
</style>