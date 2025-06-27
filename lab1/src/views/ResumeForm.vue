<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import InputField from '@/components/InputField.vue'
import DatePicker from '@/components/DatePicker.vue'
import CheckboxInput from '@/components/CheckboxInput.vue'
import CheckboxGroup from '@/components/CheckboxGroup.vue'
import RadioGroup from '@/components/RadioGroup.vue'
import SelectField from '@/components/SelectField.vue'
import TextareaField from '@/components/TextareaField.vue'
import FileUpload from '@/components/FileUpload.vue'
import { toTypedSchema } from '@vee-validate/yup'
import ProjectField from '@/components/ProjectField.vue'
import ReCAPTCHA from '@/components/ReCAPTCHA.vue'

const steps = ref([
  'Особиста інформація',
  'Освіта',
  'Професійний досвід',
  'Мови',
  'Навички та кваліфікації',
  'Додаткова інформація',
  'Завантаження файлів',
  'Проєкти',
  'Соціальні мережі',
  'Підтвердження'
])
const currentStep = ref(0)

const genderOptions = [
  { for: 'genderMale', label: 'Чоловіча', value: 'Male' },
  { for: 'genderFemale', label: 'Жіноча', value: 'Female' },
  { for: 'genderUnspecified', label: 'Не вказано', value: 'Unspecified' }
]
const maritalStatusOptions = [
  { label: 'Неодружений/Неодружена', value: 'Single' },
  { label: 'Одружений/Заміжня', value: 'Married' },
  { label: 'Розлучений/Розлучена', value: 'Divorced' }
]
const nationalityOptions = [
  { label: 'Україна', value: 'Ukraine' },
  { label: 'США', value: 'USA' }
]
const educationLevelOptions = [
  { label: 'Бакалавр', value: 'Bachelor' },
  { label: 'Магістр', value: 'Master' },
  { label: 'Доктор філософії', value: 'PhD' }
]
const coursesOptions = [
  { label: 'Курс 1', value: 'Course 1' },
  { label: 'Сертифікат 1', value: 'Certificate 1' }
]
const languageOptions = [
  { label: 'Англійська', value: 'English' },
  { label: 'Українська', value: 'Ukrainian' }
]
const englishProficiencyOptions = [
  { label: 'Базовий', value: 'Basic' },
  { label: 'Середній', value: 'Intermediate' },
  { label: 'Високий', value: 'Advanced' }
]
const languageProficienciesOptions = [
  { label: 'Англійська', value: 'EnglishProficiency' },
  { label: 'Українська', value: 'UkrainianProficiency' }
]
const leadershipTeamworkOptions = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 }
]
const computerProgramsOptions = [
  { label: 'Microsoft Office', value: 'Microsoft Office' },
  { label: 'Photoshop', value: 'Photoshop' },
  { label: 'AutoCAD', value: 'AutoCAD' }
]
const yesNoOptions = [
  { for: 'yes', label: 'Так', value: 'Yes' },
  { for: 'no', label: 'Ні', value: 'No' }
]

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  dateOfBirth: yup.date().required('Date of birth is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  gender: yup.string().required('Please select your gender'),
  maritalStatus: yup.string().required('Please select your marital status'),
  nationality: yup.string().required('Please select your nationality'),
  relocation: yup.boolean().required('Please indicate your relocation readiness'),
  educationLevel: yup.string().required('Please select your education level'),
  specialty: yup.string().required('Specialty is required'),
  institution: yup.string().required('Educational institution is required'),
  graduationYear: yup.string().required('Graduation year is required'),
  courses: yup
    .array()
    .of(yup.string())
    .required('Please select at least one course or certificate'),
  position: yup.string().required('Position is required'),
  company: yup.string().required('Company is required'),
  startDate: yup.date().required('Start date is required'),
  endDate: yup.date().required('End date is required'),
  jobDescription: yup.string().required('Job description is required'),
  hasReferences: yup.boolean(),
  referenceContact: yup.string().when('hasReferences', {
    is: true,
    then: (schema) => schema.required('Reference contact is required')
  }),
  nativeLanguage: yup.string().required('Native language is required'),
  otherLanguages: yup
    .array()
    .of(yup.string())
    .required('Please select at least one other language'),
  englishProficiency: yup.string().required('Please select your English proficiency level'),
  languageProficiencies: yup.array().of(yup.string()),
  professionalSkills: yup.string().required('Professional skills are required'),
  leadershipQualities: yup.number().min(1).max(5).required('Leadership quality rating is required'),
  teamwork: yup.number().min(1).max(5).required('Teamwork rating is required'),
  computerPrograms: yup
    .array()
    .of(yup.string())
    .required('Please select at least one computer program'),
  driversLicense: yup.string().oneOf(['Yes', 'No']).required("Driver's license status is required"),
  availabilityForBusinessTrips: yup
    .string()
    .oneOf(['Yes', 'No'])
    .required('Please indicate your availability for business trips'),
  ownTransportAvailability: yup
    .boolean()
    .required('Please indicate if you have your own transport'),
  expectedSalaryLevel: yup.string().required('Expected salary level is required'),
  willingnessToWorkOvertime: yup
    .string()
    .oneOf(['Yes', 'No'])
    .required('Please indicate your willingness to work overtime'),
  additionalSkills: yup.string().required('Additional skills are required'),
  candidatePhoto: yup.mixed().required('Candidate photo is required'),
  resume: yup.mixed().required('Resume is required'),
  coverLetter: yup.mixed().required('Cover letter is required'),
  certificates: yup.array().of(yup.mixed()).required('Certificates are required'),
  portfolio: yup.mixed().required('Portfolio is required'),
  projects: yup.array().of(
    yup.object({
      projectName: yup.string().required('Project name is required'),
      projectDescription: yup.string().required('Project description is required'),
      projectRole: yup.string().required('Role in project is required'),
      projectLink: yup.string().url('Invalid URL format').required('Project link is required')
    })
  ),
  linkedInProfile: yup.string().url('Invalid URL format').required('LinkedIn profile is required'),
  gitHubProfile: yup.string().url('Invalid URL format'),
  facebookProfile: yup.string().url('Invalid URL format'),
  otherProfiles: yup.string().url('Invalid URL format'),
  recaptchaToken: yup.string().required('reCAPTCHA verification is required')
})

