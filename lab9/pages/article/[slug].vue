<template>
  <div class="article-page">
    <Breadcrumbs class="breadcrumbs" />
    
    <div v-if="isLoading" class="loading">
      Завантаження статті...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else-if="article" class="article-content">
      <h1>{{ article.title }}</h1>
      <div class="article-meta">
        <span class="date">{{ formatDate(article.date || new Date()) }}</span>
      </div>
      
      <div class="content">
        <p>{{ article.content }}</p>
      </div>
      
      <div v-if="filteredRecommendations.length" class="recommended-articles">
        <h3>Рекомендовані статті</h3>
        <ul>
          <li v-for="recArticle in filteredRecommendations" :key="recArticle.id">
            <NuxtLink :to="`/article/${recArticle.slug}`">{{ recArticle.title }}</NuxtLink>
          </li>
        </ul>
      </div>
      
      <div class="actions">
        <NuxtLink to="/" class="back-button">← Повернутися до списку статей</NuxtLink>
      </div>
    </div>
    
    <div v-else class="not-found">
      <h2>Статтю не знайдено</h2>
      <p>На жаль, стаття з вказаним ідентифікатором не існує.</p>
      <NuxtLink to="/" class="back-button">← Повернутися на головну</NuxtLink>
    </div>
    
    <ScrollToTop />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useArticles } from '~/composables/useArticles';
import ScrollToTop from '~/components/ScrollToTop.vue';
import Breadcrumbs from '~/components/Breadcrumbs.vue';

const route = useRoute();
const slug = computed(() => route.params.slug);

const { articles, recommendedArticles, isLoading, fetchArticles, getArticleBySlug } = useArticles();

const error = ref(null);
const article = ref(null);

onMounted(async () => {
  try {
    if (!articles.value.length) {
      await fetchArticles();
    }
    
    const foundArticle = getArticleBySlug(slug.value);
    
    if (foundArticle) {
      article.value = {
        ...foundArticle,
        content: foundArticle.content || `Детальний вміст статті ${foundArticle.title}. Тут може бути розгорнутий текст статті з форматуванням, зображеннями та іншими елементами.`
      };
    } else {
      error.value = `Статтю з ідентифікатором "${slug.value}" не знайдено`;
    }
  } catch (err) {
    console.error('Помилка при завантаженні статті:', err);
    error.value = 'Виникла помилка при завантаженні статті. Спробуйте пізніше.';
  }
});

const filteredRecommendations = computed(() => {
  if (!article.value) return [];
  return recommendedArticles.value.filter(rec => rec.slug !== slug.value);
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('uk-UA', options);
};

// SEO-мета-дані
useHead(() => ({
  title: article.value ? `${article.value.title} | Мій блог` : 'Стаття не знайдена',
  meta: [
    { name: 'description', content: article.value ? article.value.shortDescription || 'Детальна стаття на нашому блозі' : 'Стаття не знайдена' },
    { property: 'og:title', content: article.value ? article.value.title : 'Стаття не знайдена' },
    { property: 'og:description', content: article.value ? article.value.shortDescription || 'Детальна стаття на нашому блозі' : 'Стаття не знайдена' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: `https://example.com/article/${slug.value}` },
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
}));
</script>

<style scoped>
.article-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.breadcrumbs {
  margin-bottom: 20px;
  color: #666;
  font-size: 0.9rem;
}

.article-content h1 {
  margin-top: 0;
  color: #2c3e50;
  font-size: 2rem;
}

.article-meta {
  margin-bottom: 20px;
  color: #666;
  font-size: 0.9rem;
}

.date {
  font-style: italic;
}

.content {
  line-height: 1.6;
  margin-bottom: 30px;
}

.recommended-articles {
  margin-top: 40px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  border-left: 3px solid #3498db;
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

.actions {
  margin-top: 30px;
}

.back-button {
  display: inline-block;
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #2980b9;
}

.loading, .error, .not-found {
  text-align: center;
  padding: 40px 20px;
  margin: 20px 0;
  border-radius: 5px;
}

.loading {
  color: #666;
  font-style: italic;
}

.error {
  color: #e74c3c;
  background-color: #fadbd8;
  border: 1px solid #e74c3c;
}

.not-found {
  color: #7f8c8d;
  background-color: #f8f9fa;
  border: 1px solid #ecf0f1;
}

.not-found h2 {
  margin-top: 0;
  color: #2c3e50;
}

@media (max-width: 600px) {
  .article-page {
    padding: 15px;
  }
  
  .article-content h1 {
    font-size: 1.5rem;
  }
}
</style>
