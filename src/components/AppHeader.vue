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
    .login.link.right(@click="$emit('open-login-modal')") login
</template>

<script>
export default {
  data() {
    return {
      pages: [
        { title: "MarvelHeroes", to: "/marvel-heroes" },
        { title: "Calendar", to: "/app-calendar" },
        { title: "Markdown", to: "/app-markdown" },
        { title: "Slider", to: "/app-slider" },
      ],
    };
  },
};
</script>

<style lang='sass'>
.app-header
  // border: 1px solid #000
  width: 100%
  padding: 20px
  box-sizing: border-box
  background: linear-gradient(180deg, rgba(#177089,0.7) 0% 60%, transparent 100%)
  color: #eee
  display: flex
  justify-content: space-between
  .apps
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
  .login
    float: right
</style>