<script lang='ts'>
import { defineComponent } from 'vue';
import LightLabel from '@/vue-svg/LightLabel.vue';
import LoadOf5 from '@/vue-svg/LoadOf5.vue';

export default defineComponent({
	name: 'Node33x33',
	props: {
        m_hori: {
            type: Number,
            required: true,
        },
        m_vert: {
            type: Number,
            required: true,
        },
        CPU: {
            type: Number,
            required: true,
        },
        mem: {
            type: Number,
            required: true,
        },
        heart_beat: {
            type: Boolean,
            required: true,
        },
        model_active: {
            type: Boolean,
            required: true,
        },
        writing: {
            type: String,
            required: true,
        },
    },
	components: {
		LightLabel,
		LoadOf5,
	},
	methods: {
		translate(d: number, c:string){
			return parseFloat(c) + d;
		},
		atLeast(t: number, c:string){
			if(parseInt(c) >= t){
				return 'true';
			} else {
				return 'false';
			}
		},
		getColor(state: string){
			if(state=='true'){
				return '#00ff7f';
			} else {
				return '#3f3f3f';
			}
		}
	},
});
</script>

<template>
<g id='layer1'>
      <rect class='Node33x33' id='node'
			width='33.0' height='33' rx='3' ry='3'
			:x='translate(-16.5,this.$props.m_hori)'
			:y='translate(-16.5,this.$props.m_vert)' />
  <text xml:space='preserve' id='label'>
	<tspan id='tspan2422' class='Node33x33'
	  :x='translate(-15.0,this.$props.m_hori)'
	  :y='translate(-12.5,this.$props.m_vert)'
		   >{{ this.$props.writing }}</tspan></text>
      <LightLabel :light='getColor(this.$props.heart_beat)'
				  :m_hori='translate(-13.5,this.$props.m_hori)'
				  :m_vert='translate(-9.0,this.$props.m_vert)'
				  width='26' writing='Heart beat'/>
      <LightLabel :light='getColor(this.$props.model_active)'
				  :m_hori='translate(-13.5,this.$props.m_hori)'
				  :m_vert='translate(-3.5,this.$props.m_vert)'
				  width='26' writing='Model active'/>
	  <LoadOf5 :load='this.$props.CPU'
			   :left='translate(-14.5,this.$props.m_hori)'
			   :upper='translate(-0.5,this.$props.m_vert)'
			   writing='CPU'/>
	  <LoadOf5 :load='this.$props.mem'
			   :left='translate(2.5,this.$props.m_hori)'
			   :upper='translate(-0.5,this.$props.m_vert)'
			   writing='mem'/>
<!--	 
-->
</g>
</template>

<style>
  rect.Node33x33 {
  fill:#9f9f9f;
  fill-rule:evenodd;
  stroke-width:0.25;
  }
  tspan.Node33x33{
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
