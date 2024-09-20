<script setup lang="ts">
import type { AppCardProps } from '../mol/AppCard.vue';
export type CardSectionProps =  {
    items: AppCardProps[];
    view: 'grid' | 'single' | 'triple';
    title: string;
    description: string;
}


const props = defineProps<CardSectionProps>();
const getCardClass = (index: number) => {
    if (props.view === 'grid') {
        const rowPattern = [2, 3];
        const totalPattern = rowPattern.reduce((acc, num) => acc + num, 0);
        const positionInPattern = index % totalPattern;

        if (positionInPattern < 2) {
            return 'lg:col-span-3';
        } else {
            return 'lg:col-span-2';
        }
    } else if (props.view === 'single') {
        return 'lg:col-span-6';
    } else {
        return 'lg:col-span-2';
    }
};
</script>
<template>
    <MolAppSectionLayout :title="title" :description="description">
        <div class="grid grid-cols-1 lg:grid-cols-6 gap-8 w-full">
            <div v-for="(item, index) in items" :key="index" :class="getCardClass(index)">
                <MolAppCard :item="item" />
            </div>
        </div>
        <template #button>
            <slot name="button">
                <NuxtLink to="#home">
                    <LuiButton rounded="full" color="danger" to="/contact">Let's discuss your project
                        <template #append>
                            <i class="ri-arrow-right-up-line"></i>
                        </template>
                    </LuiButton>
                </NuxtLink>
            </slot>
        </template>
    </MolAppSectionLayout>
</template>