# Vue Component Library — Lab10

Набір багаторазових компонентів для Vue 3 з підтримкою:
- глобальної реєстрації через плагін,
- індивідуального імпорту компонентів,
- кастомізації теми, кольорів, розмірів.

---

## Встановлення

```bash
git clone https://github.com/kh9z/Vue.js
cd lab10
npm install
npm run dev
```

## Глобальне підключення компонентів
### Файл src/main.js
```bash
import { createApp } from 'vue';
import App from './App.vue';
import GlobalComponents from './plugins/GlobalComponents';

const app = createApp(App);

app.use(GlobalComponents, {
  theme: 'dark',
  size: 'lg',
  colors: {
    primary: '#4f46e5',
    error: '#dc2626'
  }
});
app.mount('#app');

```

## Індивідуальне використання компонентів
```bash
<script>
import Input from '@/components/Input.vue';
export default {
  components: { Input }
}
</script>
```

## Налаштування плагіна
Під час використання GlobalComponents можна передати глобальні параметри:
| Параметр | Тип      | Опис                      | Приклад                  |
| -------- | -------- | ------------------------- | ------------------------ |
| `theme`  | `string` | `'light'` або `'dark'`    | `theme: 'dark'`          |
| `size`   | `string` | `'sm'`, `'md'`, `'lg'`    | `size: 'lg'`             |
| `colors` | `object` | Обʼєкт кастомних кольорів | `{ primary: '#4f46e5' }` |

Компоненти використовують ці параметри через inject('globalOptions').

## Ліцензія
MIT License © 2025 Kh9z