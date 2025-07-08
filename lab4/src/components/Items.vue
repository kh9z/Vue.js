<template>
  <div v-if="isAuthenticated" class="max-w-xl mx-auto p-6 border rounded-lg shadow-lg">
    <h1 class="text-3xl font-semibold mb-6">Items</h1>

    <ul class="space-y-2">
      <li v-for="item in items" :key="item.id" class="flex justify-between items-center p-2 border rounded">
        {{ item.name }}
        <div class="space-x-2">
          <button @click="startEdit(item)" class="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-600 transition">Edit</button>
          <button @click="deleteItem(item.id)" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">Delete</button>
        </div>
      </li>
    </ul>

    <div class="mt-6">
      <h2 class="text-2xl font-semibold mb-4">{{ editMode.value ? 'Edit Item' : 'Add New Item' }}</h2>
      <input v-model="itemName.value" placeholder="Item Name" class="w-3/4 p-2 border rounded mb-2" />
      <button @click="editMode.value ? updateItem() : addItem()" class="w-1/4 py-2 border border-green-500 rounded hover:bg-green-400">
        Submit
      </button>
    </div>
  </div>

  <div v-else>
    <p class="text-center text-gray-500">You need to log in to view and manage items.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const items = ref([]);
const itemName = ref('');
const editMode = ref(false);
const editItemId = ref(null);
const isAuthenticated = ref(false);
const authToken = ref(null);

const fetchItems = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_RTDB_URL}/items.json?auth=${authToken.value}`);
    items.value = data
      ? Object.entries(data).map(([id, item]) => ({ id, ...item }))
      : [];
  } catch (err) {
    console.error('Error fetching items:', err);
  }
};

const addItem = async () => {
  if (!itemName.value.trim()) return;

  try {
    const newItem = { name: itemName.value };
    const { data } = await axios.post(`${import.meta.env.VITE_RTDB_URL}/items.json?auth=${authToken.value}`, newItem);
    items.value.push({ id: data.name, ...newItem });
    clearForm();
  } catch (err) {
    console.error('Error adding item:', err);
  }
};

const updateItem = async () => {
  if (!itemName.value.trim() || !editItemId.value) return;

  try {
    const updatedItem = { name: itemName.value };
    await axios.put(`${import.meta.env.VITE_RTDB_URL}/items/${editItemId.value}.json?auth=${authToken.value}`, updatedItem);

    const idx = items.value.findIndex(item => item.id === editItemId.value);
    if (idx !== -1) items.value[idx].name = itemName.value;

    clearForm();
  } catch (err) {
    console.error('Error updating item:', err);
  }
};

const deleteItem = async (id) => {
  try {
    await axios.delete(`${import.meta.env.VITE_RTDB_URL}/items/${id}.json?auth=${authToken.value}`);
    items.value = items.value.filter(item => item.id !== id);
  } catch (err) {
    console.error('Error deleting item:', err);
  }
};

const startEdit = (item) => {
  editMode.value = true;
  editItemId.value = item.id;
  itemName.value = item.name;
};

const clearForm = () => {
  editMode.value = false;
  editItemId.value = null;
  itemName.value = '';
};

onMounted(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      isAuthenticated.value = true;
      authToken.value = await user.getIdToken();
      fetchItems();
    } else {
      isAuthenticated.value = false;
      authToken.value = null;
    }
  });
});
</script>