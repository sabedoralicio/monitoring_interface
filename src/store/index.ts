import { defineStore } from "pinia";

type SecsFromEpoch = number; // usage-friendly time stamp
type Port = number; // here only localhost single process backends so far
type CPUPerc = number; // CPU load in % of one CPU thread
type MemKB = number; // memory usage in kB
type Take = [SecsFromEpoch, Port];
type Load = [CPUPerc, MemKB];

export const useLoadTakerStore = defineStore("loadTaker", {
  state: () => ({
    loadTake: new Map<Take, Load>()
  }),
  getters: {
//    double: (state) => state.loadTake * 2,
  },
  actions: {
    takeLoad(take: Take, load: Load) {
      this.loadTake.set(take, load);
    },
  },
});

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
