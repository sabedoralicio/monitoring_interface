<script lang='ts'>
import { defineComponent } from 'vue';
import { VuePlotly } from 'vue3-plotly';
import { useStrokeColorStore } from '@/store/color';
import { useGridClickStore } from '@/store/clickGrid';
import { useProcLoadTakerStore,
		 useMPIBufLoadTakerStore,
		 useSpikeCountLoadTakerStore } from '@/store/load';
import { MeasureKind } from '@/ts/TypesForViews';

const gridPicks = useGridClickStore();
const strokeColors = useStrokeColorStore();
const procLoadTakes = useProcLoadTakerStore();
const mpiBufLoadTakes = useMPIBufLoadTakerStore();
const spikeCountLoadTakes = useSpikeCountLoadTakerStore();

export default defineComponent({
	name: 'StrokeBundleTile',
	components: {
		VuePlotly,
	},
	methods: {
		getLoadCount() {
			return procLoadTakes.loadTake.size;
		},
		getValue(measure: MeasureKind, values: number[]) {
			if(measure===MeasureKind.MemLoad)
				return values[1];
			else
				return values[0];
		},
		getTitleS(kindStr: string, nodeNr: number) {
			if(kindStr==='cpu')
				return 'CPU % Load Chart '+nodeNr;
			else if(kindStr==='mem')
				return 'Memory kB Load Chart '+nodeNr;
			else if(kindStr==='mpibuf')
				return 'MPI Buffer Load Chart '+nodeNr;
			else
				return 'Spikes/Process Chart '+nodeNr;
		},
		getValueS(kindStr: string, values: number[]) {
			if(kindStr==='cpu')
				return values[0];
			else if(kindStr==='mem')
				return values[1];
			else if(kindStr==='mpibuf')
				return values[0];
			else
				return values[1];
		},
		isPicked(kind: string, nodeNr_: number): boolean | undefined {
			let nodeNr= parseInt(''+nodeNr_);
			return gridPicks.isClicked(nodeNr, kind);
		},
		colorAt(kind: string, nodeNr_: number): string | undefined {
			let nodeNr= parseInt(''+nodeNr_) %16;
			return strokeColors.colorAt(kind, nodeNr);
		},
		listListOf(count:number) : number[][] {
			var yieldlistList: number[][] = [];
			for(var p:number=0; p<count; p++){
				yieldlistList.push([]);
			}
			return yieldlistList;
		},
		nodeNrsPicked():number[] {
			return Array.from(useGridClickStore().clickGrid.keys());
		},
		getChartLoreCSMI_OLD() {
// /*
			let node_count:number =  16; // 8; // 4; //
			let ports:number[] = [9000,9001,9002,9003,9004,9005,9006,9007,
								  9008,9009,9010,9011,9012,9013,9014,9015];
			let ports8:number[] = [9000,9001,9002,9003,9004,9005,9006,9007];
			let ports4:number[] = [9000,9001,9002,9003];
			let begin_secs: number = 0;
			let is_begin: boolean = true;
			let time: number[][] = this.listListOf(node_count);
			let cpu: number[][] = this.listListOf(node_count);
			let mem: number[][] = this.listListOf(node_count);
			let procLoadEntries= Array.from(procLoadTakes.loadTake.entries()).sort();
			for (let [[secs,port],[cpuPerc,memKB]] of procLoadEntries) {
				if(is_begin){
					begin_secs= secs;
					is_begin= false;
				}
				for(var p:number=0; p<node_count; p++){
					let t:number = secs-begin_secs;
					if(t < time[p][-1]){ console.log(t+' < '+time[p][-1]); }
//					if (port===ports[p]  && (time[p]!==[] || t > time[p][-1] )) {  //// WORKAROUND
					if (port===ports[p]) {
						time[p].push(t);
						cpu[p].push(cpuPerc);
						mem[p].push(memKB);
					}
				}
			}
			let mpibufT: number[][] = this.listListOf(node_count);
			let mpibuf: number[][] = this.listListOf(node_count);
			let mpiBufLoadEntries= Array.from(mpiBufLoadTakes.loadTake.entries()).sort();
			for (let [[secs,port],mpiBuf] of mpiBufLoadEntries) {
				if(is_begin){
					begin_secs= secs;
					is_begin= false;
				}
				for(var p:number=0; p<node_count; p++){
					if (port===ports[p]) {
						mpibufT[p].push(secs-begin_secs);
						mpibuf[p].push(mpiBuf);
					}
				}
			}
			let spikesT: number[][] = this.listListOf(node_count);
			let spikes: number[][] = this.listListOf(node_count);
			let spikeCountLoadEntries= Array.from(spikeCountLoadTakes.loadTake.entries()).sort();
			for (let [[secs,port],spikeCount] of spikeCountLoadEntries) {
				if(is_begin){
					begin_secs= secs;
					is_begin= false;
				}
				for(var p:number=0; p<node_count; p++){
					if (port===ports[p]) {
						spikesT[p].push(secs-begin_secs);
						spikes[p].push(spikeCount);
					}
				}
			}
// */
			// filtering by click grid
			let chartLore= new Array();
			let nodeNrs:number[] = this.nodeNrsPicked();
//			for(var nr in nodeNrs){
		    console.log('@@@ StrokeBundleTile getChartLoreCSMI @@@@@@@@@@@@@@@@@@@@@@');
			for(var p:number=0; p<nodeNrs.length; p++){
				let nodeNr:number = nodeNrs[p];
		        console.log('@@@ StrokeBundleTile getChartLoreCSMI ',p,': ',nodeNr);
		        console.log('@@@ StrokeBundleTile CPU ',this.isPicked('cpu', nodeNr),
							' Mem ',this.isPicked('mem', nodeNr),
							' MPI ',this.isPicked('mpibuf', nodeNr),
							' Spike ',this.isPicked('spikes', nodeNr));
				if(this.isPicked('cpu', nodeNr)) {
					let colorChoice= ''+this.colorAt('cpu', nodeNr);
					let [times,values] = useGridClickStore().getChartLore(nodeNr,'cpu');
					console.log('@@@ StrokeBundleTile getChartLoreCSMI CPU ',nodeNr,': ',Array.from(values));
					chartLore.push(this.pathLoreBy(times, values, 'CPU', nodeNr, 'y', colorChoice));
				}
				if(this.isPicked('mem', nodeNr)) {
					let colorChoice= ''+this.colorAt('mem', nodeNr);
					let [times,values] = useGridClickStore().getChartLore(nodeNr,'mem');
					console.log('@@@ StrokeBundleTile getChartLoreCSMI Mem ',nodeNr,': ',Array.from(values));
					chartLore.push(this.pathLoreBy(times, values, 'Mem', nodeNr, 'y3', colorChoice));
				}
				if(this.isPicked('mpibuf', nodeNr)) {
					let colorChoice= ''+this.colorAt('mpibuf', nodeNr);
					let [times,values] = useGridClickStore().getChartLore(nodeNr,'mpibuf');
					console.log('@@@ StrokeBundleTile getChartLoreCSMI MPI ',nodeNr,': ',Array.from(values));
					chartLore.push(this.pathLoreBy(times, values, 'MPIbuf', nodeNr, 'y2', colorChoice));
				}
				if(this.isPicked('spikes', nodeNr)) {
					let colorChoice= ''+this.colorAt('spikes', nodeNr);
					let [times,values] = useGridClickStore().getChartLore(nodeNr,'spikes');
					console.log('@@@ StrokeBundleTile getChartLoreCSMI Spike ',nodeNr,': ',Array.from(values));
					chartLore.push(this.pathLoreBy(times, values, 'Spikes', nodeNr, 'y4', colorChoice));
				}
			}
			return chartLore;
		},


		
		getChartLoreCSMI_NEW() {
			// filtering by click grid
			let chartLore= new Array();
			let nodeNrs:number[] = this.nodeNrsPicked();
//			for(var nr in nodeNrs){
		    console.log('@@@ StrokeBundleTile getChartLoreCSMI @@@@@@@@@@@@@@@@@@@@@@');
			for(var p:number=0; p<nodeNrs.length; p++){
				let nodeNr:number = nodeNrs[p];
		        console.log('@@@ StrokeBundleTile getChartLoreCSMI ',p,': ',nodeNr);
		        console.log('@@@ StrokeBundleTile CPU ',this.isPicked('cpu', nodeNr),
							' Mem ',this.isPicked('mem', nodeNr),
							' MPI ',this.isPicked('mpibuf', nodeNr),
							' Spike ',this.isPicked('spikes', nodeNr));
				if(this.isPicked('cpu', nodeNr)) {
					let colorChoice= ''+this.colorAt('cpu', nodeNr);
					let [times,values] = useGridClickStore().getChartLore(nodeNr,'cpu');
					console.log('@@@ StrokeBundleTile getChartLoreCSMI CPU ',nodeNr,': ',Array.from(values));
					chartLore.push(this.pathLoreBy(times, values, 'CPU', nodeNr, 'y', colorChoice));
				}
				if(this.isPicked('mem', nodeNr)) {
					let colorChoice= ''+this.colorAt('mem', nodeNr);
					let [times,values] = useGridClickStore().getChartLore(nodeNr,'mem');
					console.log('@@@ StrokeBundleTile getChartLoreCSMI Mem ',nodeNr,': ',Array.from(values));
					chartLore.push(this.pathLoreBy(times, values, 'Mem', nodeNr, 'y3', colorChoice));
				}
				if(this.isPicked('mpibuf', nodeNr)) {
					let colorChoice= ''+this.colorAt('mpibuf', nodeNr);
					let [times,values] = useGridClickStore().getChartLore(nodeNr,'mpibuf');
					console.log('@@@ StrokeBundleTile getChartLoreCSMI MPI ',nodeNr,': ',Array.from(values));
					chartLore.push(this.pathLoreBy(times, values, 'MPIbuf', nodeNr, 'y2', colorChoice));
				}
				if(this.isPicked('spikes', nodeNr)) {
					let colorChoice= ''+this.colorAt('spikes', nodeNr);
					let [times,values] = useGridClickStore().getChartLore(nodeNr,'spikes');
					console.log('@@@ StrokeBundleTile getChartLoreCSMI Spike ',nodeNr,': ',Array.from(values));
					chartLore.push(this.pathLoreBy(times, values, 'Spikes', nodeNr, 'y4', colorChoice));
				}
			}
			return chartLore;
		},
		getChartLoreCSMI() {
			return this.getChartLoreCSMI_NEW();
		},
		pathLoreBy(x: number[],
				   y: number[],
				   kind: string,
				   nodeNr: number,
				   yaxis: string,
				   colorChoice: string) {
			let path = {
				x: x, y: y,
				type: 'scatter',
				line: { shape: 'spline', width: 1, color: colorChoice },
				name: nodeNr+' '+kind,
				yaxis: yaxis,
			};
			return path;
		},
		getLayoutCSMI() {
			return {
				title: 'CPU % / Memory kB / MPI Buffer / Spikes Chart',
				xaxis: {
//					rangeselector: selectorOptions,
					rangeslider: {}
				},
				yaxis: {
					title: 'CPU %',
					titlefont: {color: '#7f7f00'},
					tickfont: {color: '#7f7f00'}
				},
				yaxis2: {
					title: 'MPI Buffer',
					titlefont: {color: '#ff7f00'},
					tickfont: {color: '#ff7f00'},
					anchor: 'free',
					overlaying: 'y',
					side: 'left',
					position: 0.075
				},
				yaxis3: {
					title: 'Memory kB',
					titlefont: {color: '#007fff'},
					tickfont: {color: '#007fff'},
					anchor: 'x',
					overlaying: 'y',
					side: 'right'
				},
				yaxis4: {
					title: 'Spikes',
					titlefont: {color: '#ff007f'},
					tickfont: {color: '#ff007f'},
					anchor: 'free',
					overlaying: 'y',
					side: 'right',
					position: 0.925
				}
//			autosize: false,
//			width: 600, height: 400,
			};
		},
/*
    getConfig() {
		return {
			toImageButtonOptions: {
				format: 'svg', // one of png, svg, jpeg, webp
				filename: 'custom_image',
				height: 300,
				width: 300,
				scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
			}
		};
    },
// */
		getLoadCode() {
			let takes= procLoadTakes.loadTake.keys();
			let takeStrs: string[] = [];
			for (let [secs,port] of takes) {
				let takeStr = '['+secs+','+port+']';
				takeStrs.push(takeStr);
			}
			return takeStrs.toString();
		},
		getNr() {
			return this.$route.params.nr;
		},
		isHtmlErrorMessage(responseString: string): number {
			return responseString.indexOf('<');
		},
	},
	data() {
		return {
			accessNodeURL: 'http://127.0.0.1:8080',
			chartLore: new Array(),
			loadLoreTake: null,
			cpu_layout:{
				title: 'CPU % Load Chart'
			},
			mem_layout:{
				title: 'Memory kB Load Chart'
			}
		};
	},
/*
	created() {
		let MEASUREMENT_INTERVAL_MS:number = 50;
		setInterval(() => {
			// this has to stand here – doesn't work inside a method
			if(useGridClickStore().needsUpdate){
				this.chartLore = this.getChartLoreCSMI_NEW();
				useGridClickStore().setUpdated();
			}
		}, MEASUREMENT_INTERVAL_MS);
	},
// */
}); // Wed 11-16 Tue 11-16 TVB-Support
</script>

<template>
<!--
  <VuePlotly :data='this.chartLore'
			 :layout='getLayoutCSMI()'
			 display-mode-bar='false' />
-->
  <VuePlotly :data='getChartLoreCSMI()'
			 :layout='getLayoutCSMI()'
			 display-mode-bar='false' />
</template>
