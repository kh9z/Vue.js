<template>
  <button :class="['btn', type, size, { 'disabled': disabled, 'loading': loading }]" :disabled="disabled">
    <i v-if="icon && !loading" :class="icon"></i>
    <span v-if="loading" class="loading-indicator">
      <span class="loading-spinner"></span>
      <span class="loading-text">Loading...</span>
    </span>
    <span class="button-content" v-if="!loading"><slot></slot></span>
  </button>
</template>
  
<script>
export default {
  name: 'Button',
  props: {
    type: { 
      type: String, 
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'success', 'danger'].includes(value)
    },
    size: { 
      type: String, 
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    disabled: { type: Boolean, default: false },
    icon: { type: String, default: '' },
    loading: { type: Boolean, default: false }
  }
};
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
  position: relative;
  text-align: center;
  gap: 8px;
}

/* Типи кнопок */
.primary {
  background-color: #4361ee;
  color: white;
}

.secondary {
  background-color: #e9ecef;
  color: #212529;
  border: 1px solid #ced4da;
}

.success {
  background-color: #2ecc71;
  color: white;
}

.danger {
  background-color: #e74c3c;
  color: white;
}

/* Розміри кнопок */
.small {
  padding: 6px 12px;
  font-size: 0.875rem;
}

.medium {
  padding: 8px 16px;
  font-size: 1rem;
}

.large {
  padding: 12px 24px;
  font-size: 1.25rem;
}

/* Стан disabled */
.btn.disabled, .btn:disabled {
  opacity: 0.65;
  pointer-events: none;
  cursor: not-allowed;
}

/* Стан loading */
.loading {
  position: relative;
}

.loading-indicator {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Ефекти при наведенні */
.primary:hover:not(.disabled):not(:disabled) {
  background-color: #3a56d4;
}

.secondary:hover:not(.disabled):not(:disabled) {
  background-color: #dde2e6;
}

.success:hover:not(.disabled):not(:disabled) {
  background-color: #27ae60;
}

.danger:hover:not(.disabled):not(:disabled) {
  background-color: #c0392b;
}
</style>

