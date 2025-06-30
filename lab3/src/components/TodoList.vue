<template>
    <div class="p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Активні завдання</h2>
        <transition-group name="list" tag="ul" class="space-y-4">
            <li v-for="task in tasks" :key="task.id"
                class="p-4 bg-blue-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
                <slot name="task" :task="task" :editTask="() => $emit('edit-task', task)" :deleteTask="deleteTask" :completeTask="completeTask">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-700">{{ task.title }}</h3>
                        <p class="text-gray-600">{{ task.description }}</p>
                        <p class="text-sm text-gray-500">Пріоритет: {{ task.priority }}</p>
                        <p v-if="task.tags" class="text-sm text-gray-500">Теги: {{ task.tags.join(', ') }}</p>
                        <p v-if="task.deadline" class="text-sm text-gray-500">
                            Дедлайн: {{ formatDate(task.deadline) }}
                        </p>
                        <div class="mt-4 space-x-2">
                            <button @click="$emit('edit-task', task)" class="btn-blue">Редагувати</button>
                            <button @click="deleteTask(task.id)" class="btn-red">Видалити</button>
                            <button @click="completeTask(task.id)" class="btn-green">Завершити</button>
                        </div>
                    </div>
                </slot>
            </li>
        </transition-group>
    </div>
</template>

<script>
import { inject } from 'vue';

export default {
    name: 'TodoList',
    emits: ['edit-task'],
    setup() {
        const tasks = inject('tasks');
        const deleteTask = inject('deleteTask');
        const completeTask = inject('completeTask');
        const formatDate = (date) => new Date(date).toLocaleDateString();

        return { tasks, deleteTask, completeTask, formatDate };
    },
};
</script>

