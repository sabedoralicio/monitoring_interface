<script lang='ts'>
import { defineComponent } from 'vue';
import LightLabel from '@/vue-svg/LightLabel.vue';

export default defineComponent({
	name: 'StagedDeployment',
	props: {
        backend: {
            type: Number,
            required: true,
        },
        system: {
            type: Number,
            required: true,
        },
        config: {
            type: Number,
            required: true,
        },
        single_node: {
            type: Number,
            required: true,
        },
        schedule: {
            type: Number,
            required: true,
        },
        MPI: {
            type: Number,
            required: true,
        },
        application: {
            type: Number,
            required: true,
        },
        steering: {
            type: Number,
            required: true,
        },
    },
	components: {
		LightLabel,
	},
	methods: {
		getColor(color: string){
			if(color=='2'){
				return '#00ff7f';
			} else if(color=='1') {
				return '#ff7f00';
			} else {
				return '#3f3f3f';
			}
		}
	},
});
</script>

<template>
<svg width='42mm' height='54mm' viewBox='0 0 42 54'
   version='1.1'
   id='svg5'
   xmlns='http://www.w3.org/2000/svg'
   xmlns:svg='http://www.w3.org/2000/svg'>
  <g id='layer1'>
      <rect class='StagedDeployment' id='button'
         width='42.0' height='54.0'
			x='0.0' y='0.0' />
      <LightLabel :light='getColor(this.$props.steering)'
			 m_hori='5' m_vert='6' width='27' writing='Steering'/>
      <LightLabel :light='getColor(this.$props.application)'
			 m_hori='5' m_vert='12' width='27' writing='Application'/>
      <LightLabel :light='getColor(this.$props.MPI)'
			 m_hori='5' m_vert='18' width='27' writing='MPI'/>
      <LightLabel :light='getColor(this.$props.schedule)'
			 m_hori='5' m_vert='24' width='27' writing='Schedule'/>
      <LightLabel :light='getColor(this.$props.single_node)'
			 m_hori='5' m_vert='30' width='27' writing='Single Node'/>
      <LightLabel :light='getColor(this.$props.config)'
			 m_hori='5' m_vert='36' width='27' writing='Config'/>
      <LightLabel :light='getColor(this.$props.system)'
			 m_hori='5' m_vert='42' width='27' writing='System'/>
      <LightLabel :light='getColor(this.$props.backend)'
			 m_hori='5' m_vert='48' width='27' writing='Back-end'/>
  </g>
</svg>
</template>

<style>
  rect.StagedDeployment {
  fill:#9f9f9f;
  fill-rule:evenodd;
  stroke-width:0.25;
  }
</style>
