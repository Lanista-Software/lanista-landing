<script setup lang="ts">

</script>
<template>
    <div class="min-h-screen">
        <!-- Home Section -->
        <AtomsIntersectionObserver id="home">
            <TemplatesAppHero />
        </AtomsIntersectionObserver>

        <!-- Services Section -->
        <AtomsIntersectionObserver id="services">
            <div class="text-center">
                <h2 class="text-4xl font-bold text-primary-500 mb-4">Services</h2>
                <p class="text-lg text-gray-700">Discover our services!</p>
            </div>
        </AtomsIntersectionObserver>

        <!-- Process Section -->
        <AtomsIntersectionObserver id="process">
            <div class="text-center">
                <h2 class="text-4xl font-bold text-primary-500 mb-4">Process</h2>
                <p class="text-lg text-gray-700">Learn more about our process!</p>
            </div>
        </AtomsIntersectionObserver>

        <!-- Technologies Section -->
        <AtomsIntersectionObserver id="technologies">
            <div class="text-center">
                <h2 class="text-4xl font-bold text-primary-500 mb-4">Technologies</h2>
                <p class="text-lg text-gray-700">We use cutting-edge technologies!</p>
            </div>
        </AtomsIntersectionObserver>

        <!-- Works Section -->
        <AtomsIntersectionObserver id="works">
            <div class="text-center">
                <h2 class="text-4xl font-bold text-primary-500 mb-4">Works</h2>
                <p class="text-lg text-gray-700">Check out our works!</p>
            </div>
        </AtomsIntersectionObserver>
    </div>
</template>
