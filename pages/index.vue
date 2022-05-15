<template>
  <div class="home">
    <section id="hero" class="pb-32">
      <div class="lanista-container__small content h-auto">
        <div class="py-16">
          <lui-chip
            rounded
            size="md"
            class="bg-chip justify-center items-center text-secondary"
            >Think , create, develop!</lui-chip
          >
          <h1 class="text-white font-semibold text-7xl w-4/5 pt-6">
            We create high quality dijital products for everyone.
          </h1>
          <p class="text-heading w-1/2 py-8">
            We help companies and startups make their products better every day.
            So we create high quality digital products for a professional look.
          </p>
          <lui-button rounded variant="secondary">Start a project</lui-button>
        </div>
      </div>
    </section>
    <section id="developmentProcess" class="bg-section">
      <div class="design lanista-container__small min-h-[534px] pt-24">
        <div class="flex flex-row justify-between">
          <div class="flex flex-col">
            <div>
              <lui-chip
                rounded
                size="lg"
                class="bg-chip text-secondary justify-center items-center max-w-12"
              >
                <lui-icon name="shape-2" line size="lg" class="mt-3" />
              </lui-chip>
            </div>
            <h1 class="text-white font-semibold text-4xl pt-8">Ui/Ux design</h1>
          </div>
          <div class="w-2/3 flex flex-col">
            <p class="text-heading pb-8 pt-16">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
              vulputate magna vel libero accumsan nisl. Sociis fringilla tempor
              ut et mattis auctor condimentum sit at.
            </p>
            <div>
              <lui-button
                rounded
                size="lg"
                variant="secondary"
                class="hidden lg:flex"
                type="outline"
                icon="arrow-right-up"
                >Start a project</lui-button
              >
            </div>
            <div class="pt-16 pb-24">
              <lui-chip rounded class="bg-chip">
                <nuxt-img src="/images/design.png" class="p-8"></nuxt-img>
              </lui-chip>
            </div>
          </div>
        </div>
      </div>
      <div class="frontend lanista-container__small min-h-[534px] pt-24">
        <div class="flex flex-row justify-between">
          <div class="flex flex-col">
            <div>
              <lui-chip
                rounded
                size="lg"
                class="bg-chip text-secondary justify-center items-center max-w-12"
              >
                <lui-icon name="shape-2" line size="lg" class="mt-3" />
              </lui-chip>
            </div>
            <h1 class="text-white font-semibold text-4xl pt-8">
              Frontend Development
            </h1>
          </div>
          <div class="w-2/3 flex flex-col">
            <p class="text-heading pb-8 pt-16">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
              vulputate magna vel libero accumsan nisl. Sociis fringilla tempor
              ut et mattis auctor condimentum sit at.
            </p>
            <div>
              <lui-button
                rounded
                size="lg"
                variant="secondary"
                class="hidden lg:flex"
                type="outline"
                icon="arrow-right-up"
                >Start a project</lui-button
              >
            </div>
            <div class="pt-16 pb-24">
              <lui-chip rounded class="bg-chip">
                <nuxt-img src="/images/frontend.png" class="p-8"></nuxt-img>
              </lui-chip>
            </div>
          </div>
        </div>
      </div>
      <div class="backend lanista-container__small min-h-[534px] pt-24">
        <div class="flex flex-row justify-between">
          <div class="flex flex-col">
            <div>
              <lui-chip
                rounded
                size="lg"
                class="bg-chip text-secondary justify-center items-center max-w-12"
              >
                <lui-icon name="shape-2" line size="lg" class="mt-3" />
              </lui-chip>
            </div>
            <h1 class="text-white font-semibold text-4xl pt-8">
              Backend Development
            </h1>
          </div>
          <div class="w-2/3 flex flex-col">
            <p class="text-heading pb-8 pt-16">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
              vulputate magna vel libero accumsan nisl. Sociis fringilla tempor
              ut et mattis auctor condimentum sit at.
            </p>
            <div>
              <lui-button
                rounded
                size="lg"
                variant="secondary"
                class="hidden lg:flex"
                type="outline"
                icon="arrow-right-up"
                >Start a project</lui-button
              >
            </div>
            <div class="pt-16 pb-24">
              <lui-chip rounded class="bg-chip">
                <nuxt-img src="/images/backend.png" class="p-8"></nuxt-img>
              </lui-chip>
            </div>
          </div>
        </div>
      </div>
      <div class="consult lanista-container__small min-h-[534px] pt-24">
        <div class="flex flex-row justify-between">
          <div class="flex flex-col">
            <div>
              <lui-chip
                rounded
                size="lg"
                class="bg-chip text-secondary justify-center items-center max-w-12"
              >
                <lui-icon name="shape-2" line size="lg" class="mt-3" />
              </lui-chip>
            </div>
            <h1 class="text-white font-semibold text-4xl pt-8">
              Project Consult
            </h1>
          </div>
          <div class="w-2/3 flex flex-col">
            <p class="text-heading pb-8 pt-16">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
              vulputate magna vel libero accumsan nisl. Sociis fringilla tempor
              ut et mattis auctor condimentum sit at.
            </p>
            <div>
              <lui-button
                rounded
                size="lg"
                variant="secondary"
                class="hidden lg:flex"
                type="outline"
                icon="arrow-right-up"
                >Start a project</lui-button
              >
            </div>
            <div class="pt-16 pb-24">
              <lui-chip rounded class="bg-chip">
                <nuxt-img src="/images/consult.png" class="p-8"></nuxt-img>
              </lui-chip>
            </div>
          </div>
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
  @apply container mx-auto px-8;
}
.lanista-container__large {
  @apply container mx-auto;
}
.content {
  background-image: url('/images/hero.png');
  background-repeat: no-repeat;
  background-position: top right;
  background-size: contain;
}
</style>
