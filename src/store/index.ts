import { defineStore } from "pinia";

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
