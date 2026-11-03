// Page layouts with the client's copy from the FINAL Word documents.
// House style: no em-dashes (replaced with commas or colons), number ranges keep en-dashes.
// `page: 'ref:<slug>'` is replaced with the real page id by the seed script.

import { richText } from '../lexical'
import { privacyPolicy } from './privacy'

type Btn = {
  hideArrow?: boolean
  type?: 'internal' | 'external'
  label: string
  page?: string
  anchor?: string
  url?: string
  variant?: string
  presetService?: string
}

const to = (label: string, slug: string | null, o: Omit<Btn, 'label' | 'page'> = {}): Btn => ({
  type: 'internal',
  label,
  ...(slug ? { page: `ref:${slug}` } : {}),
  ...o,
})

const book = (label = 'Book Your Free Consultation', presetService?: string, variant = 'navy') =>
  to(label, 'book-a-consultation', { presetService, variant })

const settings = (background = 'white', anchorId?: string) => ({ background, ...(anchorId ? { anchorId } : {}) })

const P = (...paras: string[]) => paras.join('\n\n')

export type PageSeed = {
  slug: string
  title: string
  seo: { title: string; description: string }
  layout: Record<string, unknown>[]
}

const NOTE = 'Complimentary initial consultation for all services.'

const home: PageSeed = {
  slug: 'home',
  title: 'Home',
  seo: {
    title: 'PEREGRINE | Study Abroad and Visa Consultancy in Tirana',
    description:
      'Personalised guidance and hands-on application management for universities, boarding schools, seasonal camps, student visas and tourist visas. Book a free consultation.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'photo',
      gradient: 'medium',
      eyebrow: 'International Education & Visa Consultancy',
      heading: 'Tailored Guidance for Every Aspiration',
      buttons: [book(), to('Explore Our Services', null, { anchor: 'services', variant: 'outline', hideArrow: true })],
      imageBrief: 'Radcliffe Camera, Oxford at golden hour (no implied partnership)',
      settings: settings(),
    },
    {
      blockType: 'splitContent',
      eyebrow: 'Who we are',
      heading: 'Experience with Purpose.',
      headingAccent: 'Guidance with Direction.',
      body: P(
        'PEREGRINE is an international education and visa consultancy offering personalised guidance and application support for university admissions, boarding schools, seasonal camps, student visas and tourist and visitor visas.',
        "Founded on seven years of its founder's professional experience in international education, PEREGRINE combines practical industry knowledge, international perspectives and individual attention to help students, families and travellers make informed decisions with confidence.",
      ),
      buttons: [to('Discover Our Story', 'about-us', { variant: 'navy' })],
      imageBrief: 'PEREGRINE office or a consultation in progress',
      imageSide: 'right',
      settings: settings('white', 'who-we-are'),
    },
    {
      blockType: 'serviceCards',
      eyebrow: 'Our services',
      heading: 'Your Goals.',
      headingAccent: 'Our Expertise.',
      intro: 'From academic planning to visa applications, our services are designed to support different educational ambitions and international travel needs.',
      cards: [
        {
          icon: 'graduation-cap',
          title: 'Universities & Pathways',
          text: 'Explore undergraduate, postgraduate, foundation and language programmes at public and private institutions across our study destinations.',
          secondary: 'We assist with programme selection, university applications and relevant student visa procedures.',
          link: to('Learn more', 'universities-and-pathways'),
        },
        {
          icon: 'school',
          title: 'Boarding Schools',
          text: 'Discover international boarding school opportunities, with guidance on educational systems, curricula, school selection and admissions.',
          secondary: 'We help families assess suitable schools and understand the academic and boarding arrangements available.',
          link: to('Learn more', 'boarding-schools'),
        },
        {
          icon: 'users',
          title: 'Seasonal Camps',
          text: 'Explore summer and seasonal programmes offering language learning, academic enrichment, cultural experiences and extracurricular activities.',
          secondary: 'We assist families with programme selection, applications and practical preparations.',
          link: to('Learn more', 'seasonal-camps'),
        },
        {
          icon: 'id-card',
          title: 'Student Visas',
          text: 'Receive support with student visa applications and relevant residence procedures, including documentation, application requirements and procedural guidance.',
          secondary: "Our assistance is adapted to the destination and the applicant's circumstances.",
          link: to('Learn more', 'universities-and-pathways', { anchor: 'approach' }),
        },
        {
          icon: 'luggage',
          title: 'Tourist & Visitor Visas',
          text: 'Receive application support for tourist and visitor visas to the United Kingdom, United States and Canada.',
          secondary: 'We assist with application preparation, supporting documentation and the relevant procedures.',
          link: to('Learn more', 'tourist-visas'),
        },
      ],
      settings: settings('ivory', 'services'),
    },
    {
      blockType: 'destinations',
      programme: 'university',
      eyebrow: 'Study destinations',
      heading: 'Your Future Has No Borders.',
      intro: P(
        'Explore higher education opportunities across 20 international destinations, including a wide range of academic programmes at public and private universities.',
      ),
      footnote: '',
      buttons: [to('Explore Universities & Pathways', 'universities-and-pathways', { variant: 'outline' })],
      settings: settings('white', 'destinations'),
    },
    {
      blockType: 'timeline',
      layout: 'row',
      eyebrow: 'Our approach',
      heading: 'The PEREGRINE',
      headingAccent: 'Blueprint Method',
      subheading: 'From Your First Conversation to Your First Steps Abroad.',
      stages: [
        { icon: 'search', kicker: 'Discover', summary: 'We understand your academic profile, interests, budget and goals.' },
        { icon: 'globe', kicker: 'Explore', summary: 'We identify suitable universities, pathways and language courses, comparing options and costs.' },
        { icon: 'file-text', kicker: 'Design', summary: 'We create your personalised roadmap, including institutions, documents, deadlines and visa requirements.' },
        { icon: 'pen', kicker: 'Apply', summary: 'We support your academic applications and relevant visa procedures, from preparation to follow-up.' },
        { icon: 'plane', kicker: 'Prepare', summary: 'We guide you through accommodation, insurance, travel arrangements, enrolment and pre-departure steps.' },
        { icon: 'map-pin', kicker: 'Settle', summary: 'We help you navigate arrival requirements, residence procedures, local registration and student services.' },
      ],
      buttons: [to('Explore Universities & Pathways', 'universities-and-pathways', { anchor: 'approach', variant: 'navy' })],
      settings: settings('ivory', 'approach'),
    },
    {
      blockType: 'cta',
      style: 'light',
      eyebrow: 'Your next step',
      heading: "Let's Talk About Your Next Step.",
      intro:
        'Every educational and international journey begins with individual circumstances, questions and aspirations. We would be pleased to understand yours and explain how PEREGRINE can assist.',
      buttons: [book()],
      highlights: [
        { icon: 'chat', label: 'Discuss Your Plans' },
        { icon: 'compass', label: 'Explore Your Options' },
        { icon: 'file-text', label: 'Understand the Next Steps' },
      ],
      settings: settings(),
    },
  ],
}

