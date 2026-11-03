// Library content from the client's FINAL documents (Universities & Pathways, Boarding
// Schools, Seasonal Camps, Tourist Visas). House style: no em-dashes.

import type { ServiceKey } from '@/lib/constants'

import { richText } from '../lexical'

type Programme = 'university' | 'boarding' | 'camps'
const ALL: Programme[] = ['university', 'boarding', 'camps']
const UNI: Programme[] = ['university']

// Photo briefs are illustrative landmarks only, not partner institutions.
export const destinations: { name: string; photoBrief: string; programmes: Programme[] }[] = [
  { name: 'United Kingdom', photoBrief: 'University of Edinburgh, historic architecture', programmes: ALL },
  { name: 'United States', photoBrief: 'Columbia University, neoclassical library', programmes: ALL },
  { name: 'Canada', photoBrief: 'University of Toronto, historic campus', programmes: ALL },
  { name: 'Germany', photoBrief: 'Heidelberg University and old town', programmes: ALL },
  { name: 'Austria', photoBrief: 'University of Vienna, main building', programmes: ALL },
  { name: 'Italy', photoBrief: 'University of Bologna, Archiginnasio', programmes: ALL },
  { name: 'Spain', photoBrief: 'University of Salamanca, sandstone facade', programmes: ALL },
  { name: 'Switzerland', photoBrief: 'University of Zurich, main building', programmes: ALL },
  { name: 'Netherlands', photoBrief: 'Leiden University, canal-side buildings', programmes: UNI },
  { name: 'Belgium', photoBrief: 'KU Leuven, University Library', programmes: UNI },
  { name: 'Luxembourg', photoBrief: 'University of Luxembourg, Belval campus', programmes: UNI },
  { name: 'Czech Republic', photoBrief: 'Charles University, Prague', programmes: UNI },
  { name: 'Poland', photoBrief: 'Jagiellonian University, Kraków', programmes: UNI },
  { name: 'Hungary', photoBrief: 'Eötvös Loránd University, Budapest', programmes: UNI },
  { name: 'Norway', photoBrief: 'University of Oslo, historic buildings', programmes: UNI },
  { name: 'Finland', photoBrief: 'University of Helsinki, Senate Square', programmes: UNI },
  { name: 'Sweden', photoBrief: 'Lund University, main building', programmes: UNI },
  { name: 'Estonia', photoBrief: 'University of Tartu, main building', programmes: UNI },
  { name: 'Latvia', photoBrief: 'University of Latvia, Riga', programmes: UNI },
  { name: 'Lithuania', photoBrief: 'Vilnius University, courtyards', programmes: UNI },
]

export const fieldsOfStudy: { label: string; icon: string }[] = [
  { label: 'Architecture & Built Environment', icon: 'landmark' },
  { label: 'Art & Design', icon: 'palette' },
  { label: 'Business & Management', icon: 'briefcase' },
  { label: 'Economics & Finance', icon: 'coins' },
  { label: 'Law', icon: 'scale' },
  { label: 'Engineering', icon: 'cog' },
  { label: 'Medicine & Health Sciences', icon: 'heart-pulse' },
  { label: 'Computer Science & Technology', icon: 'laptop' },
  { label: 'Natural Sciences', icon: 'flask' },
  { label: 'Media & Communication', icon: 'messages' },
  { label: 'Social & Political Sciences', icon: 'users' },
  { label: 'Psychology', icon: 'brain' },
  { label: 'Education & Languages', icon: 'book' },
  { label: 'Tourism, Hospitality & Culinary Arts', icon: 'plane' },
  { label: 'Environmental Studies', icon: 'sprout' },
]

type FaqSeed = { question: string; answer: ReturnType<typeof richText>; category: 'universities' | 'boarding' | 'camps' | 'visas' }

