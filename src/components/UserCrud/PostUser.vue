<template lang="pug">
//- *ReModal 被 teleport 走了，故此 component 只剩 button.post
button.post(@click="state.isPostModalOpen = true") Post
//- *Post Modal
teleport(to="#app")
  //- *component 若有 template 架構, CSS 在 component file 設定
  ReModal(
    v-if="state.isPostModalOpen",
    @close-modal="state.isPostModalOpen = false"
  )
    template(#title) 
      h2 Add New User
    template(#body)
      form(@submit.prevent="post")
        label Name:
        input(v-model="state.form.name", placeholder="User Name")
        label Email:
        input(
          v-model="state.form.email",
          placeholder="User Email",
          type="email"
        )
        label Avatar:
        input(
          v-model="state.form.avatar",
          placeholder="Avatar Url",
          type="text"
        )
        button(type="submit") Create
</template>

<script>
import ReModal from "../ReModal.vue";
import { reactive } from "vue";
import axios from "@/plugins/axios";
export default {
  components: { ReModal },
  setup(_, { emit }) {
    // *ref 與 reactive 可以共用
    // const isPostModalOpen = ref(false);
    const state = reactive({
      isPostModalOpen: false,
      form: {
        name: "Michael Lawson",
        email: "michael.lawson@reqres.in",
        avatar: "https://reqres.in/img/faces/7-image.jpg",
      },
    });

    function post() {
      axios.post("/users", state.form).then((response) => {
        // *即時呈現
        emit("new-user-pushed", response.data);
        // state.users.push(response.data);
      });
      state.isPostModalOpen = false;
      state.form.name = "";
      state.form.email = "";
      state.form.avatar = "";
    }

    return { state, post };
  },
};
</script>

<style>
</style>