<template>
    <div class="todo-form p-6 bg-blue-50 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
            {{ task ? 'Редагувати завдання' : 'Додати нове завдання' }}
        </h2>
        <form @submit.prevent="submitForm" class="space-y-4">
            <FormInput label="Назва:" id="title" type="text" v-model="localTask.title" required />
            <FormTextarea label="Опис:" id="description" v-model="localTask.description" />
            <FormSelect label="Пріоритет:" id="priority" v-model="localTask.priority"
                :options="['низький', 'середній', 'високий']" />
            <FormInput label="Теги (через кому):" id="tags" v-model="localTask.tags" placeholder="Наприклад, важливе, навчання" />
            <FormInput label="Дедлайн:" id="deadline" type="date" v-model="localTask.deadline" />

            <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-green-900 transition duration-300">
                {{ task ? 'Зберегти' : 'Додати завдання' }}
            </button>
        </form>
    </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import FormInput from './FormInput.vue';
import FormTextarea from './FormTextarea.vue';
import FormSelect from './FormSelect.vue';

export default {
    name: 'TodoForm',
    components: { FormInput, FormTextarea, FormSelect },
    props: { task: Object },
    emits: ['add-task', 'save-task'],
    setup(props, { emit }) {
        const localTask = ref({
            title: '', description: '', priority: 'середній', tags: '', deadline: null,
        });

        const resetForm = () => {
            localTask.value = { title: '', description: '', priority: 'середній', tags: '', deadline: null };
        };

        const submitForm = () => {
            const tagsArray = localTask.value.tags.split(',').map(tag => tag.trim());
            const formatted = { ...localTask.value, tags: tagsArray, deadline: localTask.value.deadline ? new Date(localTask.value.deadline) : null };

            emit(props.task ? 'save-task' : 'add-task', formatted);
            resetForm();
        };

        onMounted(() => document.getElementById('title')?.focus());

        watch(() => props.task, (newTask) => {
            if (newTask) {
                localTask.value = {
                    ...newTask,
                    tags: newTask.tags?.join(', ') || '',
                    deadline: newTask.deadline ? new Date(newTask.deadline).toISOString().split('T')[0] : null,
                };
            }
        }, { immediate: true });

        return { localTask, submitForm };
    },
};
</script>
