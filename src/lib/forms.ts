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
