<template>
  <div class="space-y-2">
    <label class="block font-medium">{{ question.prompt }}</label>
    <input
      type="text"
      v-model="textAnswer"
      placeholder="Enter your answer"
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

const { value: textAnswer, errorMessage: error } = useField(
  'textAnswer',
  yup
    .string()
    .required('This field is required')
    .test(
      'contains-keywords',
      () => `Answer must contain the keywords: ${props.question.keywords.join(', ')}`,
      value =>
        props.question.keywords.every(keyword =>
          value?.toLowerCase().includes(keyword.toLowerCase())
        )
    )
)

textAnswer.value = props.modelValue || ''
watch(textAnswer, newValue => emit('update:modelValue', newValue))
</script>
