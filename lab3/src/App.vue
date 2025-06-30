<template>
  <div class="app mx-auto max-w-4xl p-6 shadow-lg rounded-lg">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <TodoForm
          :task="editingTask"
          @add-task="addTask"
          @save-task="saveTask"
        />
      </div>
      <div>
        <div class="view-toggle flex justify-center space-x-4 mb-6">
          <button
            @click="showActive = true"
            :class="['w-40 mt-2 px-6 py-3 font-medium rounded-lg transition focus:outline-none', 
              showActive ? 'bg-blue-500 hover:bg-blue-800 text-white' : 'bg-gray-200 text-gray-600']"
          >
            Активні завдання
          </button>
          <button
            @click="showActive = false"
            :class="['w-40 mt-2 px-6 py-3 font-medium rounded-lg transition focus:outline-none',
              !showActive ? 'bg-blue-300 hover:bg-blue-600 text-white' : 'bg-gray-200 text-gray-600']"
          >
            Завершені завдання
          </button>
        </div>
        <transition name="fade-slide" mode="out-in">
          <component
            :is="showActive ? 'TodoList' : 'ArchivedList'"
            @edit-task="startEditing"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { provide, ref, defineAsyncComponent } from 'vue';
import { useTodoState } from './composables/todoState';
import TodoForm from './components/TodoForm.vue';
import TodoList from './components/TodoList.vue';

const ArchivedList = defineAsyncComponent(() =>
  import('./components/ArchivedList.vue')
);

export default {
  name: 'App',
  components: {
    TodoForm,
    TodoList,
    ArchivedList,
  },
  setup() {
    const todoState = useTodoState();
    const { tasks, archivedTasks } = todoState;

    const showActive = ref(true);
    const editingTask = ref(null);

    // Автоматичне надання всіх методів
    for (const key in todoState) {
      provide(key, todoState[key]);
    }

    const startEditing = (task) => {
      editingTask.value = { ...task };
    };

    const saveTask = (updatedTask) => {
      todoState.editTask(editingTask.value.id, updatedTask);
      editingTask.value = null;
    };

    return {
      showActive,
      editingTask,
      addTask: todoState.addTask,
      startEditing,
      saveTask,
    };
  },
};
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
