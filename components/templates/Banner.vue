<script setup lang="ts">
export type BannerProps = {
    title: string;
    description: string;
}
defineProps<BannerProps>();
</script>

<template>
    <div class="bg-custom-gradient rounded-3xl">
        <div
            class="bg-image w-full h-full rounded-3xl space-y-6 md:space-x-6 md:flex md:justify-evenly md:items-center p-12 md:p-24 2xl:p-32">
            <div class="w-full md:w-1/2">
                <h2 class="text-4xl font-bold text-white font-space">{{ title }}</h2>
                <p class="text-secondary-200 font-normal text-lg font-inter mt-2">{{ description }}</p>
            </div>
            <div class="w-full md:w-1/2 md:flex md:items-center md:justify-end">
                <NuxtLink to="/contact">
                    <LuiButton color="danger" rounded="full" size="lg">
                        Let's discuss your project
                        <template #append>
                            <i class="ri-arrow-right-up-line" />
                        </template>
                    </LuiButton>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>


<style scoped>
.bg-image {
    background-image: url('/images/banner-bg.png');
    background-size: cover;
    background-position: center;
}
</style>