const { values, handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    maritalStatus: '',
    nationality: '',
    relocation: false,
    educationLevel: '',
    specialty: '',
    institution: '',
    graduationYear: '',
    courses: [],
    position: '',
    company: '',
    startDate: '',
    endDate: '',
    jobDescription: '',
    hasReferences: false,
    referenceContact: '',
    nativeLanguage: '',
    otherLanguages: [],
    englishProficiency: '',
    languageProficiencies: [],
    professionalSkills: '',
    leadershipQualities: 1,
    teamwork: 1,
    computerPrograms: [],
    driversLicense: 'No',
    availabilityForBusinessTrips: 'No',
    ownTransportAvailability: false,
    expectedSalaryLevel: '',
    willingnessToWorkOvertime: 'No',
    additionalSkills: '',
    candidatePhoto: null,
    resume: null,
    coverLetter: null,
    certificates: [],
    portfolio: null,
    projects: [{ projectName: '', projectDescription: '', projectRole: '', projectLink: '' }],
    linkedInProfile: '',
    gitHubProfile: '',
    facebookProfile: '',
    otherProfiles: '',
    recaptchaToken: ''
  }
})

onMounted(() => {
  const savedData = localStorage.getItem('resumeForm')
  if (savedData) {
    const parsedData = JSON.parse(savedData)
    setValues(parsedData, false)
  }
})

watch(
  () => values,
  (newState) => {
    localStorage.setItem('resumeForm', JSON.stringify(newState))
  },
  { deep: true }
)

const onSubmit = handleSubmit(async (values) => {
  console.log('Form successfully submitted', values)
})

