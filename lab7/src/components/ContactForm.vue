<template>
  <v-container class="shadow-box-lg contact rounded-xl mt-15 w-40">
    <h2 class="text-center mb-6">Зворотній зв'язок</h2>
    <v-container class="d-flex justify-center">
      <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
        <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
          {{ snackbarText }}
        </v-snackbar>
        <v-text-field
          v-model="formData.name"
          :rules="nameRules"
          label="Ім'я"
          required
          outlined
        ></v-text-field>

        <v-text-field
          v-model="formData.email"
          :rules="emailRules"
          label="Email"
          required
          outlined
          type="email"
        ></v-text-field>

        <v-text-field
          v-model="formData.subject"
          :rules="subjectRules"
          label="Тема"
          required
          outlined
        ></v-text-field>

        <v-textarea
          v-model="formData.message"
          :rules="messageRules"
          label="Повідомлення"
          required
          outlined
          rows="4"
        ></v-textarea>

        <v-btn
          type="submit"
          color="black"
          :disabled="!valid"
          x-large
          class="text-center"
        >
          Надіслати
        </v-btn>
      </v-form>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "ContactForm",
  data: () => ({
    valid: false,
    formData: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    nameRules: [
      (v) => !!v || "Ім'я обов'язкове",
      (v) => v.length >= 2 || "Ім'я має містити мінімум 2 символи",
    ],
    emailRules: [
      (v) => !!v || "Email обов'язковий",
      (v) => /.+@.+\..+/.test(v) || "Email має бути валідним",
    ],
    subjectRules: [
      (v) => !!v || "Тема обов'язкова",
      (v) => v.length >= 3 || "Тема має містити мінімум 3 символи",
    ],
    messageRules: [
      (v) => !!v || "Повідомлення обов'язкове",
      (v) => v.length >= 10 || "Повідомлення має містити мінімум 10 символів",
    ],
    snackbar: false,
    snackbarText: "",
    snackbarColor: "success",
  }),
  methods: {
    async submitForm() {
      if (this.$refs.form.validate()) {
        try {
          console.log("Форма відправлена:", this.formData);

          this.snackbarText = "Повідомлення успішно надіслано!";
          this.snackbarColor = "success";
          this.snackbar = true;

          this.$refs.form.reset();
          Object.keys(this.formData).forEach((key) => {
            this.formData[key] = "";
          });
        } catch (error) {
          this.snackbarText = "Помилка при відправці повідомлення";
          this.snackbarColor = "error";
          this.snackbar = true;
        }
      }
    },
  },
};
</script>
