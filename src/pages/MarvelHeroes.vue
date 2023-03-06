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
// setup(){} 不使用 this
// setup(){} 與舊架構相容
// ref() make things reactive *ref().value *use const
// ref: 可以接受任何型態的資料，但是不會對物件或陣列內部的屬性變動做監聽。
// reactive: 只能接受 Object 或 Array，會對內部的屬性變動做深層的監聽，取資料時不需要 .value。
// Lifecycle Hooks 加 on, 需 import
// computed 需 import

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

    // *記得 return
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
  padding-bottom: 60px
  @media screen and (max-width: 576px)
    padding: 0px 45px 60px 45px
  .title
    letter-spacing: 1px
  h4
    margin: 0px
  ul
    list-style: none
    padding-left: 0
    width: 300px
    @media screen and (max-width: 576px)
      width: 100%
    li
      border: 1px solid #aaa
      border-radius: 5px
      padding: 10px
      margin: 10px 0px
      // *運用 df 與 jc:space-between 將容器內的元素左右擺
      display: flex
      justify-content: space-between
      transition: 0.5s
      &:hover
        background-color: #eee
        transform: translateY(-3px)
      .remove
        // *float 在上層容器的左右邊
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
    @media screen and (max-width: 576px)
      width: 100%
      button
        font-size: 13px
</style>