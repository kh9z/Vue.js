<template>
  <div class="max-w-2xl mx-auto p-4">
    <h2 class="text-xl font-bold mb-6">
      {{ $t("questionForm.question") }} {{ currentQuestionIndex + 1 }}
      {{ $t("questionForm.of") }} {{ questions.length }}
    </h2>

    <component
      :is="questions[currentQuestionIndex].component"
      v-model="answers[currentQuestionIndex]"
      :question="questions[currentQuestionIndex]"
      :errors="errors[currentQuestionIndex]"
      class="mb-6"
    />

    <div class="flex gap-4 justify-center mt-8">
      <button
        @click="prevQuestion"
        :disabled="currentQuestionIndex === 0"
        class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ $t("questionForm.previous") }}
      </button>
      <button
        @click="nextQuestion"
        :disabled="currentQuestionIndex === questions.length - 1"
        class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ $t("questionForm.next") }}
      </button>
      <button
        v-if="currentQuestionIndex === questions.length - 1"
        @click="submitTest"
        class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        {{ $t("questionForm.finish") }}
      </button>
    </div>

    <div v-if="testCompleted" class="mt-8 p-4 bg-gray-50 rounded-lg">
      <h3 class="text-xl font-bold mb-4">
        {{ $t("completion.testCompleted") }}
      </h3>
      <p v-if="unansweredQuestions.length > 0" class="text-red-600">
        {{ $t("completion.unansweredQuestions")
        }}{{ unansweredQuestions.join(", ") }}
      </p>
      <div v-else class="space-y-2">
        <p class="font-semibold">
          {{ $t("completion.correctAnswers") }}{{ correctAnswers }}
        </p>
        <p class="font-semibold">
          {{ $t("completion.successPercentage") }}{{ successPercentage }}%
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

import SingleChoiceQuestion from "./SingleChoiceQuestion.vue";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion.vue";
import NumericAnswerQuestion from "./NumericAnswerQuestion.vue";
import YesNoQuestion from "./YesNoQuestion.vue";
import DateQuestion from "./DateQuestion.vue";
import KeywordTextQuestion from "./KeywordTextQuestion.vue";

const questions = [
  {
    type: "single",
    prompt: "Виберіть одну відповідь",
    options: ["а", "б", "в", "г"],
    correctAnswer: "а",
    component: SingleChoiceQuestion,
    validationSchema: yup.string().required("Please select an option"),
  },
  {
    type: "multiple",
    prompt: "Виберіть кілька відповідей",
    options: ["а", "б", "в", "г"],
    correctAnswer: ["а", "б", "в"],
    component: MultipleChoiceQuestion,
    validationSchema: yup.array().min(1, "Select at least one option"),
  },
  {
    type: "single",
    prompt: "Відповідь б",
    options: ["а", "б", "в", "г"],
    correctAnswer: "б",
    component: SingleChoiceQuestion,
    validationSchema: yup.string().required("Please select an option"),
  },
  {
    type: "multiple",
    prompt: "Відповідь а, г",
    options: ["а", "б", "в", "г"],
    correctAnswer: ["а", "г"],
    component: MultipleChoiceQuestion,
    validationSchema: yup.array().min(1, "Select at least one option"),
  },
  {
    type: "numeric",
    prompt: "Від 1 до 10, наскільки сильна ваша русофобія",
    correctAnswer: 11,
    component: NumericAnswerQuestion,
    validationSchema: yup.number().required("A numeric answer is required"),
  },
  {
    type: "single",
    prompt: "Відповідь а",
    options: ["а", "б", "в", "г"],
    correctAnswer: "а",
    component: SingleChoiceQuestion,
    validationSchema: yup.string().required("Please select an option"),
  },
  {
    type: "yesno",
    prompt: "Так чи ні",
    correctAnswer: "Yes",
    component: YesNoQuestion,
    validationSchema: yup.string().required("Please select Yes or No"),
  },
  {
    type: "date",
    prompt: "Дата початку повномасштабного вторгнення",
    correctAnswer: "2022-02-24",
    component: DateQuestion,
    validationSchema: yup.date().required("A valid date is required"),
  },
  {
    type: "yesno",
    prompt: "Скажи так :)",
    correctAnswer: "Yes",
    component: YesNoQuestion,
    validationSchema: yup.string().required("Please select Yes or No"),
  },
  {
    type: "text",
    prompt: "Продовження фрази \"Батько наш Бандера, Україна - ...\"",
    keywords: ["мати"],
    component: KeywordTextQuestion,
    validationSchema: yup.string().required("This field is required"),
  },
  {
    type: "date",
    prompt: "Дата проголошення незалежності України",
    correctAnswer: "1991-08-24",
    component: DateQuestion,
    validationSchema: yup.date().required("A valid date is required"),
  },
  {
    type: "single",
    prompt: "Оберіть в",
    options: ["а", "б", "в", "г"],
    correctAnswer: "в",
    component: SingleChoiceQuestion,
    validationSchema: yup.string().required("Please select an option"),
  },
  {
    type: "multiple",
    prompt:
      "Оберіть кілька",
    options: ["а", "б", "в", "г"],
    correctAnswer: ["а", "б"],
    component: MultipleChoiceQuestion,
    validationSchema: yup.array().min(1, "Select at least one option"),
  },
  {
    type: "text",
    prompt:
      "Напишіть текст",
    keywords: ["шось", "хтось", "цейво"],
    component: KeywordTextQuestion,
    validationSchema: yup.string().required("This field is required"),
  },
  {
    type: "numeric",
    prompt: 'Введіть число',
    correctAnswer: 1,
    component: NumericAnswerQuestion,
    validationSchema: yup.number().required("A numeric answer is required"),
  },
];

