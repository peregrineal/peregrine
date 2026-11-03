// The consultation form from the client's "Formulari.docx": step 1 asks for contact details and the
// service, step 2 shows only the questions of that service, step 3 asks for anything else and consent.
// The Albanian wording is the client's; the English was drafted by DuaDev (see docs/TRANSLATION-REVIEW.md).
// Questions and their options are fixed here rather than in the admin because the validation,
// the stored enquiry and the email all depend on them.

import type { ServiceKey } from './constants'
import type { Locale } from './i18n'

export type Text = Record<Locale, string>

export type Choice = {
  value: string
  label: Text
  /** Shows a text box to specify the answer ("Other"). */
  other?: boolean
  /** In a multiple choice, picking this clears the other answers ("Not sure yet"). */
  exclusive?: boolean
}

/** Destination lists come from the Destinations library, filtered by programme. */
export type CountrySource = 'university' | 'boarding' | 'camps'

export type Question = {
  id: string
  /** radio: short list shown as buttons; select: dropdown; checkboxes: several answers. */
  type: 'text' | 'textarea' | 'number' | 'radio' | 'select' | 'checkboxes'
  label: Text
  hint?: Text
  placeholder?: Text
  note?: Text
  required?: boolean
  choices?: Choice[]
  /** Fills the choices from the Destinations library (plus "Not sure yet" or "Other"). */
  countries?: CountrySource
}

export type ServiceForm = { sections: { heading?: Text; questions: Question[] }[] }

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/€/g, 'eur')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const opt = (en: string, sq: string, extra: Partial<Choice> = {}): Choice => ({ value: slug(en), label: { en, sq }, ...extra })

export const OTHER = '__other'
export const NOT_SURE = '__not-sure'

const other = (sq = 'Tjetër'): Choice => ({ value: OTHER, label: { en: 'Other', sq }, other: true })
const notDecided = opt('Not decided yet', 'Ende i pavendosur')
const notSureCountry: Choice = { value: NOT_SURE, label: { en: 'Not decided yet', sq: 'Ende i pavendosur' }, exclusive: true }
const severalHint: Text = { en: 'You can choose more than one option.', sq: 'Mund të zgjidhni më shumë se një alternativë.' }

const languages = [
  opt('English', 'Anglisht'),
  opt('German', 'Gjermanisht'),
  opt('French', 'Frëngjisht'),
  opt('Italian', 'Italisht'),
  opt('Spanish', 'Spanjisht'),
]

const cefr = [
  opt('A1 – Beginner', 'A1 – Fillestar'),
  opt('A2 – Elementary', 'A2 – Bazë'),
  opt('B1 – Intermediate', 'B1 – Mesatar'),
  opt('B2 – Upper intermediate', 'B2 – Mesatar i avancuar'),
  opt('C1 – Advanced', 'C1 – I avancuar'),
  opt('C2 – Proficient', 'C2 – Shumë i avancuar'),
  opt('Not sure', 'Nuk jam i sigurt'),
]

const age = (id: string): Question => ({
  id,
  type: 'number',
  label: { en: 'How old is the participant?', sq: 'Sa vjeç është pjesëmarrësi?' },
  required: true,
})

// ---- Step 1 ----------------------------------------------------------------------------------

export const genderChoices: Choice[] = [
  opt('Female', 'Femër'),
  opt('Male', 'Mashkull'),
  other(),
  opt('Prefer not to say', 'Preferoj të mos e deklaroj'),
]

export const ROLE_PARENT = 'parent'

export const roleChoices: Choice[] = [
  opt('Student / Applicant', 'Student / Aplikant', { value: 'student' }),
  opt('Parent / Legal guardian', 'Prind / Kujdestar ligjor', { value: ROLE_PARENT }),
  other(),
]

// ---- Step 2: one form per service --------------------------------------------------------------

