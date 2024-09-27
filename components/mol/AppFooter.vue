<script lang="ts" setup>
import socialLinks from '../../contentrain/sociallinks/sociallinks.json';
const footerData = {
    socials: socialLinks,
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
                    <a :href="social.link" target="_blank" rel="noopener noreferrer"
                        class="text-heading-text font-bold text-xl leading-none">
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
                <NuxtLink to="/#test" class="flex w-28 md:w-36 items-center space-x-2">
                    <AtomsLogo />
                </NuxtLink>
            </div>
        </AtomsContainer>
    </footer>
</template>