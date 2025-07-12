<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" @click.self="$emit('close')">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 class="text-xl font-bold mb-4">{{ event ? 'Редагування' : 'Створити подію' }}</h2>
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label for="title" class="block mb-1 font-medium">Заголовок:</label>
                    <input id="title" v-model="formData.title" type="text" required autofocus
                        :class="['w-full p-2 border rounded', { 'border-red-500': validationErrors.title }]" />
                    <span v-if="validationErrors.title" class="text-red-500 text-sm">{{ validationErrors.title }}</span>
                </div>

                <div class="mb-4">
                    <label for="description" class="block mb-1 font-medium">Опис:</label>
                    <textarea id="description" v-model="formData.description" rows="3"
                        class="w-full p-2 border rounded"></textarea>
                </div>

                <div class="mb-4">
                    <label for="date" class="block mb-1 font-medium">Дата/час:</label>
                    <input id="date" v-model="formData.date" type="datetime-local" required
                        :class="['w-full p-2 border rounded', { 'border-red-500': validationErrors.date }]" />
                    <span v-if="validationErrors.date" class="text-red-500 text-sm">{{ validationErrors.date }}</span>
                </div>

                <div class="flex justify-end gap-2 mt-4">
                    <button type="button" class="bg-gray-300 px-4 py-2 rounded"
                        @click="$emit('close')">Скасувати</button>
                    <button type="submit"
                        class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800 flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check2-square mr-3" viewBox="0 0 16 16">
                            <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
                            <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
                        </svg>
                        <p>Зберегти</p>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, toRefs, computed, watchEffect, markRaw } from 'vue'

const props = defineProps({
    event: {
        type: Object,
        default: null
    },
    selectedDate: {
        type: Date,
        required: true
    }
})

const emit = defineEmits(['save', 'close'])

const { event, selectedDate } = toRefs(props)

const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)

  if (isNaN(d.getTime())) return ''

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}`
}


const initialFormData = computed(() => ({
  title: event.value?.title || '',
  description: event.value?.description || '',
  date: event.value?.date ? formatDate(event.value.date) : formatDate(selectedDate.value)
}))


const formData = reactive({ ...initialFormData.value })

const validators = markRaw({
    title: (value) => ({
        isValid: value.length >= 3,
        message: 'Заголовок повинен містити щонайменше 3 символи'
    }),
    date: (value) => ({
        isValid: new Date(value) > new Date(),
        message: 'Дата повинна бути в майбутньому часі'
    })
})

const validationErrors = reactive({
    title: '',
    date: ''
})

watchEffect(() => {
    const titleValidation = validators.title(formData.title)
    const dateValidation = validators.date(formData.date)
    
    validationErrors.title = titleValidation.isValid ? '' : titleValidation.message
    validationErrors.date = dateValidation.isValid ? '' : dateValidation.message
})

const isFormValid = computed(() => 
    Object.values(validationErrors).every(error => !error)
)

function handleSubmit() {
    if (isFormValid.value) {
        emit('save', { 
            ...formData,
            date: new Date(formData.date).toISOString()
        })
    }
}
</script>


