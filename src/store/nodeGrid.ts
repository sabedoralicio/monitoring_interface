/** Modeling of a grid of hardware nodes, i.e. the choice of stream of lore
 *  to be shown in the click grid view.
 *  TODO: Flexibility up to 2^17 hardware nodes
 *  TODO: Updates here require Ctrl R to refresh
 */
import { defineStore } from 'pinia';
import { NodeLore,
		 with20x2_4, with24x2_0, with64x2_0, with64x2_1, with64x2_4,
		 withJuwelsAccelerated, withJusufAccelerated, withJuwelsLargeMem,
		 withJurecaLargeMem, withJusufStd, withJurecaAccelerated,
		 withJusuf, withJurecaStd, withJureca, withJuwelsStd, withJuwels,
		 withN } from '@/store/nodeGridExample';
import { range } from '@/ts/Util';

export const nodeAssocIds: string[] =
	['20x2_4','24x2_0','64x2_0','64x2_1','64x2_4',
	 'JuwelsAccelerated','JusufAccelerated',
	 'JuwelsLargeMem','JurecaLargeMem',
	 'JusufStd','JurecaAccelerated','Jusuf',
	 'JurecaStd','Jureca','JuwelsStd','Juwels'];

export
type NodeField = [string, number];

const nodeAssocs: [number,Array<[number,NodeLore]>] =
	nodeAssocsFor('20x2_4');
//	nodeAssocsFor('64x2_4');

/**
 * 
 */
function nodeAssocsFor(id:string): [number,Array<[number,NodeLore]>] {
	if(id === '20x2_4') return with20x2_4('', 0, []);
	else if(id === '24x2_0') return with24x2_0('', 0, []);
	else if(id === '64x2_0') return with64x2_0('', 0, []);
	else if(id === '64x2_1') return with64x2_1('', 0, []);
	else if(id === '64x2_4') return with64x2_4('', 0, []);
	else if(id === 'JuwelsAccelerated') return withJuwelsAccelerated('', 0, []);
	else if(id === 'JusufAccelerated') return withJusufAccelerated('', 0, []);
	else if(id === 'JuwelsLargeMem') return withJuwelsLargeMem('', 0, []);
	else if(id === 'JurecaLargeMem') return withJurecaLargeMem('', 0, []);
	else if(id === 'JusufStd') return withJusufStd('', 0, []);
	else if(id === 'JurecaAccelerated') return withJurecaAccelerated('', 0, []);
	else if(id === 'Jusuf') return withJusuf('', 0, []);
	else if(id === 'JurecaStd') return withJurecaStd('', 0, []);
	else if(id === 'Jureca') return withJureca('', 0, []);
	else if(id === 'JuwelsStd') return withJuwelsStd('', 0, []);
	else if(id === 'Juwels') return withJuwels('', 0, []);
	else return withN(18, '', 0, []);
}

/**
 * + square kind, whether 7x7 instead of 5x5
 * + size unit exponent, by 2
 * + whether extra large
 */
function settingByNodeCount(nodeCount:number): [boolean,number,boolean] {
	if(nodeCount > 70656){
		return [false,0,true];
	} else if(nodeCount > 32768){
		return [true,0,true];
	} else if(nodeCount > 17664){
		return [false,0,false];
	} else if(nodeCount > 8192){
		return [true,0,false];
	} else if(nodeCount > 4416){
		return [false,1,false];
	} else if(nodeCount > 2048){
		return [true,1,false];
	} else if(nodeCount > 1104){
		return [false,2,false];
	} else if(nodeCount > 512){
		return [true,2,false];
	} else if(nodeCount > 276){
		return [false,3,false];
	} else if(nodeCount > 128){
		return [true,3,false];
	} else if(nodeCount > 72){
		return [false,4,false];
	} else if(nodeCount > 32){
		return [true,4,false];
	} else if(nodeCount > 18){
		return [false,5,false];
	} else if(nodeCount > 8){
		return [true,5,false];
	} else if(nodeCount > 4){
		return [false,6,false];
	} else if(nodeCount > 2){
		return [true,6,false];
	} else if(nodeCount > 1){
		return [false,7,false];
	} else {
		return [true,7,false];
	} 
}

type PickedLore = [number, string]


/** 1st level view selection, overall node metrics only.
 */
export
const useGridNodeClickStore = defineStore('gridNodeClick', {
	state: () => ({
		/** Guidance for choice of representation:
         */
		nodeSetting: settingByNodeCount(nodeAssocs[0]),
		/** Whether dependent components need to be updated:
         */
		toUpdate: true,
		/** Simply node count:
         */
		nodeCount: nodeAssocs[0],
		/** Core representation:
         */
		nodeClickGrid: new Map<number,NodeLore>(nodeAssocs[1]),
	}),
	getters: {
		/** Whether 7x7 tiles are to use:
         */
		with7x7Tiles(state) {
			return () => { return state.nodeSetting[0]; }
		},
		/** Tile size unit on basis 2:
         */
		sizeUnitExponent(state) {
			return () => { return state.nodeSetting[1]; }
		},
		/** Whether big size is needed:
         */
		needsBig(state) {
			return () => { return state.nodeSetting[2]; }
		},
		/** Reading of a node click state:
         */
		isPicked(state) {
			return (nodeNr: number) => {
				let res = state.nodeClickGrid.get(nodeNr);
				if(res != null){
					return res[0];
				} else {
					return undefined;
				}
			}
		},
		/** Reading of load in percent:
         */
		getLoadPercent(state) {
			return (nodeNr: number) => {
				let res = state.nodeClickGrid.get(nodeNr);
				if(res != null){
					return res[1];
				} else {
					return undefined;
				}
			}
		},
		/** Reading of node label:
         */
		getLabel(state) {
			return (nodeNr: number) => {
				let res = state.nodeClickGrid.get(nodeNr);
				if(res != null){
					return res[2];
				} else {
					return undefined;
				}
			}
		},
		show(state) {
			return state.nodeClickGrid;
		},
		numFields(state) {
			return state.nodeCount;
		},
		needsUpdate(state) {
			return state.toUpdate;
		},
	},
	actions: {
		setNodeClick(nodeNr: number, clickState: boolean) {
			let bef = this.nodeClickGrid.get(nodeNr);
			if(bef != null){
				bef[0]= clickState;
				this.nodeClickGrid.set(nodeNr, bef);
			}
		},
		setUpdated() {
			this.toUpdate = false;
		},
		switchToSite(site:string) {
////            console.log('nodeGrid switchToSite(',site,') BEF ',this.nodeCount);
			let nodeAssocs= nodeAssocsFor(site);
			this.nodeSetting = settingByNodeCount(nodeAssocs[0]);
			this.nodeCount = nodeAssocs[0];
			this.toUpdate = true;
////            console.log('nodeGrid switchToSite(',site,') AFT ',this.nodeCount);
			this.nodeClickGrid = new Map<number,NodeLore>(nodeAssocs[1]);
		},
	},
});
