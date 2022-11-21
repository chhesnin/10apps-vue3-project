<template lang="pug">
.re-modal
  section(@click="closeModal")
  .modal
    //- div Normal Way.
    //- *在此元件的使用處，定義 child
    //- *在此元件的使用處，無定義任何內容(//也不可有), 則使用元件定義處 slot 下層的內容
    //- *使用 v-slot 與 template 讓 components reusable
    h2
      slot(name="title")
    main
      slot(name="body")
</template>

<script>
export default {
  // *setup(){}, props 留空, 引入 emit
  // *不能直接用 click, 因需判斷只有點擊 section 才會觸發
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
    h2
      text-align: center
    form
      display: flex
      flex-direction: column
      // *App.vue 的設定
      button
        padding: 5px 10px
        cursor: pointer
        border: 1.5px solid #aaa
        border-radius: 5px
        transition: 0.1s
        &:hover
          background-color: rgba(#177089,0.8)
          color: #eee
          border: 1.5px solid rgba(#177089,0.8)
          border-radius: 5px
      input
        font-size: 16px
        padding: 5px 10px
        border: 1.5px solid #aaa
        border-radius: 5px
        transition: 0.1s
        &:focus
          outline: none
          border: 1.5px solid rgba(#177089,0.8)
          border-radius: 5px
      // *此 component 設定
      label,input
        width: 100%
        margin: 5px 0px
        box-sizing: border-box
      button
        margin: 20px 0px
        padding: 6px
</style>