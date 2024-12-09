<script setup lang="ts">
import useScrollLock from "~/composables/scrollLock";
import type { AppCardProps } from "../mol/AppCard.vue";
import type { TestimonialCardProps } from "../mol/TestimonialCard.vue";
import type { WorksCardProps } from "../mol/WorksCard.vue";
export type CardSectionProps = {
  items: AppCardProps[] | WorksCardProps[] | TestimonialCardProps[];
  view: "grid" | "single" | "triple";
  title: string;
  description: string;
  cardComponent: "works" | "app" | "testimonial";
  disableButton?: boolean;
  closePadding?: boolean;
  button?: {
    text: string;
    link: string;
  };
};

const props = defineProps<CardSectionProps>();
const { lockScroll } = useScrollLock();
const proxy = useScriptGoogleAnalytics();
function handleClick() {
  lockScroll();
  proxy.dataLayer.push({ event: "button_clicked", button_name: "#contact" });
}
const getCardClass = (index: number) => {
  if (props.view === "grid") {
    const rowPattern = [2, 3];
    const totalPattern = rowPattern.reduce((acc, num) => acc + num, 0);
    const positionInPattern = index % totalPattern;

    if (positionInPattern < 2) {
      return "lg:col-span-3";
    } else {
      return "lg:col-span-2";
    }
  } else if (props.view === "single") {
    return "lg:col-span-6";
  } else {
    return "lg:col-span-2";
  }
};
</script>
<template>
  <MolAppSectionLayout
    :title="title"
    :description="description"
    :disable-button="disableButton"
  >
    <div class="grid grid-cols-1 lg:grid-cols-6 gap-8 w-full">
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="getCardClass(index)"
      >
        <MolAppCard
          v-if="cardComponent === 'app'"
          :item="item"
          :square="getCardClass(index) === 'lg:col-span-2'"
          :view="props.view"
          :close-padding="closePadding"
        />
        <MolWorksCard
          v-else-if="cardComponent === 'works'"
          :item="item as WorksCardProps"
        />
        <MolTestimonialCard
          v-else-if="cardComponent === 'testimonial'"
          :item="item as TestimonialCardProps"
        />
      </div>
    </div>

    <template #button-slot>
      <template v-if="button">
        <slot name="button">
          <NuxtLink :to="button.link">
            <LuiButton
              @click="handleClick"
              rounded="full"
              color="danger"
              tag="div"
              >{{ button.text }}
              <template #append>
                <i class="ri-arrow-right-up-line"></i>
              </template>
            </LuiButton>
          </NuxtLink>
        </slot>
      </template>
    </template>
  </MolAppSectionLayout>
</template>