const universities: PageSeed = {
  slug: 'universities-and-pathways',
  title: 'Universities & Pathways',
  seo: {
    title: 'Universities & Pathways | PEREGRINE',
    description:
      'Foundation, Bachelor, Pre-Master, Master, MBA and language courses abroad across 20 destinations, with personalised academic guidance and hands-on application support.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'photo',
      gradient: 'medium',
      eyebrow: 'Universities & Pathways',
      heading: 'A world of educational opportunities across diverse study destinations, universities and academic pathways.',
      buttons: [book('Book Your Free Consultation', 'higher-education'), to('Explore Programmes', null, { anchor: 'pathways', variant: 'outline' })],
      imageBrief: 'Radcliffe Camera, Oxford at golden hour (no implied partnership)',
      settings: settings(),
    },
    {
      blockType: 'cardGrid',
      style: 'card',
      columns: '3',
      numbered: false,
      eyebrow: 'Your educational pathway',
      heading: 'Find Your Educational Pathway',
      intro:
        'From foundation programmes to postgraduate studies and language courses, discover opportunities aligned with your academic ambitions.',
      items: [
        { icon: 'book', title: 'Foundation & Studienkolleg', text: 'Preparatory pathways helping eligible students meet undergraduate entry requirements.' },
        { icon: 'graduation-cap', title: "Bachelor's Degree", text: 'Undergraduate programmes building academic knowledge and career-ready skills across a wide range of disciplines.' },
        { icon: 'file-text', title: 'Pre-Master', text: "Preparatory programmes supporting progression towards eligible Master's degrees." },
        { icon: 'chart', title: "Master's Degree", text: 'Postgraduate programmes for advanced academic study, subject specialisation and professional development.' },
        { icon: 'briefcase', title: 'MBA', text: 'Business programmes focused on leadership, management and strategic decision-making.' },
        { icon: 'languages', title: 'Language Courses', text: 'Language programmes abroad for academic preparation, career development and personal growth.' },
      ],
      closingText: 'Not sure which pathway is right for you? Let us guide you.',
      buttons: [book('Book Your Free Consultation', 'higher-education')],
      settings: settings('ivory', 'pathways'),
    },
    {
      blockType: 'fieldsGrid',
      eyebrow: 'Find your passion',
      heading: 'Explore Fields of Study',
      intro:
        'Your choice of subject can shape both your academic experience and your future career. Whether you have a clear direction in mind or are still discovering your interests, we help you explore fields of study that reflect your strengths, aspirations and long-term goals.',
      settings: settings('white', 'fields-of-study'),
    },
    {
      blockType: 'destinations',
      programme: 'university',
      eyebrow: 'Study destinations',
      heading: 'Find Your Place in the World.',
      intro:
        'Explore study opportunities across 20 international destinations, with guidance on universities, education systems, admission requirements and costs. We help you find the destination that best aligns with your academic goals and future ambitions.',
      footnote: '',
      settings: settings('tint', 'destinations'),
    },
    {
      blockType: 'timeline',
      layout: 'row',
      eyebrow: 'Our approach',
      heading: 'The PEREGRINE',
      headingAccent: 'Blueprint Method',
      subheading: 'From Your First Conversation to Your First Steps Abroad.',
      stages: [
        { icon: 'search', kicker: 'Discover', summary: 'Understanding your academic background, interests, qualifications, budget and future goals.' },
        { icon: 'globe', kicker: 'Explore', summary: 'Researching suitable universities, academic pathways and language courses, including requirements and costs.' },
        { icon: 'file-text', kicker: 'Design', summary: 'Creating your personalised application strategy, with clear priorities, documents and deadlines.' },
        { icon: 'pen', kicker: 'Apply', summary: 'Supporting academic applications and relevant visa procedures, from preparation to follow-up.' },
        { icon: 'plane', kicker: 'Prepare', summary: 'Guiding you through accommodation, insurance, travel, enrolment and pre-departure requirements.' },
        { icon: 'map-pin', kicker: 'Settle', summary: 'Helping you navigate arrival procedures, local registration and essential student services.' },
      ],
      settings: settings('ivory', 'approach'),
    },
    {
      blockType: 'faq',
      category: 'universities',
      eyebrow: '01 · Universities, Pathways & Student Visa',
      heading: 'Your Questions, Answered.',
      intro:
        'Explore answers to common questions about study programmes, university admissions, entry requirements, tuition fees, student visas and preparing for your education abroad.',
      settings: settings('white', 'faq'),
    },
    {
      blockType: 'cta',
      style: 'navy-photo',
      eyebrow: 'Your next step',
      heading: 'Your Next Chapter Starts Here.',
      intro:
        'Whether you are exploring university programmes, considering a language course abroad or preparing for your next academic qualification, we are here to help you understand your options and take the next step with confidence.',
      buttons: [book('Book Your Free Consultation', 'higher-education'), book('Ask About Language Courses', 'language-courses', 'outline')],
      footnote: NOTE,
      imageBrief: 'historic library reading room, warm natural light',
      settings: settings(),
    },
  ],
}

