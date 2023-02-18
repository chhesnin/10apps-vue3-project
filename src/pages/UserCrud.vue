<template lang="pug">
.user-crud
  h1.title User Crud
  section
    .post
      PostUser(@new-user-pushed="newUserPushed")
    table
      thead
        tr.head(style="color: #fff", v-if="!state.isShorterThan880")
          th Id
          th Put
          th Delete
          th First_name
          th Last_name
          th.email Email
          th.img Avatar
        tr.head(style="color: #fff", v-else)
          th Put
          th Delete
          th name
          th.img Avatar
      tbody
        tr.body(
          v-for="(user, index) in state.users",
          :key="user._id",
          :class="{ deep: index % 2 == 1 }",
          v-if="!state.isShorterThan880"
        )
          td {{ index + 1 }}
          td
            button.put(@click="getPutModalOpen(user._id)") v
          td
            button.delete(@click="destroy(user._id)") x
          td {{ getName(user, 0) }}
          td {{ getName(user, 1) }}
          td.email {{ user.email }}
          td.img(:style="{ backgroundImage: `url(${user.avatar})` }")
        tr.body(
          v-for="(user, index) in state.users",
          :key="user._id",
          :class="{ deep: index % 2 == 1 }",
          v-else
        )
          td
            button.put(@click="getPutModalOpen(user._id)") v
          td
            button.delete(@click="destroy(user._id)") x
          td {{ user.name }}
          td.img(:style="{ backgroundImage: `url(${user.avatar})` }")
    .btns
      button(:disabled="true", :class="{ disabled: true }", @click="prevPage") Prev
      button.next(
        :disabled="true",
        :class="{ disabled: true }",
        @click="nextPage"
      ) Next

  //- *Put Modal
  teleport(to="#app")
    ReModal(
      v-if="state.isPutModalOpen",
      @close-modal="state.isPutModalOpen = false"
    )
      template(#title) 
        h2 Update User
      template(#body)
        form(@submit.prevent="put")
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
          button(type="submit") Update

  //- ul.users
  //-   li(v-for="user in state.users.data", :key="user.id")
  //-     h3 {{ user.first_name }} {{ user.last_name }}
  //-     .img(:style="{ backgroundImage: `url(${user.avatar})` }")
  //-     h6 Email: {{ user.email }}
</template>

<script>
import { onMounted, reactive } from "vue";
import axios from "../plugins/axios";
// *需要.vue
import ReModal from "../components/ReModal.vue";
import PostUser from "../components/UserCrud/PostUser.vue";
import useWindowEvent from "../utilities/composition/useWindowEvent";
export default {
  components: { ReModal, PostUser },
  setup() {
    const state = reactive({
      users: [],
      isPutModalOpen: false,
      updateUserId: "",
      form: {
        name: "Tobias Funke",
        email: "tobias.funke@reqres.in",
        avatar: "https://reqres.in/img/faces/9-image.jpg",
      },
      isShorterThan880: false,
    });
    onMounted(() => {
      axios.get(`/users`).then((response) => {
        state.users = response.data;
      });
    });
    function handleResize() {
      if (window.innerWidth < 880) {
        state.isShorterThan880 = true;
      } else {
        state.isShorterThan880 = false;
      }
    }
    useWindowEvent("resize", handleResize);
    handleResize();
    function prevPage() {
      axios.get(`/users?page=1`).then((response) => {
        state.users = response.data;
      });
    }
    function nextPage() {
      axios.get(`/users?page=2`).then((response) => {
        state.users = response.data;
      });
    }
    function getName(user, index) {
      return user.name.split(" ")[index];
    }
    function destroy(userId) {
      // *在 API 上移除
      axios.delete(`/users/${userId}`);
      // *在畫面上移除
      state.users = state.users.filter((user) => user._id !== userId);
    }
    function getPutModalOpen(userId) {
      state.isPutModalOpen = true;
      state.updateUserId = userId;
    }
    function put() {
      // *在 API 上更新
      axios.put(`/users/${state.updateUserId}`, state.form).then(() => {
        // *put 後再次 get，重新渲染畫面
        axios.get(`/users`).then((response) => {
          state.users = response.data;
        });
      });
      state.updateUserId = "";
      state.isPutModalOpen = false;
      state.form.name = "";
      state.form.email = "";
      state.form.avatar = "";
    }
    function newUserPushed(data) {
      state.users.push(data);
    }

    return {
      state,
      prevPage,
      nextPage,
      getName,
      destroy,
      getPutModalOpen,
      put,
      newUserPushed,
    };
  },
};
</script>

<style lang="sass">
// *
// .user-crud table tr th
//   color: #fff
.user-crud
  display: flex
  flex-direction: column
  align-items: center
  margin-top: 30px
  .title
    letter-spacing: 1px
    text-align: center
  section
    padding: 0px 60px 60px 60px
    box-sizing: border-box
    display: flex
    flex-direction: column
    max-width: 800px
    width: 100%
    @media screen and (max-width: 576px)
      padding: 0px 45px 60px 45px
    // *
      margin-left: auto
      margin-right: auto
    .post
      display: flex
      justify-content: end
      margin-bottom: 5px
      // *component 若是一般 tag/class/id, CSS 可在使用處設定
      button.post
        padding: 5px 30px
    table
      border-radius: 5px
      background-color: #eee
      tr
        display: flex
        &.head
          background-color: #aaa
          // color: #fff
          border-radius: 5px 5px 0px 0px
        &.body
          background-color: #eee
          // *
          border: 2px solid transparent
          transition: 0.5s
          &.deep
            background-color: #ddd
          &:hover
            border: 2px solid rgba(#177089,0.2)
            background-color: rgba(#177089,0.2)
        th,td
          flex: 1
          display: flex
          justify-content: center
          align-items: center
          padding: 10px
          font-weight: 500
          &.email
            flex: 3
          &.img
            flex: 2
        td
          button.delete,button.put
            padding: 0
            width: 20px
            height: 20px
            border: 1px solid #ddd
            border-radius: 20px
            display: flex
            justify-content: center
            align-items: center
            transition: 0.3s
            &:hover
              background-color: #c43131
              color: #fff
          button.put
            &:hover
              background-color: #177089
        td.img
          flex: 2
          // background-image: url("https://reqres.in/img/faces/1-image.jpg")
          background-size: cover
          background-position: center center
          width: 100%
          height: 100px
          margin: 5px
    .btns
      margin-top: 10px
      button
        padding: 5px 30px
        &.disabled
          color: #ddd
          border: 1.5px solid #ddd
          // *取消 hover 效果
          pointer-events: none
      button.next
        float: right
  // ul
  //   display: flex
  //   // *換行
  //   flex-wrap: wrap
  //   justify-content: center
  //   margin: 0px 30px 30px 30px
  //   padding-left: 0
  //   *
  //     box-sizing: border-box
  //   li
  //     list-style: none
  //     border: 2px solid #ddd
  //     border-radius: 5px
  //     background-color: #eee
  //     width: calc(100%/3 - 60px)
  //     padding: 20px 0px
  //     margin: 20px
  //     display: flex
  //     flex-direction: column
  //     align-items: center
  //     box-shadow: 0px 0px 10px rgba(black,0.2)
  //     transition: 0.5s
  //     &:hover
  //       transform: translateY(-10px)
  //       border: 2px solid rgba(#177089,0.2)
  //       background-color: rgba(#177089,0.2)
  //       box-shadow: 0px 10px 20px rgba(black,0.2)
  //     .img
  //       // background-image: url("https://reqres.in/img/faces/1-image.jpg")
  //       background-size: cover
  //       background-position: center center
  //       width: 150px
  //       height: 150px
</style>