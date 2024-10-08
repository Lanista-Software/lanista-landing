const isScrollLocked = ref(false);
let timeOutId = setTimeout(() => {
  isScrollLocked.value = false;
}, 1000);

export default function useScrollLock() {
  function lockScroll() {
    clearTimeout(timeOutId);
    isScrollLocked.value = true;
    timeOutId = setTimeout(() => {
      isScrollLocked.value = false;
    }, 1000);
  }

  return {
    isScrollLocked,
    lockScroll,
  };
}
