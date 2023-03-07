<script lang='ts'>
import { defineComponent, getCurrentInstance } from 'vue';
import { VuePlotly } from 'vue3-plotly';
import { useStrokeColorStore } from '@/store/color';
import { useGridClickStore } from '@/store/clickGrid';
import { useProcLoadTakerStore,
		 useMPIBufLoadTakerStore,
		 useSpikeCountLoadTakerStore } from '@/store/load';
import {
	MeasureKind // , ProcLoadLore, NodeProcLoadLore
} from '@/ts/TypesForViews';

const gridPicks = useGridClickStore();

export default defineComponent({
	name: 'OneStrokeTile',
	emits: ['closeEvent'],
    props: {
        kind: {
            type: String,
            required: true,
        },
        nr: {
            type: Number,
            required: true,
        },
    },
	components: {
		VuePlotly,
	},
	methods: {
/*
		getLoadCount() {
			return useProcLoadTakerStore().loadTake.size;
		},
		// */
		// https://stackoverflow.com/questions/65163775/how-to-destroy-unmount-vue-js-3-components
		close() {
			this.$.appContext.app.unmount();
			this.closing = true;
			this.toKeep = false;
			let trunk= getCurrentInstance();
			if(trunk !== null) {
				trunk.appContext.app.unmount();
			} else {
				console.log('TRUNK === NULL');
			}
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
		colorAt(kind: string, nodeNr_: number): string | undefined {
			// nodeNr nicht erkannt
			let nodeNr= parseInt(''+nodeNr_);
			return useStrokeColorStore().colorAt(kind, nodeNr);
			//return useStrokeColorStore().colorAt(kind, 3);
		},
		getChartLore(kindStr: string, nodeNr_: number) {
			let nodeNr= parseInt(''+nodeNr_);
			console.log('??? OneStrokeTile.getChartLore ',nodeNr_,' ',kindStr);
			let colorChoice= this.colorAt(kindStr, nodeNr);
			//let colorChoice= this.colorAt('mem', 2);
			let [times,values] = gridPicks.getChartLore(nodeNr,kindStr);
			let path = {
				x: times,
				y: values,
				type:'scatter',
				line: { shape: 'spline', width: 1, color: colorChoice },
				name: 'node '+nodeNr,
			};
			return [path];
		},
		getLayout(kindStr: string, nodeNr_: number) {
			let nodeNr= parseInt(''+nodeNr_);
			let nodeNr16= nodeNr % 16;
			if(this.isClicked(kindStr, nodeNr)) {
//		  if(this.getGrid().get(kindStr)?.get(nodeNr)) {
				return {
//			title: ' '+this.colorAt(kindStr, nodeNr),
//			title: kindStr+' '+typeof(nodeNr)+' '+this.numFields()+' '+this.isClicked(kindStr, nodeNr)+' '+this.getGrid().get(kindStr)?.get(3),
//			yaxis: {
//				title: 'yaxis title',
//				titlefont: {color: 'rgb(255, 127, 0)'},
//				tickfont: {color: 'rgb(255, 127, 0)'},
//				overlaying: 'y',
//				side: 'right'
			//			},
					margin: { pad: 0, b: 0, t: 0, l: 0, r:0, },
					plot_bgcolor: 'rgb(255,255,255)',
					autosize: false,
					width: 100, height: 100,
					displaylogo: false,
					displayModeBar: false,
					showlegend: false,
//			title: this.getTitleS(kindStr, nodeNr)
				};
			} else {
				return {
//				  title: kindStr+' '+typeof(nodeNr)+' '+this.numFields()+' '+this.isClicked(kindStr, nodeNr)+' '+this.getGrid().get(kindStr)?.get(3),
					margin: { pad: 0, b: 0, t: 0, l: 0, r:0, },
					plot_bgcolor: 'rgb(223,223,175)',
					autosize: false,
					width: 100, height: 100,
					displaylogo: false,
					displayModeBar: false,
					showlegend: false,
				}
			}
		},
		gridFieldClick(kind: string, nodeNr_: number) {
			let nodeNr= parseInt(''+nodeNr_);
			console.log('BEF StrokeBundleTile getChartLoreCSMI P ',
						gridPicks.isClicked(nodeNr, kind));
			gridPicks.pickedToggle(nodeNr, kind);
			console.log('AFT StrokeBundleTile getChartLoreCSMI P ',
						gridPicks.isClicked(nodeNr, kind));
		},
		getNode(nodeNr: number) {
			return gridPicks.getNode(nodeNr);
		},
		numNodes() {
			return gridPicks.numNodes;
		},
		getGrid() {
			return gridPicks.show;
		},
		getLoadCode() {
			let takes= useProcLoadTakerStore().loadTake.keys();
			let takeStrs: string[] = [];
			for(let [secs,port] of takes) {
				let takeStr = '['+secs+','+port+']';
				takeStrs.push(takeStr);
			}
			return takeStrs.toString();
		},
		getNr() {
			return this.$route.params.nr;
		},
		isClicked(kind: string, nodeNr_: number): boolean | undefined {
			let nodeNr= parseInt(''+nodeNr_);
			return gridPicks.isClicked(nodeNr, kind);
		},
		isHtmlErrorMessage(responseString: string): number {
			return responseString.indexOf('<');
		},
	},
	data() {
		return {
			accessNodeURL: 'http://127.0.0.1:8080',
			loadLoreTake: null,
//			chartLore: gridPicks.chartLoreFor(this.$props.nr, this.$props.kind),
			toKeep: true,
			closing: false,
			ostTimeStamp: Math.floor(Date.now()/10),
		};
	},
	created() {
		let MEASUREMENT_INTERVAL_MS:number = 3000;
		setInterval(() => {
			// this has to stand here – doesn't work inside a method
			if(this.$props.kind==='cpu'){
				console.log('OST ',this.$props.nr,' ',
							this.$props.kind,' ··············· [',
							gridPicks.getTimestamp,'🕓]');
				let pickedNodeNrs= Array.from(gridPicks.clickGrid.keys());
				let toClose= pickedNodeNrs.includes(this.$props.nr);
				console.log('OST ',this.$props.nr,' ',
							this.$props.kind,' [',
//							this.chartLore[0].y.length,',',
							this.ostTimeStamp,'🕓,',
							toClose,
							']');
				
			}
			
/*
			if(gridPicks.needsUpdate){
				console.log('needsUpdate ···············', gridPicks.needsUpdate,
							' [🕓',gridPicks.getTimestamp,']');
//		        console.log(gridPicks.needsUpdate,
//							': ClickGrid gridPicks.needsUpdate BEF ',
//							this.pickedNodeNrs);
				this.grid = gridPicks.clickGrid;
				this.pickedNodeNrs= Array.from(gridPicks.clickGrid.keys());
				gridPicks.setUpdated();
//		        console.log(gridPicks.needsUpdate,
//							': ClickGrid gridPicks.needsUpdate AFT ',
//							this.pickedNodeNrs);
			}
// */
//			console.log('A ···············', gridPicks.needsUpdate,
//						' [🕓',gridPicks.getTimestamp,']');
		}, MEASUREMENT_INTERVAL_MS);
	},
});
</script>

<template>
  <vs-button v-if='this.toKeep' @click='gridFieldClick(this.$props.kind, this.$props.nr)'>
	<div class='frame' :clicked='isClicked(this.$props.kind, this.$props.nr)'>
	  <VuePlotly :data='this.chartLore'
				 :layout='getLayout(this.$props.kind, this.$props.nr)'
				 config='{"displayModeBar": false}'
				 display-mode-bar='false'/>
<!--
	  <VuePlotly :data='getChartLore(this.$props.kind, this.$props.nr)'
				 :layout='getLayout(this.$props.kind, this.$props.nr)'
				 config='{"displayModeBar": false}'
				 display-mode-bar='false'/>


	  <VuePlotly :data='gridPicks.chartLoreFor(this.$props.nr, this.$props.kind)'
				 :layout='getLayout(this.$props.kind, this.$props.nr)'
				 config='{"displayModeBar": false}'
				 display-mode-bar='false'/>
-->
  </div>
  </vs-button>
</template>

<style>
  div.frame[clicked=true] {
  align: center;
  background-color: #0000df;
  border-color: red;
  border-width: 10px;
  width: 104px; height: 104px;
  };
  div.frame[clicked=false] {
  align: center;
  background-color: #9f9f3f;
  border-color: red;
  border-width: 10px;
  width: 104px; height: 104px;
  };
  div.frame {
  align: center;
  background-color: #9f9f3f;
  border-color: red;
  border-width: 10px;
  width: 104px; height: 104px;
  };
</style>
