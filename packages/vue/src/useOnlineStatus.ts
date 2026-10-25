import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue';

/** État réseau du navigateur (événements online/offline), à combiner avec l'état de votre moteur de synchronisation. */
export function useOnlineStatus(): Ref<boolean> {
  const online = ref(typeof navigator === 'undefined' ? true : navigator.onLine);
  const update = () => (online.value = navigator.onLine);
  onMounted(() => {
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('online', update);
    window.removeEventListener('offline', update);
  });
  return online;
}
