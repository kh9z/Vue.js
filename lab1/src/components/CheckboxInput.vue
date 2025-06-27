<script setup lang="ts">
import { useField } from 'vee-validate'
import ErrorText from '@/components/ErrorText.vue'

const props = defineProps<{
  name: string
  label: string
}>()

const { value, errorMessage } = useField(() => props.name)
</script>

<template>
  <div class="mb-4 flex items-center gap-2">
    <input :id="props.name" type="checkbox" v-model="value" />
    <label :for="props.name" class="text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
    <ErrorText v-if="errorMessage" :message="errorMessage" />
  </div>
</template>

<style scoped></style>
