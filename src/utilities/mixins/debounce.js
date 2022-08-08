// 當方法會在不只一個component使用時, 寫mixin
// *同Vue物件的架構
export default {
  data() {
    return {
      timer: null,
    }
  },
  methods: {
    // ***debounce/throttle 目的在優化性能
    debounce(func, wait = 1000) {
      clearTimeout(this.timer);
      this.timer = null;
      this.timer = setTimeout(func, wait);
    },
  }
}