const boarding: PageSeed = {
  slug: 'boarding-schools',
  title: 'Boarding Schools',
  seo: {
    title: 'International Boarding Schools | PEREGRINE',
    description:
      'Personalised guidance for families choosing an international boarding school: curricula, residential life, student care, admissions and study visa procedures.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'photo',
      gradient: 'medium',
      eyebrow: 'Boarding schools',
      heading: 'A diverse selection of boarding schools across international destinations, combining academic excellence, supportive residential environments and personal growth.',
      buttons: [book('Book Your Free Consultation', 'boarding')],
      imageBrief: 'historic boarding school grounds, students walking between buildings',
      settings: settings(),
    },
    {
      blockType: 'featureGroups',
      numbered: true,
      eyebrow: 'The Boarding School Experience',
      heading: 'A School. A Home. A Community.',
      subheading: 'An Education That Goes Beyond the Classroom.',
      intro: 'Boarding schools combine academic learning, residential care and personal development in a supportive international environment.',
      // Short checklists from the client's feedback (30 October 2026, shortened 2 November 2026).
      groups: [
        {
          icon: 'graduation-cap',
          title: 'Academic Excellence & International Curricula',
          items: [
            { title: 'International curricula (GCSEs, A-Levels, IB, AP).' },
            { title: 'Academic support and progress monitoring.' },
            { title: 'University and career guidance.' },
          ],
        },
        {
          icon: 'home',
          title: 'Boarding Life & Daily Experiences',
          items: [
            { title: 'Supervised residential accommodation.' },
            { title: 'Sports, arts and extracurricular activities.' },
            { title: 'Excursions and social experiences.' },
          ],
        },
        {
          icon: 'users',
          title: 'Care, Supervision & Student Wellbeing',
          items: [
            { title: 'Pastoral care and safeguarding.' },
            { title: 'Health, nutrition and individual needs.' },
            { title: 'Family communication and daily supervision.' },
          ],
        },
        {
          icon: 'globe',
          title: 'Personal Growth & Lifelong Connections',
          items: [
            { title: 'Independence, confidence and leadership.' },
            { title: 'International friendships and cultural exchange.' },
            { title: 'Lifelong connections and alumni communities.' },
          ],
        },
      ],
      settings: settings('ivory', 'boarding-life'),
    },
    {
      blockType: 'cardGrid',
      style: 'card',
      columns: '2',
      numbered: false,
      eyebrow: 'Curricula & academic pathways',
      heading: 'Different Pathways.',
      headingAccent: 'A World of Possibilities.',
      intro: 'Explore international curricula aligned with different learning styles and future university ambitions.',
      items: [
        { icon: 'landmark', title: 'British Curriculum | GCSEs & A-Levels', text: 'A structured pathway combining broad foundations with subject specialisation.' },
        { icon: 'globe', title: 'International Baccalaureate (IB)', text: 'Broad academic learning, critical thinking and independent research.' },
        { icon: 'university', title: 'American Curriculum | High School Diploma & AP', text: 'Flexible subject choices, electives and opportunities for advanced study.' },
        { icon: 'languages', title: 'Other National & International Pathways', text: 'Different curricula, teaching approaches and languages of instruction.' },
      ],
      buttons: [book('Explore Your Options', 'boarding')],
      footnote: '',
      settings: settings('white', 'curricula'),
    },
    {
      blockType: 'destinations',
      programme: 'boarding',
      eyebrow: 'Boarding school destinations',
      heading: 'A World of Educational Opportunities.',
      intro: P(
        'Explore international boarding school opportunities across a range of destinations, each offering distinctive academic traditions, cultural experiences and learning environments.',
        'At PEREGRINE, we guide students and families in exploring destinations and identifying schools that align with individual academic interests, personal aspirations and future educational goals.',
      ),
      footnote: '',
      settings: settings('tint', 'destinations'),
    },
    {
      blockType: 'timeline',
      layout: 'row',
      eyebrow: 'Our approach',
      heading: 'The PEREGRINE',
      headingAccent: 'Blueprint Method',
      subheading: 'From Your First Conversation to Your First Steps Abroad.',
      stages: [
        { icon: 'search', kicker: 'Discover', summary: "Understanding each student's academic background, interests, individual needs and family priorities." },
        { icon: 'globe', kicker: 'Explore', summary: 'Evaluating curricula, boarding facilities, supervision, safeguarding, wellbeing and daily life.' },
        { icon: 'file-text', kicker: 'Design', summary: 'Creating a personalised school shortlist and admissions plan aligned with student and family needs.' },
        { icon: 'pen', kicker: 'Apply', summary: 'Supporting school applications, assessments, interviews, documentation and relevant study visa procedures.' },
        { icon: 'plane', kicker: 'Prepare', summary: 'Guiding boarding arrangements, health and dietary requirements, documentation and departure preparations.' },
        { icon: 'map-pin', kicker: 'Settle', summary: 'Supporting the initial transition through arrival guidance, practical coordination and family communication.' },
      ],
      settings: settings('ivory', 'approach'),
    },
    {
      blockType: 'faq',
      category: 'boarding',
      eyebrow: '02 · Boarding Schools',
      heading: 'Your Questions, Answered.',
      intro:
        'Explore answers to common questions about admissions, academic curricula, boarding life, student wellbeing and studying at an international boarding school.',
      settings: settings('white', 'faq'),
    },
    {
      blockType: 'cta',
      style: 'navy-photo',
      eyebrow: 'Begin your journey',
      heading: 'Their Future Deserves a Thoughtful Beginning.',
      intro: P(
        "Choosing the right boarding school is an important step towards a young person's future.",
        "At PEREGRINE, we understand the trust involved in this decision. With personalised guidance and careful attention to each student's academic, personal and wellbeing needs, we help families explore their options and make informed choices with confidence.",
      ),
      buttons: [book('Book Your Free Consultation', 'boarding')],
      footnote: NOTE,
      imageBrief: 'boarding school library or common room, warm light',
      settings: settings(),
    },
  ],
}

