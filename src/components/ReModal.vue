<template lang="pug">
.re-modal
  section(@click="closeModal")
  .modal
    //- div Normal Way.
    //- *在此元件的使用處定義child
    //- *在此元件的使用處無內容(//也不可有), 則使用slot下層的定義
    //- *使用v-slot與template讓components reusable
    h4
      slot(name="title")
    main
      slot(name="body")
</template>

<script>
export default {
  // ***setup(), props留空, 引入emit
  setup(_, { emit }) {
    function closeModal() {
      emit("close-modal");
    }

    return { closeModal };
  },
};
</script>

<style lang="sass">
=size($w,$h:$w)
  width: $w
  height: $h

.re-modal
  section
    position: fixed
    +size(100vw,100vh)
    top: 0
    left: 0
    background-color: rgba(black,0.8)
  .modal
    width: 330px
    position: absolute
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
</style>