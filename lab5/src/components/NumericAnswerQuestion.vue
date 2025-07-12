<template>
  <div class="space-y-2">
    <label class="block font-medium">{{ question.prompt }}</label>
    <input
      type="number"
      v-model="numericAnswer"
      :min="question.min"
      :max="question.max"
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
  modelValue: Number,
  errors: String
})

const emit = defineEmits(['update:modelValue'])

const { value: numericAnswer, errorMessage: error } = useField(
  'numericAnswer',
  yup
    .number()
    .typeError('Please enter a valid number')
    .required('This field is required')
    .min(
      props.question.min ?? Number.NEGATIVE_INFINITY,
      `Value must be at least ${props.question.min}`
    )
    .max(
      props.question.max ?? Number.POSITIVE_INFINITY,
      `Value must be at most ${props.question.max}`
    )
)

numericAnswer.value = props.modelValue ?? null

watch(numericAnswer, newValue => emit('update:modelValue', newValue))
</script>
