<script lang='ts'>
import { defineComponent, getCurrentInstance } from 'vue';
import { useCounterStore } from '@/store/index';
import { useGridClickStore } from '@/store/clickGrid';
import { useGridNodeClickStore } from '@/store/nodeGrid';
import { paletteBlueRed } from '@/ts/Palette';
import { storeToRefs } from 'pinia';
// Components
import OneStrokeTile from '@/views/OneStrokeTile.vue';

//const { pickedNrs } = storeToRefs(useGridClickStore());
const gridPicks = useGridClickStore();

export default defineComponent({
	name: 'ClickGrid',
	components: {
		OneStrokeTile,
	},
	methods: {
		asBlueToRedColor(nodeNr:number) : string {
			let v = gridPicks.getLoadPercentPicked(nodeNr);
			if(v == null){
				return 'background-color:rgb(255,255,255)';
			} else {
				//let v = nodeNr / 1.28;
				return 'background-color:'+paletteBlueRed(v);
			}
		},
		getCounter() {
			return useCounterStore().count;
		},
		reload() {
			this.$forceUpdate();
		},
		getGrid() {
			// CAUTION: called at every refresh
			return gridPicks.show;
		},
		numFields() {
			return gridPicks.numNodes;
		},
		isClicked(kind: string, nodeNr: number): boolean | undefined {
			return gridPicks.isClicked(nodeNr, kind);
		},
		getNode(nodeNr: number) {
			return gridPicks.getNode(nodeNr);
		},
		getLabel(nodeNr: number) {
			return gridPicks.getLabel(nodeNr);
		},
		getLoadPerc(nodeNr: number) {
			let p= gridPicks.getLoadPercentPicked(nodeNr);
			if(p != null) return Math.round(p);
			else return 0;
		},
		nodeNrsPicked() {
		    //console.log('@@@ ClickGrid nodeNrsPicked ',Array.from(gridPicks.clickGrid.keys()));
			return Array.from(gridPicks.clickGrid.keys());
		},
		gridClick(kind: string, nodeNr_: number) {
			let nodeNr= parseInt(''+nodeNr_);
			gridPicks.pickedToggle(nodeNr, kind);
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
	},
	data() {
		return {
			render: true,
			kinds: [{id:'cpu', name:'CPU Load'},
					{id:'mem', name:'Mem Load'},
					{id:'mpibuf', name:'MPI Buffer'},
					{id:'spikes', name:'Spikes/Process'}],
			nodeNrs: gridPicks.clickGrid.keys(),
			counter: useCounterStore().count,
			cgTimeStamp: Math.floor(Date.now()/10),
			pickedNodeNrs: new Array(),
			grid: new Map() // .get(['cpu',0]),
		};
	},
	created() {
		let MEASUREMENT_INTERVAL_MS:number = 300;
		setInterval(() => {
			// this has to stand here – doesn't work inside a method
//			console.log('B ···············', gridPicks.needsUpdate,
//						' [🕓',gridPicks.getTimestamp,']');
			if(gridPicks.needsUpdate){
				console.log('needsUpdate ···············', gridPicks.needsUpdate,
							' [🕓',gridPicks.getTimestamp,']');
// /*
		        console.log(gridPicks.needsUpdate,
							'=== ClickGrid gridPicks.needsUpdate BEF ',
							Array.from(this.pickedNodeNrs),
							' cg::🕓',this.cgTimeStamp);
// */
				this.grid = gridPicks.clickGrid;
				this.pickedNodeNrs= Array.from(gridPicks.clickGrid.keys());
				gridPicks.setUpdated();
// /*
		        console.log(gridPicks.needsUpdate,
							'=== ClickGrid gridPicks.needsUpdate AFT ',
							Array.from(this.pickedNodeNrs),
							' cg::🕓',this.cgTimeStamp);
// */
			}
//			console.log('A ···············', gridPicks.needsUpdate,
//						' [🕓',gridPicks.getTimestamp,']');
		}, MEASUREMENT_INTERVAL_MS);
	},
});
</script>

<template>
	<v-table :fixed-header='true' width='650' height='456'>
      <thead>
        <tr>
		  <th class='text-left' bgcolor='#cccccc' width='20'>Job</th>
<!--
          <th  v-for='kindLore in ["CPU Load","Mem Load","MPI Buffer","Spikes/Process"]'
			   class='text-left' bgcolor='#cccccc' width='130'>{{kindLore}}</th>
-->
    <th class='text-left' bgcolor='#cccccc' width='130'>CPU Load</th>
    <th class='text-left' bgcolor='#cccccc' width='130'>Mem Load</th>
    <th class='text-left' bgcolor='#cccccc' width='130'>MPI Buffer</th>
    <th class='text-left' bgcolor='#cccccc'>Spikes/Process</th>
  </tr>
      </thead>
      <tbody>
        <tr v-for='nodeNr in this.pickedNodeNrs' :key='nodeNr'>
          <th :style='this.asBlueToRedColor(nodeNr)' width='134'>{{ nodeNr }}
			<br/>{{ this.getLabel(nodeNr) }}
			<br/>{{ this.getLoadPerc(nodeNr) }}
<!--
			<br/>{{ this.pickedNodeNrs }} {{ this.pickedNodeNrs.includes(nodeNr) }}
-->
		  </th>
          <td v-for='kind in kinds' :key='kind'>
			<span v-if='this.pickedNodeNrs.includes(nodeNr)'>
			  <OneStrokeTile :nr='nodeNr' :kind='kind.id'/>
			</span>
		  </td>
        </tr>
      </tbody>

    </v-table>
    
</template>
