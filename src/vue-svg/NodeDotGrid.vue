<script lang='ts'>
import { defineComponent } from 'vue';
import { useCounterStore } from '@/store/index';
// Components
import NodeDot from '@/vue-svg/NodeDot.vue';

export default defineComponent({
	name: 'NodeDotGrid',
	components: {
		NodeDot,
	},
	methods: {
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
	},
	data() {
		return {
			colNrs: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
			rowNrs: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
			counter: useCounterStore().count,
		};
	},
});
</script>

<template>
<v-table width='450' height='800'>
	  <th class='text-left' bgcolor='#cccccc'>#</th>
      <th class='text-left' bgcolor='#cccccc' width='1' v-for='colNr in colNrs'>{{colNr.toString(16).toUpperCase()}}</th>
      <tbody>
        <tr v-for='rowNr in rowNrs'>
          <th bgcolor='#cccccc'>{{(rowNr*16).toString(16).toUpperCase()}}</th>
          <td v-for='colNr in colNrs'>
			<NodeDot :nodeNr='(rowNr*16)+colNr' value='2'/>
		  </td>
        </tr>
      </tbody>
    </v-table>
</template>
