<template lang="pug">
.reusable-modal
  h1.title Reusable Modal

  //- *只要是 v-if 的元素就可以用 v-transition, v-transition 底下可包含一個以上的元素
  transition(name="fade")
    ReModal(v-if="isModal1Open", @close-modal="isModal1Open = false")
      template(v-slot:title)
        //- *若 slot 的外層 tag 也帶有樣式, 結果受兩者影響
        //- *v-slot: === #
        h2.blue Modal 1
        h5 this is a h5 tag.
        p this is a p tag.
      template(v-slot:body) 
        h5 this is a h5 tag.
        p use v-slot and template to make components reusable.
  button(@click="isModal1Open = true") Open Modal 1

  ReModal(v-if="isModal2Open", @close-modal="isModal2Open = false")
    template(#title)
      h2.red Modal 2
    template(#body)
      p this is the body slot for modal2.
  button(@click="isModal2Open = true") Open Modal 2
</template>

<script>
import { ref } from "vue";
import ReModal from "../components/ReModal.vue";
export default {
  components: { ReModal },
  setup() {
    const isModal1Open = ref(false);
    const isModal2Open = ref(false);

    return { isModal1Open, isModal2Open };
  },
};
</script>

<style lang="sass">
.reusable-modal
  display: flex
  flex-direction: column
  align-items: center
  margin-top: 30px
  .title
    letter-spacing: 1px
    margin-bottom: 80px
  h2,p
    text-align: center
    &.red
      color: #c43131
    &.blue
      color: #177089
  button
    margin: 10px
.fade-enter-active,.fade-leave-active
  transition: 0.5s
.fade-enter-from,.fade-leave-to
  opacity: 0
</style>