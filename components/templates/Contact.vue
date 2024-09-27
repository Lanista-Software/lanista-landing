<script setup lang="ts" >

export type Faq = {
    ID: string;
    createdAt: string;
    updatedAt: string;
    question: string;
    answer: string;
    status: string;
    scheduled: boolean;
}
export type ContactProps = {
    faqList: Faq[];
    sections: {
        contact: {
            title: string;
            description: string;
        },
        faq: {
            title: string;
            description: string;
        }
    }
}
defineProps<ContactProps>();
</script>

<template>
    <div class="w-full space-y-16 lg:space-y-0 lg:space-x-16 2xl:space-x-24 lg:flex lg:justify-between">
       <div class="flex-1">
            <div>
                <h5 class=" text-3xl font-space font-semibold">{{ sections.faq.title }}</h5>
                <p class="font-normal font-inter text-md text-body-text mt-4"> {{ sections.faq.description }} </p>
            </div>
            <div class="pt-8 space-y-4">
                <AtomsAccordion v-for="faq in faqList" :key="faq.ID" :title="faq.question">
                   <p class="pt-2 font-normal font-inter text-sm text-body-text"> {{ faq.answer }}</p>
                </AtomsAccordion>
            </div>

        </div>
        <div class="flex-1">
            <div>
                <h5 class=" text-3xl font-space font-semibold">{{ sections.contact.title }}</h5>
                <p class="font-normal font-inter text-md text-body-text mt-4">{{ sections.contact.description}}</p>
            </div>
            <div>
                <div class="pt-8">
                    <MolContactForm />
                </div>
            </div>
        </div>
    </div>
</template>
