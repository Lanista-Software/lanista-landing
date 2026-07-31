<script setup lang="ts">
export type Faq = {
  ID: string
  createdAt: string
  updatedAt: string
  question: string
  answer: string
  status: string
  scheduled: boolean
}
export type ContactProps = {
  faqList: Faq[]
  sections: {
    contact: {
      title: string
      description: string
    }
    faq: {
      title: string
      description: string
    }
  }
}
defineProps<ContactProps>()
const proxy = useScriptGoogleAnalytics()
function handleToggle(title: string) {
  proxy.dataLayer.push({ event: 'faq_toggled', faq_title: title })
}
</script>

<template>
  <div class="w-full space-y-16 lg:flex lg:justify-between lg:space-x-16 lg:space-y-0 2xl:space-x-24">
    <div class="flex-1">
      <div>
        <h4 class=" font-space text-3xl font-semibold">
          {{ sections.faq.title }}
        </h4>
        <p class="text-md mt-4 font-inter font-normal text-body-text">
          {{ sections.faq.description }}
        </p>
      </div>
      <div class="space-y-4 pt-8">
        <AtomsAccordion v-for="faq in faqList" :key="faq.ID" :title="faq.question" @toogle="handleToggle">
          <p class="pt-2 font-inter text-sm font-normal text-body-text">
            {{ faq.answer }}
          </p>
        </AtomsAccordion>
      </div>
    </div>
    <div class="flex-1">
      <div>
        <h4 class=" font-space text-3xl font-semibold">
          {{ sections.contact.title }}
        </h4>
        <p class="text-md mt-4 font-inter font-normal text-body-text">
          {{ sections.contact.description }}
        </p>
      </div>
      <div>
        <div class="pt-8">
          <MolContactForm />
        </div>
      </div>
    </div>
  </div>
</template>
