<script lang='ts'>
import { defineComponent } from 'vue';
import Light from '@/vue-svg/Light.vue';
import LoadOf5NEW from '@/vue-svg/LoadOf5NEW.vue';

export default defineComponent({
	name: 'NodeNEW',
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
		Light,
		LoadOf5NEW,
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
      <rect class='NodeNEW' id='node'
			width='19.0' height='20.0' rx='2' ry='2'
			:x='translate(-16.5,this.$props.m_hori)'
			:y='translate(-16.5,this.$props.m_vert)' />
  <text xml:space='preserve' id='label'>
	<tspan id='tspan2422' class='NodeNEW'
	  :x='translate(-15.0,this.$props.m_hori)'
	  :y='translate(-12.5,this.$props.m_vert)'
		   >{{ this.$props.writing }}</tspan></text>
      <Light :color='getColor(this.$props.heart_beat)'
			 :m_hori='translate(-12.0,this.$props.m_hori)'
			 :m_vert='translate(-9.0,this.$props.m_vert)'
			 rad='2.5'/>
      <Light :color='getColor(this.$props.model_active)'
			 :m_hori='translate(-3.0,this.$props.m_hori)'
			 :m_vert='translate(-9.0,this.$props.m_vert)'
			 rad='2.5'/>
	  <LoadOf5NEW :load='this.$props.CPU'
			   :left='translate(-15.5,this.$props.m_hori)'
			   :upper='translate(-9.5,this.$props.m_vert)'
			   writing='CPU'/>
	  <LoadOf5NEW :load='this.$props.mem'
			   :left='translate(-15.5,this.$props.m_hori)'
			   :upper='translate(-5.5,this.$props.m_vert)'
			   writing='mem'/>
<!--	 
-->
</g>
</template>

<style>
  rect.NodeNEW {
  fill:#9f9f9f;
  fill-rule:evenodd;
  stroke-width:0.25;
  }
  tspan.NodeNEW{
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
