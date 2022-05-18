<template>
  <div class="home">
    <section id="hero" class="md:pb-32 pb-16">
      <div class="lanista-container__small content">
        <div class="py-16">
          <lui-chip
            rounded
            size="md"
            variant="secondary"
            filter="lighter"
            class="text-semibold"
            >Think, create, develop!</lui-chip
          >
          <lui-heading
            level="1"
            size="md"
            display
            class="text-white font-semibold pt-6 pb-8 hidden md:flex"
          >
            We create high quality<br />
            dijital products for everyone.
          </lui-heading>
          <lui-heading
            level="1"
            size="2xs"
            display
            class="text-white font-semibold pt-6 pb-8 md:hidden w-2/3"
          >
            We create<br />
            high quality<br />
            dijital products<br />
            for everyone.
          </lui-heading>
          <lui-text class="text-heading pb-8 md:w-3/5">
            We help companies and startups make their products better every day.
            So we create high quality digital products for a professional look.
          </lui-text>
          <lui-button rounded variant="secondary" size="lg"
            >Start a project</lui-button
          >
        </div>
      </div>
    </section>
    <section id="developmentProcess" class="bg-section pt-24">
      <div v-for="item in 4" :key="item.ID" class="md:px-24 px-4 pb-24">
        <DevelopmentCard
          icon="shape-2"
          title="Ui/Ux design"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
                vulputate magna vel libero accumsan nisl. Sociis fringilla
                tempor ut et mattis auctor condimentum sit at."
          button-label="Start a project"
          button-icon="arrow-right-up"
          img-src="/images/design.png"
          img-alt="lanista development proccess"
        />
      </div>
    </section>
    <section id="workWith">
      <div
        class="head lanista-container__large flex md:flex-row flex-col pt-24 md:pb-20 pb-8"
      >
        <lui-heading class="text-white font-semibold pb-4" size="xl" level="2">
          How we create awesome works in Lanista Labs
        </lui-heading>
        <lui-text class="text-heading">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius mi
          amet nunc, urna. Augue and donec volutpat placerat enim urna blandit
          dictum donec tempus.
        </lui-text>
      </div>
      <div class="photos">
        <div class="lanista-container__large pb-24 space-y-4">
          <div class="flex md:flex-row flex-col">
            <nuxt-img
              src="/images/company-1.png"
              class="lanista__img md:w-2/3 md:pr-4 pb-4 md:pb-0"
            ></nuxt-img>
            <nuxt-img
              src="/images/company-2.png"
              class="lanista__img md:w-1/3"
            ></nuxt-img>
          </div>
          <div class="flex md:flex-row flex-col">
            <div
              class="md:w-1/3 bg-secondary rounded-lg flex flex-col justify-center px-10 pt-6"
            >
              <lui-icon size="3x" name="team" line></lui-icon>
              <lui-heading
                size="2xs"
                display
                level="3"
                class="pb-2 font-semibold"
                >Want to work with us?</lui-heading
              >
              <lui-text class="pb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa
                velit felis duis vestibulum ullamcorper. Amet id semper
              </lui-text>
              <div class="pb-6">
                <lui-button
                  rounded
                  size="lg"
                  variant="primary"
                  icon="arrow-right-up"
                  >Drop your CV</lui-button
                >
              </div>
            </div>
            <nuxt-img
              src="/images/company-3.png"
              class="lanista__img md:w-2/3 md:pl-4 pt-4 md:pt-0"
            ></nuxt-img>
          </div>
          <div class="flex md:flex-row flex-col">
            <nuxt-img
              src="/images/company-4.png"
              class="lanista__img md:w-2/3 md:pr-4 pb-4 md:pb-0"
            ></nuxt-img>
            <nuxt-img
              src="/images/company-5.png"
              class="lanista__img md:w-1/3"
            ></nuxt-img>
          </div>
        </div>
      </div>
    </section>
    <section id="awesomeWorks" class="bg-section">
      <div
        class="head lanista-container__large flex md:flex-row flex-col pt-24 md:pb-16 pb-10"
      >
        <lui-heading
          class="text-white font-semibold pb-4 lg:pb-0"
          size="xl"
          level="2"
        >
          How we create awesome works in Lanista Labs
        </lui-heading>
        <lui-text class="text-heading">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius mi
          amet nunc, urna. Augue and donec volutpat placerat enim urna blandit
          dictum donec tempus.
        </lui-text>
      </div>
      <div class="projects flex flex-col space-y-24 px-4">
        <ProjectCard
          v-for="item in 2"
          :key="item.ID"
          subtitle="Design & Development"
          title="Subbedd Subtitle Editor"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius mi
              amet nunc, urna."
          button-label="See live project"
          img-src="/images/comingsoon.png"
          img-alt="lanista project alt"
        />
      </div>
      <div
        class="lanista-container__large flex justify-center items-center md:pt-16 md:pb-28 pb-12 pt-9"
      >
        <lui-button
          type="link"
          size="lg"
          variant="secondary"
          icon="arrow-right-up"
          line
          >See more projects</lui-button
        >
      </div>
    </section>
    <section id="message ">
      <div
        class="lanista-container__small flex md:flex-row flex-col-reverse justify-between items-center md:py-24"
      >
        <div
          class="contact-info flex flex-col justify-center text-white md:w-2/5"
        >
          <div class="hidden md:flex flex-col">
            <lui-heading level="2" size="2xs" display class="pb-2 font-semibold"
              >Drop your message</lui-heading
            >
            <lui-text class="pb-12"
              >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius
              mi amet nunc, urna.
            </lui-text>
          </div>
          <div v-for="item in 3" :key="item.ID" class="flex flex-row pb-8">
            <div class="top-0">
              <lui-avatar
                rounded
                size="md"
                icon="shape-2"
                variant="secondary"
                filter="lighter"
              >
              </lui-avatar>
            </div>
            <div class="pl-4">
              <lui-heading level="4" size="sm" class="pb-2 font-semibold"
                >Adress</lui-heading
              >
              <lui-text size="md"
                >Bardakçı Mah. Teknokent Sokak No : 1 İç Kapı : 9 Tuşba / Van
              </lui-text>
            </div>
          </div>
        </div>
        <div class="md:w-2/5 w-full pb-8 md:pb-0"><SupportForm /></div>
        <div class="md:hidden text-white pt-11">
          <lui-heading level="2" size="xl" class="pb-2 font-semibold"
            >Drop your message</lui-heading
          >
          <lui-text
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius mi
            amet nunc, urna.
          </lui-text>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
<style scoped>
.lanista-container__small {
  @apply container mx-auto md:px-28 px-4;
}
.lanista-container__large {
  @apply container mx-auto md:px-24 xl:px-0 px-4;
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
