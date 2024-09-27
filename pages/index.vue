<script setup lang="ts">
import sectionData from '../contentrain/sections/en.json'
import enServicesData from '../contentrain/services/en.json';
import trServicesData from '../contentrain/services/tr.json';
import trProcessData from '../contentrain/processes/tr.json';
import enProcessData from '../contentrain/processes/en.json';
import enTabItemsData from '../contentrain/tabitems/en.json';
import trTabItemsData from '../contentrain/tabitems/tr.json';
import enWorkCategoriesData from '../contentrain/workcategories/en.json';
import trWorkCategoriesData from '../contentrain/workcategories/tr.json';
import trWorksItemsData from '../contentrain/workitems/tr.json';
import enWorksItemsData from '../contentrain/workitems/en.json';
import enTestimonialsData from '../contentrain/testimonialitems/en.json';
import trTestimonialsData from '../contentrain/testimonialitems/tr.json';
import enFaqItemsData from '../contentrain/faqitems/en.json';
import trFaqItemsData from '../contentrain/faqitems/tr.json';

import type { AppCardProps } from '~/components/mol/AppCard.vue';
import type { TestimonialCardProps } from '~/components/mol/TestimonialCard.vue';
import type { WorksCardProps } from '~/components/mol/WorksCard.vue';
import type { CardSectionProps } from '~/components/templates/CardSection.vue';
import type { TabItem, TabSectionProps, TWorkCategory } from '~/components/templates/TabSection.vue';
import type { ContactProps, Faq } from '~/components/templates/Contact.vue';

const { t, locale } = useI18n()
const serviceItems = computed<AppCardProps[]>(() => locale.value === 'en' ? enServicesData as AppCardProps[] : trServicesData as AppCardProps[])
const servicesSectionDefaultPath = getDefaultPathByFieldName(sectionData, 'name', 'services', 'sections')
const processItems = computed<AppCardProps[]>(() => locale.value === 'en' ? enProcessData as AppCardProps[] : trProcessData as AppCardProps[])
const processSectionDefaultPath = getDefaultPathByFieldName(sectionData, 'name', 'process', 'sections')
const tabItems = computed<TabItem[]>(() => locale.value === 'en' ? enTabItemsData as TabItem[] : trTabItemsData as TabItem[])
const tabSectionDefaultPath = getDefaultPathByFieldName(sectionData, 'name', 'tabs', 'sections')
const worksCategories = computed<TWorkCategory[]>(() => locale.value === 'en' ? enWorkCategoriesData as TWorkCategory[] : trWorkCategoriesData as TWorkCategory[])
const workSectionDefaultPath = getDefaultPathByFieldName(sectionData, 'name', 'works', 'sections')
const workItems = computed<WorksCardProps[]>(() => locale.value === 'en' ? enWorksItemsData as WorksCardProps[] : trWorksItemsData as WorksCardProps[])
const workItemWithCategories = computed(() => workItems.value.map(item => {
    return { ...item, category: getRelationalFields(worksCategories.value, item.category)?.category }
}))
const testimoSectionDefaultPath = getDefaultPathByFieldName(sectionData, 'name', 'testimonials', 'sections')
const testimonials = computed<TestimonialCardProps[]>(() => locale.value === 'en' ? enTestimonialsData as TestimonialCardProps[] : trTestimonialsData as TestimonialCardProps[])
const faqItems = computed<Faq[]>(() => locale.value === 'en' ? enFaqItemsData as Faq[] : trFaqItemsData as Faq[])
const contactSectionDefaultPath = getDefaultPathByFieldName(sectionData, 'name', 'contact', 'sections')
const faqSectionDefaultPath = getDefaultPathByFieldName(sectionData, 'name', 'faq', 'sections')
const serviceCardProps: CardSectionProps = {
    items: serviceItems.value,
    view: 'grid',
    title: t(`${servicesSectionDefaultPath}.title`),
    description: t(`${servicesSectionDefaultPath}.description`),
    cardComponent: 'app'
}
const processCardProps: CardSectionProps = {
    items: processItems.value,
    view: 'triple',
    title: t(`${processSectionDefaultPath}.title`),
    description: t(`${processSectionDefaultPath}.description`),
    cardComponent: 'app'
}
const tabSectionProps: TabSectionProps = {
    items: tabItems.value,
    title: t(`${tabSectionDefaultPath}.title`),
    description: t(`${tabSectionDefaultPath}.description`),
    categories: worksCategories.value
}
const worksSectionProps: CardSectionProps = {
    items: workItemWithCategories.value,
    view: 'single',
    title: t(`${workSectionDefaultPath}.title`),
    description: t(`${workSectionDefaultPath}.description`),
    cardComponent: 'works'
}
const testimonialsSectionProps: CardSectionProps = {
    items: testimonials.value,
    view: 'triple',
    title: t(`${testimoSectionDefaultPath}.title`),
    description: t(`${testimoSectionDefaultPath}.description`),
    cardComponent: 'testimonial'
}
const contactAndFaqSectionProps: ContactProps = {
    faqList: faqItems.value,
    sections: {
        contact: {
            title: t(`${contactSectionDefaultPath}.title`),
            description: t(`${contactSectionDefaultPath}.description`)
        },
        faq: {
            title: t(`${faqSectionDefaultPath}.title`),
            description: t(`${faqSectionDefaultPath}.description`)
        }
    }
}
</script>
<template>
    <div>
        <!-- Home Section -->
        <MolAppSection id="home">
            <TemplatesHero />
        </MolAppSection>
        <!-- Services Section -->
        <MolAppSection id="services">
            <TemplatesCardSection v-bind="serviceCardProps" />
        </MolAppSection>
        <!-- Process Section -->
        <MolAppSection id="process">
            <TemplatesCardSection v-bind="processCardProps" />
        </MolAppSection>
        <!-- Technologies Section -->
        <MolAppSection id="technologies">
            <TemplatesTabSection v-bind="tabSectionProps" />
        </MolAppSection>
        <!-- Works Section -->
        <MolAppSection id="works">
            <TemplatesCardSection v-bind="worksSectionProps">
                <template #button>
                    <NuxtLink :to="$t(`${workSectionDefaultPath}.buttonlink`)">
                        <LuiButton variant="link" color="primary">{{ $t(`${workSectionDefaultPath}.buttontext`) }}</LuiButton>
                    </NuxtLink>
                </template>
            </TemplatesCardSection>
        </MolAppSection>
        <!-- Testimonials Section -->
        <MolAppSection id="testimonials">
            <TemplatesCardSection v-bind="testimonialsSectionProps">
                <template #button>
                    <span></span>
                </template>
            </TemplatesCardSection>
        </MolAppSection>
        <MolAppSection id="banner">
            <TemplatesBanner title="We create high quality dijital products."
                description="We help companies and startups make their products better every day. So we create high quality digital products for a professional look." />
        </MolAppSection>
        <MolAppSection id="contact" class="bg-secondary-50">
            <TemplatesContact v-bind="contactAndFaqSectionProps" />
        </MolAppSection>
    </div>
</template>
