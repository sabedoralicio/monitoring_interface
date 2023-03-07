/** Old Pinia code.
 * TODO: Deprecate??
 */
import { createApp } from 'vue';
import { createPinia, defineStore } from "pinia";
import App from '@/App.vue';
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.mount('#app');

export const useCounterStore = defineStore("counter", {
  state: () => ({
  		 count: 13
  }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
