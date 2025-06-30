<template>
    <div class="todo-item p-6 bg-blue-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
        <slot name="title">
            <h3 class="text-xl font-bold text-gray-800">{{ task.title }}</h3>
        </slot>
        <p class="text-gray-600">{{ task.description }}</p>
        <p class="text-sm text-gray-500">Пріоритет: {{ task.priority }}</p>
        <p class="text-sm text-gray-500">Теги: {{ task.tags.join(', ') }}</p>
        <p class="text-sm text-gray-500">Дата: {{ formatDate(task.deadline) }}</p>
        <p class="text-sm text-gray-500">Дата створення: {{ formatDate(task.createdAt) }}</p>
        <p v-if="task.status === 'completed'" class="text-sm text-gray-500">
            Дата завершення: {{ formatDate(task.completedAt) }}
        </p>
        <slot name="actions">
            <div class="mt-4 space-x-2">
                <button @click="onEdit" class="btn-blue">Редагувати</button>
                <button @click="onDelete" class="btn-red">Видалити</button>
                <button v-if="task.status !== 'completed'" @click="onComplete" class="btn-green">Завершити</button>
            </div>
        </slot>
    </div>
</template>

<script>
export default {
    name: 'TodoItem',
    props: {
        task: Object,
        onEdit: Function,
        onDelete: Function,
        onComplete: Function,
    },
    methods: {
        formatDate(date) {
            return date ? new Date(date).toLocaleDateString() : 'Не встановлено';
        },
    },
};
</script>

