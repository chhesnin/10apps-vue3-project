// {{ Vue & JavaScrip }} // v-html具危險性 *XSS prone 
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
  //- 只有$emit的component可以listen
  AppHeader(@open-login-modal="isLoginOpen = true")
  router-view
  LoginModal(v-if="isLoginOpen", @close-login-modal="isLoginOpen = false")
</template>

<script>
// 註冊元素
import AppHeader from "./components/AppHeader.vue";
import LoginModal from "./components/LoginModal.vue";
import auth from "./utilities/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default {
  components: {
    AppHeader: AppHeader,
    LoginModal: LoginModal,
  },
  data() {
    return {
      isLoginOpen: true,
      isLoggedIn: false,
      authUser: {},
    };
  },
  mounted() {
    // listen auth登入狀態是否改變
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
        this.authUser = user;
      } else {
        this.isLoggedIn = false;
        this.authUser = {};
      }
    });
  },
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap')

*
  // border: 1px solid #000
  font-family: 'Roboto', sans-serif

html,body
  height: 100%
  margin: 0
  // 下層只有一個元素的置中
  // display: flex
  // justify-content: center
.app
  h1
    font-size: 2em
  button
    padding: 5px 10px
    cursor: pointer
    &:hover
      background-color: rgba(#177089,0.8)
      color: #eee
      border: 2px solid rgba(#177089,0.8)
      border-radius: 3px
  input
    font-size: 16px
    padding: 5px 10px
    &:focus
      outline: none
      border: 2px solid rgba(#177089,0.8)
      border-radius: 3px
</style>
