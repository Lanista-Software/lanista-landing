<script setup>

const faqList = [
    {
        ID: 1,
        soru: 'What is Contentrain?',
        cevap: 'Contentrain is a platform that connects content creators with brands. We help brands to find the right content creators for their campaigns and help content creators to find the right brands to work with.'
    },
    {
        ID: 2,
        soru: 'How can I join Contentrain?',
        cevap: 'You can join Contentrain by signing up on our website. After signing up, you can create your profile and start applying for campaigns.'
    },
    {
        ID: 3,
        soru: 'How can I create a campaign on Contentrain?',
        cevap: 'You can create a campaign on Contentrain by signing up as a brand. After signing up, you can create your campaign and start receiving applications from content creators.'
    },
    {
        ID: 4,
        soru: 'How can I apply for a campaign on Contentrain?',
        cevap: 'You can apply for a campaign on Contentrain by signing up as a content creator. After signing up, you can create your profile and start applying for campaigns.'
    },
    {
        ID: 5,
        soru: 'How can I contact Contentrain?',
        cevap: 'You can contact Contentrain by sending an email to  [email protected] or by joining our discord server.'
    },
]

</script>

<template>
    <div class="w-full space-y-16 lg:space-y-0 lg:space-x-16 2xl:space-x-24 lg:flex lg:justify-between">
        <div class="flex-1">
            <div>
                <h5 class=" text-3xl font-space font-semibold">FAQ’s</h5>
                <p class="font-normal font-inter text-md text-body-text mt-4">Browse through the FAQs to get quick
                    answers or
                    if the answers don’t match your needs feel free to join us on Contentrain's discord server for more
                    help. </p>
            </div>
            <div class="pt-8 space-y-4">
                <AtomsAccordion v-for="faq in faqList" :key="faq.ID" :title="faq.soru">
                   <p class="pt-2 font-normal font-inter text-sm text-body-text"> {{ faq.cevap }}</p>
                </AtomsAccordion>
            </div>

        </div>
        <div class="flex-1">
            <div>
                <h5 class=" text-3xl font-space font-semibold">Drop your message</h5>
                <p class="font-normal font-inter text-md text-body-text mt-4">Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Varius mi amet nunc, urna. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div>
                <div class="pt-8">
                    <MolContactForm />
                </div>
            </div>
        </div>
    </div>
</template>
