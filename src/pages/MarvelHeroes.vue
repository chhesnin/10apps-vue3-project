<template lang='pug'>
.marvel-heroes
  h1.title MARVEL Heroes
  h4 {{ heroesCount }}
  ul
    li(v-for="(hero, index) in heroes", v-bind:key="hero.name") 
      span {{ hero.name }}
      button.remove(@click="removeHero(index)") x
  form(@submit.prevent="addHero")
    input.input(v-model="newHero", placeholder="Type Hero Name Here")
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
      return this.heroes.length;
    },
  },
  methods: {
    addHero() {
      if (this.newHero !== "") {
        this.heroes.push({ name: this.newHero });
        this.newHero = "";
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
        transition: 0.3s
        &:hover
          background-color: #c43131
          color: #fff
  form
    width: 300px
    display: flex
    justify-content: space-between
    .input,.add
      padding: 5px 10px
    .input
      &:focus
        outline: none
        border: 2px solid rgba(#177089,0.8)
        border-radius: 3px
</style>