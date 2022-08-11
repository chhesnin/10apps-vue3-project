import { onMounted, onUnmounted } from "vue";

export default function useWindowEvent(eventName,eventFunc) {
  onMounted(() => window.addEventListener(eventName, eventFunc));
  onUnmounted(() => window.removeEventListener(eventName, eventFunc));
}
