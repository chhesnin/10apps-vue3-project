<template lang="pug">
.realtime-chat
  h1.title Realtime Chat
  section
    .body
      .message(
        v-for="chat in state.chats",
        :key="chat.message",
        :class="{ right: chat.userId == userId }",
        v-if="userId"
      ) {{ chat.message }}

    input(
      v-model="state.message",
      placeholder="start typing...",
      @keydown.enter="addMessage"
    )
</template>

<script>
// *名稱重複可用 ref as databaseRef 更換名稱
// *ref / reactive
// *only one data use ref, { more than one data } use reactive
import { onMounted, reactive } from "vue";
import { set, push, onChildAdded } from "firebase/database";
import { chatsRef } from "../plugins/firebase";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    // const chats = ref([]);
    // const state = reactive({})
    const state = reactive({
      chats: [],
      message: "",
    });

    const store = useStore();
    // ***使用 vuex + computed 處理 promise
    const userId = computed(() => store.state.authUser.uid);

    onMounted(() => {
      // *Read data once with get()
      // *get() 與 onValue() 不能並用
      // get(child(dbRef, "chats")).then((snapshot) => {
      //   state.chats = snapshot.val();
      //   // console.log(state.chats);
      // });

      // *Listen for value events with onValue()
      // *onValue() 與 push() + set() 併用會產生 newChildren.insert TypeError
      // onValue(chatsRef, (snapshot) => {
      //   state.chats = snapshot.val();
      //   // console.log(state.chats);
      // });

      // *Work with Lists of Data
      onChildAdded(chatsRef, (data) => {
        state.chats.push({ key: data.key, ...data.val() });
        // console.log(data.key, data.val());
      });
    });

    function addMessage() {
      const newChatsRef = push(chatsRef);

      set(newChatsRef, {
        // ***
        userId: store.state.authUser.uid,
        message: state.message,
      });

      state.message = "";
    }

    return { state, userId, addMessage };
  },
};
</script>

<style lang="sass">
.realtime-chat
  display: flex
  flex-direction: column
  align-items: center
  background: linear-gradient(0deg, #aaa 0%, #fff 100%)
  width: 100vw
  // height: 100vh
  box-sizing: border-box
  padding-bottom: 100px
  @media screen and (max-width: 576px)
    padding: 0px 45px 60px 45px
  .title
    margin:
      top: 52px
      bottom: 30px
  section
    width: 320px
    height: 400px
    *
      box-sizing: border-box
    @media screen and (max-width: 576px)
      width: 100%
    .body
      border: 2px solid #aaa
      border-radius: 5px
      background-color: #fff
      padding: 20px 15px
      // display: flex
      // flex-direction: column
      height: 100%
      .message
        // border: 1.5px solid #000
        padding: 3px 0px
        // border-radius: 20px
        // background-color: rgba(#177089,0.8)
        color: rgba(#177089,0.8)
        font-weight: 700
        text-align: left
        &.right
          text-align: right

    input
      width: 100%
      margin-top: 15px
</style>