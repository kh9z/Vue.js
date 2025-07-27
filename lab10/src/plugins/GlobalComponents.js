import Button from '../components/Button.vue';
import Select from '../components/Select.vue';
import Alert from '../components/Alert.vue';
import Input from '../components/Input.vue';

const components = [Select, Button, Input, Alert];

export default {
  install(app, options = {}) {
    // save in provide
    app.provide('globalOptions', {
      theme: options.theme || 'light',
      size: options.size || 'md',
      colors: options.colors || {}
    });

    // global register components
    components.forEach(component => {
      app.component(component.name, component);
    });
  }
};
