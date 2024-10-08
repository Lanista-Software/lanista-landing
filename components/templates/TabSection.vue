<script setup lang="ts">
export type TabItem = {
  ID: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  title: string;
  description: string;
  image: string;
  status: string;
  link: string;
  scheduled: boolean;
};
export type TWorkCategory = {
  ID: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  status: string;
  scheduled: boolean;
};
export type TabSectionProps = {
  items: TabItem[];
  title: string;
  description: string;
  categories: TWorkCategory[];
};

const activeIndex = ref(0);
const props = defineProps<TabSectionProps>();
const filteredCategories = computed(() => {
  return props.items.reduce((acc: TWorkCategory[], item) => {
    const categoryObject = getRelationalFields(props.categories, item.category);
    if (!acc.some((x) => x.ID === item.category) && categoryObject) {
      acc.push(categoryObject);
    }
    return acc;
  }, []);
});
function getTabItems(category: string) {
  return props.items.filter((x) => x.category === category);
}
</script>

<template>
  <MolAppSectionLayout :title="title" :description="description">
    <div class="w-full">
      <div v-if="filteredCategories.length" class="overflow-x-scroll">
        <LuiTabGroup :selected-index="0">
          <!-- Tab Buttons -->
          <LuiTabButtons align-tabs="center" class="w-max mx-auto">
            <LuiTabButton
              v-for="(category, index) in filteredCategories"
              :key="category.ID"
              :id="category.ID"
              @click="activeIndex = index"
            >
              {{ category.category }}
            </LuiTabButton>
          </LuiTabButtons>
          <LuiTabPanels>
            <LuiTabPanel
              v-for="(category, index) in filteredCategories"
              :key="category.ID"
              :id="category.ID"
            >
              <ul>
                <li
                  v-for="item in getTabItems(category.ID)"
                  :key="item.title"
                  class="flex flex-col md:flex-row space-y-4 md:space-y-0 items-start md:items-center justify-between py-5 border-b border-border-color md:space-x-8 space-x-0 last:border-b-0"
                >
                  <div class="w-48 h-20">
                    <NuxtImg
                      loading="lazy"
                      class="w-full h-full rounded-xl object-cover"
                      :src="getStaticImagePath(item.image)"
                      :alt="item.title"
                      placeholder
                      sizes="xs:100vw sm:50vw md:33vw"
                      width="200"
                      height="80"
                    />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm text-body-text">{{ item.description }}</p>
                  </div>
                  <div>
                    <!-- Sağdaki ok simgesi, teknoloji linkine gider -->
                    <NuxtLink :to="item.link" class="text-xl text-muted-text">
                      <i class="ri-arrow-right-up-line"></i>
                    </NuxtLink>
                  </div>
                </li>
              </ul>
            </LuiTabPanel>
          </LuiTabPanels>
        </LuiTabGroup>
      </div>
    </div>

    <template #button-slot>
      <slot name="button">
        <NuxtLink to="#contact">
          <LuiButton rounded="full" color="danger"
            >Let's discuss your project
            <template #append>
              <i class="ri-arrow-right-up-line"></i>
            </template>
          </LuiButton>
        </NuxtLink>
      </slot>
    </template>
  </MolAppSectionLayout>
</template>
