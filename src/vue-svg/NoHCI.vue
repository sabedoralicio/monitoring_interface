<script lang='ts'>
import { defineComponent } from 'vue';
import HelpButton from '@/vue-svg/HelpButton.vue';
import Light from '@/vue-svg/Light.vue';

export default defineComponent({
	name: 'NoHCI',
	props: {
        is_green: {
            type: Boolean,
            required: true,
        },
    },
	components: {
		HelpButton,
		Light,
	},
	methods: {
		getGreen(isGreen: string){
			if(isGreen=='true'){
				return '#00ff00';
			} else {
				return '#3f3f3f';
			}
		},
		getRed(isGreen: string){
			if(isGreen=='true'){
				return '#3f3f3f';
			} else {
				return '#ff0000';
			}
		}
	},
});
</script>

<template>
<svg width='24mm' height='74mm' viewBox='0 0 24 74'
   version='1.1'
   id='svg5'
   xmlns='http://www.w3.org/2000/svg'
   xmlns:svg='http://www.w3.org/2000/svg'>
  <g id='layer1'>
      <rect class='NoHCI' id='button'
         width='24.0' height='74.0'
			x='0.0' y='0.0' />
      <Light :color='getRed(this.$props.is_green)'
			 m_hori='12' m_vert='12' rad='10'/>
      <Light :color='getGreen(this.$props.is_green)'
			 m_hori='12' m_vert='37' rad='10'/>
	  <HelpButton left='2' upper='52'/>
  </g>
</svg>
</template>

<style>
  rect.NoHCI {
  fill:#9f9f9f;
  fill-rule:evenodd;
  stroke-width:0.25;
  }
</style>
