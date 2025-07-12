<template>
  <div class="space-y-2">
    <label class="block font-medium">{{ question.prompt }}</label>

    <div
      v-for="(option, index) in question.options"
      :key="index"
      class="flex items-center space-x-2 my-1"
    >
      <input
        type="radio"
        :id="`option-${index}`"
        :value="option"
        v-model="selectedOption"
        class="form-radio text-black-500 focus:ring-black-500"
      />
      <label :for="`option-${index}`" class="text-gray-700">{{ option }}</label>
    </div>

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

const { value: selectedOption, errorMessage: error } = useField(
  'selectedOption',
  yup.string().required('Please select an option')
)

selectedOption.value = props.modelValue ?? ''
watch(selectedOption, newValue => emit('update:modelValue', newValue))
</script>
