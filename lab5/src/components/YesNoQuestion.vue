<template>
  <div class="space-y-2">
    <label class="block font-medium">{{ question.prompt }}</label>

    <div class="space-y-1">
      <div
        v-for="option in ['Yes', 'No']"
        :key="option"
        class="flex items-center space-x-2"
      >
        <input
          type="radio"
          :id="option.toLowerCase()"
          :value="option"
          v-model="yesNoAnswer"
          class="form-radio text-black-500 focus:ring-black-500"
        />
        <label :for="option.toLowerCase()" class="text-gray-700">{{ option }}</label>
      </div>
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
  errors: String,
})

const emit = defineEmits(['update:modelValue'])

const { value: yesNoAnswer, errorMessage: error } = useField(
  'yesNoAnswer',
  yup.string().required('Please select Yes or No')
)

yesNoAnswer.value = props.modelValue ?? ''
watch(yesNoAnswer, newValue => emit('update:modelValue', newValue))
</script>
