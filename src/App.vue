// {{ Vue & JavaScript }} // v-html具危險性 *XSS prone 
// v-if中亦可直接使用boolean或運算式 
// v-if remove / v-show hidden 
// v-text == {{..}} *但v-text無法在前後加文字 
// v-once 只渲染元素一次 // v-for="arr (value,index) in ../ obj (value,key) in .." 
// v-bind 將屬性與Vue資料綁定 *即便如disabled等沒有=""的屬性, 亦可v-bind: 
// :[Vue資料]="Vue資料" *動態屬性綁定 
// v-model="Vue資料" 
// v-model.trim 移除space 
// v-model.lazy focus out元素觸發更新 
// v-model.number 綁定型別 
// @click="" 
// @keydown="" *需先click button 
// button(type="submit") 提交form到伺服器 
// @event.prevent="" 避免event的dafault action觸發 
// Vue中的this用來表示其為Vue的資料 
// push/pop | unshift/shift 
// 計算屬性是cached, 當依賴的資料變動時才會recomputed 
// 計算屬性除getter外, 可以有setter, 在其被重新設定時觸發 
// :key="Vue資料" 當其中的Vue資料變動時, key變動, 並重新渲染畫面

<template lang="pug">
//- *不用縮排
.app
  //- *只有 $emit 的 component 可以 listen
  AppHeader
  router-view
  //- *可以 teleport 元素或元件 to any where, 解決在 component 中的 component 產生的問題
  //- teleport(to="body")
  LoginModal(v-if="$store.state.isLoginOpen")
</template>

<script>
// *註冊元素
import AppHeader from "./components/AppHeader.vue";
import LoginModal from "./components/LoginModal.vue";
import { auth } from "./plugins/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useStore } from "vuex";
import { onMounted } from "vue";

export default {
  components: { AppHeader, LoginModal },
  setup() {
    const store = useStore();
    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          store.commit("setLoggedState", true);
          store.commit("setAuthUser", user);
        } else {
          store.commit("setLoggedState", false);
          store.commit("setAuthUser", {});
        }
      });
    });
  },
  // mounted() {
  //   // *listen auth 登入狀態是否改變
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       this.$store.commit("setLoggedState", true);
  //       this.$store.commit("setAuthUser", user);
  //     } else {
  //       this.$store.commit("setLoggedState", false);
  //       this.$store.commit("setAuthUser", {});
  //     }
  //   });
  // },
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap')

*
  // border: 1px solid #000
  font-family: 'Roboto', sans-serif

html,body
  width: 100vw
  height: 100vh
  margin: 0
  overflow-x: hidden
.app
  color: #222
  h1
    font-size: 1.7em
    @media screen and (max-width: 576px)
      font-size: 1.4em
  h2
    text-align: center
  button
    padding: 5px 10px
    cursor: pointer
    border: 1.5px solid #aaa
    border-radius: 5px
    transition: 0.1s
    color: #222
    background-color: #eee
    font-size: 13.5px
    font-weight: 400
    &:hover
      background-color: rgba(#177089,0.8)
      color: #eee
      border: 1.5px solid rgba(#177089,0.8)
      border-radius: 5px
  input
    font-size: 16px
    padding: 5px 10px
    border: 1.5px solid #aaa
    border-radius: 5px
    transition: 0.1s
    &:focus
      outline: none
      border: 1.5px solid rgba(#177089,0.8)
      border-radius: 5px
</style>