const camps: PageSeed = {
  slug: 'seasonal-camps',
  title: 'Seasonal Camps',
  seo: {
    title: 'International Seasonal Camps | PEREGRINE',
    description:
      'Spring, summer and winter camps abroad combining language learning, sports, creativity and cultural discovery, with personalised guidance from selection to the safe return home.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'photo',
      gradient: 'medium',
      eyebrow: 'Seasonal camps',
      heading: 'Spring, summer and winter programmes combining learning, adventure and cultural discovery to inspire personal growth.',
      buttons: [book('Book Your Free Consultation', 'camps')],
      imageBrief: 'teenagers at an outdoor summer programme, lake or mountains',
      settings: settings(),
    },
    {
      blockType: 'cardGrid',
      style: 'card',
      columns: '3',
      eyebrow: 'Explore by season',
      heading: 'Every Season.',
      headingAccent: 'New Possibilities.',
      intro:
        'Discover international camps combining academic exploration, language learning, cultural experiences and adventure throughout the year.',
      items: [
        { icon: 'flower', title: 'Spring Camps', subtitle: 'March – April', text: 'Language immersion, cultural discovery, educational excursions and outdoor learning experiences.' },
        { icon: 'sun', title: 'Summer Camps', subtitle: 'June – August', text: 'University exploration, academic enrichment, language programmes, leadership development, sports and creative activities.' },
        { icon: 'snowflake', title: 'Winter Camps', subtitle: 'December – January', text: 'Skiing, snowboarding, winter adventures, language learning and international cultural experiences.' },
      ],
      closingHeading: 'Typical Duration: 1–4 Weeks',
      footnote: 'Dates, duration and age requirements vary by programme.',
      closingAbove: true,
      settings: settings('ivory', 'seasons'),
    },
    {
      blockType: 'cardGrid',
      style: 'compact',
      columns: '3',
      eyebrow: 'Explore by interest',
      heading: 'Find an Experience That Fits.',
      intro: P(
        'Whether your child is passionate about languages, sports, creativity or academic discovery, the right seasonal camp should reflect their age, interests, abilities and individual needs.',
        'At PEREGRINE, we help families explore suitable programmes and make informed choices with confidence.',
      ),
      items: [
        { icon: 'languages', title: 'Language & Culture', text: 'Develop language skills, discover new cultures and connect with peers from around the world.' },
        { icon: 'trophy', title: 'Sports & Adventure', text: 'Explore individual and team sports, outdoor challenges and exciting recreational activities.' },
        { icon: 'palette', title: 'Creative & Academic', text: 'Discover arts, design, creative workshops and opportunities to explore new academic interests.' },
        { icon: 'atom', title: 'STEAM & Innovation', text: 'Explore science, technology, engineering, arts and mathematics through interactive, hands-on experiences.' },
        { icon: 'university', title: 'University Exploration', text: 'Selected programmes offer campus visits, introductory academic experiences and opportunities to discover future study interests.' },
        { icon: 'sparkles', title: 'Personal Development', text: 'Build confidence, independence, teamwork and communication skills through shared experiences and new challenges.' },
      ],
      footnote: '',
      settings: settings('white', 'interests'),
    },
    {
      blockType: 'destinations',
      programme: 'camps',
      eyebrow: 'Seasonal camp destinations',
      heading: 'A World of Experiences Awaits.',
      intro:
        "From language immersion and academic enrichment to outdoor activities and new cultural experiences, we help families explore programmes that reflect each participant's age, interests, abilities and individual needs.",
      footnote: '',
      settings: settings('tint', 'destinations'),
    },
    {
      blockType: 'timeline',
      layout: 'row',
      eyebrow: 'The PEREGRINE Blueprint Method',
      heading: 'Your Journey with PEREGRINE.',
      subheading: 'Personalised Guidance. Every Step of the Way.',
      stages: [
        { icon: 'search', kicker: 'Discover', summary: "Understanding each participant's age, interests, language skills, individual needs and family priorities." },
        { icon: 'globe', kicker: 'Explore', summary: 'Evaluating suitable camps, activities, accommodation, supervision, safeguarding and wellbeing arrangements.' },
        { icon: 'file-text', kicker: 'Design', summary: 'Creating a personalised programme shortlist based on individual interests, needs and family preferences.' },
        { icon: 'pen', kicker: 'Apply', summary: 'Assisting with camp registration, enrolment, documentation and applicable visa procedures.' },
        { icon: 'plane', kicker: 'Prepare', summary: 'Guiding travel arrangements, transfers, insurance, health requirements and pre-departure preparations.' },
        { icon: 'home', kicker: 'Support & Return', summary: 'Providing guidance during the camp experience, coordinating return arrangements and supporting the journey home.' },
      ],
      settings: settings('ivory', 'approach'),
    },
    {
      blockType: 'faq',
      category: 'camps',
      eyebrow: '03 · Seasonal Camps',
      heading: 'Your Questions, Answered.',
      intro:
        'Find answers to common questions about camp programmes, age requirements, accommodation, activities, student supervision and travel arrangements.',
      settings: settings('white', 'faq'),
    },
    {
      blockType: 'cta',
      style: 'navy-photo',
      eyebrow: 'Your next step',
      heading: 'Experiences That Stay. Opportunities That Grow.',
      intro: P(
        'Every international experience begins with the right opportunity.',
        'At PEREGRINE, we help families explore seasonal camps that reflect individual interests, aspirations and needs, combining thoughtful programme selection with personalised guidance and support throughout the journey.',
      ),
      buttons: [book('Book Your Free Consultation', 'camps')],
      footnote: NOTE,
      imageBrief: 'campfire or group activity at a summer camp, golden hour',
      settings: settings(),
    },
  ],
}

