<template>
  PINIA ++{{ getCounter() }}++ ++{{ counter }}++  @@{{ getLoadCount() }}@@ @@{{ getLoadCode() }}@@
  <br/>
  <button @click='loadTaking'>UPCOUNT</button>
  <br/>
  <button @click='stopCount'>STOP</button>
  <br/>
  <VuePlotly :data="data" :layout="layout" :display-mode-bar="false"></VuePlotly>
  <br/>
  <h3>API function names, response texts at host {{ nodeURL }}</h3>
  <div id="app">
    <v-table fixed-header height="1300px">
      <tbody>
        <tr v-for="api_function in nestAPIFunctions" :key="api_function">
          <td>
            <NestAPILinkText :nodeURL="nodeURL" :apiFunction="api_function" />
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <h3>API function names at host {{ nodeURL }}</h3>
  <div id="app">
    <v-table fixed-header height="900px">
      <tbody>
        <tr v-for="api_function in nestAPIFunctions" :key="api_function">
          <td>
            <NestAPILinkJsonRaw
              :nodeURL="nodeURL"
              :apiFunction="api_function"
            />
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { VuePlotly } from "vue3-plotly";
import NestAPILinkJsonRaw from "@/components/NestAPILinkJsonRaw.vue";
import NestAPILinkText from "@/components/NestAPILinkText.vue";
import { useCounterStore } from '@/store/index';
import { useLoadTakerStore } from '@/store/index';

interface NodeLoadLore {
  portNr: number;
  pid: number;
  cpuPercent: number;
  memKb: number;
}

interface LoadLore {
  secsFromEpoch: number;
  loadLoreNodes: NodeLoadLore[];
}

export default defineComponent({
  name: "BackendView",
  components: {
    NestAPILinkJsonRaw,
    NestAPILinkText,
	VuePlotly,
  },
  methods: {
    loadTakeEveryMinute() {
      this.counter = setInterval(() => {
		this.loadTaking()
	  }, 60000)
    },
    loadTaking() {
      let nodeUrl: string = 'http://127.0.0.1:8080/loadLore/';
      fetch(nodeUrl)
        .then((response) => response.json())
//        .then((data) => (this.loadLoreTake = data));
        .then((lore) => this.loadAdd(lore));
    },
    loadAdd(lore: LoadLore) {
      let secsFromEpoch: number = lore.secsFromEpoch;
	  for (let node of lore.loadLoreNodes) {
	    useLoadTakerStore().takeLoad([secsFromEpoch, node.portNr], [node.cpuPercent, node.memKb]);
	  }
    },
    nodeLoadAdd(secsFromEpoch: number, lore: NodeLoadLore) {
      useLoadTakerStore().takeLoad([secsFromEpoch, lore.portNr], [lore.cpuPercent, lore.memKb]);
    },
    getLoadCount() {
      return useLoadTakerStore().loadTake.size;
    },
    getLoadCode() {
	  let takes= useLoadTakerStore().loadTake.entries();
	  let takeStrs: string[] = [];
	  for (let [secs,port] of takes) {
	    let takeStr = '['+secs+','+port+']';
	    takeStrs.push(takeStr);
	  }
      return takeStrs.toString();
    },
    getCounter() {
      return useCounterStore().count;
    },
    stopCount() {
      clearInterval(this.counter);
    },
    upCount() {
      useCounterStore().increment();
    },
    upCountEverySecond() {
      this.counter = setInterval(() => {
		this.upCount()
	  }, 1000)
    },
    isHtmlErrorMessage(responseString: string): number {
      return responseString.indexOf("<");
    },
  },
  data() {
    return {
      nodeURL: "http://127.0.0.1:8080",
      nestAPIFunctions: null,
      loadLoreTake: null,
	  counter: useCounterStore().count,
      data: [{
        x: [1,2,3.14,4],
        y: [10,15,13,17],
        type:"scatter"
      },{
        x: [1,2,2.72,4],
        y: [16,5,11,9],
        type:"scatter"
      }],
      layout:{
        title: "My graph"
      }
    };
  },
  created() {
    this.upCountEverySecond();
//    this.loadTakeEveryMinute();
    fetch("http://127.0.0.1:8080/nest/nodes")
      .then((response) => response.json())
      .then((data) => (this.nestAPIFunctions = data));
  },
  setup() {
    ////const counter = useCounterStore().count;

    ////counter.count++
    // with autocompletion ✨
    ////counter.$patch({ count: counter.count + 1 })
    // or using an action instead
    ////counter.increment()
  },
});
</script>
