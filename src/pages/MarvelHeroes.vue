<template lang='pug'>
.marvel-heroes
  h1.title MARVEL Heroes
  h4 {{ heroesCount }}
  ul
    li(v-for="(hero, index) in heroes", v-bind:key="hero.name") 
      span {{ hero.name }}
      button.remove(@click="removeHero(index)") x
  form(@submit.prevent="addHero")
    input.input(
      v-model="newHero",
      placeholder="Type Hero Name Here",
      ref="newHeroRef"
    )
    button.add(type="submit") Add Hero
</template>

<script>
// setup(){} 不使用this
// setup(){} 與舊架構相容
// ref() make things reactive *ref().value *use const
// Lifecycle Hooks 加on, 需import
// computed 需import

import { onMounted, ref, computed } from "vue";
export default {
  setup() {
    const newHeroRef = ref("");
    const newHero = ref("");
    const heroes = ref([
      { name: "Iron Man" },
      { name: "Captain America" },
      { name: "Scarlet Witch" },
      { name: "Spider-Man" },
      { name: "Doctor Strange" },
    ]);
    // console.log(heroes);

    onMounted(() => {
      newHeroRef.value.focus();
    });

    const heroesCount = computed(() => heroes.value.length);

    function addHero() {
      if (newHero.value !== "") {
        heroes.value.push({ name: newHero.value });
        newHero.value = "";
      }
    }
    function removeHero(index) {
      heroes.value = heroes.value.filter((hero, hid) => hid != index);
    }

    // *記得return
    return { heroes, newHero, removeHero, addHero, newHeroRef, heroesCount };
  },
};
</script>

<style lang='sass'>
.marvel-heroes
  display: flex
  flex-direction: column
  align-items: center
  margin-top: 30px
  .title
    letter-spacing: 1px
  h4
    margin: 0px
  ul
    list-style: none
    padding-left: 0
    width: 300px
    li
      border: 1px solid #aaa
      border-radius: 5px
      padding: 10px
      margin: 10px 0px
      // *運用df與jc:space-between將容器內的元素左右擺
      display: flex
      justify-content: space-between
      transition: 0.5s
      &:hover
        background-color: #eee
        transform: translateY(-3px)
      .remove
        // *float在上層容器的左右邊
        // float: right
        padding: 0
        width: 20px
        height: 20px
        border: 1px solid #ddd
        border-radius: 20px
        display: flex
        justify-content: center
        align-items: center
        transition: 0.3s
        &:hover
          background-color: #c43131
          color: #fff
  form
    width: 300px
    display: flex
    justify-content: space-between
</style>