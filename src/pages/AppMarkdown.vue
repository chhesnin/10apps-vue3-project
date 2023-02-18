<template lang='pug'>
.app-markdown
  h1.title Markdown
  section
    article.left
      //- *@input=""+:value=""
      //- *@change focus out 才會觸發
      textarea(:value="text", @input="update", ref="markdownTextareaRef")
    article.right(v-html="getMdText")
</template>

<script>
// *Lifecycle Hooks
// beforeCreate() {
//   console.log("before create");
// },
// created() {
//   console.log("created");
// },
// beforeMount() {
//   console.log("before mount");
// },
// mounted() {
//   console.log("mounted");
// },
// // *當 path 改變, 先 unmount 原先的元件並 mount 新的元件
// beforeUnmount() {
//   console.log("before unmount");
// },
// unmounted() {
//   console.log("unmounted");
// },
// // *當元件內的資料更新時觸發
// beforeUpdate() {
//   console.log("before update");
// },
// updated() {
//   console.log("updated");
// },
// *merge 在此定義的同名 data、computed、methods 會覆蓋 mixins 的內容

import { marked } from "marked";
import useDebounce from "../utilities/composition/useDebounce";
// import { ref, onMounted } from "vue";
export default {
  // ***issue
  // setup() {
  //   const text = ref("");
  //   const debounce = ref("");
  //   const markdownTextareaRef = ref("");

  //   onMounted(() => {
  //     const [debounceComposition] = useDebounce();
  //     debounce.value = debounceComposition;
  //     markdownTextareaRef.value.focus();
  //   });

  //   function update(evt) {
  //     const task = () => {
  //       text.value = evt.target.value;
  //     };
  //     debounce.value(task, 500);
  //     console.log("update");
  //   }

  //   function getMdText() {
  //     return marked(text.value);
  //   }

  //   return { text, update, getMdText };
  // },

  data() {
    return {
      text: "",
      debounce: "",
    };
  },
  mounted() {
    // *在 methods 中使用 composition
    // *加 {} 因為有 return{}
    const [debounce] = useDebounce();
    this.debounce = debounce;
    this.$refs.markdownTextareaRef.focus();
  },
  computed: {
    getMdText() {
      return marked(this.text);
    },
  },
  methods: {
    update(evt) {
      const task = () => {
        this.text = evt.target.value;
      };
      this.debounce(task, 500);
    },
  },
};
</script>

<style lang='sass'>
=size($w,$h:$w)
  width: $w
  height: $h

.app-markdown
  display: flex
  flex-direction: column
  margin-top: 30px
  // ***100vh 100%視窗高度
  // height: calc(100vh - 150px)
  *
    box-sizing: border-box
  .title
    text-align: center
    letter-spacing: 1px
  section
    // border: 1px solid #000
    display: flex
    height: 460px
    margin: 0px 150px
    @media screen and (max-width: 880px)
      flex-direction: column
      margin: 0px 30px 45px 30px
    article
      flex: 1
      margin: 15px
      &.right
        border: 2px solid #ddd
        border-radius: 5px
        background-color: #eee
        padding: 10px
        flex-wrap: wrap
        h1,h2,h3,h4,h5,h6,p
          margin: 0
      textarea
        +size(100%)
        font-size: 16px
        padding: 10px
        border-radius: 5px
        &:focus
          outline: none
          border: 2px solid rgba(#177089,0.8)
          border-radius: 5px
</style>