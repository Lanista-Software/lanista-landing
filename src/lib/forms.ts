import type { Locale } from './i18n'

/** What a submission is about. Stored on every lead (brief §5.3). */
export type LeadType = 'contact' | 'demo' | 'quote' | 'waitlist'
export type FieldName = 'name' | 'email' | 'phone' | 'business' | 'subject' | 'message'

export interface FieldRule { required: boolean, min?: number, max: number, type?: 'email' | 'tel' }

export const FIELD_RULES: Record<FieldName, FieldRule> = {
  name: { required: true, min: 3, max: 50 },
  email: { required: true, max: 120, type: 'email' },
  phone: { required: false, min: 10, max: 20, type: 'tel' },
  business: { required: false, max: 100 },
  subject: { required: true, min: 5, max: 100 },
  message: { required: true, min: 10, max: 500 },
}

export const formStrings = {
  tr: {
    labels: { name: 'Ad Soyad', email: 'E-posta', phone: 'Telefon', business: 'İşletme adı', subject: 'Konu', message: 'Mesaj' },
    placeholders: { name: 'Adınız ve soyadınız', email: 'ornek@isletme.com', phone: '05xx xxx xx xx', business: 'İşletmenizin adı', subject: 'Konuyu yazın', message: 'Mesajınızı buraya yazın' },
    optional: '(isteğe bağlı)',
    required: 'zorunlu',
    send: 'Gönder',
    sending: 'Gönderiliyor…',
    success: 'Teşekkürler, mesajınız bize ulaştı. En kısa sürede size döneceğiz.',
    failure: 'Mesajınız gönderilemedi. Lütfen tekrar deneyin ya da bize doğrudan e-posta veya telefonla ulaşın.',
    errorSummary: 'Formda düzeltilmesi gereken alanlar var:',
    rateLimit: 'Kısa sürede çok fazla gönderim yapıldı. Lütfen bir dakika sonra tekrar deneyin.',
    consentBefore: '',
    consentLink: 'KVKK Aydınlatma Metni',
    consentAfter: '’ni okudum; bilgilerimin bu talep için işlenmesini anlıyorum.',
    consentError: 'Devam etmek için aydınlatma metnini okuduğunuzu onaylayın.',
    v: {
      required: '{label} alanı zorunludur.',
      min: '{label} en az {n} karakter olmalıdır.',
      max: '{label} en fazla {n} karakter olmalıdır.',
      email: 'Geçerli bir e-posta adresi yazın (örnek: ad@alanadi.com).',
      tel: 'Geçerli bir telefon numarası yazın (örnek: 0506 215 07 00).',
    },
  },
  en: {
    labels: { name: 'Full name', email: 'Email', phone: 'Phone', business: 'Company', subject: 'Subject', message: 'Message' },
    placeholders: { name: 'Your name', email: 'you@company.com', phone: '+90 5xx xxx xx xx', business: 'Your company', subject: 'Enter the subject', message: 'Write your message here' },
    optional: '(optional)',
    required: 'required',
    send: 'Send',
    sending: 'Sending…',
    success: 'Thank you, we received your message and will get back to you shortly.',
    failure: 'Your message could not be sent. Please try again or reach us directly by email or phone.',
    errorSummary: 'Please fix the following fields:',
    rateLimit: 'Too many submissions in a short time. Please try again in a minute.',
    consentBefore: 'I have read the ',
    consentLink: 'Privacy Notice (KVKK)',
    consentAfter: ' and understand my details will be processed for this request.',
    consentError: 'Please confirm you have read the privacy notice.',
    v: {
      required: '{label} is required.',
      min: '{label} must be at least {n} characters.',
      max: '{label} must be at most {n} characters.',
      email: 'Enter a valid email address (e.g. name@domain.com).',
      tel: 'Enter a valid phone number.',
    },
  },
} satisfies Record<Locale, unknown>
