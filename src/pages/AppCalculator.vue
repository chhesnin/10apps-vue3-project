<template lang="pug">
.app-calculator
  h1.title Calculator
  .calculate
    section.top
      h1.result {{ currentNum }}
      p(v-if="selectedOperation") {{ prevNum }} {{ selectedOperation }} {{ currentNum }}
    section.bottom
      button.number(@click="pressed(1)") 1
      button.number(@click="pressed(2)") 2
      button.number(@click="pressed(3)") 3
      button(@click="pressed('+')") +
      button.number(@click="pressed(4)") 4
      button.number(@click="pressed(5)") 5
      button.number(@click="pressed(6)") 6
      button(@click="pressed('-')") -
      button.number(@click="pressed(7)") 7
      button.number(@click="pressed(8)") 8
      button.number(@click="pressed(9)") 9
      button(@click="pressed('*')") *
      button(@click="pressed('c')") C
      button.number(@click="pressed(0)") 0
      button.equal(@click="pressed('=')") =
      button(@click="pressed('/')") /
</template>

<script>
import { ref } from "vue";
import useWindowEvent from "../utilities/composition/useWindowEvent";
export default {
  setup() {
    const currentNum = ref("");
    // *Array.includes()
    const operations = ["+", "-", "*", "/"];
    // *typeof event.key == "string"
    // *Array.includes() 不允許強制轉型, 改用 Array.find()
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const prevNum = ref("");
    const selectedOperation = ref("");

    // *keydown event
    function KeydownFn(evt) {
      pressed(evt.key);
      // console.log(evt.key);
    }
    // *在 setup(){} 中，直接使用 composition
    useWindowEvent("keydown", KeydownFn);

    function pressed(value) {
      if (value === "=" || value === "Enter") calculate();
      else if (value === "c") clear();
      else if (operations.includes(value)) applyOperation(value);
      else if (numbers.find((num) => num == value)) appendNumber(value);
    }

    function appendNumber(value) {
      currentNum.value += value;
    }

    function applyOperation(value) {
      // *先處理先前的運算
      calculate();
      prevNum.value = currentNum.value;
      selectedOperation.value = value;
      currentNum.value = "";
    }

    function calculate() {
      if (selectedOperation.value === "+") add();
      else if (selectedOperation.value === "-") subtract();
      else if (selectedOperation.value === "*") multiply();
      else if (selectedOperation.value === "/") divide();
      prevNum.value = "";
      selectedOperation.value = "";
    }
    function add() {
      currentNum.value = parseInt(prevNum.value) + parseInt(currentNum.value);
      // console.log(typeof prevNum.value, typeof currentNum.value);
    }
    function subtract() {
      currentNum.value = prevNum.value - currentNum.value;
    }
    function multiply() {
      currentNum.value = prevNum.value * currentNum.value;
    }
    function divide() {
      currentNum.value = prevNum.value / currentNum.value;
    }

    function clear() {
      currentNum.value = "";
    }

    // *return 外面需用的資料就好
    return {
      currentNum,
      prevNum,
      selectedOperation,
      pressed,
    };
  },
};
</script>

<style lang="sass">
.app-calculator
  display: flex
  flex-direction: column
  align-items: center
  margin-top: 30px
  .title
    letter-spacing: 1px
    margin-bottom: 20px
  section
    display: flex
    // *calc(加上單位)
    width: calc(200px + 40px)
    flex-wrap: wrap
    justify-content: end
    &.top
      height: 100px
      overflow: hidden
      display: flex
      flex-direction: column
      align-items: end
    .result
      margin: 5px
      letter-spacing: 4px
    p
      margin: 10px
      letter-spacing: 1px
      color: rgba(#177089,0.8)
    button
      width: 50px
      height: 50px
      margin: 5px
      // vertical-align: top
      box-shadow: 0px 0px 5px rgba(black,0.4)
      &:hover
        box-shadow: none
      &.number
        &:hover
          background-color: rgba(#177089,0.2)
          color: black
          font-weight: 700
          border: 1.5px solid rgba(#177089,0.4)
          border-radius: 5px
          box-shadow: none
      &.equal
        &:hover
          background-color: rgba(#c43131,0.5)
          border: 1.5px solid rgba(#c43131,0.8)
          box-shadow: none
</style>