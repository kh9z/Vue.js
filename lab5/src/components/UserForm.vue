<template>
  <form @submit.prevent="onSubmit" class="max-w-md mx-auto">
    <div v-if="notification" class="mb-4 p-3 bg-red-50 text-red-600 rounded">
      {{ notification }}
    </div>

    <div v-for="field in fields" :key="field.name" class="mb-4">
      <label :for="field.name" class="block font-bold mb-1">{{ $t(field.label) }}</label>

      <template v-if="field.type === 'select'">
        <select
          :id="field.name"
          v-bind="getFieldProps(field.name)"
          :class="inputClass(field.name)"
        >
          <option disabled value="">{{ $t('userForm.selectGender') }}</option>
          <option value="male">{{ $t('userForm.male') }}</option>
          <option value="female">{{ $t('userForm.female') }}</option>
          <option value="other">{{ $t('userForm.other') }}</option>
        </select>
      </template>

      <template v-else>
        <input
          :id="field.name"
          :type="field.type"
          v-bind="getFieldProps(field.name)"
          :class="inputClass(field.name)"
        />
      </template>

      <span
        v-if="touched[field.name] && errors[field.name]"
        class="text-red-500 text-sm mt-1"
      >
        {{ errors[field.name] }}
      </span>
    </div>

    <button
      type="submit"
      class="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    >
      {{ $t('userForm.startTest') }}
    </button>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const { t } = useI18n()
const emit = defineEmits(['submit'])

const fields = [
  { name: 'name', label: 'userForm.name', type: 'text' },
  { name: 'age', label: 'userForm.age', type: 'number' },
  { name: 'email', label: 'userForm.email', type: 'email' },
  { name: 'phone', label: 'userForm.phone', type: 'text' },
  { name: 'gender', label: 'userForm.gender', type: 'select' },
]

const touched = reactive(Object.fromEntries(fields.map(f => [f.name, false])))

const validationSchema = yup.object({
  name: yup.string().min(2, t('validation.minLength', { min: 2 })).required(t('validation.required')),
  age: yup.number().typeError(t('validation.required')).min(18, t('validation.minAge')).required(t('validation.required')),
  email: yup.string().email(t('validation.email')).required(t('validation.required')),
  phone: yup.string().matches(/^\d{10}$/, t('validation.phone')).required(t('validation.required')),
  gender: yup.string().required(t('validation.required')),
})

const {
  handleSubmit,
  errors,
  values,
  setFieldValue,
  validateField,
} = useForm({
  validationSchema,
  initialValues: {
    name: '',
    age: '',
    email: '',
    phone: '',
    gender: '',
  },
})

const notification = ref('')

function getFieldProps(fieldName) {
  return {
    value: values[fieldName],
    onInput: e => {
      const val = e.target.value
      setFieldValue(fieldName, fieldName === 'age' ? Number(val) : val)
    },
    onBlur: () => {
      touched[fieldName] = true
      validateField(fieldName)
    },
  }
}

function inputClass(field) {
  return [
    'w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500',
    { 'border-red-500': touched[field] && errors[field] },
  ]
}

const onSubmit = handleSubmit(
  submitted => {
    emit('submit', submitted)
  },
  () => {
    fields.forEach(f => (touched[f.name] = true))
    notification.value = t('validation.required')
  }
)
</script>
