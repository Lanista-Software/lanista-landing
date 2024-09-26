<script setup lang="ts">
const name = ref('');
const email = ref('');
const subject = ref('');
const message = ref('');
const errors = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
});

const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const handleSubmit = () => {
    // Reset errors
    errors.value = {
        name: '',
        email: '',
        subject: '',
        message: ''
    };

    let isValid = true;

    // Name validation
    if (!name.value) {
        errors.value.name = 'Name is required';
        isValid = false;
    }

    // Email validation
    if (!email.value) {
        errors.value.email = 'Email is required';
        isValid = false;
    } else if (!validateEmail(email.value)) {
        errors.value.email = 'Email is not valid';
        isValid = false;
    }

    // Subject validation
    if (!subject.value) {
        errors.value.subject = 'Subject is required';
        isValid = false;
    }

    // Message validation
    if (!message.value) {
        errors.value.message = 'Message is required';
        isValid = false;
    }

    // If the form is valid, submit the form data
    if (isValid) {
        // Form submission logic here, e.g., sending data to API
        alert('Form submitted successfully!');
    }
};
</script>
<template>
    <form @submit.prevent="handleSubmit"
        class="flex flex-col space-y-4 bg-white p-8 rounded-2xl border border-border-color">
        <!-- Name Field -->
        <div class="flex flex-col space-y-2">
            <label for="name" class="label-text">Name</label>
            <LuiInput v-model="name" type="text" id="name" name="name" block rounded placeholder="Enter your name"
                :state="errors.name ? true : undefined" />
            <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
        </div>

        <!-- Email Field -->
        <div class="flex flex-col space-y-2">
            <label for="email" class="label-text">Email</label>
            <LuiInput v-model="email" type="email" id="email" name="email" block rounded placeholder="Enter your email"
                :state="errors.email ? true : undefined" />
            <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
        </div>

        <!-- Subject Field -->
        <div class="flex flex-col space-y-2">
            <label for="subject" class="label-text">Subject</label>
            <LuiInput v-model="subject" type="text" id="subject" name="subject" block rounded
                placeholder="Enter the subject" :state="errors.subject ? true : undefined" />
            <span v-if="errors.subject" class="text-red-500 text-sm">{{ errors.subject }}</span>
        </div>

        <!-- Message Field -->
        <div class="flex flex-col space-y-2">
            <label for="message" class="label-text">Message</label>
            <LuiTextarea :resize="false" v-model="message" id="message" name="message" block rounded
                placeholder="Write your message here" :state="errors.message ? true : undefined"></LuiTextarea>
        </div>

        <!-- Submit Button -->
        <div class="flex flex-col pt-2">
            <LuiButton color="danger" block rounded>Send</LuiButton>
        </div>
    </form>
</template>



<style scoped lang="postcss">
.label-text {
    @apply text-label-text font-normal font-inter text-sm;
}
</style>