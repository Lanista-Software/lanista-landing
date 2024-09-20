<script setup lang="ts">
const props = defineProps<{
    id: string; // Hash'te güncellenecek ID parametresi
}>();
const { scrollState } = useScrollState();
const observerTarget = ref(null);
const router = useRouter();
let observer: IntersectionObserver;

onMounted(() => {
    // Intersection Observer tanımlaması
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Ekrana girdiğinde hash'i güncelle
                    console.log(scrollState.value);
                    if (scrollState.value !== 'auto')
                        router.replace({ hash: `#${props.id}` })
                    else
                        scrollState.value = 'manual';
                }
            });
        },
        {
            threshold: 0.5, // Elementin %50'si görünür olduğunda tetiklenir
        }
    );

    if (observerTarget.value) {
        observer.observe(observerTarget.value);
    }
});

onBeforeUnmount(() => {
    // Component unmount olduğunda observer'ı durdur
    if (observer && observerTarget.value) {
        observer.unobserve(observerTarget.value);
    }
});
</script>
<template>
    <section :id="id" ref="observerTarget">
        <AtomsContainer class="py-20 min-h-screen flex items-center justify-center">
            <slot></slot>
        </AtomsContainer>
    </section>
</template>
