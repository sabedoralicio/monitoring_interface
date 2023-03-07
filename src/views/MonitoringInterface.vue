<script lang='ts'>
import Vue from 'vue';
import { defineComponent } from 'vue';
// Components
//import HCI from '@/svg/hci.svg';
import CoreToolbar from '@/components/core/CoreToolbar.vue';
import ClickGrid from '@/views/ClickGrid.vue';
import Network from '@/vue-svg/Network.vue';
import NoHCI from '@/vue-svg/NoHCI.vue';
import NodeDot from '@/vue-svg/NodeDot.vue';
import NodeDotGrid from '@/vue-svg/NodeDotGrid.vue';
import SquareGrid from '@/vue-svg/SquareGrid.vue';
import StagedDeployment from '@/vue-svg/StagedDeployment.vue';
import StrokeBundleTile from '@/views/StrokeBundleTile.vue';
import { nodeAssocIds } from '@/store/nodeGrid';
import { useGridClickStore } from '@/store/clickGrid';
import { useGridNodeClickStore } from '@/store/nodeGrid';

export default defineComponent({
	name: 'MonitoringInterface',
	components: {
		CoreToolbar,
		ClickGrid,
		Network,
		NoHCI,
		NodeDot,
		NodeDotGrid,
		SquareGrid,
		StagedDeployment,
		StrokeBundleTile,
	},
	data() {
		return {
			site: 'http://127.0.0.1:8080',
			model: '20x2_4',
		};
	},
	methods: {
		nodeAssocIdsBy(): string[] {
			return nodeAssocIds;
		},
		update() {
            console.log('UPDATE MonitoringInterface');
            useGridClickStore().reset();
            useGridNodeClickStore().switchToSite(this.model);
            this.$forceUpdate();
		},
	},
});
</script>

<template>
<!--  
-->
<core-toolbar />
<br/>

<!-- 
<Network  backend='2'/>
<br/> 
-->
<!--  
<StagedDeployment
  backend='2'
  system='2'
  config='2'
  single_node='2'
  schedule='1'
  MPI='0'
  application='0'
  steering='0'/>
<br/>
-->
<!--  
<NodeDot value='133'/>
-->
<!--  
<v-select @update:value='console.error("INPUT")'
-->
<!--  
<div file='MonitoringInterface'/>
<v-select label='Model' :value='this.model'
		  v-model='this.model'
		  :items='this.nodeAssocIdsBy()' />
<v-btn @click='this.update()' icon color='info'>
    <v-icon>mdi-cached</v-icon>
</v-btn>
<br/><br/>
-->
<SquareGrid />

  <v-content>
	<table>
	  <tr><th width='30'></th><th>
<!--  
-->
		  <ClickGrid/>
	  </th></tr>
	</table>
	<br/>  
<!--  
-->
	<StrokeBundleTile/>
  </v-content>


  
<!-- footer 
-->
<v-footer class='bg-blue-lighten-1'>
  <v-row justify='center' no-gutters>
    <v-btn
      v-for='link in links'
      :key='link'
      color='white'
      variant='text'
      class='mx-2'
      rounded='xl'
      >
      {{ link }}
    </v-btn>
    <v-col class='text-center text-white mt-4' cols='12'>
      {{ new Date().getFullYear() }} —
      <strong>Co-Simulation Monitoring Interface</strong>
    </v-col>
  </v-row>
</v-footer>
</template>
