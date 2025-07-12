<template>
    <div class="w-full calendar-container border border-teal-300 rounded-lg shadow-xl">
        <div class="weekdays-grid grid grid-cols-7 bg-gray-700 text-white py-3">
            <div v-for="day in weekDays" :key="day" class="text-center font-bold text-lg">{{ day }}</div>
        </div>
        <div class="days-grid grid grid-cols-7">
            <div v-for="day in calendarDays" :key="day.date"
                :class="['day-item relative p-3 cursor-pointer border border-black hover:bg-gray-300', 
                         { 'bg-gray-100': day.currentMonth, 'bg-gray-400': !day.currentMonth }]"
                @click="handleDayClick(day.date)">
                <div class="day-number text-right text-xl font-semibold">{{ day.dayNumber }}</div>
                <div class="events pt-1">
                    <div v-for="event in getDayEvents(day.date)" :key="event.id"
                        class="event-item bg-yellow-300 text-black p-2 mb-2 rounded text-xs flex justify-between items-center gap-2 hover:bg-orange-400"
                        :title="event.description" @click.stop="$emit('edit-event', event)">
                        <div class="event-time text-sm opacity-90">{{ formatEventTime(event.date) }}</div>
                        <span class="event-title flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{{ event.title }}</span>
                        <button
                            class="delete-btn bg-transparent border-none text-white cursor-pointer px-2 hover:text-red-600 rounded-full"
                            @click.stop="$emit('delete-event', event.id)" title="Delete event">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, toRef, isProxy, toRaw } from 'vue'

const props = defineProps({
    currentDate: {
        type: Date,
        required: true
    },
    events: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['day-click', 'edit-event', 'delete-event'])

const currentDateRef = toRef(props, 'currentDate')

const isEventsProxy = isProxy(props.events)

const rawEvents = computed(() => isEventsProxy ? toRaw(props.events) : props.events)

const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД']

const calendarDays = computed(() => {
    const days = []
    const date = new Date(currentDateRef.value.getFullYear(), currentDateRef.value.getMonth(), 1)
    let firstDay = date.getDay()
    firstDay = firstDay === 0 ? 6 : firstDay - 1
    
    const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    const baseTimestamp = date.getTime()
    const dayInMs = 24 * 60 * 60 * 1000

    for (let i = 0; i < firstDay; i++) {
        const prevTimestamp = baseTimestamp - (i + 1) * dayInMs
        const prevDate = new Date(prevTimestamp)
        days.unshift({
            date: prevDate,
            dayNumber: prevDate.getDate(),
            currentMonth: false
        })
    }

    for (let i = 1; i <= lastDate; i++) {
        days.push({
            date: new Date(date.getFullYear(), date.getMonth(), i),
            dayNumber: i,
            currentMonth: true
        })
    }

    const remainingDays = 42 - days.length
    const nextMonthStart = new Date(date.getFullYear(), date.getMonth() + 1, 1).getTime()
    
    for (let i = 0; i < remainingDays; i++) {
        const nextDate = new Date(nextMonthStart + i * dayInMs)
        days.push({
            date: nextDate,
            dayNumber: nextDate.getDate(),
            currentMonth: false
        })
    }

    return days
})

const getDayEvents = (date) => {
    const targetDate = date.toDateString()
    return rawEvents.value
        .filter(event => new Date(event.date).toDateString() === targetDate)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
}

const timeFormatter = new Intl.DateTimeFormat(undefined, { 
    hour: '2-digit', 
    minute: '2-digit' 
})

const formatEventTime = (dateString) => {
    return timeFormatter.format(new Date(dateString))
}

const handleDayClick = (date) => {
    emit('day-click', date)
}
</script>