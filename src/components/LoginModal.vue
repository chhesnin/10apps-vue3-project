<template lang="pug">
.login-modal
  section(@click="$emit('close-login-modal')")
  form(@submit.prevent="submit")
    h1.title Login Modal
    label Account:
    input(v-model="form.account", placeholder="Email or Username")
    label Password:
    input(type="password", v-model="form.password", placeholder="password")
    button(type="submit") Login
</template>

<script>
export default {
  data() {
    return {
      form: {
        account: "",
        password: "",
      },
    };
  },
  method: {
    submit() {
      // submit the form
    },
  },
};
</script>

<style lang="sass">
.login-modal
  section
    width: 100vw
    height: 100vh
    // border: 1px solid #000
    // *pof+top: 0
    position: fixed
    top: 0px
    background-color: black
    opacity: 0.8
    z-index: 2
  form
    width: 330px
    background-color: #fff
    position: absolute
    z-index: 3
    left: 50%
    top: 50%
    transform: translate(-50%,-50%)
    border: 2px solid #aaa
    border-radius: 5px
    background-color: #eee
    padding: 20px 35px
    box-sizing: border-box
    *
      box-sizing: border-box
    h1.title
      text-align: center
    label
      margin-bottom: 100px
    input
      margin:
        top: 5px
        bottom: 15px
      width: 100%
      padding: 5px 10px
    button
      width: 100%
      margin: 25px 0px 30px 0px
      padding: 6px
</style>