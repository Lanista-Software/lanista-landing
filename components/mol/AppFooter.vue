<script lang="ts" setup>
const footerData = {
    socials: [
        {
            name: 'Facebook',
            link: 'https://www.facebook.com/lanistaco',
            icon: 'ri-facebook-line',
        },
        {
            name: 'Instagram',
            link: 'https://www.instagram.com/lanistaco',
            icon: 'ri-instagram-line',
        },
        {
            name: 'LinkedIn',
            link: 'https://www.linkedin.com/company/lanistaco',
            icon: 'ri-linkedin-line',
        },
        {
            name: 'Twitter',
            link: 'https://twitter.com/lanistaco',
            icon: 'ri-twitter-line',
        },
    ],
    logo: {
        link: '/',
        image: '/images/logo.svg',
    },
    centerText: '© 2021 Lanista. All rights reserved.',
}

</script>
<template>
    <footer class="border border-border-color">
        <AtomsContainer class="py-6 flex flex-col md:flex-row space-y-8 md:space-y-0 items-center justify-between">
            <div class="space-x-4">
                <template v-for="social in footerData.socials">
                    <a :href="social.link" target="_blank" rel="noopener noreferrer" class="text-heading-text font-bold text-xl leading-none">
                        <i :class="social.icon"></i>
                    </a>
                </template>
            </div>
            <div>
                <p class="text-center text-sm text-heading-text">
                    {{ footerData.centerText }}
                </p>
            </div>
            <div>
                <NuxtLink class="w-64" to="/">
                    <AtomsLogo class="w-32" />
                </NuxtLink>
            </div>
        </AtomsContainer>
    </footer>
</template>