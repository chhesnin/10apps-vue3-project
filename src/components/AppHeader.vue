<template lang='pug'>
nav.app-header
  .container.narrow(v-if="isShorterThan880")
    .hamburger(@click="isSidebarOpen = true")
      transition(name="slide")
        .sidebar-container(v-if="isSidebarOpen")
          .close(@click="handleClickClose")
            .line1
            .line2
          .router-link-container
            router-link.link(
              v-for="page in pages",
              :to="page.to",
              :key="page.to",
              @click="handleClickClose"
            ) {{ page.title }}
    router-link.link.home(to="/") Home
    .sign
      //- *v-if="$store.state.isLoggedIn"
      .logout.link(v-if="isLoggedIn", @click="logout") logout
      .login.link(v-else, @click="openLoginModal") login
  .container.wide(v-else)
    router-link.link.home(to="/") Home
    //- *v-for
    .right
      .apps
        router-link.link(v-for="page in pages", :to="page.to", :key="page.to") {{ page.title }}
      .sign
        //- *v-if="$store.state.isLoggedIn"
        .logout.link(v-if="isLoggedIn", @click="logout") logout
        .login.link(v-else, @click="openLoginModal") login
</template>

<script>
import { computed, ref } from "vue";
import { auth } from "../plugins/firebase";
import { signOut } from "firebase/auth";
import { useStore } from "vuex";
import useWindowEvent from "../utilities/composition/useWindowEvent";
// import store from "../store";
export default {
  // *type: Boolean 有 default 值, 所以不需 required
  // props: { isLoggedIn: { type: Boolean, required: true } },
  setup() {
    const store = useStore();
    const pages = [
      { title: "MarvelHeroes", to: "/marvel-heroes" },
      { title: "Calendar", to: "/app-calendar" },
      { title: "Markdown", to: "/app-markdown" },
      { title: "Slider", to: "/app-slider" },
      { title: "Calculator", to: "/app-calculator" },
      { title: "ReModal", to: "/reusable-modal" },
      { title: "Chat", to: "/realtime-chat" },
      { title: "UserCrud", to: "/user-crud" },
      { title: "ObjectDetection", to: "/object-detection" },
    ];
    const isLoggedIn = computed(() => store.state.isLoggedIn);
    const isShorterThan880 = ref(false);
    const isSidebarOpen = ref(false);
    function handleResize() {
      if (window.innerWidth < 880) {
        isShorterThan880.value = true;
      } else {
        isShorterThan880.value = false;
      }
    }
    // *第一次渲染執行
    handleResize();
    // *監聽 resize event 觸發執行
    useWindowEvent("resize", handleResize);
    function logout() {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          console.log(error);
        });
    }
    function openLoginModal() {
      store.commit("setLoginModal", true);
    }
    function handleClickClose(event) {
      // *阻止事件冒泡，觸發外層的 .hamburger 被觸發
      isSidebarOpen.value = false;
      event.stopPropagation();
    }
    return {
      pages,
      isLoggedIn,
      isShorterThan880,
      isSidebarOpen,
      logout,
      openLoginModal,
      handleClickClose,
    };
  },
  // data() {
  //   return {
  //     pages: [
  //       { title: "MarvelHeroes", to: "/marvel-heroes" },
  //       { title: "Calendar", to: "/app-calendar" },
  //       { title: "Markdown", to: "/app-markdown" },
  //       { title: "Slider", to: "/app-slider" },
  //       { title: "Calculator", to: "/app-calculator" },
  //       { title: "ReModal", to: "/reusable-modal" },
  //       { title: "Chat", to: "/realtime-chat" },
  //       { title: "UserCrud", to: "/user-crud" },
  //       { title: "ObjectDetection", to: "/object-detection" },
  //     ],
  //   };
  // },
  // mounted() {
  //   window.addEventListener("resize", this.handleResize);
  // },
  // beforeUnmount() {
  //   window.removeEventListener("resize", this.handleResize);
  // },
  // computed: {
  //   isLoggedIn() {
  //     return store.state.isLoggedIn;
  //   },
  //   isShorterThan880() {
  //     if (window.innerWidth < 880) {
  //       return true;
  //     }
  //     return false;
  //   },
  // },
  // methods: {
  //   logout() {
  //     signOut(auth)
  //       .then(() => {
  //         // Sign-out successful.
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   },
  //   openLoginModal() {
  //     store.commit("setLoginModal", true);
  //   },
  // },
};
</script>

<style lang='sass'>
.app-header
  width: 100%
  padding: 30px
  box-sizing: border-box
  background: linear-gradient(180deg, rgba(#177089,0.7) 0% 60%, transparent 100%)
  color: #eee
  .container.wide
    width: 100%
    display: flex
    align-items: center
    padding: 0px 10px
    box-sizing: border-box
    .home
      flex: 1
    .right
      flex: 3
      display: flex
      align-items: center
      .apps
        display: flex
        width: 100%
        flex-wrap: wrap
  .container.narrow
    display: flex
    width: 100%
    // padding: 0px 10px
    align-items: center
    justify-content: space-between
    .hamburger
      appearance: none
      border-top: 1.5px solid #eee
      border-bottom: 1.5px solid #eee
      width: 25px
      height: 12px
      margin: 10px
      cursor: pointer
      transition: 0.2s
      &:hover
        border-color: #333
      &::after
        content: ''
        display: block
        border-top: 1.5px solid #eee
        width: 25px
        margin-top: 5px
        border-color: inherit
        @media screen and (max-width: 576px)
          border-top: 1.75px solid #eee
          border-color: inherit
      .sidebar-container
        z-index: 1
        position: fixed
        top: 0
        left: 0
        width: 250px
        height: 100%
        border-right: 2px solid #111
        display: flex
        flex-direction: column
        background: linear-gradient(-90deg, #111 0%, black 100%)
        opacity: 0.9
        padding: 30px 40px
        box-sizing: border-box
        .close
          width: 15px
          height: 15px
          align-self: center
          cursor: pointer
          transition: 0.1s
          margin-bottom: 30px
          position: relative
          &:hover
            border-color: lighten(#c43131, 5)
          .line1,.line2
            width: 15px
            border: 1px solid rgba(#eee, 0.8)
            position: absolute
            top: 50%
            left: 50%
            transform: translate(-50%, -50%) rotate(45deg)
            border-color: inherit
          .line2
            transform: translate(-50%, -50%) rotate(-45deg)
        .router-link-container
          display: flex
          flex-direction: column
          .link
            margin: 9%
            border-bottom: 1px solid rgba(#eee, 0.1)
            color: lighten(#177089, 5)
            font-weight: 500
            padding-bottom: 10px
            transition: 0.5s
            &:hover
              color: rgba(#eee, 0.8)
              transform: translateY(-3px)

  .link
    margin: 10px
    // *移除 a||link 的預設樣式
    text-decoration: none
    font-size: 14px
    letter-spacing: 1px
    color: #eee
    cursor: pointer
    transition: 0.2s
    &:hover
      color: #333
  .slide-enter-active,.slide-leave-active
    transition: 0.5s
  .slide-enter-from,.slide-leave-to
    transform: translateX(-300px)
</style>