/** Modeling of the click grid, i.e. the choice of stream of lore
 *  to be shown in multi stroke view.
 */
import { defineStore } from 'pinia';
import { useProcLoadTakerStore,
		 useMPIBufLoadTakerStore,
		 useSpikeCountLoadTakerStore } from '@/store/load';

const defaultKinds: string[] = ['cpu', 'mem', 'mpibuf', 'spikes'];

export type ClickField = [string, number];
export type Stroke = [number[], number[]];
export type StrokeLore = [boolean, number[], number[]];
export type NodeLore = [number, string, Map<string,StrokeLore>];

const nilNumbers:number[] = []; // [0,1,2,3];

/* Re-Saving after changing something does the refresh on ClickGrid.
 */
export var useGridClickStore = defineStore('gridClick', {
	state: () => ({
		/** Whether dependent components need to be updated:
         */
		toUpdate: true,
		/** :
         */
		timestamp: Math.floor(Date.now()/10),
		/** :
         */
		pickedNrs: nilNumbers,
		/** :
         */
		clickGrid:  new Map<number, NodeLore>([]),
	}),
	getters: {
		/** Reading of a click state:
         */
		isClicked(state) {
			return (nodeNr: number, kind: string) => {
				let y= state.clickGrid.get(nodeNr);
				if(y== null) return false;
				else {
					let z= y[2].get(kind);
					if(z== null) return false;
					else return z[0];
				}
			}
		},
		show(state) {
			return state.clickGrid;
		},
		getTimestamp(state) {
			return state.timestamp;
		},
		getChartLore(state) {
			return (nodeNr: number,kind:string) => {
//		        console.log('@@@ clickGrid.useGridClickStore.getChartLore ',nodeNr,' ',kind);
//		        console.log('@@@ clickGrid.useGridClickStore.getChartLore ',Array.from(state.clickGrid.keys()));
				let nodeLore = state.clickGrid.get(nodeNr);
				if(nodeLore != null) {
					let strokeLore = nodeLore[2].get(kind);
					if(strokeLore != null) return [strokeLore[1],strokeLore[2]];
					else return [[],[]]
				}
				else return [[],[]];
			};
		},
		chartLoreFor(state) {
			return (nodeNr_: number, kindStr: string  ) => {
				let nodeNr= parseInt(''+nodeNr_);
				//console.log('??? OneStrokeTile.getChartLore ',nodeNr_,' ',kindStr);
				//let colorChoice= this.colorAt(kindStr, nodeNr);
				let colorChoice= '#333333';
				//let colorChoice= this.colorAt('mem', 2);
				let [times,values] = this.getChartLore(nodeNr,kindStr);
				console.log('??? clickGrid.chartLoreFor ',nodeNr,' ',kindStr,': ',state.clickGrid.size);
				console.log('??? clickGrid.chartLoreFor ',nodeNr,' ',kindStr,': ',values);
				let path = {
					x: times,
					y: values,
					type:'scatter',
					line: { shape: 'spline', width: 1, color: colorChoice },
					name: 'node '+nodeNr,
				};
				return [path];
			};
		},
		needsUpdate(state) {
			return state.toUpdate;
		},
		numNodes(state) {
			return state.clickGrid.size;
		},
		getNode(state) {
			return (nodeNr: number) => state.clickGrid.get(nodeNr);
		},
		getLabel(state) {
			return (nodeNr: number) => {
				let st = state.clickGrid.get(nodeNr);
				if(st != null) return st[1];
				else return '??';
			}
		},
		/** Reading of load in percent:
         */
		getLoadPercentPicked(state) {
			return (nodeNr: number) => {
				let res = state.clickGrid.get(nodeNr);
				if(res != null){
					return res[0];
				} else {
					return undefined;
				}
			}
		},
		getLoadPerc(state) {
			return (nodeNr: number) => {
				let st = state.clickGrid.get(nodeNr);
				if(st != null) return Math.round(100*st[0]);
				else return 0.0;
			}
		},
	},
	actions: {
		addNode(nodeNr: number, value: number, label: string) {
//            console.log('clickGrid addNode(',nodeNr,') BEF ',this.toUpdate,
//						' [🕓',this.timestamp,']');
//            console.log('clickGrid addNode(',nodeNr,') BEF ',this.needsUpdate,
//						' [🕓',this.getTimestamp,']');
		    this.clickGrid.set(nodeNr,
							   [value, label,
								newStrokeLoreMap(nodeNr)]);
			this.pickedNrs = Array.from(this.clickGrid.keys());
			this.toUpdate = true;
//            console.log('clickGrid addNode(',nodeNr,') AFT',this.toUpdate,
//						' [🕓',this.timestamp,']');
//            console.log('clickGrid addNode(',nodeNr,') AFT',this.needsUpdate,
//						' [🕓',this.getTimestamp,']');
		},
		/** TODO: Does still leave zombie OneStrokeTile component
         */
		dropNode(nodeNr: number) {
            console.log('clickGrid  dropNode(',nodeNr,') ');
		    this.clickGrid.delete(nodeNr);
			this.pickedNrs = Array.from(this.clickGrid.keys());
			console.log('clickGrid dropNode(',nodeNr,') AFT',this.needsUpdate,
						' [🕓',this.getTimestamp,
						'|',this.pickedNrs,
						'|',(Array.from(this.clickGrid.keys())).includes(0),
						']');
			this.toUpdate = true;
		},
		pickedToggle(nodeNr: number, kind: string) {
//            console.log('clickGrid pickedToggle (',nodeNr,',',kind,') BEF ',this.toUpdate);
			let nodeLore= this.clickGrid.get(nodeNr);
			if(nodeLore!= null) {
				var strokeLore= nodeLore[2].get(kind);
				if(strokeLore!= null) {
					strokeLore[0]= !strokeLore[0];
					nodeLore[2].set(kind, strokeLore); 
					this.clickGrid.set(nodeNr, nodeLore);
				}
			}
//            console.log('clickGrid pickedToggle (',nodeNr,',',kind,') AFT ',this.toUpdate);
		},
		setNode(nodeNr: number, map: NodeLore) {
		    this.clickGrid.set(nodeNr, map);
		},
		setUpdated() {
//            console.log('clickGrid setUpdated() BEF',this.toUpdate);
			this.toUpdate = false;
//            console.log('clickGrid setUpdated() AFT',this.toUpdate);
		},
		nodeUpdate(nodeNr:number) {
			let portNr= portNrByNode(nodeNr);
			//console.log('@@@ clickGrid.nodeUpdate ',nodeNr,' > ',portNr);
			let [[timesCPU,valuesCPU],[timesMem,valuesMem]] = newStrokeCPUMem(portNr);
			let [timesMPI,valuesMPI]= newStrokeMPI(portNr);
			let [timesSpikes,valuesSpikes]= newStrokeSpikes(portNr);
			this.strokeUpdate(nodeNr, 'cpu', timesCPU, valuesCPU);
			this.strokeUpdate(nodeNr, 'mem', timesMem, valuesMem);
			this.strokeUpdate(nodeNr, 'mpibuf', timesMPI, valuesMPI);
			this.strokeUpdate(nodeNr, 'spikes', timesSpikes, valuesSpikes);
		},
		reset() {
			console.log('clickGrid setUpdated() BEF ',
						Array.from(this.clickGrid.keys()));
			this.clickGrid = new Map<number, NodeLore>([]);
			this.pickedNrs = nilNumbers;
			this.toUpdate = true;
			console.log('clickGrid setUpdated() AFT ',
						Array.from(this.clickGrid.keys()));
		},
		strokeUpdate(nodeNr:number, kind:string, times:number[], values:number[]) {
			let nodeLore= this.clickGrid.get(nodeNr);
			if(nodeLore!= null) {
				var strokeLore= nodeLore[2].get(kind);
				if(strokeLore!= null) {
					strokeLore[1]= times;
					strokeLore[2]= values;
					nodeLore[2].set(kind, strokeLore); 
					this.clickGrid.set(nodeNr, nodeLore);
				}
			}
		},
		update() {
			//console.log('@@@ clickGrid.update');
			for (let nodeNr of this.clickGrid.keys()) {
				this.nodeUpdate(nodeNr);
			}
		},
	}
});

