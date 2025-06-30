import { ref } from 'vue';

export function useTodoState() {
  const tasks = ref([]);
  const archivedTasks = ref([]);

  const createTask = (data) => ({
    id: Date.now(),
    title: data.title,
    description: data.description || '',
    status: 'active',
    createdAt: new Date(),
    completedAt: null,
    priority: data.priority || 'середній',
    tags: data.tags || [],
    deadline: data.deadline || null,
  });

  const findTaskIndex = (list, id) => list.value.findIndex((t) => t.id === id);

  const addTask = (newTask) => {
    tasks.value.push(createTask(newTask));
  };

  const editTask = (taskId, updatedTask) => {
    const idx = findTaskIndex(tasks, taskId);
    if (idx !== -1) {
      tasks.value[idx] = { ...tasks.value[idx], ...updatedTask };
    }
  };

  const deleteTask = (taskId) => {
    tasks.value = tasks.value.filter((t) => t.id !== taskId);
    archivedTasks.value = archivedTasks.value.filter((t) => t.id !== taskId);
  };

  const completeTask = (taskId) => {
    moveTask(tasks, archivedTasks, taskId, {
      status: 'completed',
      completedAt: new Date(),
    });
  };

  const restoreTask = (taskId) => {
    moveTask(archivedTasks, tasks, taskId, {
      status: 'active',
      completedAt: null,
    });
  };

  const moveTask = (from, to, taskId, updates = {}) => {
    const idx = findTaskIndex(from, taskId);
    if (idx !== -1) {
      const [task] = from.value.splice(idx, 1);
      Object.assign(task, updates);
      to.value.push(task);
    }
  };

  return {
    tasks,
    archivedTasks,
    addTask,
    editTask,
    deleteTask,
    completeTask,
    restoreTask,
  };
}
