import { ref } from "vue";
export default function useDebounce() {
  const timer = ref("");

  function debounce(func, wait = 1000) {
    clearTimeout(timer.value);
    timer.value = setTimeout(func, wait);
  }
  
  return { debounce };
}