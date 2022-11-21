<template lang='pug'>
.app-home
  h1.title 10Apps Vue3 Project
</template>

<script>
export default {
  data() {
    return {
      store: this.$store.state,
    };
  },
};
</script>

<style lang='sass'>
.app-home
  // *是否以某種方式形成與上層元素區隔的 block, 會影響 margin 的計算
  display: flex
  flex-direction: column
  margin-top: 180px
  .title
    text-align: center
    letter-spacing: 1px
</style>