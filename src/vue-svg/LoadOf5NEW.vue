<script lang='ts'>
import { defineComponent } from 'vue';
import GreenSlab from '@/vue-svg/GreenSlab.vue';
import RedSlab from '@/vue-svg/RedSlab.vue';
import YellowSlab from '@/vue-svg/YellowSlab.vue';

export default defineComponent({
	name: 'LoadOf5NEW',
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
  <GreenSlab :isOn='atLeast(1,this.$props.load)'
			 :left='translate(1.0,this.$props.left)'
			 :upper='translate(5.0,this.$props.upper)'
			 width='3' height='2'/>
  <GreenSlab :isOn='atLeast(2,this.$props.load)'
			 :left='translate(4.0,this.$props.left)'
			 :upper='translate(5.0,this.$props.upper)'
			 width='3' height='2'/>
  <GreenSlab :isOn='atLeast(3,this.$props.load)'
			 :left='translate(7.0,this.$props.left)'
			 :upper='translate(5.0,this.$props.upper)'
			 width='3' height='2'/>
  <YellowSlab :isOn='atLeast(4,this.$props.load)'
			  :left='translate(10.0,this.$props.left)'
			  :upper='translate(5.0,this.$props.upper)'
			  width='3' height='2'/>
  <RedSlab :isOn='atLeast(5,this.$props.load)'
		   :left='translate(13.0,this.$props.left)'
		   :upper='translate(5.0,this.$props.upper)'
		   width='3' height='2'/>
</g>
</template>

<style>
  rect.LoadOf5NEW {
  fill:#bfbfbf;
  fill-rule:evenodd;
  stroke-width:0.25;
  }
  tspan.LoadOf5NEW {
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
