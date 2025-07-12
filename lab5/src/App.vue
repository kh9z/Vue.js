<template>
  <div class="container mx-auto max-w-2xl px-4 font-sans text-center">
    <!-- Language switcher -->
    <div class="flex justify-end mt-4 mb-2">
      <button
        @click="switchLanguage"
        class="px-3 py-1 bg-black-500 text-white rounded hover:bg-black-600 focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-offset-2"
      >
        {{ locale.value === 'en' ? 'UA' : 'EN' }}
      </button>
    </div>

    <!-- Title -->
    <h1 class="text-3xl font-bold mb-8 mt-6">{{ $t('title') }}</h1>

    <!-- Content -->
    <UserForm v-if="showUserForm" @submit="handleUserFormSubmit" />
    <QuestionForm v-else />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import UserForm from './components/UserForm.vue'
import QuestionForm from './components/QuestionForm.vue'

const { locale, t } = useI18n()

const showUserForm = ref(true)

const switchLanguage = () => {
  locale.value = locale.value === 'en' ? 'uk' : 'en'
}

const handleUserFormSubmit = () => {
  showUserForm.value = false
}
</script>
