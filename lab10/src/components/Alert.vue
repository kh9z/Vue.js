<template>
  <transition name="fade">
    <div
      v-if="!dismissed"
      :class="['p-4 rounded-lg flex items-start gap-3', typeClass]"
      role="alert"
    >
      <span v-if="icon" class="mt-1">
        <component :is="iconComponent" class="w-5 h-5" />
      </span>
      <div class="flex-1">
        <slot />
      </div>
      <button
        v-if="dismissible"
        @click="dismissAlert"
        class="text-gray-500 hover:text-black ml-2"
        aria-label="Закрити сповіщення"
      >
        ×
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    type: {
      type: String,
      default: 'info',
      validator: (val) => ['success', 'warning', 'error', 'info'].includes(val),
    },
    dismissible: { type: Boolean, default: true },
    timeout: { type: Number, default: 0 },
    icon: { type: Boolean, default: false },
  },
  data() {
    return {
      dismissed: false,
      timeoutId: null,
    };
  },
  computed: {
    typeClass() {
      switch (this.type) {
        case 'success':
          return 'bg-green-100 text-green-800 border border-green-300';
        case 'warning':
          return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
        case 'error':
          return 'bg-red-100 text-red-800 border border-red-300';
        case 'info':
        default:
          return 'bg-blue-100 text-blue-800 border border-blue-300';
      }
    },
    iconComponent() {
      switch (this.type) {
        case 'success':
          return 'SuccessIcon';
        case 'warning':
          return 'WarningIcon';
        case 'error':
          return 'ErrorIcon';
        case 'info':
        default:
          return 'InfoIcon';
      }
    },
  },
  methods: {
    dismissAlert() {
      this.dismissed = true;
      if (this.timeoutId) clearTimeout(this.timeoutId);
    },
  },
  mounted() {
    if (this.timeout > 0) {
      this.timeoutId = setTimeout(this.dismissAlert, this.timeout);
    }
  },
};

export const SuccessIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-5 h-5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`
};

export const WarningIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-5 h-5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86l-6 10.39A1 1 0 005 16h14a1 1 0 00.86-1.5l-6-10.39a1 1 0 00-1.72 0z"/></svg>`
};

export const ErrorIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-5 h-5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`
};

export const InfoIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-5 h-5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>`
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
