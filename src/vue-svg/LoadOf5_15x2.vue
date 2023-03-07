<script lang='ts'>
import { defineComponent } from 'vue';
import GreenSlab from '@/vue-svg/GreenSlab.vue';
import RedSlab from '@/vue-svg/RedSlab.vue';
import YellowSlab from '@/vue-svg/YellowSlab.vue';

export default defineComponent({
	name: 'LoadOf5_15x2',
    props: {
        loadOf5Id: {
            type: String,
            required: true,
        },
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
		idBy(prefix:string, loadOf5Id:string){
			return prefix+loadOf5Id;
		},
		viewboxByWidth(width:number):string {
			return '0 0 '+width+' 5';
		},
		popup(evt:MouseEvent, width:number, writing:string, load:number, loadOf5Id:string){
			let loadOf5= document.getElementById(this.idBy("loadOf5_",loadOf5Id));
			let tooltipO= document.getElementById(this.idBy("tooltipO_",loadOf5Id));
			let rrO= document.getElementById(this.idBy("tooltipRect_",loadOf5Id));
			let ttO= document.getElementById(this.idBy("tooltipText_",loadOf5Id));
			var msg:string= '';
			let shrift= new Text(writing+': '+load);
			if(loadOf5 !== null && tooltipO !== null && rrO !== null && ttO !== null) {
				ttO.replaceChild(shrift, ttO.childNodes[0]);
				ttO.setAttribute('style','font-size:2.5px;stroke-width:0.25;stroke:#000000');
				tooltipO.setAttribute('x',''+(0.265*(evt.pageX)-width*0.5+2.5));
				tooltipO.setAttribute('y',''+(0.265*(evt.pageY)-20-2.5));
				tooltipO.setAttribute('width',''+width);
				tooltipO.setAttribute('viewBox','0 0 '+width+' 5');
				rrO.setAttribute('width',''+width);
				tooltipO.setAttribute('style','visibility:inherit');
				loadOf5.appendChild(tooltipO);
			}
		},
		popdown(evt:MouseEvent, loadOf5Id:string){
			let tooltipO= document.getElementById(this.idBy("tooltipO_",loadOf5Id));
			if(tooltipO !== null) {
				tooltipO.setAttribute('style','visibility:hidden');
			}
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
		}
	},
});
</script>

<template>
<g :id='idBy("loadOf5_",this.$props.loadOf5Id)'
   @mousemove='popup($event, 13, this.$props.writing, this.$props.load, this.$props.loadOf5Id)'
   @mouseout='popdown($event, this.$props.loadOf5Id)'
   >
  <GreenSlab :isOn='atLeast(1,this.$props.load)'
			 :left='translate(1.0,this.$props.left)'
			 :upper='translate(5.0,this.$props.upper)'
			 width='3' height='2' />
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
  <symbol :id='idBy("tooltip_",this.$props.loadOf5Id)' height='5' 
		  :viewBox='viewboxByWidth(13)'>
	<rect :id='idBy("tooltipRect_",this.$props.loadOf5Id)'
		  height='5' width='1' rx='1' ry='1' />
	<text :id='idBy("tooltipText_",this.$props.loadOf5Id)' class='tooltip' x='1.5' y='3.5'
		  style='font-size:2.5px;stroke-width:0.25;stroke:#000000'>@ABCD</text>
  </symbol>
  <use :id='idBy("tooltipO_",this.$props.loadOf5Id)'
	   :href='idBy("#tooltip_",this.$props.loadOf5Id)' x='5' y='5' width='0' 
	   opacity='0.7' fill='yellow' style='visibility:hidden' />
<!--
   @click='popup($event, 13, this.$props.writing, this.$props.load, this.$props.loadOf5Id)'
-->
</g>
</template>

<style>
  rect.LoadOf5_15x2 {
  fill:#bfbfbf;
  fill-rule:evenodd;
  stroke-width:0.25;
  }
  tspan.LoadOf5_15x2 {
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
