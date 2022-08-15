<template lang="pug">
.realtime-chat
  h1.title Realtime Chat
  section
    .body
      .message(
        v-for="chat in state.chats",
        :key="chat.message",
        :class="{ right: chat.userId == state.userId }"
      ) {{ chat.message }}

    input(
      v-model="state.message",
      placeholder="start typing...",
      @keydown.enter="addMessage"
    )
</template>

<script>
// *名稱重複可用 ref as databaseRef 更換名稱
// *使用reactive代替
// *only one data use ref, {more than one data} use reactive
import { onMounted, reactive } from "vue";
import {
  // getDatabase,
  // ref,
  // get,
  // child,
  set,
  push,
  onChildAdded,
} from "firebase/database";
import { auth, chatsRef } from "../utilities/firebase";
export default {
  setup() {
    // *ref()
    // const chats = ref([]);
    // *reactive({})
    const state = reactive({
      chats: [],
      message: "",
      userId: null,
    });
    onMounted(() => {
      // *Read data once with get()
      // *get()與onValue()不能並用
      // get(child(dbRef, "chats")).then((snapshot) => {
      //   state.chats = snapshot.val();
      //   // console.log(state.chats);
      // });

      // *onValue()與push()+set()併用會產生 newChildren.insert TypeError
      // onValue(chatsRef, (snapshot) => {
      //   state.chats = snapshot.val();
      //   // console.log(state.chats);
      // });

      onChildAdded(chatsRef, (data) => {
        // ***issue
        state.userId = auth.currentUser.uid;
        state.chats.push({ key: data.key, ...data.val() });
        console.log(state.chats);
      });
    });

    function addMessage() {
      const newChatsRef = push(chatsRef);

      set(newChatsRef, {
        userId: state.userId,
        message: state.message,
      });

      state.message = "";
    }

    // return { chats };
    return { state, addMessage };
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
  height: 100vh
  .title
    margin:
      top: 52px
      bottom: 30px
  section
    width: 320px
    height: 400px
    *
      box-sizing: border-box
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
        padding: 3px 15px
        margin: 3px
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