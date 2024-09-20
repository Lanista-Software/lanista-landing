<template>
    <div class="grid grid-cols-1 lg:grid-cols-6 gap-6 w-full">
        <div v-for="(item, index) in items" :key="index" :class="getCardClass(index)">
            <!-- Kart içeriği -->
            <div class="border border-border-color p-8 rounded-lg shadow-sm">
                <div class="h-64 rounded-md overflow-hidden">
                    <img class="w-full h-full object-cover" src="https://placehold.co/600x400" :alt="item.description">
                </div>
                <h2 class="text-xl font-bold font-space mt-8 text-heading-text">{{ item.title }}</h2>
                <p class="text-body font-normal font-inter mt-2">{{ item.description }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const getCardClass = (index: number) => {
    const rowPattern = [2, 3];
    const totalPattern = rowPattern.reduce((acc, num) => acc + num, 0);
    const positionInPattern = index % totalPattern;

    if (positionInPattern < 2) {
        return 'lg:col-span-3';
    } else {
        return 'lg:col-span-2';
    }
};

const items = [
    { title: 'Web Development', description: 'We create high quality dijital products for everyone.' },
    { title: 'Mobile Development', description: 'We create high quality dijital products for everyone.' },
    { title: 'UI/UX Design', description: 'We create high quality dijital products for everyone.' },
    { title: 'SEO Optimization', description: 'We create high quality dijital products for everyone.' },
    { title: 'Social Media Marketing', description: 'We create high quality dijital products for everyone.' },
    { title: 'Content Marketing', description: 'We create high quality dijital products for everyone.' },
    { title: 'E-Commerce Solutions', description: 'We create high quality dijital products for everyone.' },
    { title: 'Digital Marketing', description: 'We create high quality dijital products for everyone.' },
    { title: 'Branding', description: 'We create high quality dijital products for everyone.' },
    { title: 'Consulting', description: 'We create high quality dijital products for everyone.' },
    { title: 'Consulting', description: 'We create high quality dijital products for everyone.' }
]
</script>