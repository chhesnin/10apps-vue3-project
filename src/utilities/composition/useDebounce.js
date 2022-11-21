// *debounce(防抖): 從最後一次觸發開始，在 t秒後執行函數。因為是最後一次觸發，所以會把中間的觸發蓋掉。
// *throttle(節流): 從最初一次觸發開始，在 t秒後執行函數。中間無論觸發多少次都不會執行。

import { ref } from "vue";
export default function useDebounce() {
  const timer = ref("");

  function debounce(func, wait = 1000) {
    // *永遠使後一次蓋掉前一次
    clearTimeout(timer.value);
    timer.value = setTimeout(func, wait);
  }

  return [debounce];
}
