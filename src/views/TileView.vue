<script lang='ts'>
import { defineComponent } from 'vue';

// Components
import OneStrokeTile from '@/views/OneStrokeTile.vue';
import { useCounterStore } from '@/store/index';

export default defineComponent({
	name: 'TileView',
	components: {
		OneStrokeTile,
	},
	methods: {
		getNr() {
			return this.$route.params.nr;
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
			return responseString.indexOf('<');
		},
	},
	data() {
		return {
			counter: useCounterStore().count,
		};
	},
	created() {
		this.upCountEverySecond();
	},
});
</script>

<template>
  TICKS ++{{ getCounter() }}++ ++{{ counter }}++
  <!-- @@{{ getLoadCode() }}@@ -->
  <br/>
  <button @click='loadTaking'>UPCOUNT</button>
  <br/>
  <button @click='stopCount'>STOP</button>
  <br/>
<!--
  <OneStrokeTile :kind='this.$route.params.kind'
				 :nr='this.$route.params.nr'>
  </OneStrokeTile>
-->
</template>
