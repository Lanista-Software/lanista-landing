<template>
  <div>
    <BrandModal
      ref="message-modal"
      :title="response.title"
      :description="response.description"
    />
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
          :state="name === null ? null : validateTextFields(name)"
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
          :state="email === null ? null : validateEmail(email)"
        />
        <lui-label for="subject" size="lg" class="text-white mt-6"
          >Subject</lui-label
        >
        <lui-input
          id="subject"
          v-model="subject"
          size="lg"
          placeholder="support"
          :state="subject === null ? null : validateTextFields(subject)"
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
          :state="message === null ? null : validateTextFields(message)"
        />
        <lui-button
          v-dialog-open="'message-modal'"
          rounded
          block
          class="mt-6"
          size="lg"
          :disabled="spinner"
          @click.stop.prevent="checkAndSubmit"
        >
          <span v-if="spinner" class="flex items-center justify-center">
            <span class="mr-2">Sending</span>
            <lui-icon
              name="loader-4"
              :class="'animate-spin leading-none text-2xl'"
              line
            />
          </span>
          <span v-else>Send</span>
        </lui-button>
      </form>
    </lui-card>
  </div>
</template>

<script>
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '~/plugins/firebase.js'
export default {
  name: 'SupportForm',
  data() {
    return {
      name: null,
      email: null,
      subject: null,
      message: null,
      list: [],
      spinner: false,
      errorTitle: "Oops! We couldn't get your message 🙁 ",
      errorDescription: 'Please be sure all field are filled and correct',
      successTitle: 'We got your message! 👍',
      successDescription:
        'We are here for the help! We will contact you as soon as possible!',
      response: {
        title: '',
        description: '',
      },
    }
  },
  methods: {
    checkAndSubmit() {
      this.response.title = ''
      this.response.description = ''
      if (this.checkAllFieldReady()) {
        this.submitSupportForm()
        this.response.title = this.successTitle
        this.response.description = this.successDescription
      } else {
        this.response.title = this.errorTitle
        this.response.description = this.errorDescription
      }
    },
    checkAllFieldReady() {
      return (
        this.validateEmail(this.email) &&
        this.validateTextFields(this.name) &&
        this.validateTextFields(this.subject) &&
        this.validateTextFields(this.message)
      )
    },
    validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    validateTextFields(field) {
      return field.length > 2
    },
    async submitSupportForm() {
      this.spinner = true
      try {
        await signInWithEmailAndPassword(
          auth,
          'lanista@support.com',
          'Lanista47890.'
        )

        const docRef = collection(db, 'messages')
        await addDoc(docRef, {
          name: this.name,
          email: this.email,
          subject: this.subject,
          message: this.message,
          createdAt: serverTimestamp(),
          show: false,
        })
        this.spinner = false
        this.name = null
        this.email = null
        this.subject = null
        this.message = null
        await signOut(auth)
      } catch (error) {
        alert(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
