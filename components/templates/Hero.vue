<script setup lang="ts">
</script>

<template>
    <section class="hero-section text-center">
        <div>
            <LuiTag color="secondary" filter="lighten" size="lg" rounded="full">Development Company</LuiTag>
        </div>
        <h1 class="text-heading-text text-4xl lg:text-5xl xl:text-6xl font-space font-bold mt-8 max-content">
            We create high quality digital products for everyone.
        </h1>
        <p class="text-body-text font-normal text-lg md:text-xl mt-6 max-content">
            We help companies and startups make their products better every day. So we create high quality digital
            products for a professional look.
        </p>
        <div class="pt-8 flex items-center justify-center max-content">
            <NuxtLink to="#home">
                <LuiButton rounded="full" color="danger" to="/contact">Let's discuss your project
                    <template #append>
                        <i class="ri-arrow-right-up-line"></i>
                    </template>
                </LuiButton>
            </NuxtLink>
        </div>
        <div class="flex items-center justify-evenly pt-14 lg:pt-20 flex-wrap gap-4">
            <!-- Logo section -->
            <NuxtImg 
            v-for="i in 5" 
            :key="i" 
            src="/images/popile.png" 
            alt="Logo 1"
            class="w-auto h-8"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            format="webp"
            />
        </div>
    </section>
</template>

<style scoped lang="postcss">
.hero-section {
    @apply relative flex flex-col justify-center;
    height: calc(100vh - 15rem);
    /* Tüm aşamalarda tarayıcı yüksekliğinden 15rem çıkart */
    max-height: 1000px;
    /* Maksimum yüksekliği 1000px ile sınırla */
}

/* Büyük ekranlar için (xl ve üstü) */
@media (min-width: 1280px) {
    .hero-section {
        height: 100%;
        padding: 4rem 0;
    }
}
</style>