const visas: PageSeed = {
  slug: 'tourist-visas',
  title: 'Tourist & Visitor Visas',
  seo: {
    title: 'Tourist & Visitor Visas: UK, USA, Canada | PEREGRINE',
    description:
      'Personalised visitor visa application guidance for the United Kingdom, United States and Canada: documentation, application preparation, appointments and follow-up.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'photo',
      gradient: 'medium',
      eyebrow: 'Tourist & Visitor Visas',
      heading: 'Bringing your travel plans closer to reality with personalised visa application support for the UK, USA and Canada.',
      buttons: [book('Book Your Consultation', 'tourist-visa')],
      imageBrief: 'traveller at an airport terminal, daylight',
      settings: settings(),
    },
    {
      blockType: 'cardGrid',
      style: 'card',
      columns: '3',
      eyebrow: 'More reasons to travel',
      heading: 'Every Journey Has a Purpose.',
      intro:
        'From holidays and family reunions to educational exploration and professional opportunities, PEREGRINE provides personalised visa application guidance for a range of eligible travel purposes across the United Kingdom, United States and Canada.',
      items: [
        { icon: 'palm-tree', title: 'Tourism & Leisure', text: 'Discover new destinations, enjoy holidays and experience different cultures.' },
        { icon: 'heart-handshake', title: 'Family & Friends Visits', text: 'Reconnect with loved ones, visit relatives and celebrate special moments together.' },
        { icon: 'tent', title: 'Camps & Short-Term Learning', text: 'Explore eligible seasonal camps, language courses and short-term recreational learning opportunities.' },
        { icon: 'briefcase', title: 'Business & Professional Events', text: 'Attend permitted business meetings, conferences, exhibitions and professional events.' },
        { icon: 'university', title: 'University Visits & Educational Exploration', text: 'Explore university campuses, attend open days and discover future study opportunities.' },
        { icon: 'ticket', title: 'Cultural & Special Events', text: 'Attend eligible cultural, sporting and social events, from festivals to special celebrations.' },
      ],
      footnote: '',
      settings: settings('ivory', 'purposes'),
    },
    {
      blockType: 'cardGrid',
      style: 'photo',
      columns: '3',
      eyebrow: 'Explore your destinations',
      heading: 'Three Destinations.',
      headingAccent: 'A World of Possibilities.',
      intro: 'Explore tourist and visitor visa options for the United Kingdom, United States and Canada, with personalised application guidance tailored to your travel plans.',
      items: [
        { icon: 'landmark', flag: 'GB', title: 'United Kingdom', kicker: 'Standard Visitor Visa', metaLabel: 'Visa validity options', metaValue: '6 Months · 2 Years · 5 Years · 10 Years' },
        { icon: 'globe', flag: 'US', title: 'United States', kicker: 'B1/B2 Visitor Visa', metaLabel: 'Visa validity', metaValue: 'Up to 10 Years' },
        { icon: 'map-pin', flag: 'CA', title: 'Canada', kicker: 'Visitor Visa', metaLabel: 'Visa validity', metaValue: 'Up to 10 Years*' },
      ],
      footnote: '',
      settings: settings('white', 'destinations'),
    },
    {
      blockType: 'featureGroups',
      numbered: false,
      eyebrow: 'Application options',
      heading: 'Visa Guidance for Every Traveller.',
      intro: 'Personalised visa application guidance based on your nationality, residence and travel plans.',
      groups: [
        {
          icon: 'id-card',
          title: 'Who We Assist',
          items: [
            { title: 'Albanian Citizens Residing in Albania' },
            { title: 'Albanian Citizens Residing in the European Union' },
            { title: 'Foreign Nationals Residing in Albania' },
          ],
        },
        {
          icon: 'users',
          title: 'Travelling Alone or Together?',
          items: [{ title: 'Individuals' }, { title: 'Couples' }, { title: 'Families' }, { title: 'Friends & Groups' }],
        },
      ],
      footnote: '',
      settings: settings('ivory', 'application-options'),
    },
    {
      blockType: 'cardGrid',
      style: 'line',
      columns: '3',
      numbered: true,
      eyebrow: 'Our services',
      heading: 'Professional Guidance.',
      headingAccent: 'Personalised Support.',
      intro:
        'From initial consultation to pre-travel preparation, we provide personalised guidance through every stage of your visa application.',
      items: [
        { title: 'Personalised Visa Consultation', text: 'Assessing your travel purpose, individual circumstances and relevant visa requirements.' },
        { title: 'Documentation Guidance', text: 'Providing tailored document checklists and guidance on financial and supporting evidence.' },
        { title: 'Application Preparation', text: 'Assisting with application forms, supporting documents and accuracy checks.' },
        { title: 'Appointments & Interviews', text: 'Guidance on appointment booking, biometrics and interview preparation, where applicable.' },
        { title: 'Submission & Follow-Up', text: 'Supporting submission procedures, application tracking and additional document requests.' },
        { title: 'Pre-Travel Guidance', text: 'Explaining visa conditions, entry requirements and essential travel preparations.' },
      ],
      settings: settings('navy', 'how-we-help'),
    },
    {
      blockType: 'notice',
      legal: true,
      text: 'Visa decisions, processing times and entry permissions remain under the authority of the relevant immigration and border authorities. PEREGRINE provides personalised application guidance and preparation support but cannot guarantee approval.',
      settings: settings('white'),
    },
    {
      blockType: 'faq',
      category: 'visas',
      eyebrow: '04 · Tourist & Visitor Visa',
      heading: 'Your Questions, Answered.',
      intro:
        'Explore answers to common questions about visa requirements, supporting documents, application procedures, processing times and preparing for your visit to the UK, USA or Canada.',
      settings: settings('white', 'faq'),
    },
    {
      blockType: 'cta',
      style: 'navy-photo',
      eyebrow: 'Your next journey',
      heading: 'Your Next Journey Starts Here.',
      intro: P(
        'Wherever your plans may take you, the right guidance makes all the difference.',
        'Let PEREGRINE help you navigate your tourist or visitor visa application with personalised support and careful preparation.',
      ),
      buttons: [book('Book Your Consultation', 'tourist-visa')],
      footnote: 'Personalised Support · Clear Guidance · A Smoother Journey',
      imageBrief: 'passport and boarding pass on a desk, soft daylight',
      settings: settings(),
    },
  ],
}

