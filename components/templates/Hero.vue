<script setup lang="ts">
</script>
<template>
    <div class="text-center pt-20">
        <LuiTag color="secondary" filter="lighten" size="lg" rounded="full">Development Company</LuiTag>
        <h1 class="text-heading-text text-4xl lg:text-5xl font-space font-bold mt-8 max-content">
            We create high quality dijital products for everyone.
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
            <img v-for="i in 5" :key="i" src="/images/popile.png" alt="Logo 1" class="w-auto h-8">
            <!-- <img src="/path/to/logo2.png" alt="Logo 2" class="max-w-[80px] mx-auto">
            <img src="/path/to/logo3.png" alt="Logo 3" class="max-w-[80px] mx-auto">
            <img src="/path/to/logo4.png" alt="Logo 4" class="max-w-[80px] mx-auto">
            <img src="/path/to/logo5.png" alt="Logo 5" class="max-w-[80px] mx-auto">
            <img src="/path/to/logo6.png" alt="Logo 6" class="max-w-[80px] mx-auto"> -->
        </div>
    </div>
</template>
<style scoped lang="postcss">
.max-content {
    @apply max-w-4xl mx-auto;
}
</style>