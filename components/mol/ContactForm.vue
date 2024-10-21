<script setup lang="ts">
import { collection, doc, Firestore, setDoc } from "firebase/firestore";
const { locale } = useI18n();
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
const formStaticDataForLangs = {
    en: {
        name: 'Name',
        namePlaceholder: 'John Doe',
        email: 'Email',
        emailPlaceholder: 'john@lanista.com.tr',
        subject: 'Subject',
        subjectPlaceholder: 'Enter the subject',
        message: 'Message',
        messagePlaceholder: 'Write your message here',
        send: 'Send',
        validations: {
            name: {
                required: 'Name is required',
                min: 'Name must be at least 3 characters',
                max: 'Name must be less than 50 characters'
            },
            email: {
                required: 'Email is required',
                invalid: 'Email is not valid'
            },
            subject: {
                required: 'Subject is required',
                min: 'Subject must be at least 5 characters',
                max: 'Subject must be less than 100 characters'
            },
            message: {
                required: 'Message is required',
                min: 'Message must be at least 10 characters',
                max: 'Message must be less than 500 characters'
            }
        }
    },
    tr: {
        name: 'Ad',
        namePlaceholder: 'John Doe',
        email: 'E-posta',
        emailPlaceholder: 'john@lanista.com.tr',
        subject: 'Konu',
        subjectPlaceholder: 'Konuyu girin',
        message: 'Mesaj',
        messagePlaceholder: 'Mesajınızı buraya yazın',
        send: 'Gönder',
        validations: {
            name: {
                required: 'Ad alanı zorunludur',
                min: 'Ad alanı en az 3 karakter olmalıdır',
                max: 'Ad alanı en fazla 50 karakter olmalıdır'
            },
            email: {
                required: 'E-posta alanı zorunludur',
                invalid: 'E-posta geçerli değil'
            },
            subject: {
                required: 'Konu alanı zorunludur',
                min: 'Konu alanı en az 5 karakter olmalıdır',
                max: 'Konu alanı en fazla 100 karakter olmalıdır'
            },
            message: {
                required: 'Mesaj alanı zorunludur',
                min: 'Mesaj alanı en az 10 karakter olmalıdır',
                max: 'Mesaj alanı en fazla 500 karakter olmalıdır'
            }
        }
    }
};
const getStaticDataForLang = computed(() => {
    console.log(locale.value)
    const localeForKey = locale.value as keyof typeof formStaticDataForLangs;
    return formStaticDataForLangs[localeForKey];
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
    const messages = getStaticDataForLang.value.validations;
    // Name validation (min: 3, max: 50 characters)
    if (!name.value) {
        errors.value.name = messages.name.required;
        isValid = false;
    } else if (name.value.length < 3) {
        errors.value.name = messages.name.min;
        isValid = false;
    } else if (name.value.length > 50) {
        errors.value.name = messages.name.max;
        isValid = false;
    }

    // Email validation
    if (!email.value) {
        errors.value.email = messages.email.required;
        isValid = false;
    } else if (!validateEmail(email.value)) {
        errors.value.email = messages.email.invalid;
        isValid = false;
    }

    // Subject validation (min: 5, max: 100 characters)
    if (!subject.value) {
        errors.value.subject = messages.subject.required;
        isValid = false;
    } else if (subject.value.length < 5) {
        errors.value.subject = messages.subject.min;
        isValid = false;
    } else if (subject.value.length > 100) {
        errors.value.subject = messages.subject.max;
        isValid = false;
    }

    // Message validation (min: 10, max: 500 characters)
    if (!message.value) {
        errors.value.message = messages.message.required;
        isValid = false;
    } else if (message.value.length < 10) {
        errors.value.message = messages.message.min;
        isValid = false;
    } else if (message.value.length > 500) {
        errors.value.message = messages.message.max;
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
    <form id="contact" @submit.prevent="handleSubmit"
        class="flex flex-col space-y-4 bg-white p-8 rounded-2xl border border-border-color">
        <!-- Name Field -->
        <div class="flex flex-col space-y-2">
            <label for="name" class="label-text">{{ getStaticDataForLang.name }}</label>
            <LuiInput v-model="name" type="text" id="name" name="name" block rounded :placeholder="getStaticDataForLang.namePlaceholder"
                :state="errors.name ? true : undefined" />
            <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
        </div>

        <!-- Email Field -->
        <div class="flex flex-col space-y-2">
            <label for="email" class="label-text">{{ getStaticDataForLang.email }}</label>
            <LuiInput v-model="email" type="email" id="email" name="email" block rounded :placeholder="getStaticDataForLang.emailPlaceholder"
                :state="errors.email ? true : undefined" />
            <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
        </div>

        <!-- Subject Field -->
        <div class="flex flex-col space-y-2">
            <label for="subject" class="label-text">{{ getStaticDataForLang.subject }}</label>
            <LuiInput v-model="subject" type="text" id="subject" name="subject" block rounded
                :placeholder="getStaticDataForLang.subjectPlaceholder" :state="errors.subject ? true : undefined" />
            <span v-if="errors.subject" class="text-red-500 text-sm">{{ errors.subject }}</span>
        </div>

        <!-- Message Field -->
        <div class="flex flex-col space-y-2">
            <label for="message" class="label-text">{{ getStaticDataForLang.message }}</label>
            <LuiTextarea :resize="false" v-model="message" id="message" name="message" block rounded
                :placeholder="getStaticDataForLang.messagePlaceholder" :state="errors.message ? true : undefined"></LuiTextarea>
            <span v-if="errors.message" class="text-red-500 text-sm">{{ errors.message }}</span>
        </div>

        <!-- Submit Button -->
        <div class="flex flex-col pt-2">
            <LuiButton color="danger" block rounded>{{ getStaticDataForLang.send }}</LuiButton>
        </div>
    </form>
</template>


<style scoped lang="postcss">
.label-text {
    @apply text-label-text font-normal font-inter text-sm;
}
</style>