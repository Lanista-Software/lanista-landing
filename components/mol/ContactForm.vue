<script setup lang="ts">
import { collection, doc, Firestore, setDoc } from "firebase/firestore";

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
const { $firestore } = useNuxtApp();
console.log('Firestore: ', $firestore);
const handleSubmit = async () => {
    // Reset errors
    errors.value = {
        name: '',
        email: '',
        subject: '',
        message: ''
    };

    let isValid = true;

    // Name validation (min: 3, max: 50 characters)
    if (!name.value) {
        errors.value.name = 'Name is required';
        isValid = false;
    } else if (name.value.length < 3) {
        errors.value.name = 'Name must be at least 3 characters';
        isValid = false;
    } else if (name.value.length > 50) {
        errors.value.name = 'Name must be less than 50 characters';
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

    // Subject validation (min: 5, max: 100 characters)
    if (!subject.value) {
        errors.value.subject = 'Subject is required';
        isValid = false;
    } else if (subject.value.length < 5) {
        errors.value.subject = 'Subject must be at least 5 characters';
        isValid = false;
    } else if (subject.value.length > 100) {
        errors.value.subject = 'Subject must be less than 100 characters';
        isValid = false;
    }

    // Message validation (min: 10, max: 500 characters)
    if (!message.value) {
        errors.value.message = 'Message is required';
        isValid = false;
    } else if (message.value.length < 10) {
        errors.value.message = 'Message must be at least 10 characters';
        isValid = false;
    } else if (message.value.length > 500) {
        errors.value.message = 'Message must be less than 500 characters';
        isValid = false;
    }

    // If the form is valid, submit the form data
    if (isValid) {
        try {
            const docPath = 'contentrain/models/contactform/content';
            const defaultCollectionRef = collection($firestore as Firestore, `${docPath}/default`);
            const newDocRef = doc(defaultCollectionRef)
            const res = await setDoc(newDocRef, {
                name: name.value,
                email: email.value,
                subject: subject.value,
                message: message.value,
                createdAt: new Date().toString(),
                updatedAt: new Date().toString(),
                status: 'publish',
                scheduled: false
            });
            console.log("Document written with ID: ", res);
            resetForm();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
};
function resetForm() {
    name.value = '';
    email.value = '';
    subject.value = '';
    message.value = '';
}
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
            <span v-if="errors.message" class="text-red-500 text-sm">{{ errors.message }}</span>
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