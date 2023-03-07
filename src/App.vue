<script lang='ts'>
import { defineComponent } from 'vue';
import MonitoringInterface from '@/views/MonitoringInterface.vue';
import { loadTaking, runLoop } from '@/store/feed';

export default defineComponent({
	name: 'App',
	components: {
		MonitoringInterface,
	},
	/** Init code, being run once at beginning:
     */
	created() {
		loadTaking(); // first load taking
		runLoop();
	},
});
</script>

<template>
  <v-app>
    <v-main>
      <MonitoringInterface />
    </v-main>
  </v-app>
</template>
