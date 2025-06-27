import { defineStore } from 'pinia';

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'Гречка ядриця',
        price: 58.99,
        description: '1 кг добірної української гречки, ідеально підходить для щоденного вживання.',
        image: 'https://zernovita.online/files/products/grechana-krupa-zernovita-grechka.1800x1200w.png'
      },
      {
        id: 2,
        name: 'Батон “Київський”',
        price: 18.20,
        description: 'Мʼякий пшеничний батон із золотою скоринкою, випечений за традиційною рецептурою.',
        image: 'https://fresh-dostavkadom.com.ua/wp-content/uploads/2020/products/102750.jpg'
      },
      {
        id: 3,
        name: 'Яйця курячі (десяток)',
        price: 44.00,
        description: '10 шт. свіжих курячих яєць з ферми, категорія C1.',
        image: 'https://vitok.ua/home/catalog_products/item_3504/image/352ebfea-885d-11e9-af5f-000c2974779c.jpg'
      }
    ],
  }),
  getters: {
    getProductById: (state) => (id) => state.products.find((product) => product.id === id),
  },
});
