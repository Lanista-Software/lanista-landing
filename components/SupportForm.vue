<template>
  <div>
    <lui-card
      class="mt-8 md:w-[514px] xl:ml-auto xl:mr-0 md:mx-auto relative bg-section"
      bg-variant="primary"
      rounded
    >
      <form>
        <lui-label for="name" size="lg" class="text-white">Name</lui-label>
        <lui-input
          id="name"
          v-model="name"
          size="lg"
          placeholder="Jack Ellison"
        />
        <lui-label for="email" size="lg" class="text-white mt-6"
          >Mail</lui-label
        >
        <lui-input
          id="email"
          v-model="email"
          type="email"
          size="lg"
          placeholder="j.ellison@example.com"
        />
        <lui-label for="subject" size="lg" class="text-white mt-6"
          >Subject</lui-label
        >
        <lui-input
          id="subject"
          v-model="subject"
          size="lg"
          placeholder="support"
        />
        <lui-label for="message" size="lg" class="text-white mt-6"
          >Message</lui-label
        >
        <lui-textarea
          id="message"
          v-model="message"
          placeholder="Need some help"
          size="lg"
          name="message"
          rows="4"
          cols="5"
        />
        <lui-button rounded block class="mt-6" size="lg" variant="secondary">
          <span>Send</span>
        </lui-button>
      </form>
    </lui-card>
  </div>
</template>

<script>
export default {
  name: 'SupportForm',
  data() {
    return {
      name: null,
      email: null,
      subject: null,
      message: null,
    }
  },
}
</script>

<style lang="scss" scoped></style>
