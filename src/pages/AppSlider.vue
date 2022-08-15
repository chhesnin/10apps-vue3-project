<template lang='pug'>
.app-slider
  //- *v-for, v-if 不能寫在一起
  //- *:style="backgroundColor/'100px'"
  .img(v-for="(slider, index) in sliders", :key="slider")
    transition(name="slide")
      .inner(
        v-if="currentSlider == index",
        :style="{ backgroundColor: slider, width: '100%', height: '400px' }"
      )
  section
    article
      .spot(
        v-for="(slider, index) in sliders",
        :key="slider",
        :class="{ active: currentSlider == index }",
        @click="currentSlider = index"
      )
    //- *transition使用於v-if
    transition(name="fade")
      h1.title(v-if="isShowing") Slider
    button(@click="isShowing = !isShowing") toggle
</template>

<script>
export default {
  data() {
    return {
      currentSlider: 0,
      timer: null,
      sliders: ["#177089", "#003c4c", "#778b91"],
      isShowing: true,
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.currentSlider = (this.currentSlider + 1) % 3;
    }, 2000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>

<style lang='sass'>
=imgCss
  height: 350px
  width: 100%
  // background-color: $color
  position: absolute

.app-slider
  display: flex
  flex-direction: column
  height: calc(100vh - 80px)
  position: relative
  .img
    +imgCss
  section
    margin-top: 360px
    display: flex
    flex-direction: column
    align-items: center
    z-index: 1
    .title
      text-align: center
      margin-top: 50px
    article
      display: flex
      .spot
        width: 10px
        height: 10px
        margin: 10px
        // *button有預設p
        padding: 0
        border-radius: 10px
        background-color: #ddd
        border: 1px solid #bbb
        cursor: pointer
        box-shadow: 0px 0px 5px rgba(black,0.2)
        &.active
          background-color: #c43131
    button
      padding: 5px 10px
.fade-enter-active,.fade-leave-active
  // *
  transition: opacity 0.5s ease
// .fade-enter-from,.fade-leave-to
//   opacity: 0
.slide-enter-active,.slide-leave-active
  transition: 2s ease
.slide-enter-from
  opacity: 1
  transform: translateX(100%)
.slide-leave-to
  opacity: 0
  transform: translateX(0%)
</style>