export const faqs: FaqSeed[] = [
  // Universities & Pathways
  {
    category: 'universities',
    question: 'When should I start planning my studies abroad?',
    answer: richText([
      'Ideally, you should begin planning 9–12 months before your intended start date. However, deadlines vary by destination, institution and programme, and some applications or scholarships may require earlier preparation.',
      'We help you understand the relevant timelines and organise your applications accordingly.',
    ]),
  },
  {
    category: 'universities',
    question: 'How do I choose the right university and study programme?',
    answer: richText([
      'The right choice depends on more than university rankings. Your academic background, interests, language proficiency, preferred destination, budget and future goals all play an important role.',
      'We help you research and compare suitable institutions and programmes, considering admission requirements, academic content and overall study costs.',
    ]),
  },
  {
    category: 'universities',
    question: 'Can PEREGRINE assist with the entire application process?',
    answer: richText([
      'Yes. We provide hands-on support throughout the agreed application process, from programme selection and documentation to university applications, admission offers and enrolment.',
      'Our services may also include assistance with personal statements, motivation letters, interviews, relevant visa procedures and pre-departure preparation. The scope of support is explained before you proceed.',
    ]),
  },
  {
    category: 'universities',
    question: 'Do I need a foreign language certificate to study abroad?',
    answer: richText([
      'Not always. Language requirements depend on the institution, programme, destination and your previous education.',
      'Some universities require recognised certificates such as IELTS, TOEFL or qualifications in German, Italian or French. Others may accept alternative evidence, conduct their own assessments or offer preparatory language programmes.',
      'We help you understand the requirements relevant to your chosen programmes.',
    ]),
  },
  {
    category: 'universities',
    question: 'Can PEREGRINE help me explore scholarships and financial support?',
    answer: richText([
      'Yes. We help you identify relevant scholarships, tuition fee reductions and other funding opportunities, assess eligibility requirements and understand application deadlines.',
      'Funding availability and selection criteria vary by institution and provider. Scholarships and financial assistance cannot be guaranteed.',
    ]),
  },
  {
    category: 'universities',
    question: 'Does PEREGRINE assist with student visas and visas for language courses?',
    answer: richText([
      'Yes. We provide assistance with relevant student visa procedures and applicable visa routes for language courses, subject to the immigration rules of each destination.',
      'Our support may include reviewing requirements, preparing documentation, assisting with application forms and providing guidance on appointments, biometrics and interviews where relevant.',
      'Visa decisions are made by the competent immigration authorities.',
    ]),
  },
  {
    category: 'universities',
    question: 'Can I study abroad through a language course rather than a university degree?',
    answer: richText([
      'Yes. Language courses abroad may be available as standalone programmes or as preparation for further academic study.',
      'We help you explore suitable language schools, compare course options, understand admission requirements and prepare applications. Where applicable, we also assist with the relevant visa or residence procedures.',
      'Eligibility and immigration requirements depend on the destination, course and duration of study.',
    ]),
  },
  {
    category: 'universities',
    question: 'Is the initial consultation free?',
    answer: richText([
      'Yes. Your first consultation with PEREGRINE is complimentary.',
      'During the consultation, we discuss your academic background, preferred destinations, educational interests and budget, and provide an initial overview of suitable pathways and application requirements.',
      'If you decide to continue, we explain the services available, their scope and any applicable fees before beginning the application process.',
    ]),
  },

  // Boarding Schools
  {
    category: 'boarding',
    question: 'What age can students start attending a boarding school?',
    answer: richText([
      'Many international boarding schools welcome students between the ages of 14 and 18, although some institutions offer boarding opportunities for younger students.',
      'Age requirements and entry points vary depending on the school, destination and academic programme.',
    ]),
  },
  {
    category: 'boarding',
    question: 'What are the admission requirements?',
    answer: richText([
      'Admission requirements vary by institution and may include previous academic records, school references, language proficiency assessments, entrance examinations and interviews.',
      "Some schools also consider extracurricular interests, personal achievements and the student's suitability for boarding life.",
    ]),
  },
  {
    category: 'boarding',
    question: 'How are students supervised and supported while living at school?',
    answer: richText([
      'Boarding schools typically have residential staff and pastoral care arrangements to support students outside academic hours.',
      'These may include house parents, designated tutors, safeguarding personnel and established procedures for student wellbeing, supervision and emergencies.',
      'The specific arrangements should be reviewed for each institution.',
    ]),
  },
  {
    category: 'boarding',
    question: 'Can boarding schools accommodate allergies, dietary restrictions and medical needs?',
    answer: richText([
      'Many boarding schools have procedures for managing dietary requirements, allergies and individual health needs.',
      'However, the level of support, available facilities and medical arrangements differ between institutions.',
      "Families should disclose relevant requirements during the school selection process so that the school's ability to accommodate them can be assessed before proceeding with an application.",
    ]),
  },
  {
    category: 'boarding',
    question: 'How much does attending an international boarding school cost?',
    answer: richText([
      'Costs vary considerably depending on the country, institution, academic programme and boarding arrangements.',
      'Fees may include tuition and accommodation, while additional expenses can involve meals, uniforms, extracurricular activities, insurance, travel and other school-specific charges.',
      "A detailed review of the school's fee structure is essential before making a decision.",
    ]),
  },
  {
    category: 'boarding',
    question: 'Do students need a study visa?',
    answer: richText([
      "Visa and immigration requirements depend on the student's nationality, destination, age and intended duration of study.",
      "Where applicable, PEREGRINE provides guidance and application assistance with the relevant study visa procedures, in accordance with the destination's requirements.",
    ]),
  },
  {
    category: 'boarding',
    question: 'Can parents visit or stay in contact with their children?',
    answer: richText([
      'Boarding schools generally provide arrangements for family communication, visits and school holidays.',
      'Policies concerning telephone use, parent visits, leave permissions and travel during school breaks vary by institution.',
    ]),
  },
  {
    category: 'boarding',
    question: 'How does PEREGRINE help families choose the right boarding school?',
    answer: richText([
      "Through our six-stage Blueprint Method, we consider each student's academic profile, interests, individual needs and family priorities.",
      'We also review relevant school arrangements, including accommodation, nutrition, supervision, safeguarding, health support and daily life, helping families evaluate suitable options before beginning the admissions process.',
    ]),
  },

  // Seasonal Camps
  {
    category: 'camps',
    question: 'What ages are seasonal camps suitable for, and how long do they last?',
    answer: richText([
      'International seasonal camps offer programmes for different age groups, with many designed for participants aged 12–18. Selected programmes may accept younger participants from age seven.',
      'Programmes typically last 1–4 weeks, depending on the organiser, season and destination.',
    ]),
  },
  {
    category: 'camps',
    question: 'Is previous language proficiency required?',
    answer: richText([
      'Requirements vary by programme. Some language camps welcome beginners, while academic or specialised programmes may require a particular level of proficiency.',
      "PEREGRINE helps families identify programmes suited to each participant's abilities and experience.",
    ]),
  },
  {
    category: 'camps',
    question: 'Do seasonal camps provide accommodation and meals?',
    answer: richText([
      'Many residential camps include accommodation and meals, while day camps operate without overnight stays.',
      'Accommodation standards, meal arrangements and available facilities vary by provider.',
    ]),
  },
  {
    category: 'camps',
    question: 'How are participants supervised, and can individual needs be accommodated?',
    answer: richText([
      'Camp organisers have their own supervision, safeguarding, healthcare and emergency arrangements.',
      'PEREGRINE helps families review these arrangements and communicate specific requirements, including allergies, dietary restrictions, medication and additional support needs, seeking confirmation from providers before enrolment.',
    ]),
  },
  {
    category: 'camps',
    question: 'How much does an international seasonal camp cost?',
    answer: richText([
      'Fees depend on the destination, programme duration, accommodation and included activities.',
      'Flights, transfers, insurance, visa fees and personal expenses may be additional. PEREGRINE helps families understand the overall costs before making a decision.',
    ]),
  },
  {
    category: 'camps',
    question: 'Are visas required, and can minors travel independently?',
    answer: richText([
      'Visa requirements depend on nationality, destination and programme type.',
      'Independent travel arrangements depend on age, airline policies and applicable regulations. Some programmes offer supervised airport transfers.',
      'PEREGRINE assists with relevant visa procedures and travel coordination, where applicable.',
    ]),
  },
  {
    category: 'camps',
    question: 'How do families stay informed during the camp?',
    answer: richText([
      'Communication arrangements vary by organiser and may include designated contacts, updates and emergency communication channels.',
      "PEREGRINE also maintains contact with families and programme providers, following up on participants' experiences and assisting with coordination when needed.",
    ]),
  },
  {
    category: 'camps',
    question: 'Does PEREGRINE provide support until participants return home?',
    answer: richText([
      'Yes. Our support extends beyond enrolment and departure.',
      'We coordinate arrival arrangements, airport pick-up and camp check-in, maintain follow-up during the programme and assist with departure and return travel arrangements.',
      'We also follow up with families to confirm arrival home, providing a consistent point of contact throughout the experience.',
    ]),
  },

  // Tourist & Visitor Visas
  {
    category: 'visas',
    question: 'How long does the visa application process take?',
    answer: richText([
      'Processing times vary by destination, application type and appointment availability. We recommend starting well in advance of your intended travel dates.',
    ]),
  },
  {
    category: 'visas',
    question: 'What documents do I need?',
    answer: richText([
      'Requirements depend on your destination, travel purpose and individual circumstances. PEREGRINE provides a personalised document checklist and guidance on relevant supporting evidence.',
    ]),
  },
  {
    category: 'visas',
    question: 'Will I need an interview or biometrics?',
    answer: richText([
      'Requirements vary by destination and applicant. Some applications involve biometric appointments, interviews or both. We guide you through the relevant procedures.',
    ]),
  },
  {
    category: 'visas',
    question: 'How much does a visa application cost?',
    answer: richText([
      'Visa fees vary by destination and application category. Additional charges may apply for biometric services, optional appointments or other services.',
      'PEREGRINE explains the relevant costs and our consultancy fees before proceeding.',
    ]),
  },
  {
    category: 'visas',
    question: 'Can I reapply after a visa refusal?',
    answer: richText([
      'A previous refusal does not necessarily prevent a new application. We help you review the reasons for refusal and assess relevant changes in your circumstances before considering a new application.',
    ]),
  },
  {
    category: 'visas',
    question: 'Can I stay for years with a long-validity visa?',
    answer: richText([
      'No. Visa validity and permitted length of stay are different. A visa valid for several years does not automatically permit a continuous stay for that period.',
    ]),
  },
  {
    category: 'visas',
    question: 'Is visa approval guaranteed?',
    answer: richText([
      'No. All visa decisions are made by the relevant immigration authorities. PEREGRINE provides personalised application guidance and preparation support but cannot guarantee approval.',
    ]),
  },
]

type ServiceSeed = {
  key: ServiceKey
  name: string
  shortDescription: string
}

// The questions each service asks in the booking form live in src/lib/consultationForm.ts.
export const services: ServiceSeed[] = [
  {
    key: 'higher-education',
    name: 'Universities & Pathways',
    shortDescription: 'Undergraduate, postgraduate, foundation and pathway programmes at public and private institutions.',
  },
  {
    key: 'boarding',
    name: 'Boarding Schools',
    shortDescription: 'International boarding school selection and admissions.',
  },
  {
    key: 'language-courses',
    name: 'Language Courses',
    shortDescription: 'Language learning abroad, including English and German courses.',
  },
  {
    key: 'camps',
    name: 'Seasonal Camps',
    shortDescription: 'Spring, summer and winter programmes abroad.',
  },
  {
    key: 'student-visa',
    name: 'Student Visa',
    shortDescription: 'Student visa applications and relevant residence procedures.',
  },
  {
    key: 'tourist-visa',
    name: 'Tourist & Visitor Visa',
    shortDescription: 'Visitor visas for the United Kingdom, United States and Canada.',
  },
  {
    key: 'general',
    name: 'General Enquiry',
    shortDescription: 'Any other question about our services.',
  },
]
