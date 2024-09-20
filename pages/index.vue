<script setup lang="ts">
import type { AppCardProps } from '~/components/mol/AppCard.vue';
import type { CardSectionProps } from '~/components/templates/CardSection.vue';
import type { TabItem, TabSectionProps } from '~/components/templates/TabSection.vue';

const serviceItems: AppCardProps[] = [
    {
        title: 'Web Development', description: 'We create high quality dijital products for everyone.', image: {
            url: 'https://placehold.co/600x400',
            alt: 'Web Development'
        }
    },
    {
        title: 'Mobile Development', description: 'We create high quality dijital products for everyone.', image: {
            url: 'https://placehold.co/600x400',
            alt: 'Web Development'
        }
    },
    {
        title: 'UI/UX Design', description: 'We create high quality dijital products for everyone.', image: {
            url: 'https://placehold.co/600x400',
            alt: 'Web Development'
        }
    },
    {
        title: 'SEO Optimization', description: 'We create high quality dijital products for everyone.', image: {
            url: 'https://placehold.co/600x400',
            alt: 'Web Development'
        }
    },
    {
        title: 'Social Media Marketing', description: 'We create high quality dijital products for everyone.', image: {
            url: 'https://placehold.co/600x400',
            alt: 'Web Development'
        }
    },
    {
        title: 'Content Marketing', description: 'We create high quality dijital products for everyone.', image: {
            url: 'https://placehold.co/600x400',
            alt: 'Web Development'
        }
    },
    {
        title: 'E-Commerce Solutions', description: 'We create high quality dijital products for everyone.', image: {
            url: 'https://placehold.co/600x400',
            alt: 'Web Development'
        }
    },
    {
        title: 'Digital Marketing', description: 'We create high quality dijital products for everyone.', image: {
            url: 'https://placehold.co/600x400',
            alt: 'Web Development'
        }
    },
    {
        title: 'Branding', description: 'We create high quality dijital products for everyone.', image: {
            url: 'https://placehold.co/600x400',
            alt: 'Web Development'
        }
    },
    {
        title: 'Consulting', description: 'We create high quality dijital products for everyone.', image: {
            url: 'https://placehold.co/600x400',
            alt: 'Web Development'
        }
    },
    {
        title: 'Consulting', description: 'We create high quality dijital products for everyone.', image: {
            url: 'https://placehold.co/600x400',
            alt: 'Web Development'
        }
    }
]
const serviceCardProps: CardSectionProps = {
    items: serviceItems,
    view: 'grid',
    title: 'Here are the technologies that we have expertise',
    description: 'We offer a wide range of services to help you achieve your goals.Lorem ipsum dolor sit amet consectetur adipisicing elit. At illo numquam quia quos velit mollitia. Maiores voluptatem dolor aspernatur.',
}
const processItems: AppCardProps[] = [
    {
        title: "Project Kickoff and Analysis",
        description: "Gathering all relevant information to understand your project's requirements and objectives. This phase sets a strong foundation by aligning our development with your vision.",
        icon: "ri-search-eye-line" // Icon for analysis
    },
    {
        title: "Design",
        description: "Turning your ideas into detailed design prototypes ready for implementation. We focus on crafting interfaces that are both user-friendly and visually appealing.",
        icon: "ri-pencil-ruler-line" // Icon for design
    },
    {
        title: "Development Stage",
        description: "Transforming the design and strategy into a functional product. Our coding expertise brings your design to life, ensuring seamless functionality.",
        icon: "ri-code-s-slash-line" // Icon for development
    },
    {
        title: "Deployment",
        description: "Thoroughly testing the product to identify and fix any issues. Once approved, we deploy the product to the live environment.",
        icon: "ri-rocket-line" // Icon for deployment
    },
    {
        title: "Testing",
        description: "Merge your Developer and Content Teams to create a smooth content structure with advanced.",
        icon: "ri-bug-line" // Icon for testing
    },
    {
        title: "Maintenance",
        description: "Providing ongoing support and maintenance. This includes fixing issues and making upgrades to ensure your product remains up-to-date.",
        icon: "ri-tools-line" // Icon for maintenance
    }
];
const processCardProps: CardSectionProps = {
    items: processItems,
    view: 'triple',
    title: 'Here are the  technologies that we have expertise',
    description: 'We follow a structured approach to ensure your project is delivered on time and within budget. Lorem ipsum dolor sit amet consectetur adipisicing elit.'
}
// tab items icine link ekleyerek property ekleyerek yeniden yaz
const tabItems : TabItem[] = [
    {
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
        title: "Vue.js",
        description: "Vue.js is a progressive JavaScript framework used for building user interfaces, especially single-page applications. It is designed to be incrementally adoptable and integrates well with other libraries.",
        category: "Frontend Development",
        link: "/vue"
    },
    {
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        title: "React.js",
        description: "React.js is a JavaScript library for building user interfaces or UI components. It is maintained by Facebook and a large community of developers. React is known for its fast rendering and virtual DOM.",
        category: "Frontend Development",
        link: "/react"
    },
    {
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg",
        title: "Nuxt.js",
        description: "Nuxt.js is a framework built on top of Vue.js that simplifies the development of server-rendered applications and static websites. It offers powerful features like SSR, static site generation, and improved SEO support.",
        category: "Frontend Development",
        link: "/nuxt"
    },
    {
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg",
        title: "Next.js",
        description: "Next.js is a React framework that enables functionality such as server-side rendering and static website generation for building high-performance, SEO-friendly applications.",
        category: "Frontend Development",
        link: "/next"
    },
    {
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/astro/astro-original.svg",
        title: "Astro",
        description: "Astro is a new frontend framework for building fast, content-focused websites. It uses an innovative approach to page rendering called partial hydration, which makes websites faster by reducing the JavaScript sent to the browser.",
        category: "Frontend Development",
        link: "/astro"
    },
    {
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
        title: "Svelte",
        description: "Svelte is a modern JavaScript framework that shifts much of the work to the compile step instead of the runtime. This results in smaller bundle sizes and faster load times, making it an excellent choice for building fast web applications.",
        category: "Frontend Development",
        link: "/svelte"
    },
    // Backend JS 
    {
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        title: "Node.js",
        description: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on the server, enabling you to build scalable and high-performance applications.",
        category: "Backend Development",
        link: "/node"
    },
    {
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        title: "Express.js",
        description: "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It is designed to create APIs and web servers quickly and easily.",
        category: "Backend Development",
        link: "/express"
    },
    {
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg",
        title: "Nest.js",
        description: "Nest.js is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It uses TypeScript and is heavily inspired by Angular, providing a solid architectural design for your applications.",
        category: "Backend Development",
        link: "/nest"
    },
    {
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/koa/koa-original.svg",
        title: "Koa.js",
        description: "Koa.js is a modern web framework for Node.js that aims to be smaller, more expressive, and more robust. It uses async functions to eliminate callbacks and increase error-handling capabilities.",
        category: "Backend Development",
        link: "/koa"
    },
    {
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
        title: "GraphQL",
        description: "GraphQL is a query language for APIs and a runtime for executing those queries. It provides a more efficient and powerful alternative to REST by allowing clients to request only the data they need.",
        category: "Backend Development",
        link: "/graphql"
    },
    // Mobile 
    {
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        title: "React Native",
        description: "React Native is a framework for building native mobile applications using JavaScript and React. It allows you to write once and run on multiple platforms, saving time and effort in developing mobile apps.",
        category: "Mobile Development",
        link: "/react-native"
    },
    {
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
        title: "Flutter",
        description: "Flutter is Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase. It offers a rich set of pre-built widgets and tools for creating beautiful apps.",
        category: "Mobile Development",
        link: "/flutter"
    },
    {
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg",
        title: "Ionic",
        description: "Ionic is a popular open-source framework for building cross-platform mobile applications using web technologies like HTML, CSS, and JavaScript. It provides a library of mobile-optimized UI components and tools for creating high-quality apps.",
        category: "Mobile Development",
        link: "/ionic"
    },
    {
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/capacitor/capacitor-original.svg",
        title: "Capacitor",
        description: "Capacitor is a cross-platform runtime that allows you to build web applications that run natively on iOS, Android, and Electron. It provides a consistent API for accessing native features and plugins across platforms.",
        category: "Mobile Development",
        link: "/capacitor"
    },
    // Design
    {
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg",
        title: "Sketch",
        description: "Sketch is a popular design tool for creating user interfaces, websites, and icons. It offers a wide range of features like artboards, symbols, and libraries to streamline the design process.",
        category: "UI/UX Design",
        link: "/sketch"
    },
    {
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        title: "Figma",
        description: "Figma is a cloud-based design tool that allows real-time collaboration between designers and developers. It offers features like prototyping, vector editing, and design systems to create interactive and responsive designs.",
        category: "UI/UX Design",
        link: "/figma"
    },
    {
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/adobexd/adobexd-plain.svg",
        title: "Adobe XD",
        description: "Adobe XD is a vector-based design tool for creating user interfaces, websites, and mobile apps. It offers features like artboards, responsive resizing, and prototyping to design and test interactive experiences.",
        category: "UI/UX Design",
        link: "/adobe-xd"
    },
    {
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/invision/invision-original.svg",
        title: "InVision",
        description: "InVision is a digital product design platform that allows you to create interactive prototypes and collaborate with stakeholders. It offers features like design systems, user testing, and version control to streamline the design process.",
        category: "UI/UX Design",
        link: "/invision"
    },
]
const tabSectionProps: TabSectionProps = {
    items: tabItems,
    title: 'Here are the technologies that we have expertise',
    description: 'We use the latest technologies to build high-quality digital products.'
}
</script>
<template>
    <div class="min-h-screen">
        <!-- Home Section -->
        <AtomsIntersectionObserver id="home">
            <TemplatesHero />
        </AtomsIntersectionObserver>
        <!-- Services Section -->
        <AtomsIntersectionObserver id="services">
            <TemplatesCardSection v-bind="serviceCardProps" />
        </AtomsIntersectionObserver>

        <!-- Process Section -->
        <AtomsIntersectionObserver id="process">
            <TemplatesCardSection v-bind="processCardProps" />
        </AtomsIntersectionObserver>
        <!-- Technologies Section -->
        <AtomsIntersectionObserver id="technologies">
            <TemplatesTabSection v-bind="tabSectionProps" />
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
