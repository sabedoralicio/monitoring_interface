<script lang='ts'>
import { defineComponent } from 'vue';
import { useGridNodeClickStore } from '@/store/nodeGrid';
import { intAs8BitCodedColor } from '@/ts/Palette';
// Components
import Light from '@/vue-svg/Light.vue';

export default defineComponent({
	name: 'NodeDot',
    props: {
        nodeNr: {
            type: Number,
            required: true,
        },
        value: {
            type: Number,
            required: true,
        },
    },
	components: {
		Light,
	},
	methods: {
		isPicked(nodeNr_: number): boolean | undefined {
			let nodeNr= parseInt(''+nodeNr_);
			return useGridNodeClickStore().isPicked(nodeNr);
		},
		switching(nodeNr_: number) {
			let nodeNr= parseInt(''+nodeNr_);
			let bef= useGridNodeClickStore().isPicked(nodeNr);
			if(bef !== null){
				useGridNodeClickStore().setNodeClick(nodeNr, !bef);
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
		}
	},
});
</script>

<template>
  <vs-button @click='switching(this.$props.nodeNr)' v-if='isPicked(this.$props.nodeNr)'>
<svg width='20' height='20' viewBox='0 0 6 6'
	 version='1.1' id='svg5'
	 xmlns='http://www.w3.org/2000/svg'
	 xmlns:svg='http://www.w3.org/2000/svg'>
  <Light :color='intAs8BitCodedColor(this.$props.nodeNr)'
		 m_hori='3' m_vert='3' rad='10'/>
</svg><v-tooltip activator="parent" location="bottom">Node #{{
        this.$props.nodeNr
      }}<br>{{intAs8BitCodedColor(this.$props.nodeNr)}}<br>{{isPicked(this.$props.nodeNr)}}</v-tooltip>
<!-- {{getColor2(this.$props.nodeNr)}} -->
</vs-button>
<div @click='switching(this.$props.nodeNr)' v-if='!isPicked(this.$props.nodeNr)'>·</div>
</template>

<style>
rect.NodeDot {
	fill:#9f9f9f;
	fill-rule:evenodd;
	stroke-width:0.25;
}
</style>
