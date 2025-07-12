<template>
  <div class="flex flex-col h-screen justify-between">
    <div class="w-full mx-auto p-5">
      <div class="justify-items-center mb-5">
        <h1 class="text-3xl font-bold mb-5">Івент-календар</h1>
        <h2 class="text-2xl italic">
          {{ currentMonthName }} {{ currentYear }}
        </h2>
      </div>
      <div class="flex justify-between items-center mb-5">
        <button
          @click="previousMonth"
          class="bg-opacity-0 text-black px-4 py-2 rounded hover:text-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            class="bi bi-arrow-left-circle-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
            />
          </svg>
        </button>

        <Calendar
          :events="events"
          :current-date="currentDate"
          @day-click="openEventForm"
          @edit-event="editEvent"
          @delete-event="deleteEvent"
        />

        <EventForm
          v-if="showEventForm"
          :event="selectedEvent"
          :selected-date="selectedDate"
          @save="saveEvent"
          @close="closeEventForm"
        />

        <button
          @click="nextMonth"
          class="bg-opacity-0 text-black px-4 py-2 rounded hover:text-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            class="bi bi-arrow-right-circle-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="gap-2 bg-gray-700 w-1/4 p-3 text-center w-full">
      <p class="text-white">Завантажити</p>
      <button
        @click="exportEvents('json')"
        class="w-24 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-400 mr-2"
      >
        JSON
      </button>
      <button
        @click="exportEvents('csv')"
        class="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-400"
      >
        CSV
      </button>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  readonly,
  watchEffect,
  shallowRef,
  effectScope,
  getCurrentScope,
  onScopeDispose,
  onMounted,
} from "vue";
import Calendar from "./components/Calendar.vue";
import EventForm from "./components/EventForm.vue";

const scope = effectScope();

const currentDate = shallowRef(new Date());
const events = shallowRef([]);
const showEventForm = ref(false);
const selectedEvent = shallowRef(null);
const selectedDate = shallowRef(null);

const monthFormatter = new Intl.DateTimeFormat("uk-UA", { month: "long" });
const dateFormatter = new Intl.DateTimeFormat("uk-UA", {
  dateStyle: "medium",
  timeStyle: "short",
});

const currentMonthName = computed(() =>
  monthFormatter.format(currentDate.value)
);
const currentYear = computed(() => currentDate.value.getFullYear());

onMounted(() => {
  try {
    const savedEvents = localStorage.getItem("calendar-events");
    if (savedEvents) {
      events.value = JSON.parse(savedEvents);
    }
  } catch (error) {
    console.error("Помилка при завантаженні подій:", error);
    events.value = [];
  }
});

watchEffect(
  () => {
    try {
      localStorage.setItem("calendar-events", JSON.stringify(events.value));
    } catch (error) {
      console.error("Помилка при збереженні подій:", error);
    }
  },
  { flush: "post" }
);

const previousMonth = () => {
  const date = new Date(currentDate.value);
  date.setMonth(date.getMonth() - 1);
  currentDate.value = date;
};

const nextMonth = () => {
  const date = new Date(currentDate.value);
  date.setMonth(date.getMonth() + 1);
  currentDate.value = date;
};

const openEventForm = (date) => {
  selectedDate.value = date;
  selectedEvent.value = null;
  showEventForm.value = true;
};

const editEvent = (event) => {
  selectedEvent.value = { ...event };
  selectedDate.value = new Date(event.date);
  showEventForm.value = true;
};

const saveEvent = (eventData) => {
  const newEvents = [...events.value];

  if (selectedEvent.value) {
    const index = newEvents.findIndex((e) => e.id === selectedEvent.value.id);
    if (index !== -1) {
      newEvents[index] = { ...eventData, id: selectedEvent.value.id };
    }
  } else {
    newEvents.push({ ...eventData, id: Date.now() });
  }

  events.value = newEvents;
  closeEventForm();
};

const deleteEvent = (eventId) => {
  events.value = events.value.filter((e) => e.id !== eventId);
};

const closeEventForm = () => {
  showEventForm.value = false;
  selectedEvent.value = null;
  selectedDate.value = null;
};

const exportEvents = (format) => {
  if (!events.value.length) {
    alert("Немає подій для експорту");
    return;
  }

  try {
    const { content, filename, type } =
      format === "json"
        ? {
            content: JSON.stringify(events.value, null, 2),
            filename: "calendar-events.json",
            type: "application/json",
          }
        : {
            content: generateCSV(),
            filename: "calendar-events.csv",
            type: "text/csv",
          };

    downloadFile(content, filename, type);
  } catch (error) {
    console.error("Помилка при експорті:", error);
    alert("Помилка при експорті файлу");
  }
};

const generateCSV = () => {
  const headers = ["Title", "Description", "Date", "ID"];
  const rows = events.value.map((event) => [
    `"${event.title.replace(/"/g, '""')}"`,
    `"${event.description?.replace(/"/g, '""') || ""}"`,
    dateFormatter.format(new Date(event.date)),
    event.id,
  ]);
  return [headers, ...rows].map((row) => row.join(",")).join("\n");
};

const downloadFile = (content, filename, type) => {
  const blob = new Blob([content], { type: `${type};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 0);
};

if (getCurrentScope()) {
  onScopeDispose(() => {
    scope.stop();
  });
}
</script>