function newStrokeLoreMap(nodeNr:number): Map<string,StrokeLore> {
	console.log('@@@ clickGrid.newStrokeLoreMap ',nodeNr);
	let portNr= portNrByNode(nodeNr);
	let [[timesCPU,valuesCPU],[timesMem,valuesMem]] = newStrokeCPUMem(portNr);
	let [timesMPI,valuesMPI]= newStrokeMPI(portNr);
	let [timesSpikes,valuesSpikes]= newStrokeSpikes(portNr);
	return new Map<string,StrokeLore>([['cpu',[false,timesCPU,valuesCPU]],
									   ['mem',[false,timesMem,valuesMem]],
									   ['mpibuf',[false,timesMPI,valuesMPI]],
									   ['spikes',[false,timesSpikes,valuesSpikes]]]);
}

function newStrokeCPUMem(portNr:number): [Stroke,Stroke] {
	let entries= Array.from(useProcLoadTakerStore().loadTake.entries()).sort();
	let is_begin: boolean = true;
	let begin_secs: number = 0;
	let times: number[] = [];
	let valuesCPU: number[] = [];
	let valuesMem: number[] = [];
	for (let [[secs,port], [cpu,mem]] of entries) {
		//console.log('A '+[[secs,port], state]+'==='+colorChoice);
		//let value= this.getValue(MeasureKind.MemLoad, values);
		if(is_begin){
			begin_secs= secs;
			is_begin= false;
		}
		if (port===portNr) {
			//console.log([secs-begin_secs, value]);
			times.push(secs-begin_secs);
			valuesCPU.push(cpu);
			valuesMem.push(mem);
		}
	}
	return [[times,valuesCPU],[times,valuesMem]];
}