export const serviceForms: Record<ServiceKey, ServiceForm> = {
  'higher-education': {
    sections: [
      {
        heading: { en: 'Academic background and study preferences', sq: 'Historiku akademik dhe preferencat për studime' },
        questions: [
          {
            id: 'school',
            type: 'text',
            required: true,
            label: {
              en: 'Secondary school or university where you are studying or have completed your studies',
              sq: 'Shkolla e mesme ose universiteti ku po studioni apo keni përfunduar studimet',
            },
          },
          {
            id: 'qualification',
            type: 'text',
            required: true,
            label: {
              en: 'Diploma or programme you are following or have completed',
              sq: 'Diploma ose programi arsimor që po ndiqni apo keni përfunduar',
            },
            placeholder: {
              en: 'e.g. Albanian State Matura, IB, A-Levels, Bachelor in Economics',
              sq: 'Shembull: Matura Shtetërore Shqiptare, IB, A-Levels, Bachelor në Ekonomi',
            },
          },
          {
            id: 'level',
            type: 'select',
            required: true,
            label: { en: 'Level of study you would like to pursue', sq: 'Niveli i studimeve që dëshironi të ndiqni' },
            choices: [
              opt('Foundation / Pathway', 'Foundation / Pathway'),
              opt('Bachelor', 'Bachelor'),
              opt('Pre-Master', 'Pre-Master'),
              opt('Master', 'Master'),
              opt('MBA', 'MBA'),
              notDecided,
            ],
          },
          {
            id: 'fields',
            type: 'text',
            required: true,
            label: { en: 'Field or fields of study that interest you', sq: 'Fusha ose fushat e studimit që ju interesojnë' },
            placeholder: {
              en: 'e.g. Business, Medicine, Engineering, Computer Science',
              sq: 'Shembull: Biznes, Mjekësi, Inxhinieri, Shkenca Kompjuterike',
            },
          },
          {
            id: 'countries',
            type: 'checkboxes',
            required: true,
            countries: 'university',
            label: { en: 'In which country or countries would you like to study?', sq: 'Në cilin shtet ose shtete dëshironi të studioni?' },
            hint: severalHint,
          },
          {
            id: 'language',
            type: 'select',
            required: true,
            label: {
              en: 'In which language would you like to follow the programme?',
              sq: 'Në cilën gjuhë dëshironi të ndiqni programin e studimit?',
            },
            choices: [...languages, other(), notDecided],
          },
          {
            id: 'budget',
            type: 'checkboxes',
            required: true,
            label: {
              en: 'What annual budget have you planned for tuition fees?',
              sq: 'Cili është buxheti vjetor që keni planifikuar për tarifën e shkollimit?',
            },
            hint: severalHint,
            choices: [
              opt('700 € – 5,000 €', '700 € – 5,000 €'),
              opt('6,000 € – 15,000 €', '6,000 € – 15,000 €'),
              opt('16,000 € – 25,000 €', '16,000 € – 25,000 €'),
              opt('Over 25,000 €', 'Mbi 25,000 €'),
              opt('Budget is not a concern', 'Buxheti nuk përbën problem'),
              other(),
            ],
            note: {
              en: 'The budget refers only to tuition fees for one academic year. It does not include living costs, accommodation or other personal expenses.',
              sq: 'Buxheti i referohet vetëm tarifës së shkollimit për një vit akademik. Nuk përfshin kostot e jetesës, akomodimit dhe shpenzime të tjera personale.',
            },
          },
          {
            id: 'gpa',
            type: 'text',
            label: { en: 'What is your current or final grade average?', sq: 'Sa është mesatarja juaj aktuale ose përfundimtare akademike?' },
          },
          {
            id: 'languageLevel',
            type: 'select',
            label: {
              en: 'What is your current level in the language you would like to study in?',
              sq: 'Cili është niveli juaj aktual i njohjes së gjuhës në të cilën dëshironi të studioni?',
            },
            choices: cefr,
          },
          {
            id: 'universities',
            type: 'textarea',
            label: { en: 'Have you identified universities that interest you?', sq: 'A keni identifikuar universitete që ju interesojnë?' },
            hint: {
              en: 'If so, list the universities you are considering.',
              sq: 'Nëse po, listoni emrat e universiteteve që po konsideroni.',
            },
          },
        ],
      },
    ],
  },

  boarding: {
    sections: [
      {
        heading: { en: "The student's educational background", sq: 'Historiku arsimor i nxënësit' },
        questions: [
          {
            id: 'currentCountry',
            type: 'select',
            required: true,
            label: { en: 'In which country does the student currently attend school?', sq: 'Në cilin shtet ndjek aktualisht shkollën nxënësi?' },
            choices: [
              opt('Albania', 'Shqipëri'),
              opt('Kosovo', 'Kosovë'),
              opt('North Macedonia', 'Maqedoni e Veriut'),
              opt('Montenegro', 'Mal i Zi'),
              opt('Greece', 'Greqi'),
              opt('Italy', 'Itali'),
              other(),
            ],
          },
          {
            id: 'school',
            type: 'text',
            required: true,
            label: { en: "What is the student's current school?", sq: 'Cila është shkolla aktuale e nxënësit?' },
          },
          {
            id: 'grade',
            type: 'text',
            required: true,
            label: {
              en: 'Which grade or school year is the student currently in?',
              sq: 'Në cilën klasë ose vit shkollor është aktualisht nxënësi?',
            },
          },
          {
            id: 'curriculum',
            type: 'select',
            required: true,
            label: { en: 'Which curriculum does the student currently follow?', sq: 'Cilën kurrikulë arsimore ndjek aktualisht nxënësi?' },
            choices: [
              opt('Albanian National Curriculum', 'Kurrikula Kombëtare Shqiptare'),
              opt('British Curriculum', 'Kurrikula Britanike'),
              opt('International Baccalaureate (IB)', 'International Baccalaureate (IB)'),
              opt('American Curriculum', 'Kurrikula Amerikane'),
              other(),
              opt('Not sure', 'Nuk jam i sigurt'),
            ],
          },
        ],
      },
      {
        heading: { en: 'Preferences for the school abroad', sq: 'Preferencat për shkollën jashtë vendit' },
        questions: [
          {
            id: 'countries',
            type: 'checkboxes',
            required: true,
            countries: 'boarding',
            label: {
              en: 'In which country or countries would you like the student to study?',
              sq: 'Në cilin shtet ose shtete dëshironi të studiojë nxënësi?',
            },
            hint: severalHint,
          },
          {
            id: 'preferredSchool',
            type: 'text',
            label: { en: 'Do you have a preferred school?', sq: 'A keni një shkollë të preferuar?' },
          },
          {
            id: 'preferredCurriculum',
            type: 'select',
            required: true,
            label: { en: 'Which curriculum would you prefer the student to follow?', sq: 'Cilën kurrikulë preferoni të ndjekë nxënësi?' },
            choices: [
              opt('British Curriculum (GCSE / A-Levels)', 'Kurrikula Britanike (GCSE / A-Levels)'),
              opt('International Baccalaureate (IB)', 'International Baccalaureate (IB)'),
              opt('American Curriculum', 'Kurrikula Amerikane'),
              other(),
              opt('Open to recommendations', 'I hapur ndaj rekomandimeve'),
            ],
          },
          {
            id: 'language',
            type: 'select',
            required: true,
            label: { en: 'In which language would you like the teaching to be?', sq: 'Në cilën gjuhë dëshironi të zhvillohet mësimdhënia?' },
            choices: [...languages, other(), notDecided],
          },
          {
            id: 'budget',
            type: 'select',
            required: true,
            label: {
              en: 'What annual budget have you planned for tuition and accommodation?',
              sq: 'Cili është buxheti vjetor që keni planifikuar për shkollimin dhe akomodimin?',
            },
            choices: [
              opt('Under 15,000 €', 'Nën 15,000 €'),
              opt('15,000 € – 25,000 €', '15,000 € – 25,000 €'),
              opt('25,001 € – 35,000 €', '25,001 € – 35,000 €'),
              opt('35,001 € – 45,000 €', '35,001 € – 45,000 €'),
              opt('45,001 € – 60,000 €', '45,001 € – 60,000 €'),
              opt('Over 60,000 €', 'Mbi 60,000 €'),
              notDecided,
            ],
            note: {
              en: 'The budget refers to tuition and boarding accommodation for one academic year. Other expenses may apply.',
              sq: 'Buxheti i referohet tarifës së shkollimit dhe akomodimit në konvikt për një vit akademik. Shpenzime të tjera mund të aplikohen.',
            },
          },
        ],
      },
    ],
  },

  'language-courses': {
    sections: [
      {
        heading: { en: 'Preferences for the language programme', sq: 'Preferencat për programin gjuhësor' },
        questions: [
          {
            id: 'country',
            type: 'select',
            required: true,
            countries: 'university',
            label: { en: 'In which country would you like to take the language course?', sq: 'Në cilin shtet dëshironi të ndiqni kursin e gjuhës?' },
          },
          {
            id: 'language',
            type: 'select',
            required: true,
            label: { en: 'Which language would you like to learn?', sq: 'Cilën gjuhë dëshironi të mësoni?' },
            choices: [...languages, other()],
          },
          {
            id: 'level',
            type: 'select',
            required: true,
            label: { en: 'What is your current level in this language?', sq: 'Cili është niveli juaj aktual i njohjes së gjuhës?' },
            choices: [opt('A0 – No prior knowledge', 'A0 – Pa njohuri paraprake'), ...cefr],
          },
          age('age'),
          {
            id: 'duration',
            type: 'select',
            required: true,
            label: { en: 'How long would you like the course to last?', sq: 'Sa kohë dëshironi të zgjasë kursi?' },
            choices: [
              opt('3–6 months', '3–6 muaj'),
              opt('6–12 months', '6–12 muaj'),
              opt('Over 12 months', 'Mbi 12 muaj'),
              opt('Flexible / Not decided yet', 'Fleksibël / Ende i pavendosur'),
            ],
          },
          {
            id: 'budget',
            type: 'select',
            required: true,
            label: { en: 'What budget have you planned?', sq: 'Cili është buxheti që keni planifikuar?' },
            choices: [
              opt('Under 1,000 €', 'Nën 1,000 €'),
              opt('1,000 € – 2,500 €', '1,000 € – 2,500 €'),
              opt('2,501 € – 5,000 €', '2,501 € – 5,000 €'),
              opt('5,001 € – 10,000 €', '5,001 € – 10,000 €'),
              opt('Over 10,000 €', 'Mbi 10,000 €'),
              notDecided,
            ],
            note: {
              en: 'The budget refers to the course fee. Accommodation and other expenses may not be included.',
              sq: 'Buxheti i referohet tarifës së kursit. Akomodimi dhe shpenzimet e tjera mund të mos përfshihen.',
            },
          },
        ],
      },
    ],
  },

  camps: {
    sections: [
      {
        heading: { en: 'Preferences for the camp', sq: 'Preferencat për kampin' },
        questions: [
          {
            id: 'country',
            type: 'select',
            required: true,
            countries: 'camps',
            label: { en: 'In which country would you like the camp to take place?', sq: 'Në cilin shtet dëshironi të zhvillohet kampi?' },
          },
          {
            id: 'language',
            type: 'select',
            required: true,
            label: { en: 'What is the preferred language of the programme?', sq: 'Cila është gjuha e preferuar e programit?' },
            choices: [...languages, other(), opt('No preference', 'Pa preferencë')],
          },
          {
            id: 'activities',
            type: 'checkboxes',
            required: true,
            label: { en: 'Which activities are you interested in?', sq: 'Për cilat aktivitete jeni të interesuar?' },
            hint: severalHint,
            choices: [
              opt('Language learning', 'Mësim Gjuhe'),
              opt('Academic activities', 'Aktivitete Akademike'),
              opt('Sports and outdoor activities', 'Sporte dhe Aktivitete në Natyrë'),
              opt('Art and creativity', 'Art dhe Kreativitet'),
              opt('Technology and STEM', 'Teknologji dhe STEM'),
              opt('Adventure and nature exploration', 'Aventurë dhe Eksplorim i Natyrës'),
              opt('Cultural activities', 'Aktivitete Kulturore'),
              opt('Open to recommendations', 'I hapur ndaj rekomandimeve', { exclusive: true }),
            ],
          },
          {
            id: 'duration',
            type: 'select',
            required: true,
            label: { en: 'How long would you like the camp to last?', sq: 'Sa kohë dëshironi të zgjasë kampi?' },
            choices: [
              opt('1 week', '1 javë'),
              opt('2 weeks', '2 javë'),
              opt('3 weeks', '3 javë'),
              opt('4 weeks', '4 javë'),
              opt('Over 4 weeks', 'Mbi 4 javë'),
              opt('Flexible', 'Fleksibël'),
            ],
          },
          age('age'),
          {
            id: 'budget',
            type: 'select',
            required: true,
            label: { en: 'What budget have you planned for the camp?', sq: 'Cili është buxheti që keni planifikuar për kampin?' },
            choices: [
              opt('Under 1,000 €', 'Nën 1,000 €'),
              opt('1,000 € – 2,000 €', '1,000 € – 2,000 €'),
              opt('2,001 € – 3,500 €', '2,001 € – 3,500 €'),
              opt('3,501 € – 5,000 €', '3,501 € – 5,000 €'),
              opt('Over 5,000 €', 'Mbi 5,000 €'),
              notDecided,
            ],
            note: {
              en: 'The services included in the price vary by programme and organiser.',
              sq: 'Shërbimet e përfshira në çmim ndryshojnë sipas programit dhe organizatorit.',
            },
          },
        ],
      },
    ],
  },

  'student-visa': {
    sections: [
      {
        heading: { en: 'Your student visa application', sq: 'Informacion mbi aplikimin për vizë studentore' },
        questions: [
          {
            id: 'country',
            type: 'select',
            required: true,
            countries: 'university',
            label: {
              en: 'For which country would you like to apply for a student visa?',
              sq: 'Për cilin shtet dëshironi të aplikoni për vizë studentore?',
            },
          },
          {
            id: 'offer',
            type: 'radio',
            required: true,
            label: {
              en: 'Have you received an admission letter or offer from an educational institution in this country?',
              sq: 'A keni marrë një letër ose ofertë pranimi nga një institucion arsimor në këtë shtet?',
            },
            choices: [opt('Yes', 'Po'), opt('No', 'Jo'), opt('My admission application is in progress', 'Aplikimi për pranim është në proces')],
          },
        ],
      },
    ],
  },

  'tourist-visa': {
    sections: [
      {
        heading: { en: 'About your trip', sq: 'Informacion mbi udhëtimin' },
        questions: [
          {
            id: 'country',
            type: 'radio',
            required: true,
            label: { en: 'For which country would you like to apply for a visa?', sq: 'Për cilin shtet dëshironi të aplikoni për vizë?' },
            choices: [
              opt('United Kingdom (UK)', 'Mbretëria e Bashkuar (UK)'),
              opt('United States (USA)', 'Shtetet e Bashkuara të Amerikës (USA)'),
              opt('Canada', 'Kanada'),
            ],
          },
          {
            id: 'purpose',
            type: 'select',
            required: true,
            label: { en: 'What is the purpose of your trip?', sq: 'Cili është qëllimi i udhëtimit tuaj?' },
            choices: [
              opt('Tourism / Holiday', 'Turizëm / Pushime'),
              opt('Visiting family or friends', 'Vizitë te familjarët ose miqtë'),
              opt('Business visit', 'Vizitë për qëllime biznesi'),
              opt('Attending an event or conference', 'Pjesëmarrje në event ose konferencë'),
              opt('Short-term studies', 'Studime afatshkurtra'),
              other(),
            ],
          },
        ],
      },
    ],
  },

  general: {
    sections: [
      {
        questions: [
          {
            id: 'help',
            type: 'textarea',
            required: true,
            label: { en: 'How can we help you?', sq: "Si mund t'ju ndihmojmë?" },
          },
        ],
      },
    ],
  },
}

/** Services whose questions already ask for the participant's age. */
export const asksAge = (service: string) =>
  (serviceForms[service as ServiceKey]?.sections ?? []).some((s) => s.questions.some((q) => q.id === 'age'))

export const questionsFor = (service: string): Question[] =>
  (serviceForms[service as ServiceKey]?.sections ?? []).flatMap((s) => s.questions)

/** The choices of a question, with destination lists filled in from the library. */
export function choicesFor(q: Question, countries: Partial<Record<CountrySource, string[]>> = {}): Choice[] {
  if (!q.countries) return q.choices ?? []
  const names = (countries[q.countries] ?? []).map((name): Choice => ({ value: name, label: { en: name, sq: name } }))
  return q.type === 'checkboxes' ? [...names, notSureCountry] : [...names, other()]
}
