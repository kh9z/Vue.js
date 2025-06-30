<template>
  <div class="form-input">
    <label :for="id" class="block text-gray-700 font-medium mb-1">{{
      label
    }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :required="required"
      class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
    />
  </div>
</template>

<script>
export default {
  name: "FormInput",
  props: {
    id: { type: String, required: true },
    label: { type: String, required: true },
    modelValue: String,
    type: { type: String, default: "text" },
    required: Boolean,
    placeholder: String,
  },
};
</script>