const about: PageSeed = {
  slug: 'about-us',
  title: 'About Us',
  seo: {
    title: 'About Us | PEREGRINE Consultancy',
    description:
      'PEREGRINE is an international education and visa consultancy in Tirana, founded by Elisabeta Rada on seven years of professional experience in international education.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'photo',
      gradient: 'medium',
      eyebrow: 'About us',
      heading: 'An international education and visa consultancy built on professional experience, international perspectives and a commitment to personalised guidance.',
      buttons: [to('Our Approach', null, { anchor: 'principles', variant: 'outline', hideArrow: true })],
      imageBrief: 'PEREGRINE office interior, navy and warm wood tones',
      settings: settings(),
    },
    {
      blockType: 'splitContent',
      eyebrow: 'Our story',
      heading: 'A Personal Approach to International Opportunities.',
      body: P(
        'PEREGRINE was established with a clear purpose: to make international education and visa application processes more understandable, accessible and responsive to individual needs.',
        "We believe that every educational or international journey begins with different circumstances, priorities and aspirations. Our approach goes beyond presenting opportunities, focusing on understanding each client's goals, providing thoughtful recommendations and supporting well-informed decisions.",
        'At the heart of PEREGRINE is a commitment to building trusted relationships through transparency, professional responsibility and genuine individual attention.',
      ),
      imageSide: 'none',
      settings: settings('white', 'our-story'),
    },
    {
      blockType: 'founder',
      eyebrow: 'The Experience Behind PEREGRINE',
      name: 'Elisabeta Rada',
      role: 'Founder | PEREGRINE Consultancy',
      body: P(
        'With seven years of experience in international education, Elisabeta has worked across university admissions, educational consultancy, strategic management, international education fairs and institutional partnerships.',
        'Her experience as an exchange student, alongside participation in international education and training programmes across different countries, has shaped her understanding of different educational systems and cultures.',
        "She founded PEREGRINE to translate this experience into an independent consultancy where every client's goals and circumstances receive individual attention.",
      ),
      quoteLabel: 'A Note from the Founder',
      quote:
        'I believe meaningful guidance begins with listening and understanding. Every journey is different, and every important decision deserves clarity, care and personal attention.',
      signature: 'Elisabeta Rada',
      imageBrief: 'professional portrait of Elisabeta Rada (to be supplied)',
      settings: settings('ivory', 'founder'),
    },
    {
      blockType: 'cardGrid',
      style: 'card',
      columns: '4',
      eyebrow: 'Our principles',
      heading: 'The Values Behind Our Work.',
      intro: 'Our approach is guided by four core principles that shape every client experience.',
      items: [
        { icon: 'users', title: 'Individual Attention', text: "We take time to understand each client's goals and circumstances to recommend the most suitable options." },
        { icon: 'file-search', title: 'Clarity & Transparency', text: 'We provide clear information about requirements, procedures and considerations, so you can make informed decisions.' },
        { icon: 'shield-check', title: 'Professional Responsibility', text: 'We approach every application with care, accuracy and respect for the requirements of institutions and authorities.' },
        { icon: 'handshake', title: 'Dedicated Support', text: 'We provide practical assistance with application preparation, submission and follow-up, tailored to the agreed service and relevant procedures.' },
      ],
      settings: settings('white', 'principles'),
    },
    {
      blockType: 'cta',
      style: 'navy-photo',
      eyebrow: 'Your next step',
      heading: 'Every Journey Begins with a Conversation.',
      intro:
        'Whether you are exploring study options, considering opportunities for your child or preparing a visa application, we are here to listen, understand your plans and help you identify the next steps.',
      buttons: [book()],
      footnote: NOTE,
      imageBrief: 'consultation table in the PEREGRINE office, warm light',
      settings: settings(),
    },
  ],
}