const answers = ref(Array(questions.length).fill(null));
const currentQuestionIndex = ref(0);
const testCompleted = ref(false);
const unansweredQuestions = ref([]);
const correctAnswers = ref(0);
const errors = ref(Array(questions.length).fill(null));

const validationSchemaMap = questions.reduce((acc, q, i) => {
  acc[i] = q.validationSchema;
  return acc;
}, {});
const { validate } = useForm({
  validationSchema: yup.object(validationSchemaMap),
});

const successPercentage = computed(() =>
  ((correctAnswers.value / questions.length) * 100).toFixed(2)
);
// ----
const nextQuestion = async () => {
  if (await validateQuestion(currentQuestionIndex.value)) {
    currentQuestionIndex.value++;
  }
};

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
};

const validateQuestion = async (index) => {
  try {
    await questions[index].validationSchema.validate(answers.value[index]);
    errors.value[index] = null;
    return true;
  } catch (e) {
    errors.value[index] = e.message;
    return false;
  }
};

const submitTest = async () => {
  const isValid = await validate();
  if (!isValid) return;

  unansweredQuestions.value = answers.value
    .map((ans, i) => (ans === null ? i + 1 : null))
    .filter((n) => n !== null);

  if (unansweredQuestions.value.length === 0) {
    calculateResults();
    testCompleted.value = true;
  }
};

const calculateResults = () => {
  correctAnswers.value = answers.value.reduce((score, answer, index) => {
    const q = questions[index];

    if (q.type === "text" && q.keywords) {
      const allPresent = q.keywords.every((k) =>
        answer?.toLowerCase().includes(k.toLowerCase())
      );
      return score + (allPresent ? 1 : 0);
    }

    if (Array.isArray(q.correctAnswer)) {
      const isCorrect =
        Array.isArray(answer) &&
        answer.length === q.correctAnswer.length &&
        answer
          .slice()
          .sort()
          .every((val, i) => val === q.correctAnswer.slice().sort()[i]);

      return score + (isCorrect ? 1 : 0);
    }

    return score + (answer === q.correctAnswer ? 1 : 0);
  }, 0);
};
</script>

<style scoped>
.navigation {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 10px;
  font-size: 1em;
}

span {
  color: red;
  font-size: 0.9em;
}

.error {
  color: red;
  font-size: 1em;
}
</style>
