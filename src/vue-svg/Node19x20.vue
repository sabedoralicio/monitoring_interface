<script lang='ts'>
import { defineComponent } from 'vue';
import Light from '@/vue-svg/Light.vue';
import LoadOf5_15x2 from '@/vue-svg/LoadOf5_15x2.vue';

export default defineComponent({
	name: 'Node19x20',
	props: {
        nodeId: {
            type: Number,
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
		LoadOf5_15x2,
	},
	methods: {
		idBy(prefix:string, loadOf5Id:string){
			return prefix+loadOf5Id;
		},
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
<g id='node19x20'>
      <rect class='Node19x20' id='node'
			width='19.0' height='20.0' rx='2' ry='2'
			:x='translate(-9.5,this.$props.m_hori)'
			:y='translate(-10.0,this.$props.m_vert)' />
  <text xml:space='preserve' id='label'>
	<tspan id='tspan2422' class='Node19x20'
	  :x='translate(-8.0,this.$props.m_hori)'
	  :y='translate(-6.0,this.$props.m_vert)'
		   >{{ this.$props.writing }}</tspan></text>
      <Light :color='getColor(this.$props.heart_beat)'
			 :lightId='idBy("lightHeartBeat_",this.$props.nodeId)'
			 :m_hori='translate(-5.0,this.$props.m_hori)'
			 :m_vert='translate(-2.5,this.$props.m_vert)'
			 rad='2.5' writing='Heart Beat' />
      <Light :color='getColor(this.$props.model_active)'
			 :lightId='idBy("lightModelActive_",this.$props.nodeId)'
			 :m_hori='translate(4.0,this.$props.m_hori)'
			 :m_vert='translate(-2.5,this.$props.m_vert)'
			 rad='2.5' writing='Model Active' />
	  <LoadOf5_15x2 :load='this.$props.CPU'
					:loadOf5Id='idBy("loadOf5CPU_",this.$props.nodeId)'
					:left='translate(-8.5,this.$props.m_hori)'
					:upper='translate(-3.5,this.$props.m_vert)'
					writing='CPU' />
	  <LoadOf5_15x2 :load='this.$props.mem'
					:loadOf5Id='idBy("loadOf5Mem_",this.$props.nodeId)'
					:left='translate(-8.5,this.$props.m_hori)'
					:upper='translate(1.0,this.$props.m_vert)'
					writing='Mem' />
</g>
</template>

<style>
  rect.Node19x20 {
  fill:#9f9f9f;
  fill-rule:evenodd;
  stroke-width:0.25;
  }
  tspan.Node19x20 {
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
