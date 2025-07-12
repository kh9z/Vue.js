<template>
  <div class="space-y-2">
    <label class="block font-medium">{{ question.prompt }}</label>
    <div
      v-for="(option, index) in question.options"
      :key="index"
      class="flex items-center space-x-2 my-1"
    >
      <input
        type="checkbox"
        :id="`option-${index}`"
        :value="option"
        v-model="selectedOptions"
        class="form-checkbox text-black-500 focus:ring-black-500"
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
  modelValue: Array,
  errors: String
})

const emit = defineEmits(['update:modelValue'])

const { value: selectedOptions, errorMessage: error } = useField(
  'selectedOptions',
  yup
    .array()
    .min(1, 'Please select at least one option')
    .required()
)

selectedOptions.value = props.modelValue || []

watch(selectedOptions, newValue => emit('update:modelValue', newValue))
</script>
