<script setup lang="ts">
import { LuiAvatar } from '@lui-ui/lui-vue';

export type TestimonialCardProps = {
    name: string;
    title: string;
    image: {
        url: string;
        alt: string;
    };
    description: string;
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
                    <LuiAvatar :src="item.image.url" size="xl" rounded="full" :alt="item.image.alt" />
                </div>
                <div>
                    <h6 class="text-lg font-semibold font-space text-heading-text">{{ item.name }}</h6>
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