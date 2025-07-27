<template>
  <div class="select-container" :class="{ 'disabled': disabled }">
    <div class="select-wrapper" @click="toggleDropdown" :class="{ 'open': isOpen, 'disabled': disabled }">
      <div class="selected-value">
        <span v-if="displayValue">{{ displayValue }}</span>
        <span v-else class="placeholder">{{ placeholder }}</span>
      </div>
      <div class="select-actions">
        <button v-if="clearable && hasValue" @click.stop="clearSelection" class="clear-btn" type="button">
          ✕
        </button>
        <span class="arrow-icon" :class="{ 'open': isOpen }">▼</span>
      </div>
    </div>
    <div v-show="isOpen" class="options-list">
      <div 
        v-for="option in options" 
        :key="option.value" 
        class="option-item"
        :class="{ 'selected': isSelected(option.value) }"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    options: { 
      type: Array, 
      required: true,
      validator: (value) => {
        return value.every(option => 'label' in option && 'value' in option);
      }
    },
    value: { type: [String, Number, Array], default: '' },
    placeholder: { type: String, default: 'Select an option' },
    multiple: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  emits: ['change', 'update:value'],
  data() {
    return {
      isOpen: false,
      selectedValue: this.value
    };
  },
  computed: {
    hasValue() {
      if (this.multiple) {
        return Array.isArray(this.selectedValue) && this.selectedValue.length > 0;
      }
      return this.selectedValue !== '' && this.selectedValue !== null && this.selectedValue !== undefined;
    },
    displayValue() {
      if (!this.hasValue) return '';
      
      if (this.multiple && Array.isArray(this.selectedValue)) {
        const selectedLabels = this.selectedValue.map(val => {
          const option = this.options.find(opt => opt.value === val);
          return option ? option.label : '';
        }).filter(label => label !== '');
        
        return selectedLabels.join(', ');
      } else {
        const option = this.options.find(opt => opt.value === this.selectedValue);
        return option ? option.label : '';
      }
    }
  },
  watch: {
    value: {
      handler(newValue) {
        this.selectedValue = newValue;
      },
      immediate: true
    }
  },
  methods: {
    toggleDropdown() {
      if (!this.disabled) {
        this.isOpen = !this.isOpen;
      }
    },
    closeDropdown() {
      this.isOpen = false;
    },
    selectOption(option) {
      if (this.multiple) {
        if (!Array.isArray(this.selectedValue)) {
          this.selectedValue = [];
        }
        
        const index = this.selectedValue.indexOf(option.value);
        if (index === -1) {
          this.selectedValue.push(option.value);
        } else {
          this.selectedValue.splice(index, 1);
        }
      } else {
        this.selectedValue = option.value;
        this.closeDropdown();
      }
      
      this.$emit('update:value', this.selectedValue);
      this.$emit('change', this.selectedValue);
    },
    isSelected(value) {
      if (this.multiple && Array.isArray(this.selectedValue)) {
        return this.selectedValue.includes(value);
      }
      return this.selectedValue === value;
    },
    clearSelection(event) {
      event.stopPropagation();
      this.selectedValue = this.multiple ? [] : '';
      this.$emit('update:value', this.selectedValue);
      this.$emit('change', this.selectedValue);
    }
  },
  mounted() {
    document.addEventListener('click', this.handleOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  },
  methods: {
    handleOutsideClick(event) {
      const selectContainer = this.$el;
      if (selectContainer && !selectContainer.contains(event.target) && this.isOpen) {
        this.closeDropdown();
      }
    }
  }
};
</script>

<style scoped>
.select-container {
  position: relative;
  width: 100%;
  font-family: Arial, sans-serif;
  user-select: none;
}

.select-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  min-height: 40px;
  transition: all 0.2s ease;
}

.select-wrapper:hover:not(.disabled) {
  border-color: #aaa;
}

.select-wrapper.open {
  border-color: #4361ee;
  box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
}

.select-wrapper.disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.7;
}

.selected-value {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.placeholder {
  color: #999;
}

.select-actions {
  display: flex;
  align-items: center;
}

.clear-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #999;
  margin-right: 8px;
  padding: 0 4px;
}

.clear-btn:hover {
  color: #666;
}

.arrow-icon {
  font-size: 10px;
  transition: transform 0.2s ease;
}

.arrow-icon.open {
  transform: rotate(180deg);
}

.options-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 4px;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.option-item {
  padding: 8px 12px;
  cursor: pointer;
}

.option-item:hover {
  background-color: #f5f5f5;
}

.option-item.selected {
  background-color: rgba(67, 97, 238, 0.1);
  color: #4361ee;
  font-weight: 500;
}

/* Стилі для множинного вибору */
.select-container.multiple .option-item.selected {
  position: relative;
}

.select-container.multiple .option-item.selected::before {
  content: '✓';
  position: absolute;
  right: 12px;
}
</style>
  