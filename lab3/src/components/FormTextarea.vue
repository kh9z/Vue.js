<template>
  <div class="form-textarea">
    <label :for="id" class="block text-gray-700 font-medium mb-1">{{
      label
    }}</label>
    <textarea
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "FormTextarea",
  props: {
    id: { type: String, required: true },
    label: { type: String, required: true },
    modelValue: String,
  },
};
</script>