const partner: PageSeed = {
  slug: 'partner-with-us',
  title: 'Partner With Us',
  seo: {
    title: 'Partner With Us | PEREGRINE',
    description:
      'PEREGRINE welcomes partnerships with international education institutions, schools, educational organisations and student support providers in Albania and beyond.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'photo',
      gradient: 'medium',
      eyebrow: 'Institutional partnerships',
      heading: 'Institutional partnerships fostering international educational cooperation, professional collaboration and new opportunities for students and organisations in Albania and beyond.',
      buttons: [
        to('Explore Partnership Opportunities', null, { anchor: 'opportunities', variant: 'outline' }),
        to('Become a Partner', null, { anchor: 'become-a-partner', variant: 'navy' }),
      ],
      imageBrief: 'handshake across a meeting table, international education setting',
      settings: settings(),
    },
    {
      blockType: 'splitContent',
      eyebrow: 'Why PEREGRINE',
      heading: 'Local Insight.',
      headingAccent: 'International Perspective.',
      body: P(
        "Based in Albania, PEREGRINE is an international education and visa consultancy built on seven years of its founder's professional experience in the sector.",
        'We combine an understanding of the local education market with personalised student guidance, admissions support and experience working with international educational institutions.',
        'Our approach centres on professional communication, individual attention and collaboration tailored to the objectives of the organisations involved.',
      ),
      imageBrief: 'Tirana skyline or PEREGRINE office meeting room',
      imageSide: 'right',
      settings: settings('ivory', 'why-peregrine'),
    },
    {
      blockType: 'cardGrid',
      style: 'card',
      columns: '3',
      numbered: false,
      withPhotos: true,
      eyebrow: 'Who we collaborate with',
      heading: 'Partnerships Across Education & Beyond.',
      intro:
        'We welcome collaborations with educational institutions, regional organisations and professional service providers supporting international education.',
      items: [
        { icon: 'graduation-cap', title: 'International Education Institutions', text: 'Universities, boarding schools, language centres, pathway providers and seasonal camp organisers.' },
        { icon: 'users', title: 'Schools & Educational Organisations in Albania and the Region', text: 'Schools, universities and career centres interested in educational events, academic guidance and institutional cooperation.' },
        { icon: 'briefcase', title: 'Professional & Student Support Providers', text: 'Insurance, accommodation, translation, notarial and travel service providers supporting international students.' },
      ],
      settings: settings('white', 'opportunities'),
    },
    {
      blockType: 'partnerForm',
      eyebrow: "Let's connect",
      heading: "Let's Explore a Partnership.",
      intro:
        'Whether you represent an educational institution or a professional organisation, we would welcome the opportunity to learn more about your work and explore potential areas of collaboration.',
      formHeading: 'Partnership enquiry form',
      organisationTypes: [
        { label: 'International education institution' },
        { label: 'School or educational organisation (Albania and the region)' },
        { label: 'Professional or student support provider' },
        { label: 'Other' },
      ],
      consentText:
        "I agree to the processing of my personal information for the purpose of responding to this enquiry, in accordance with PEREGRINE's Privacy Policy.",
      successMessage: 'Thank you for your interest in partnering with PEREGRINE. We will review your proposal and reply by email.',
      settings: settings('ivory', 'become-a-partner'),
    },
  ],
}