const nextStep = () => {
  if (currentStep.value < steps.value.length - 1) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const isFirstStep = computed(() => currentStep.value === 0)
const isLastStep = computed(() => currentStep.value === steps.value.length - 1)
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <form
      method="post"
      @submit.prevent="onSubmit"
      class="bg-white p-6 rounded shadow-md w-full max-w-md"
    >
      <h2 class="text-lg font-semibold mb-4">
        {{ steps[currentStep] }}
      </h2>

      <div v-show="currentStep === 0">
        <InputField name="firstName" label="Ім'я" />
        <InputField name="lastName" label="Прізвище" />
        <DatePicker name="dateOfBirth" label="Дата народження" />
        <InputField name="email" label="Електронна пошта" type="email" />
        <InputField name="phone" label="Номер телефону" type="tel" />
        <InputField name="address" label="Адреса" />
        <RadioGroup name="gender" label="Стать" :options="genderOptions" />
        <SelectField name="maritalStatus" label="Сімейний стан" :options="maritalStatusOptions" />
        <SelectField name="nationality" label="Національність" :options="nationalityOptions" />
        <CheckboxInput name="relocation" label="Готовність до переїзду" />
      </div>

      <div v-show="currentStep === 1">
        <SelectField name="educationLevel" label="Рівень освіти" :options="educationLevelOptions" />
        <InputField name="specialty" label="Спеціальність" />
        <InputField name="institution" label="Навчальний заклад" />
        <InputField name="graduationYear" label="Рік закінчення" type="number" />
        <CheckboxGroup name="courses" label="Додаткові курси/сертифікати" :options="coursesOptions" />
      </div>

      <div v-show="currentStep === 2">
        <InputField name="position" label="Посада" />
        <InputField name="company" label="Компанія" />
        <DatePicker name="startDate" label="Дата початку" />
        <DatePicker name="endDate" label="Дата завершення" />
        <InputField name="jobDescription" label="Опис роботи" type="textarea" />
        <CheckboxInput name="hasReferences" label="Є рекомендації" />
        <InputField name="referenceContact" label="Контакт для рекомендацій" v-if="values.hasReferences" />
      </div>

      <div v-show="currentStep === 3">
        <InputField name="nativeLanguage" label="Рідна мова" />
        <CheckboxGroup name="otherLanguages" label="Інші мови" :options="languageOptions" />
        <SelectField name="englishProficiency" label="Рівень володіння англійською" :options="englishProficiencyOptions" />
        <CheckboxGroup name="languageProficiencies" label="Володіння іншими мовами" :options="languageProficienciesOptions" />
      </div>

      <div v-show="currentStep === 4">
        <TextareaField name="professionalSkills" label="Професійні навички" />
        <SelectField name="leadershipQualities" label="Лідерські якості" :options="leadershipTeamworkOptions" />
        <SelectField name="teamwork" label="Робота в команді" :options="leadershipTeamworkOptions" />
        <CheckboxGroup name="computerPrograms" label="Володіння комп'ютерними програмами" :options="computerProgramsOptions" />
        <RadioGroup name="driversLicense" label="Наявність водійських прав" :options="yesNoOptions" />
      </div>

      <div v-show="currentStep === 5">
        <RadioGroup name="availabilityForBusinessTrips" label="Готовність до відряджень" :options="yesNoOptions" />
        <CheckboxInput name="ownTransportAvailability" label="Наявність власного транспорту" />
        <InputField name="expectedSalaryLevel" label="Бажаний рівень заробітної плати" />
        <RadioGroup name="willingnessToWorkOvertime" label="Готовність працювати понаднормово" :options="yesNoOptions" />
        <TextareaField name="additionalSkills" label="Додаткові навички" />
      </div>

      <div v-show="currentStep === 6">
        <FileUpload name="candidatePhoto" label="Фото кандидата" accept="image/*" />
        <FileUpload name="resume" label="Резюме" accept=".pdf" />
        <FileUpload name="coverLetter" label="Супровідний лист" accept=".pdf, .doc, .docx" />
        <FileUpload
          name="certificates"
          label="Сертифікати"
          accept=".pdf, .jpg, .jpeg, .png"
          :multiple="true"
        />
        <FileUpload name="portfolio" label="Портфоліо" accept=".pdf, .zip, .rar" />
      </div>

      <div v-show="currentStep === 7">
        <ProjectField name="projects" />
      </div>

      <div v-show="currentStep === 8">
        <InputField name="linkedInProfile" label="Профіль LinkedIn" type="url" />
        <InputField name="gitHubProfile" label="Профіль GitHub" type="url" />
        <InputField name="facebookProfile" label="Профіль Facebook" type="url" />
        <InputField name="otherProfiles" label="Інші професійні профілі" type="url" />
      </div>

      <div v-show="currentStep === 9">
        <ReCAPTCHA name="recaptchaToken" />
      </div>

      <div class="flex justify-between mt-4">
        <button
          v-if="!isFirstStep"
          type="button"
          @click="previousStep"
          :disabled="isFirstStep"
          class="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
        >
          Попередній
        </button>
        <button
          v-if="!isLastStep"
          type="button"
          @click="nextStep"
          class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Далі
        </button>
        <button
          v-if="isLastStep"
          type="submit"
          class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Надіслати
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
