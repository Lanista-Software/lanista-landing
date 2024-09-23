<script setup lang="ts">
export type TabItem = {
    logo: string;
    title: string;
    description: string;
    category: string;
    link: string;
}
export type TabSectionProps = {
    items: TabItem[];
    title: string;
    description: string;
}

const activeIndex = ref(0);
const props = defineProps<TabSectionProps>();

const filteredCategories: Record<string, TabItem[]> = props.items.reduce((groups: Record<string, TabItem[]>, item: TabItem) => {
    const category = item.category;
    if (!groups[category]) {
        groups[category] = [];
    }
    groups[category].push(item);
    return groups;
}, {});
</script>

<template>
    <MolAppSectionLayout :title="title" :description="description">
        <div class="w-full">
            <div v-if="Object.keys(filteredCategories).length" class="overflow-x-scroll">
                <LuiTabGroup :selected-index="activeIndex">
                    <!-- Tab Buttons -->
                    <LuiTabButtons align-tabs="center">
                        <LuiTabButton v-for="(items, category) in filteredCategories" :key="category"
                            @click="activeIndex = Object.keys(filteredCategories).indexOf(category)">
                            {{ category }}
                        </LuiTabButton>
                    </LuiTabButtons>
                    <LuiTabPanels>
                        <LuiTabPanel v-for="(items, category) in filteredCategories" :key="category" :id="category">
                            <ul>
                                <li v-for="item in items" :key="item.title"
                                    class="flex items-center justify-between py-5 border-b border-border-color space-x-8 last:border-b-0">
                                    <div>

                                        <LuiAvatar :src="item.logo" color="secondary" size="xl" rounded="full" />
                                    </div>
                                    <p class="text-sm text-body-text">{{ item.description }}</p>
                                    <!-- Sağdaki ok simgesi, teknoloji linkine gider -->
                                    <NuxtLink :to="item.link" class="text-xl text-muted-text">
                                        <i class="ri-arrow-right-up-line"></i>
                                    </NuxtLink>
                                </li>
                            </ul>
                        </LuiTabPanel>
                    </LuiTabPanels>
                </LuiTabGroup>
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