const bookingPage: PageSeed = {
  slug: 'book-a-consultation',
  title: 'Book a Consultation',
  seo: {
    title: 'Book a Free Consultation | PEREGRINE',
    description:
      'Book your complimentary initial consultation with PEREGRINE for university admissions, boarding schools, seasonal camps, student visas or tourist visas.',
  },
  layout: [
    {
      blockType: 'booking',
      eyebrow: 'Book a consultation',
      heading: 'Book a Free Consultation.',
      intro: 'Every academic journey begins with a conversation. Tell us about your plans and our team will get in touch.',
      note: 'Complimentary initial consultation · No obligation',
      contactHeading: 'Contact us',
      formHeading: 'Your enquiry',
      formNote:
        'The purpose of this form is to understand your requests, preferences and goals, so that we can offer you the most suitable, personalised consultation. Fields marked * are required. Please do not send passports or financial records at this stage.',
      consentText:
        'I accept the processing of my personal data for the purpose of reviewing and responding to my request, in accordance with the Privacy Policy of PEREGRINE Consultancy.',
      successMessage: 'Our team will contact you as soon as possible to discuss your request and the next steps.',
      settings: settings('tint'),
    },
  ],
}

const privacyPage: PageSeed = {
  slug: 'privacy-policy',
  title: 'Privacy Policy',
  seo: {
    title: 'Privacy Policy | PEREGRINE',
    description: 'How PEREGRINE Consultancy collects, uses, stores and protects personal data, and the rights you have over it.',
  },
  layout: [
    {
      blockType: 'richText',
      eyebrow: 'PEREGRINE Consultancy',
      heading: 'Privacy Policy',
      content: richText(privacyPolicy),
      width: 'narrow',
      // Until the client fills in the bracketed details (legal name, NIPT, address, dates, retention period).
      settings: { ...settings('white'), pendingApproval: true },
    },
  ],
}

export const pages: PageSeed[] = [home, universities, boarding, camps, visas, about, partner, bookingPage, privacyPage]

export const headerSeed = {
  navItems: [
    to('Home', 'home'),
    {
      ...to('Study Abroad', null),
      children: [
        to('Universities & Pathways', 'universities-and-pathways'),
        to('Boarding Schools', 'boarding-schools'),
        to('Seasonal Camps', 'seasonal-camps'),
      ],
    },
    to('Visas', 'tourist-visas'),
    to('About Us', 'about-us'),
    to('Contact', 'book-a-consultation', { anchor: 'contact' }),
  ],
  cta: to('Book a Consultation', 'book-a-consultation'),
}

export const footerSeed = {
  tagline: 'Study Abroad · Visa Consultancy',
  columns: [
    {
      title: 'Our services',
      links: [
        to('Universities & Pathways', 'universities-and-pathways'),
        to('Boarding Schools', 'boarding-schools'),
        to('Seasonal Camps', 'seasonal-camps'),
        to('Student Visas', 'universities-and-pathways', { anchor: 'approach' }),
        to('Tourist & Visitor Visas', 'tourist-visas'),
      ],
    },
    {
      title: 'Company',
      links: [
        to('About Us', 'about-us'),
        to('Partner With Us', 'partner-with-us'),
        to('Study Destinations', 'universities-and-pathways', { anchor: 'destinations' }),
        to('FAQs', 'universities-and-pathways', { anchor: 'faq' }),
        to('Book a Consultation', 'book-a-consultation'),
      ],
    },
  ],
  contactTitle: 'Contact us',
  bottomNote: 'Instagram · Facebook · LinkedIn · YouTube: links to be supplied',
}

export const siteSettingsSeed = {
  phone: '+355 69 424 2373',
  whatsappNumber: '355694242373',
  email: 'info@peregrine.al',
  website: 'peregrine.al',
  address: 'Kristal Center, 1000, Rruga Frang Bardhi, Tiranë, Qarku I Tiranës, AL',
  addressConfirmed: true,
  openingHours: 'Mon to Fri: 9:00 to 18:00',
  hoursNote: '',
  socialLinks: [
    { platform: 'facebook', url: 'https://www.facebook.com/peregrine.al' },
    { platform: 'instagram', url: 'https://www.instagram.com/peregrine.edu.al' },
    { platform: 'linkedin', url: 'https://www.linkedin.com/company/peregrine-albania/' },
  ],
  seoDefaults: {
    siteName: 'PEREGRINE',
    description:
      'PEREGRINE is an international education and visa consultancy in Tirana, offering personalised guidance for universities, boarding schools, seasonal camps, student visas and tourist visas.',
  },
}
