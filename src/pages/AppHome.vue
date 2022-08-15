<template lang='pug'>
.app-home
  h1.title Welcome to Vue 3
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
  // *是否以某種方式形成與上層元素區隔的空間, 會影響margin的計算
  display: flex
  flex-direction: column
  margin-top: 30px
  .title
    text-align: center
    letter-spacing: 1px
</style>