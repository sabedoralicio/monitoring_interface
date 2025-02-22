<script lang="ts">
import { defineComponent } from "vue";
import { VuePlotly } from "vue3-plotly";
import NestAPILinkJsonRaw from "@/components/NestAPILinkJsonRaw.vue";
import NestAPILinkText from "@/components/NestAPILinkText.vue";
import { useCounterStore } from '@/store/index';
import { useProcLoadTakerStore } from '@/store/load';

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
	  }, 15000)
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
	    useProcLoadTakerStore().takeLoad([secsFromEpoch, node.portNr], [node.cpuPercent, node.memKb]);
	  }
    },
    nodeLoadAdd(secsFromEpoch: number, lore: NodeLoadLore) {
      useProcLoadTakerStore().takeLoad([secsFromEpoch, lore.portNr], [lore.cpuPercent, lore.memKb]);
    },
    getLoadCount() {
      return useProcLoadTakerStore().loadTake.size;
    },
    getChartLoreCPU() {
		let is_begin: boolean = true;
		let begin_secs: number = 0;
		let ta: number[] = [];
		let tb: number[] = [];
		let tc: number[] = [];
		let td: number[] = [];
		let a: number[] = [];
		let b: number[] = [];
		let c: number[] = [];
		let d: number[] = [];
		let entries= useProcLoadTakerStore().loadTake.entries();
		for (let [[secs,port],[cpuPerc,memKB]] of entries) {
			if(is_begin){
				begin_secs= secs;
				is_begin= false;
			}
			if (port==9000) {
				ta.push(secs-begin_secs); a.push(cpuPerc);
			} else if (port==9001) {
				tb.push(secs-begin_secs); b.push(cpuPerc);
			} else if (port==9002) {
				tc.push(secs-begin_secs); c.push(cpuPerc);
			} else {
				td.push(secs-begin_secs); d.push(cpuPerc);
			}
	  }
	  let pathA = {
        x: ta,
        y: a,
        type:"scatter",
        line: { shape: 'spline', dash: 'dot', width: 4 },
		name: 'port 9000',
      };
	  let pathB = {
        x: tb,
        y: b,
        type:"scatter",
        line: { shape: 'spline', dash: 'dot', width: 4 },
		name: 'port 9001',
      };
	  let pathC = {
        x: tc,
        y: c,
        type:"scatter",
        line: { shape: 'spline', dash: 'dot', width: 4 },
		name: 'port 9002',
      };
	  let pathD = {
        x: td,
        y: d,
        type:"scatter",
        line: { shape: 'spline', dash: 'dot', width: 4 },
		name: 'port 9003',
      };
      return [pathA, pathB, pathC, pathD];
    },
    getChartLoreMem() {
		let is_begin: boolean = true;
		let begin_secs: number = 0;
		let ta: number[] = [];
		let tb: number[] = [];
		let tc: number[] = [];
		let td: number[] = [];
		let a: number[] = [];
		let b: number[] = [];
		let c: number[] = [];
		let d: number[] = [];
		let entries= useProcLoadTakerStore().loadTake.entries();
		for (let [[secs,port],[cpuPerc,memKB]] of entries) {
			if(is_begin){
				begin_secs= secs;
				is_begin= false;
			}
			if (port==9000) {
				ta.push(secs-begin_secs); a.push(memKB);
			} else if (port==9001) {
				tb.push(secs-begin_secs); b.push(memKB);
			} else if (port==9002) {
				tc.push(secs-begin_secs); c.push(memKB);
			} else {
				td.push(secs-begin_secs); d.push(memKB);
			}
	  }
	  let pathA = {
        x: ta,
        y: a,
        type:"scatter",
        line: { shape: 'spline', dash: 'dot', width: 4 },
		name: 'port 9000',
      };
	  let pathB = {
        x: tb,
        y: b,
        type:"scatter",
        line: { shape: 'spline', dash: 'dot', width: 4 },
		name: 'port 9001',
      };
	  let pathC = {
        x: tc,
        y: c,
        type:"scatter",
        line: { shape: 'spline', dash: 'dot', width: 4 },
		name: 'port 9002',
      };
	  let pathD = {
        x: td,
        y: d,
        type:"scatter",
        line: { shape: 'spline', dash: 'dot', width: 4 },
		name: 'port 9003',
      };
      return [pathA, pathB, pathC, pathD];
    },
    getLoadCode() {
	  let takes= useProcLoadTakerStore().loadTake.keys();
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
      accessNodeURL: "http://127.0.0.1:8080",
      nestAPIFunctions: null,
      loadLoreTake: null,
	  counter: useCounterStore().count,
      cpu_layout:{
        title: "CPU % Load Chart"
      },
      mem_layout:{
        title: "Memory kB Load Chart"
      }
    };
  },
	/** Init code, being run once at beginning:
     */
	created() {
		this.upCountEverySecond();
		this.loadTaking();
		this.loadTakeEveryMinute();
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

<template>
  TICKS ++{{ getCounter() }}++ ++{{ counter }}++  @@{{ getLoadCount() }}@@
  <!-- @@{{ getLoadCode() }}@@ -->
  <br/>
  <button @click='loadTaking'>UPCOUNT</button>
  <br/>
  <button @click='stopCount'>STOP</button>
  <br/>
  <VuePlotly :data="getChartLoreCPU()" :layout="cpu_layout" :display-mode-bar="false"></VuePlotly>
  <br/>
  <VuePlotly :data="getChartLoreMem()" :layout="mem_layout" :display-mode-bar="false"></VuePlotly>
  <br/>
  <h3>API function names, response texts at host {{ accessNodeURL }}</h3>
  <div id="app">
    <v-table fixed-header height="1300px">
      <tbody>
        <tr v-for="api_function in nestAPIFunctions" :key="api_function">
          <td>
            <NestAPILinkText :nodeURL="accessNodeURL" :apiFunction="api_function" />
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <h3>API function names at host {{ accessNodeURL }}</h3>
  <div id="app">
    <v-table fixed-header height="900px">
      <tbody>
        <tr v-for="api_function in nestAPIFunctions" :key="api_function">
          <td>
            <NestAPILinkJsonRaw
              :nodeURL="accessNodeURL"
              :apiFunction="api_function"
            />
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
