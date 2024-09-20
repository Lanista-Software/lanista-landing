type ScrollState = 'manual' | 'auto';
const scrollState = ref<ScrollState>('manual');

export function useScrollState() {
    function setScrollState(state: ScrollState) {
        scrollState.value = state;
    }
    return {
        scrollState,
        setScrollState,
    }
}