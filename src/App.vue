// {{ Vue & JavaScrip }} // v-html具危險性 *XSS prone 
// v-if中亦可直接使用boolean或運算式 
// v-if remove / v-show hidden 
// v-text == {{..}} *但v-text無法在前後加文字 
// v-once 只渲染元素一次 // v-for="arr (value,index) in ../ obj (value,key) in .." 
// v-bind 將屬性與Vue資料綁定 *即便如disabled等沒有=""的屬性, 亦可v-bind: 
// :[Vue資料]="Vue資料" *動態屬性綁定 
// v-model="Vue資料" 
// v-model.trim 移除space 
// v-model.lazy focus out元素觸發更新 
// v-model.number 綁定型別 
// @click="" 
// @keydown="" *需先click button 
// button(type="submit") 提交form到伺服器 
// @event.prevent="" 避免event的dafault action觸發 
// Vue中的this用來表示其為Vue的資料 
// push/pop | unshift/shift 
// 計算屬性是cached, 當依賴的資料變動時才會recomputed 
// 計算屬性除getter外, 可以有setter, 在其被重新設定時觸發 
// :key="Vue資料" 當其中的Vue資料變動時, key變動, 並重新渲染畫面

<template lang="pug">
//- *不用縮排
.app
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

<style lang="sass">
*
  // border: 1px solid #000

html,body
  height: 100%
  // 下層只有一個元素的置中
  display: flex
  justify-content: center
.app
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
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
