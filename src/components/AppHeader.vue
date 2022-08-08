<template lang='pug'>
nav.app-header 
  router-link.link(to="/") Home
  //- *v-for
  router-link.link.right(v-for="page in pages", :to="page.to", :key="page.to") {{ page.title }}
</template>

<script>
export default {
  data() {
    return {
      pages: [
        { title: "Markdown", to: "/app-markdown" },
        { title: "Calendar", to: "/app-calendar" },
        { title: "MarvelHeroes", to: "/marvel-heroes" },
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
  .link
    margin-left: 20px
    // *移除a的預設樣式
    text-decoration: none
    color: #eee
    &.right
      // *2個element可用jc, 2個以上用float
      float: right
      margin: 0px 10px
      font-size: 14px
</style>