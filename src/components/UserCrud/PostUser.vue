<template lang="pug">
//- *ReModal被teleport走了，故此components只剩button.post
button.post(@click="state.isPostModalOpen = true") Post
//- *Post Modal
teleport(to="#app")
  //- *components若有template架構, CSS在components file設定
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
    // *ref與reactive可以共用
    // const isPostModalOpen = ref(false);
    const state = reactive({
      isPostModalOpen: false,
      form: {
        name: "",
        email: "",
        avatar: "",
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