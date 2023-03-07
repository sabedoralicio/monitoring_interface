<script lang='ts'>
import { defineComponent } from 'vue';
import Light from '@/vue-svg/Light.vue';

export default defineComponent({
	name: 'LightLabel',
	props: {
        light: {
            type: String,
            required: true,
        },
        m_hori: {
            type: Number,
            required: true,
        },
        m_vert: {
            type: Number,
            required: true,
        },
        width: {
            type: Number,
            required: true,
        },
        writing: {
            type: String,
            required: true,
        },
    },
	components: {
		Light,
	},
	methods: {
		getLabelLeft(left: string){
			return parseFloat(left) + 3.0;
		},
		getLabelUpper(upper: string){
			return parseFloat(upper) - 2.5;
		},
		getWritingLeft(left: string){
			return parseFloat(left) + 4.0;
		},
		getWritingUpper(upper: string){
			return parseFloat(upper) + 1.3;
		}
	},
});
</script>

<template>
<g id='LightLabel'>
      <Light :color='this.$props.light'
			 :m_hori='this.$props.m_hori'
			 :m_vert='this.$props.m_vert'
			 rad='2.5'/>
      <rect class='LightLabel' id='label'
			:width='this.$props.width' height='5.0'
			:x='getLabelLeft(this.$props.m_hori)'
			:y='getLabelUpper(this.$props.m_vert)' />
  <text xml:space='preserve' id='label'>
	<tspan id='tspan2422' class='LightLabel'
	  :x='getWritingLeft(this.$props.m_hori)'
	  :y='getWritingUpper(this.$props.m_vert)'
	  >{{ this.$props.writing }}</tspan></text>
</g>
</template>

<style>
  rect.LightLabel {
  fill:#bfbfbf;
  fill-rule:evenodd;
  stroke-width:0.25;
  }
  tspan.LightLabel {
  font-style: normal;
  font-variant: normal;
  font-weight: bold;
  font-stretch: normal;
  font-size: 4.0px;
  font-family: sans-serif;
  -inkscape-font-specification: 'sans-serif Bold';
  fill: #000000;
  stroke-width: 0.25;
  }
</style>
