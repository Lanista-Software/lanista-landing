<template>
  <div class="home">
    <section
      v-if="Object.keys(findData('hero')).length > 0"
      id="hero"
      class="lg:pb-32 pb-16"
    >
      <div class="lanista-container__small content">
        <div class="py-16">
          <lui-chip
            rounded
            size="lg"
            variant="secondary"
            filter="lighter"
            class="text-semibold"
            >{{ findData('hero').brandTitle.subtitle }}</lui-chip
          >
          <lui-heading
            level="1"
            size="md"
            display
            class="text-white font-semibold pt-6 pb-8 hidden lg:flex"
          >
            {{ splitText(findData('hero').brandTitle.title)[0] }}
            {{ splitText(findData('hero').brandTitle.title)[1] }}<br />
            {{ splitText(findData('hero').brandTitle.title)[2] }}
            {{ splitText(findData('hero').brandTitle.title)[3] }}
          </lui-heading>
          <lui-heading
            level="1"
            size="2xs"
            display
            class="text-white font-semibold pt-6 pb-8 lg:hidden w-2/3"
          >
            {{ splitText(findData('hero').brandTitle.title)[0] }}<br />
            {{ splitText(findData('hero').brandTitle.title)[1] }}<br />
            {{ splitText(findData('hero').brandTitle.title)[2] }}<br />
            {{ splitText(findData('hero').brandTitle.title)[3] }}
          </lui-heading>
          <lui-text class="text-heading pb-8 lg:w-3/5">
            {{ findData('hero').brandTitle.description }}
          </lui-text>
          <lui-button
            rounded
            variant="secondary"
            size="lg"
            :icon="findData('hero').buttons[0].iconName"
            >{{ findData('hero').buttons[0].label }}</lui-button
          >
        </div>
      </div>
    </section>
    <section
      v-if="Object.keys(findData('developmentProcess')).length > 0"
      id="services"
      class="bg-section pt-24"
    >
      <div
        v-for="item in findData('developmentProcess').cards"
        :key="item.ID"
        class="px-4 pb-24"
      >
        <DevelopmentCard
          :icon="item.icon.name"
          :title="item.title"
          :description="item.description"
          :button-label="item.button.label"
          :button-icon="item.button.icon.name"
          :img-src="item.image.src.png"
          :img-alt="item.image.alt"
        />
      </div>
    </section>
    <section v-if="Object.keys(findData('workWith')).length > 0" id="team">
      <div
        class="head lanista-container__large flex lg:flex-row flex-col pt-24 lg:pb-20 pb-8"
      >
        <lui-heading
          class="text-white font-semibold pb-4 lg:pb-0"
          size="xl"
          level="2"
        >
          {{ findData('workWith').brandTitle.title }}
        </lui-heading>
        <lui-text class="text-heading pl-32">
          {{ findData('workWith').brandTitle.description }}
        </lui-text>
      </div>
      <div class="photos">
        <div class="lanista-container__large pb-24 space-y-4">
          <div class="flex lg:flex-row flex-col">
            <nuxt-img
              :src="findData('workWith').images[0].src.png"
              :alt="findData('workWith').images[0].alt"
              class="lanista__img lg:w-3/5 lg:pr-4 pb-4 lg:pb-0 aspect-auto"
            ></nuxt-img>
            <nuxt-img
              :src="findData('workWith').images[1].src.png"
              :alt="findData('workWith').images[1].alt"
              class="lanista__img lg:w-2/5 aspect-auto"
            ></nuxt-img>
          </div>
          <div class="flex lg:flex-row flex-col max-h-min">
            <div
              class="lg:w-2/5 bg-secondary rounded-lg flex flex-col justify-center px-10 pt-6"
            >
              <lui-icon
                size="3x"
                :name="findData('workWith').cards[0].icon.name"
                line
              ></lui-icon>
              <lui-heading
                size="2xs"
                display
                level="3"
                class="pb-2 font-semibold"
                >{{ findData('workWith').cards[0].title }}</lui-heading
              >
              <lui-text class="pb-8 lg:hidden xl:block">
                {{ findData('workWith').cards[0].description }}
              </lui-text>
              <div class="pb-6">
                <lui-button
                  rounded
                  size="lg"
                  variant="primary"
                  :icon="findData('workWith').cards[0].button.icon.name"
                  >{{ findData('workWith').cards[0].button.label }}</lui-button
                >
              </div>
            </div>
            <nuxt-img
              :src="findData('workWith').images[2].src.png"
              :alt="findData('workWith').images[2].alt"
              class="lanista__img lg:w-3/5 lg:pl-4 pt-4 lg:pt-0 aspect-auto"
            ></nuxt-img>
          </div>
          <div class="flex lg:flex-row flex-col">
            <nuxt-img
              :src="findData('workWith').images[3].src.png"
              :alt="findData('workWith').images[3].alt"
              class="lanista__img lg:w-3/5 lg:pr-4 pb-4 lg:pb-0 aspect-auto"
            ></nuxt-img>
            <nuxt-img
              :src="findData('workWith').images[4].src.png"
              :alt="findData('workWith').images[4].alt"
              class="lanista__img lg:w-2/5"
            ></nuxt-img>
          </div>
        </div>
      </div>
    </section>
    <section
      v-if="Object.keys(findData('awesomeWorks')).length > 0"
      id="projects"
      class="bg-section"
    >
      <div
        class="head lanista-container__large flex lg:flex-row flex-col pt-24 lg:pb-16 pb-10"
      >
        <lui-heading
          class="text-white font-semibold pb-4 lg:pb-0"
          size="xl"
          level="2"
        >
          {{ findData('awesomeWorks').brandTitle.title }}
        </lui-heading>
        <lui-text class="text-heading pl-32">
          {{ findData('awesomeWorks').brandTitle.description }}
        </lui-text>
      </div>
      <div class="projects flex flex-col space-y-24 px-4">
        <ProjectCard
          v-for="item in findData('awesomeWorks').cards"
          :key="item.ID"
          :subtitle="item.subtitle"
          :title="item.title"
          :description="item.description"
          :button-label="item.button.label"
          :button-icon="item.button.icon.name"
          :img-src="item.image.src.png"
          :img-alt="item.image.alt"
        />
      </div>
      <div
        class="lanista-container__large flex justify-center items-center lg:pt-16 lg:pb-28 pb-12 pt-9"
      >
        <lui-button
          type="link"
          size="lg"
          variant="secondary"
          :icon="findData('awesomeWorks').buttons[0].iconName"
          line
          >{{ findData('awesomeWorks').buttons[0].label }}
        </lui-button>
      </div>
    </section>
    <section v-if="Object.keys(findData('message')).length > 0" id="contact">
      <div
        class="container mx-auto px-4 flex lg:flex-row flex-col-reverse justify-between items-center lg:py-24"
      >
        <div
          class="contact-info flex flex-col justify-center text-white lg:w-2/5"
        >
          <div class="hidden lg:flex flex-col">
            <lui-heading
              level="2"
              size="2xs"
              display
              class="pb-2 font-semibold"
              >{{ findData('message').brandTitle.title }}</lui-heading
            >
            <lui-text class="pb-12"
              >{{ findData('message').brandTitle.description }}
            </lui-text>
          </div>
          <div
            v-for="item in findData('message').cards"
            :key="item.ID"
            class="flex flex-row pb-8 md:px-16 lg:px-0"
          >
            <div class="top-0">
              <lui-avatar
                rounded
                size="md"
                :icon="item.icon.name"
                variant="secondary"
                filter="lighter"
              >
              </lui-avatar>
            </div>
            <div class="pl-4">
              <lui-heading level="4" size="sm" class="pb-2 font-semibold"
                >{{ item.title }}
              </lui-heading>
              <lui-text>{{ item.description }} </lui-text>
            </div>
          </div>
        </div>
        <div class="lg:w-3/5 w-full pb-8 lg:pb-0 md:px-20 xl:px-0">
          <SupportForm />
        </div>
        <div class="lg:hidden text-white pt-11">
          <lui-heading level="2" size="xl" class="pb-2 font-semibold">{{
            findData('message').brandTitle.title
          }}</lui-heading>
          <lui-text>{{ findData('message').brandTitle.description }} </lui-text>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $content }) {
    const pageData = await $content('/contentrain/Home').fetch()
    return {
      pageData,
    }
  },
  methods: {
    findData(sectionName) {
      const filteredData = this.pageData[0].brandSection.filter(
        (d) => d.section.toLowerCase() === sectionName.toLowerCase()
      )
      return filteredData[0]
    },
    splitText(text) {
      const splittedText = text.split(' / ')
      return splittedText
    },
  },
}
</script>
<style scoped>
.lanista-container__small {
  @apply container mx-auto lg:px-28 px-4;
}
.lanista-container__large {
  @apply container mx-auto lg:px-24 xl:px-0 px-4;
}
.content {
  background-image: url('/images/hero.png');
  background-repeat: no-repeat;
  background-position: top right;
  background-size: contain;
}
.lanista__img {
  @apply h-48 md:h-auto;
}
</style>
