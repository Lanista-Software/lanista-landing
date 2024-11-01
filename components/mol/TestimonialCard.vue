<script setup lang="ts">
import { LuiAvatar } from '@lui-ui/lui-vue';

export type TestimonialCardProps = {
    ID: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    title: string;
    description: string;
    status: string;
    scheduled: boolean;
    image: string;
}
defineProps<{
    item: TestimonialCardProps;
}>();

</script>

<template>
    <MolCardAnimation>
        <div class="p-6 w-full">
            <div class="flex items-center space-x-4">
                <div>
                    <NuxtImg class="border border-solid block object-contain rounded-full border-transparent w-16 h-16"
                        :src="getStaticImagePath(item.image)" :alt="getImageAlt(item.image)" width="80" height="80"
                        loading="lazy" sizes="xs:30vw sm:20vw md:10vw" />
                </div>
                <div>
                    <h3 class="text-lg font-semibold font-space text-heading-text">{{ item.name }}</h3>
                    <p class="mt-1 text-body-text font-normal">{{ item.title }}</p>
                </div>
            </div>
            <div class="pt-6">
                <p class="font-medium font-space text-heading-text">{{ item.description }}</p>
            </div>
        </div>
    </MolCardAnimation>
</template>

<style scoped></style>