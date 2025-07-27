<template>
  <div class="home">
    <!-- Заголовок сторінки -->
    <h1>Блог чотирилапого</h1>

    <!-- Пошук та фільтрація -->
    <div class="search">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Пошук статей..." 
        @input="debouncedSearch"
      />
      <button @click="searchArticles" class="btn">Пошук</button>
    </div>

    <!-- Список статей -->
    <div v-if="isLoading" class="loading">Завантаження...</div>
    
    <div v-else-if="filteredArticles.length === 0" class="no-results">
      Статті не знайдено
    </div>
    
    <ul v-else class="articles-list">
      <li v-for="article in filteredArticles" :key="article.id">
        <NuxtLink :to="`/article/${article.slug}`" class="article-link">
          <h2>{{ article.title }}</h2>
          <p>{{ article.shortDescription }}</p>
          <small>Дата публікації: {{ formatDate(article.date) }}</small>
        </NuxtLink>
      </li>
    </ul>

    <!-- Пагінація -->
    <div v-if="totalPages > 1" class="pagination">
      <button 
        :disabled="currentPage === 1" 
        @click="changePage(currentPage - 1)"
        class="btn"
      >
        Попередня
      </button>
      <span>Сторінка {{ currentPage }} з {{ totalPages }}</span>
      <button 
        :disabled="currentPage === totalPages" 
        @click="changePage(currentPage + 1)"
        class="btn"
      >
        Наступна
      </button>
    </div>

    <!-- Рекомендовані статті -->
    <div v-if="recommendedArticles.length" class="recommended-articles">
      <h3>Рекомендовані статті</h3>
      <ul>
        <li v-for="article in recommendedArticles" :key="article.id">
          <NuxtLink :to="`/article/${article.slug}`">{{ article.title }}</NuxtLink>
        </li>
      </ul>
    </div>

    <!-- Повернення на початок сторінки -->
    <ScrollToTop />
  </div>
</template>

<script setup>
// Імпортуємо необхідні компоненти та функції
import { ref, computed, onMounted } from 'vue';
import { useArticles } from '~/composables/useArticles';
import ScrollToTop from '~/components/ScrollToTop.vue';

// Використовуємо composable для роботи з статтями
const { 
  articles, 
  recommendedArticles, 
  isLoading,
  fetchArticles 
} = useArticles();

// Стан сторінки
const currentPage = ref(1);
const articlesPerPage = 2;
const searchQuery = ref('');
let searchTimeout = null;

// Завантажуємо дані при монтуванні компонента
onMounted(async () => {
  await fetchArticles();
});

// Обчислювані властивості з мемоізацією
const totalPages = computed(() => {
  const filteredCount = searchQuery.value
    ? articles.value.filter(article => 
        article.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      ).length
    : articles.value.length;
    
  return Math.max(1, Math.ceil(filteredCount / articlesPerPage));
});

const filteredArticles = computed(() => {
  if (!articles.value.length) return [];
  
  let filtered = articles.value;
  
  // Фільтрація за пошуковим запитом
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(article => 
      article.title.toLowerCase().includes(query) || 
      article.shortDescription.toLowerCase().includes(query)
    );
  }
  
  // Перевірка чи поточна сторінка все ще валідна
  if (currentPage.value > Math.ceil(filtered.length / articlesPerPage)) {
    currentPage.value = 1;
  }
  
  // Пагінація
  const startIndex = (currentPage.value - 1) * articlesPerPage;
  return filtered.slice(startIndex, startIndex + articlesPerPage);
});

// Методи
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    // Прокручуємо до верху списку статей
    document.querySelector('.articles-list')?.scrollIntoView({ behavior: 'smooth' });
  }
};

// Дебаунс для пошуку
const debouncedSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    searchArticles();
  }, 300);
};

const searchArticles = () => {
  currentPage.value = 1; // Скидаємо на першу сторінку після пошуку
};

// Форматування дати
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('uk-UA', options);
};

// SEO-мета-дані
definePageMeta({
  title: 'Мій блог',
  meta: [
    { name: 'description', content: 'Це мій особистий блог на Nuxt 3' },
    { name: 'keywords', content: 'блог, Nuxt 3, статті' },
  ]
});

// Використовуємо useHead для кращого SEO
useHead({
  title: 'Мій блог',
  meta: [
    { name: 'description', content: 'Це мій особистий блог на Nuxt 3' },
    { property: 'og:title', content: 'Мій блог' },
    { property: 'og:description', content: 'Це мій особистий блог на Nuxt 3' },
    { property: 'og:image', content: '/images/blog-cover.jpg' },
    { property: 'og:url', content: 'https://example.com' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
});
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.search {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.search input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 60%;
  font-size: 1rem;
}

.articles-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.articles-list li {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 5px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.articles-list li:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.article-link {
  text-decoration: none;
  color: #333;
  display: block;
}

.article-link h2 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.pagination {
  text-align: center;
  margin: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.recommended-articles {
  margin-top: 40px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.recommended-articles h3 {
  margin-top: 0;
  color: #2c3e50;
}

.recommended-articles ul {
  list-style-type: none;
  padding: 0;
}

.recommended-articles li {
  margin: 10px 0;
  padding: 5px 0;
}

.recommended-articles a {
  color: #3498db;
  text-decoration: none;
  transition: color 0.2s;
}

.recommended-articles a:hover {
  color: #2980b9;
  text-decoration: underline;
}

.btn {
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn:hover:not(:disabled) {
  background-color: #45a049;
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.loading {
  text-align: center;
  padding: 20px;
  font-style: italic;
  color: #666;
}

.no-results {
  text-align: center;
  padding: 30px;
  color: #666;
  font-style: italic;
}

@media (max-width: 600px) {
  .search {
    flex-direction: column;
  }
  
  .search input {
    width: 100%;
  }
  
  .pagination {
    flex-wrap: wrap;
  }
}
</style>
