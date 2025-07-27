import { ref } from 'vue';

export function useArticles() {
  const articles = ref([]);
  const recommendedArticles = ref([]);
  const isLoading = ref(false);
  
  const fetchArticles = async () => {
    isLoading.value = true;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      articles.value = [
        { id: 1, title: 'Стаття 1', slug: 'article-1', shortDescription: 'Опис статті 1', date: '2025-07-26' },
        { id: 2, title: 'Стаття 2', slug: 'article-2', shortDescription: 'Опис статті 2', date: '2025-07-26' },
        { id: 3, title: 'Стаття 3', slug: 'article-3', shortDescription: 'Опис статті 3', date: '2025-07-26' },
        { id: 4, title: 'Стаття 4', slug: 'article-4', shortDescription: 'Опис статті 4', date: '2025-07-26' },
        { id: 5, title: 'Стаття 5', slug: 'article-5', shortDescription: 'Опис статті 5', date: '2025-07-26' }
      ];
      
      recommendedArticles.value = [
        { id: 1, slug: 'article-1', title: 'Рекомендовано: стаття 1' },
        { id: 2, slug: 'article-2', title: 'Рекомендовано: стаття 2' },
        { id: 3, slug: 'article-3', title: 'Рекомендовано: стаття 3' }
      ];
    } catch (error) {
      console.error('Помилка при завантаженні статей:', error);
    } finally {
      isLoading.value = false;
    }
  };
  
  const getArticleBySlug = (slug) => {
    return articles.value.find(article => article.slug === slug) || null;
  };
  
  return {
    articles,
    recommendedArticles,
    isLoading,
    fetchArticles,
    getArticleBySlug
  };
}