<script setup lang="ts">
export interface WorksCardProps {
    title: string;
    description: string;
    image?: {
        url: string;
        alt: string;
    }
    link: string;
    category?: string;

}
defineProps<{
    item: WorksCardProps;
}>();
</script>
<template>
    <MolCardAnimation>
        <div
            class="border border-border-color rounded-3xl shadow-sm space-y-6 lg:space-x-6 lg:flex lg:justify-between lg:items-center p-6 lg:p-12 2xl:p-20">
            <div class="space-y-4 lg:w-5/12">
                <LuiTag color="primary" filter="lighten" size="xl" rounded="full">{{ item.category }}</LuiTag>
                <h2 class="text-xl font-bold font-space text-heading-text">{{ item.title }}</h2>
                <p class="text-body font-normal font-inter mt-2">{{ item.description }}</p>
                <div class="pt-2">
                    <NuxtLink :to="item.link">
                        <LuiButton color="secondary" variant="outline" rounded filter="darken">
                            See live project
                            <template #append>
                                <i class="ri-arrow-right-up-line" />
                            </template>
                        </LuiButton>
                    </NuxtLink>
                </div>
            </div>
            <div v-if="item.image" class="w-full h-auto rounded-3xl overflow-hidden lg:w-7/12">
                <NuxtImg class="w-full rounded-xl h-full object-cover"
                :src="item.image.url"
                :alt="item.image.alt"
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                format="webp"
                />
            </div>
        </div>
    </MolCardAnimation>
</template>