function newStrokeMPI(portNr:number):Stroke {
	let entries= useMPIBufLoadTakerStore().loadTake.entries();
	let is_begin: boolean = true;
	let begin_secs: number = 0;
	let times: number[] = [];
	let values: number[] = [];
	for (let [[secs,port], value] of entries) {
		//console.log('@@@ clickGrid.newStrokeMPI ',secs,' ',port,' ',value);
		//console.log('A '+[[secs,port], state]+'==='+colorChoice);
		//let value= this.getValue(MeasureKind.MemLoad, values);
		if(is_begin){
			begin_secs= secs;
			is_begin= false;
		}
		if (port===portNr) {
			//console.log([secs-begin_secs, value]);
			times.push(secs-begin_secs); values.push(value);
		}
	}
	//console.log('@@@ clickGrid.newStrokeMPI ',portNr,' ',times,' ',values);
	return [times,values];
}

function newStrokeSpikes(portNr:number):Stroke {
	let entries= useSpikeCountLoadTakerStore().loadTake.entries();
	let is_begin: boolean = true;
	let begin_secs: number = 0;
	let times: number[] = [];
	let values: number[] = [];
	for (let [[secs,port], value] of entries) {
		//console.log('A '+[[secs,port], state]+'==='+colorChoice);
		//let value= this.getValue(MeasureKind.MemLoad, values);
		if(is_begin){
			begin_secs= secs;
			is_begin= false;
		}
		if (port===portNr) {
			//console.log([secs-begin_secs, value]);
			times.push(secs-begin_secs); values.push(value);
		}
	}
	return [times,values];
}

function portNrByNode(nodeNr:number):number {
	return 9000 + nodeNr%16;
}
