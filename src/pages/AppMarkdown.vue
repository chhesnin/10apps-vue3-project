<template lang='pug'>
.app-markdown
  h1.title Markdown
  section
    article.left
      //- @input=""+:value=""
      textarea(:value="text", @input="update", ref="markdownTextArea")
    article.right(v-html="getMdText")
</template>

<script>
import { marked } from "marked";
import debounce from "../utilities/mixins/debounce";
export default {
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
  // // *當path改變，先unmount原先的元件並mount新的元件
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
  // *merge 在此定義的同名data、computed、methods會覆蓋mixins的內容
  mixins: [debounce],
  data() {
    return {
      text: "",
    };
  },
  mounted() {
    this.$refs.markdownTextArea.focus();
  },
  computed: {
    getMdText() {
      return marked(this.text);
    },
  },
  methods: {
    update(evt) {
      const task = () => (this.text = evt.target.value);
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
  height: calc(100vh - 90px)
  *
    box-sizing: border-box
  .title
    text-align: center
    letter-spacing: 1px
  section
    // border: 1px solid #000
    display: flex
    height: 100%
    margin: 0px 40px 40px 40px
    article
      flex: 1
      margin:
        left: 10px
        right: 10px
      &.right
        border: 2px solid #ddd
        border-radius: 3px
        background-color: #eee
        padding: 10px
        flex-wrap: wrap
        h1,h2,h3,h4,h5,h6,p
          margin: 0
      textarea
        +size(100%)
        font-size: 16px
        padding: 10px
        &:focus
          outline: none
          border: 2px solid rgba(#177089,0.8)
          border-radius: 3px
</style>