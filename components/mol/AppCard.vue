<script setup lang="ts">
export interface AppCardProps {
    title: string;
    description: string;
    image?: string;
    icon?: string;
    status: string;
    scheduled: boolean;
    createdAt: string;
    updatedAt: string;
}
defineProps<{
    item: AppCardProps;
}>();
</script>
<template>
    <MolCardAnimation>
        <div class="border border-border-color p-6 rounded-3xl shadow-sm">
            <div v-if="item.image" class="h-64 rounded-3xl overflow-hidden">
                <NuxtImg loading="lazy" class="w-full rounded-xl h-full object-cover"
                    :src="getStaticImagePath(item.image)" :alt="getImageAlt(item.image)" placeholder
                    sizes="xs:100vw sm:50vw md:33vw" format="webp" width="640" height="360" />
            </div>
            <div v-else-if="item.icon" class="">
                <LuiAvatar filter="lighten" color="success" size="xl" rounded="full">
                    <template #icon>
                        <i :class="item.icon"></i>
                    </template>
                </LuiAvatar>
            </div>
            <h2 class="text-xl font-bold font-space mt-8 text-heading-text">{{ item.title }}</h2>
            <p class="text-body font-normal font-inter mt-2">{{ item.description }}</p>
        </div>
    </MolCardAnimation>
</template>
