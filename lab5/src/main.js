import { createApp } from "vue";
import App from "./App.vue";
import { configure } from "vee-validate";
import i18n from "./i18n";

configure({
  generateMessage: (context) => `${context.field} is invalid.`,
});

createApp(App).use(i18n).mount("#app");
