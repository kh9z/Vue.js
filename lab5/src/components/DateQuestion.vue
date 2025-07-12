<template>
  <div class="space-y-2">
    <label class="block font-medium">{{ question.prompt }}</label>
    <input
      type="date"
      v-model="dateAnswer"
      class="w-full p-2 border rounded focus:ring-2 focus:ring-black-500 focus:outline-none"
    />
    <span v-if="error" class="text-red-500 text-sm block">{{ error }}</span>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useField } from 'vee-validate'
import * as yup from 'yup'

const props = defineProps({
  question: Object,
  modelValue: String,
  errors: String
})

const emit = defineEmits(['update:modelValue'])

const { value: dateAnswer, errorMessage: error } = useField(
  'dateAnswer',
  yup
    .date()
    .typeError('Please enter a valid date')
    .required('This field is required')
)

dateAnswer.value = props.modelValue || ''
watch(dateAnswer, newValue => emit('update:modelValue', newValue))
</script>
