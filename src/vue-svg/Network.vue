<script lang='ts'>
import { defineComponent } from 'vue';
import Edge1Color from '@/vue-svg/Edge1Color.vue';
import Node19x20 from '@/vue-svg/Node19x20.vue';

export default defineComponent({
	name: 'Network',
    props: {
        backend: {
            type: Number,
            required: true,
        },
    },
	components: {
		Edge1Color,
		Node19x20,
	},
});
</script>

<template>
<svg width='260mm' height='170mm' viewBox='0 0 260 170'
   version='1.1'
   id='svg5'
   xmlns='http://www.w3.org/2000/svg'
   xmlns:svg='http://www.w3.org/2000/svg'>
  <g id='layer1'>
      <rect class='Network' id='button'
         width='260.0' height='170.0'
			x='0.0' y='0.0' />
	  <Edge1Color edgeId='edgeA' of_hori='18.5' of_vert='18.5' to_hori='241.5' to_vert='18.5'
				  healthyMPI='true' load='20.0' placing='0.5' />
	  <Edge1Color edgeId='edgeB' of_hori='18.5' of_vert='151.5' to_hori='241.5' to_vert='151.5'
				  healthyMPI='true' load='95.0' placing='0.5' />

	  <Edge1Color edgeId='edgeC' of_hori='18.5' of_vert='18.5' to_hori='18.5' to_vert='151.5'
				  healthyMPI='true' load='82.0' placing='0.5' />
	  <Edge1Color edgeId='edgeD' of_hori='241.5' of_vert='18.5' to_hori='241.5' to_vert='151.5'
				  healthyMPI='true' load='40.0' placing='0.5' />

	  <Edge1Color edgeId='edgeE' of_hori='18.5' of_vert='18.5' to_hori='241.5' to_vert='151.5'
				  healthyMPI='true' load='0.0' placing='0.33' />
	  <Edge1Color edgeId='edgeF' of_hori='241.5' of_vert='18.5' to_hori='18.5' to_vert='151.5'
				  healthyMPI='false' load='40.0' placing='0.33' />

	  <Edge1Color edgeId='edgeG' of_hori='18.5' of_vert='18.5' to_hori='130.0' to_vert='51.75'
				  healthyMPI='true' load='70.0' placing='0.5' />
	  <Edge1Color edgeId='edgeH' of_hori='18.5' of_vert='151.5' to_hori='130.0' to_vert='51.75'
				  healthyMPI='true' load='65.0' placing='0.5' />
	  
	  <Edge1Color edgeId='edgeI' of_hori='241.5' of_vert='18.5' to_hori='130.0' to_vert='51.75'
				  healthyMPI='true' load='30.0' placing='0.5' />
	  <Edge1Color edgeId='edgeJ' of_hori='241.5' of_vert='151.5' to_hori='130.0' to_vert='51.75'
				  healthyMPI='true' load='13.0' placing='0.5' />
	  
	  <Node19x20 nodeId='nodeA' m_hori='18.5' m_vert='18.5'
				 CPU='5' mem='2'
				 heart_beat='false' model_active='true'
				 writing='Arbor'/>
	  <Node19x20 nodeId='nodeB' m_hori='241.5' m_vert='18.5'
				 CPU='0' mem='5'
				 heart_beat='false' model_active='true'
				 writing='Insite'/>
	  <Node19x20 nodeId='nodeC' m_hori='18.5' m_vert='151.5'
				 CPU='2' mem='4'
				 heart_beat='true' model_active='false'
				 writing='Nest A'/>
	  <Node19x20 nodeId='nodeD' m_hori='241.5' m_vert='151.5'
				 CPU='3' mem='1'
				 heart_beat='false' model_active='false'
				 writing='Nest B'/>
	  <Node19x20 nodeId='nodeE' m_hori='130.0' m_vert='51.75'
				 CPU='5' mem='3'
				 heart_beat='true' model_active='true'
				 writing='Extern'/>
  </g>
</svg>
</template>

<style>
  rect.Network {
  fill:#dfdfdf;
  fill-rule:evenodd;
  stroke-width:0.25;
  }
</style>
