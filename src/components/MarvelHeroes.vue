<template lang='pug'>
.marvel-heroes
  h1 MARVEL Heroes {{ heroesCount }}
  ul
    li(v-for="(hero, index) in heroes", v-bind:key="hero.name") 
      span {{ hero.name }}
      button.remove(@click="removeHero(index)") x
  form(@submit.prevent="addHero")
    input(v-model="newHero", placeholder="Type Hero Name Here")
    button.add(type="submit") Add Hero
</template>

<script>
export default {
  data() {
    return {
      newHero: "",
      heroes: [
        { name: "Iron Man" },
        { name: "Captain America" },
        { name: "Scarlet Witch" },
        { name: "Spider-Man" },
        { name: "Doctor Strange" },
      ],
    };
  },
  computed: {
    heroesCount() {
      return this.heroes.length + " heroes";
    },
  },
  methods: {
    addHero() {
      if (this.newHero !== "") {
        this.heroes.push({ name: this.newHero });
        this.newHero = "";
      } else {
        this.heroes.pop();
      }
    },
    removeHero(index) {
      this.heroes = this.heroes.filter((hero, hid) => hid != index);
    },
  },
};
</script>

<style lang='sass'>
.marvel-heroes
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  h1
    margin-top: 30px
  ul
    list-style: none
    padding-left: 0
    width: 300px
    li
      border: 1px solid #000
      border-radius: 5px
      padding: 10px
      margin: 10px 0px
      // 運用df與jc:space-between將容器內的元素左右擺
      display: flex
      justify-content: space-between
      transition: 0.5s
      &:hover
        background-color: #eee
        transform: translateY(-3px)
      .remove
        // // float在上層容器的左右邊
        // float: right
        width: 20px
        height: 20px
        border: 1px solid #ddd
        border-radius: 20px
        display: flex
        justify-content: center
        align-items: center
        &:hover
          background-color: #c43131
          color: #eee
  form
    width: 300px
    display: flex
    justify-content: space-between
    input,.add
      padding: 5px 10px
    .add
      &:hover
        background-color: #41b883
        // background: linear-gradient(0deg,#41b883 0%, #41b883 50%, transparent 100%)
        color: #fff
        border: none
        border-radius: 3px
</style>