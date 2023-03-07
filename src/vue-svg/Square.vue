<script lang='ts'>
import { defineComponent } from 'vue';
import { useGridClickStore } from '@/store/clickGrid';
import { nodeAssocIds, useGridNodeClickStore } from '@/store/nodeGrid';
import { paletteBlueRed } from '@/ts/Palette';
import { range } from '@/ts/Util';

const gridNodePicks = useGridNodeClickStore();
const gridPicks = useGridClickStore();

export default defineComponent({
	name: 'Square',
    props: {
        squareId: {
            type: Number,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        x: {
            type: Number,
            required: true,
        },
        y: {
            type: Number,
            required: true,
        },
        sizeUnit: {
            type: Number,
            required: true,
        },
        picked: {
            type: Boolean,
            required: true,
        },
        writing: {
            type: String,
            required: true,
        },
    },
	methods: {
		asBlueToRedColor(nodeNr:number) : string {
			let v = gridNodePicks.getLoadPercent(nodeNr);
			if(v == null){
				return 'rgb(0,0,0)';
			} else {
				//let v = nodeNr / 1.28;
				return paletteBlueRed(v);
			}
		},
		nodeNrs(): number[] {
//			let nodeCount = gridNodePicks.numFields;
			let nodeCount = this.num_fields;
			return range(0, nodeCount-1);
		},
		xByPinia(nodeNr: number): number {
            return this.sizeFactorByPinia()
                 * this.sizeUnitByPinia()
                 * (nodeNr % this.colCountByPinia());
		},
		yByPinia(nodeNr: number): number {
            return this.sizeFactorByPinia()
                 * this.sizeUnitByPinia()
                 * Math.floor(nodeNr/this.colCountByPinia());
		},
		colCountByPinia(): number {
			let sizeUnitExp = gridNodePicks.sizeUnitExponent();
			let with7x7 = gridNodePicks.with7x7Tiles();
			var colCount:number;
			if(with7x7) {
				let sizeUnitExp = gridNodePicks.sizeUnitExponent();
				if(sizeUnitExp < 4) colCount = 2**(3-sizeUnitExp)*23;
				else colCount = 2**(5-sizeUnitExp)*6;
			}
			else colCount = 2**(8-sizeUnitExp);
			let needsBig = gridNodePicks.needsBig();
			if(needsBig) colCount *= 2; 
			return colCount;
		},
		
		sizeUnitByPinia(): number {
			let sizeUnitExp = gridNodePicks.sizeUnitExponent();
			return 2**sizeUnitExp;
		},
		sizeFactorByPinia(): number {
			let with7x7 = gridNodePicks.with7x7Tiles();
			if(with7x7) return 7;
			else return 5;
		},
		reducedSizeFactorByPinia(): number {
			let with7x7 = gridNodePicks.with7x7Tiles();
			if(with7x7) return 5;
			else return 3;
		},
		isPicked(nodeNr_: number): boolean | undefined {
			let nodeNr= parseInt(''+nodeNr_);
			return gridNodePicks.isPicked(nodeNr);
		},
// /*
        switching (nodeNr_: number) {
			let nodeNr= parseInt(''+nodeNr_);
			let bef= gridNodePicks.isPicked(nodeNr);
			if(bef != null){
				if(bef) {
					gridPicks.dropNode(nodeNr);
				} else {
					let value= gridNodePicks.getLoadPercent(nodeNr);
					let label= gridNodePicks.getLabel(nodeNr);
					if(value != null && label != null) {
						gridPicks.addNode(nodeNr, value, label);
					}
				}
				gridNodePicks.setNodeClick(nodeNr, !bef); 
				this.$forceUpdate();
			}
		},
// */
		idBy(prefix:string, squareId:string){
			return prefix+squareId;
		},
		viewboxByWidth(width:number):string {
			return '0 0 '+width+' 10';
		},
		popup(evt:MouseEvent, width:number, writing:string, squareId:string){
			let square= document.getElementById(this.idBy('square_',squareId));
			let tooltipO= document.getElementById('tooltipO_');
			let rrO= document.getElementById('tooltipRect_');
			let ttO= document.getElementById('tooltipText_');
			var msg:string= '';
			let schrift= new Text(writing);
			if(rrO != null && ttO != null) {
				ttO.replaceChild(schrift, ttO.childNodes[0]);
				ttO.setAttribute('style','');
				//rrO.setAttribute('width',''+width);
			}
////			if(square != null && tooltipO != null && rrO != null && ttO != null) {
			if(tooltipO != null) {
				tooltipO.setAttribute('x',''+(1.0*(evt.pageX)-440));
				tooltipO.setAttribute('y',''+(1.0*(evt.pageY)-385));
////				tooltipO.setAttribute('width',''+width);
////				tooltipO.setAttribute('viewBox','0 0 '+width+' 10');
				tooltipO.setAttribute('style','visibility:inherit');
			}
		},
		popdown(evt:MouseEvent, squareId:string){
			let tooltipO= document.getElementById('tooltipO_');
			if(tooltipO != null) {
				tooltipO.setAttribute('style','visibility:hidden');
			}
		},
		getStyle(color: string){
			return 'fill: '+color;
		},
		nodeAssocIdsBy(): string[] {
			return nodeAssocIds;
		},
        gridUpdate() {
            console.log('UPDATE Grid');
            gridPicks.reset();
            gridNodePicks.switchToSite(this.model);
            this.$forceUpdate();
		}, 
		heightByPinia(): number {
			var height:number;
			let with7x7 = gridNodePicks.with7x7Tiles();
			if(with7x7) height = 672;
			else height = 640;
			let needsBig = gridNodePicks.needsBig();
			if(needsBig) height *= 2;
			return height;
		},
		widthByPinia(): number {
			var width:number;
			let with7x7 = gridNodePicks.with7x7Tiles();
			if(with7x7) {
				let sizeUnitExp = gridNodePicks.sizeUnitExponent();
				if(sizeUnitExp < 4) width = 1288;
				else width = 1344;
			}
			else width = 1280;
			let needsBig = gridNodePicks.needsBig();
			if(needsBig) width *= 2;
			return width;
		},
		viewboxByPinia(): string {
			let height= this.heightByPinia();
			let width= this.widthByPinia();
			return '0 0 '+width+' '+height;
		},
		load(nodeNr:number) : number {
			let load = gridNodePicks.getLoadPercent(nodeNr);
			if(load == null){
				return -1;
			} else {
				return Math.round(load);
			}
		},
		label(nodeNr:number) : string {
			let label = gridNodePicks.getLabel(nodeNr);
			if(label == null){
				return '??';
			} else {
				return label;
			}
		},
    },
	data() {
		return {
            model: '20x2_4',
			num_fields: 44,
		};
	},
	created() {
		let MEASUREMENT_INTERVAL_MS:number = 50;
		setInterval(() => {
			// this has to stand here – doesn't work inside a method
			if(gridNodePicks.needsUpdate){
				this.num_fields = gridNodePicks.numFields;
				gridNodePicks.setUpdated();
			}
		}, MEASUREMENT_INTERVAL_MS);
	},
});
</script>

<template>
<v-select label='Model' :value='this.model'
		  v-model='this.model'
		  :items='this.nodeAssocIdsBy()' />
<v-btn @click='this.gridUpdate' icon color='info'>
    <v-icon>mdi-cached</v-icon>
</v-btn>
<br/><br/>

<svg :height='this.heightByPinia()' :width='this.widthByPinia()'
	 :viewBox='this.viewboxByPinia()'
	 version='1.1' id='SquareGrid'
	 xmlns='http://www.w3.org/2000/svg'
	 xmlns:svg='http://www.w3.org/2000/svg'>
  <rect style='fill:#7F7F7F' id='squaresBg' class='squaresBg'
	    :height='this.heightByPinia()' :width='this.widthByPinia()'
		x='0' y='0' />
  <symbol id='tooltip_' height='30' 
		  :viewBox='viewboxByWidth(157)'>
	<rect id='tooltipRect_'  style='fill:rgb(255,255,0)'
		  height='10' width='50' rx='2' ry='2' />
	<text id='tooltipText_' class='tooltip' x='1.5' y='8.5' style='font-size:10px'
		  >??</text>
  </symbol>
<g v-for='nodeNr in this.nodeNrs()'
   @click='switching(nodeNr)'
   :id='idBy("square_",nodeNr)'
   @mousemove='popup($event, 100, this.label(nodeNr)+": "+this.load(nodeNr)+"%", nodeNr)'
   @mouseout='popdown($event, nodeNr)'
   >
<rect v-if='!isPicked(nodeNr)'
	  style='fill:#7f7f7f' id='square' class='square'
	  :height='this.sizeFactorByPinia() * this.sizeUnitByPinia()'
	  :width='this.sizeFactorByPinia() * this.sizeUnitByPinia()'
      :x='this.xByPinia(nodeNr)' :y='this.yByPinia(nodeNr)' />
<rect v-if='isPicked(nodeNr)'
	  :style='getStyle(this.asBlueToRedColor(nodeNr))' id='square' class='square'
	  :height='this.sizeFactorByPinia() * this.sizeUnitByPinia()'
	  :width='this.sizeFactorByPinia() * this.sizeUnitByPinia()'
      :x='this.xByPinia(nodeNr)' :y='this.yByPinia(nodeNr)' />
<rect v-else
	  :style='getStyle(this.asBlueToRedColor(nodeNr))' id='square' class='square'
	  :height='this.reducedSizeFactorByPinia() * this.sizeUnitByPinia()'
	  :width='this.reducedSizeFactorByPinia() * this.sizeUnitByPinia()'
      :x='this.xByPinia(nodeNr) + this.sizeUnitByPinia()'
	  :y='this.yByPinia(nodeNr) + this.sizeUnitByPinia()' />
</g>
<use id='tooltipO_' href='#tooltip_' style='visibility:hidden' />
</svg>
</template>

<style>
  rect.square {
	  fill-rule: evenodd;
	  stroke-width: 0.25;
  };
  text.tooltip {
	  font-size:7px;
	  stroke-width: 0.5;
	  fill:#000000;
	  stroke:#000000;
  };
</style>
