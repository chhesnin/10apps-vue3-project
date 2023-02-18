<template lang='pug'>
.app-slider
  //- *v-for, v-if 不能寫在一起
  .img(v-for="(slider, index) in sliders", :key="slider")
    transition(name="slide")
      .inner(
        v-if="currentSlider == index",
        :style="{ backgroundColor: slider, width: '100%', height: '100%' }"
      )
  section
    article
      .spot(
        v-for="(slider, index) in sliders",
        :key="slider",
        :class="{ active: currentSlider == index }",
        @click="currentSlider = index"
      )
    //- *transition 使用於 v-if
    transition(name="fade")
      h1.title(v-if="isShowing") Slider
    button(@click="isShowing = !isShowing") toggle
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
export default {
  setup() {
    const currentSlider = ref(0);
    const timer = ref(null);
    const sliders = ref(["#177089", "#003c4c", "#778b91"]);
    const isShowing = ref(true);

    onMounted(() => {
      timer.value = setInterval(() => {
        currentSlider.value = (currentSlider.value + 1) % 3;
      }, 2000);
    });

    onBeforeUnmount(() => {
      clearInterval(timer.value);
    });

    return { currentSlider, sliders, isShowing };
  },
  // data() {
  //   return {
  //     currentSlider: 0,
  //     timer: null,
  //     sliders: ["#177089", "#003c4c", "#778b91"],
  //     isShowing: true,
  //   };
  // },
  // mounted() {
  //   this.timer = setInterval(() => {
  //     this.currentSlider = (this.currentSlider + 1) % 3;
  //   }, 2000);
  // },
  // beforeUnmount() {
  //   clearInterval(this.timer);
  // },
};
</script>

<style lang='sass'>
=imgCss
  height: 350px
  width: 100%
  position: absolute

.app-slider
  display: flex
  flex-direction: column
  position: relative
  overflow: hidden
  .img
    +imgCss
    position: absolute
  section
    margin-top: 300px
    display: flex
    flex-direction: column
    align-items: center
    z-index: 1
    .title
      text-align: center
    article
      display: flex
      margin-bottom: 50px
      .spot
        width: 10px
        height: 10px
        border-radius: 10px
        margin: 10px
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