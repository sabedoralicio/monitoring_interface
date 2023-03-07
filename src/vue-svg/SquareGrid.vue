<script lang='ts'>
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { useGridClickStore } from '@/store/clickGrid';
import { nodeAssocIds, useGridNodeClickStore } from '@/store/nodeGrid';
import { intAs8BitCodedColor, paletteBlueRed } from '@/ts/Palette';
import { div, range } from '@/ts/Util';
// Components
import Square from '@/vue-svg/Square.vue';

const { pickedNrs } = storeToRefs(useGridClickStore());
const gridNodePicks = useGridNodeClickStore();

export default defineComponent({
	name: 'SquareGrid',
	components: {
		Square,
	},
	methods: {
		sizeUnitByPinia(): number {
			let sizeUnitExp = gridNodePicks.sizeUnitExponent();
			return 2**sizeUnitExp;
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
		sizeFactorByPinia(): number {
			let with7x7 = gridNodePicks.with7x7Tiles();
			if(with7x7) return 7;
			else return 5;
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
/*
// */
		nodeNrs(): number[] {
			let nodeCount = gridNodePicks.numFields;
			return range(0, nodeCount-1);
		},
		asBlueToRedColor(nodeNr:number) : string {
			let v = gridNodePicks.getLoadPercent(nodeNr);
			if(v == null){
				return 'rgb(0,0,0)';
			} else {
				//let v = nodeNr / 1.28;
				return paletteBlueRed(v);
			}
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
		intAs8BitCodedColor(v:number) : string {
			let fRG = 36.43; // 0xFF / 7
			let fB = 85.0; // 0xFF / 3
			let r= v%8;
			let g= ((v-r)/8)%8;
			let b= ((v-r-8*g)/64)%4;
			return 'rgb('+Math.round(fRG*r)+','+Math.round(fRG*g)+','+Math.round(fB*b)+')';
		},
/*
		isClicked(nodeNr_: number): boolean | undefined {
			let nodeNr= parseInt(''+nodeNr_);
			return gridNodePicks.isPicked(nodeNr);
		},
		switching(nodeNr_: number) {
			let nodeNr= parseInt(''+nodeNr_);
			let bef= gridNodePicks.isPicked(nodeNr);
			if(bef !== null){
				gridNodePicks.setNodeClick(nodeNr, !bef);
			}
		},
		getColor(color: string){
			if(color==='2'){
				return '#00ff7f';
			} else if(color==='1') {
				return '#ff7f00';
			} else {
				return '#3f3f3f';
			}
		},
// */
        update() {
            console.log('UPDATE SquareGrid');
            useGridNodeClickStore().switchToSite(this.model);
            this.$forceUpdate() ;
		},
		nodeAssocIdsBy(): string[] {
			return nodeAssocIds;
		},
	},
	data() {
		return {
            model: '20x2_4',
		};
	},
});
</script>

<template>
<!--
-->
<!--
  <vs-button @click='switching(this.$props.nodeNr)' v-if='isClicked(this.$props.nodeNr)'>
-->
<!--
<v-icon @click='this.update()'
        start
        icon="mdi-arrow-right"
        ></v-icon>
<v-select label='Model'
		  :value='this.model'
		  v-model='this.model'
		  :items='this.nodeAssocIdsBy()' />
<svg :height='this.heightByPinia()' :width='this.widthByPinia()'
	 :viewBox='this.viewboxByPinia()'
	 version='1.1' id='SquareGrid'
	 xmlns='http://www.w3.org/2000/svg'
	 xmlns:svg='http://www.w3.org/2000/svg'>
  <rect style='fill:#7F7F7F' id='squaresBg' class='squaresBg'
	    :height='this.heightByPinia()' :width='this.widthByPinia()'
		x='0' y='0' />
-->
<!--
  <Square v-for='nodeNr in this.nodeNrs()'
-->
  <Square v-for='nodeNr in [0]'
		  :color='this.asBlueToRedColor(nodeNr)'
		  :x='this.sizeFactorByPinia()*this.sizeUnitByPinia()*(nodeNr%this.colCountByPinia())'
		  :y='this.sizeFactorByPinia()*this.sizeUnitByPinia()*Math.floor(nodeNr/this.colCountByPinia())'
		  :sizeUnit='this.sizeUnitByPinia()'
		  :squareId='nodeNr' picked='false' :writing='this.label(nodeNr)+": "+this.load(nodeNr)+"%"'/>
<!--
</svg>
		  :squareId='nodeNr' picked='false' :writing='this.colCount+": "+this.colCountByPinia()+"%"'/>
<v-tooltip activator="parent" location="bottom">Node #{{
        this.$props.nodeNr
      }}<br>{{intAs8BitCodedColor(this.$props.nodeNr)}}<br>{{isClicked(this.$props.nodeNr)}}</v-tooltip>
-->
<!-- {{getColor2(this.$props.nodeNr)}} -->
<!--
<div @click='switching(this.$props.nodeNr)' v-if='!isClicked(this.$props.nodeNr)'>·</div>
-->
</template>

<style>
rect.NodeDot {
	fill:#9f9f9f;
	fill-rule:evenodd;
	stroke-width:0.25;
}
</style>
