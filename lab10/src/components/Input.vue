<template>
  <div class="mb-4">
    <input
      :type="type"
      v-model="model"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :required="required"
      :aria-invalid="!!error"
      :aria-describedby="error ? errorId : null"
      class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      :class="{ 'border-red-500': error }"
    />
    <p v-if="error" :id="errorId" class="text-sm text-red-600 mt-1">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    value: { type: String, required: true },
    placeholder: { type: String, default: 'Enter value' },
    type: { type: String, default: 'text' },
    required: { type: Boolean, default: false },
    error: { type: String, default: '' },
    maxlength: { type: Number, default: 255 }
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('update:value', val);
      }
    },
    errorId() {
      return `error-${this._uid}`;
    }
  }
};
</script>

<style scoped>
input {
  transition: border-color 0.2s, box-shadow 0.2s;
}
input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}
input[aria-invalid='true'] {
  border-color: #ef4444;
}
</style>
