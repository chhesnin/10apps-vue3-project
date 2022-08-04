<template lang='pug'>
nav.app-header 
  a.logo(href="https://www.google.com/", target="_blank") App Header
  .about About
  .contact Contact
</template>

<script>
export default {};
</script>

<style lang='sass'>
.app-header
  // border: 1px solid #000
  width: 100%
  padding: 20px
  background: linear-gradient(180deg, rgba(#177089,0.7) 0% 60%, transparent 100%)
  color: #eee
  .logo
    margin-left: 20px
    // *移除a的預設樣式
    text-decoration: none
    color: #eee
  .about,.contact
    // *2個element可用jc, 2個以上用float
    float: right
    margin: 0px 10px
</style>