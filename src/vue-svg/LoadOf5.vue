<script lang='ts'>
import { defineComponent } from 'vue';
import GreenSlab from '@/vue-svg/GreenSlab.vue';
import RedSlab from '@/vue-svg/RedSlab.vue';
import YellowSlab from '@/vue-svg/YellowSlab.vue';

export default defineComponent({
	name: 'LoadOf5',
    props: {
        left: {
            type: Number,
            required: true,
        },
        upper: {
            type: Number,
            required: true,
        },
        load: {
            type: Number,
            required: true,
        },
        writing: {
            type: String,
            required: true,
        },
    },
	components: {
		GreenSlab,
		RedSlab,
		YellowSlab,
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
		}
	},
});
</script>

<template>
<g id='layer1'>
      <rect class='LoadOf5' id='load_bg'
            width='12.0' height='16'
			:x='this.$props.left'
			:y='this.$props.upper' />
  <text xml:space='preserve' id='label'>
	<tspan id='tspan2422' class='LoadOf5'
	       :x='translate(1.5,this.$props.left)'
	       :y='translate(4.0,this.$props.upper)'
	  >{{ this.$props.writing }}</tspan></text>
  <RedSlab :isOn='atLeast(5,this.$props.load)'
		   :left='translate(1.5,this.$props.left)'
		   :upper='translate(5.0,this.$props.upper)'
		   width='9' height='2'/>
  <YellowSlab :isOn='atLeast(4,this.$props.load)'
			  :left='translate(1.5,this.$props.left)'
			  :upper='translate(7.0,this.$props.upper)'
			  width='9' height='2'/>
  <GreenSlab :isOn='atLeast(3,this.$props.load)'
			 :left='translate(1.5,this.$props.left)'
			 :upper='translate(9.0,this.$props.upper)'
			 width='9' height='2'/>
  <GreenSlab :isOn='atLeast(2,this.$props.load)'
			 :left='translate(1.5,this.$props.left)'
			 :upper='translate(11.0,this.$props.upper)'
			 width='9' height='2'/>
  <GreenSlab :isOn='atLeast(1,this.$props.load)'
			 :left='translate(1.5,this.$props.left)'
			 :upper='translate(13.0,this.$props.upper)'
			 width='9' height='2'/>
</g>
</template>

<style>
  rect.LoadOf5 {
  fill:#bfbfbf;
  fill-rule:evenodd;
  stroke-width:0.25;
  }
  tspan.LoadOf5 {
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
