<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Light',
    props: {
        lightId: {
            type: String,
            required: true,
        },
        color: {
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
        rad: {
            type: Number,
            required: true,
        },
        writing: {
            type: String,
            required: true,
        },
    },
	methods: {
		idBy(prefix:string, lightId:string){
			return prefix+lightId;
		},
		viewboxByWidth(width:number):string {
			return '0 0 '+width+' 5';
		},
		popup(evt:MouseEvent, width:number, writing:string, lightId:string){
			let light= document.getElementById(this.idBy("light_",lightId));
			let tooltipO= document.getElementById(this.idBy("tooltipO_",lightId));
			let rrO= document.getElementById(this.idBy("tooltipRect_",lightId));
			let ttO= document.getElementById(this.idBy("tooltipText_",lightId));
			var msg:string= '';
			let shrift= new Text(writing);
			if(light !== null && tooltipO !== null && rrO !== null && ttO !== null) {
				ttO.replaceChild(shrift, ttO.childNodes[0]);
				ttO.setAttribute('style','font-size:2.5px;stroke-width:0.25;stroke:#000000');
				tooltipO.setAttribute('x',''+(0.265*(evt.pageX)-width*0.5+2.5));
				tooltipO.setAttribute('y',''+(0.265*(evt.pageY)-20-2.5));
				tooltipO.setAttribute('width',''+width);
				tooltipO.setAttribute('viewBox','0 0 '+width+' 5');
				rrO.setAttribute('width',''+width);
				tooltipO.setAttribute('style','visibility:inherit');
				light.appendChild(tooltipO);
			}
		},
		popdown(evt:MouseEvent, lightId:string){
			let tooltipO= document.getElementById(this.idBy("tooltipO_",lightId));
			if(tooltipO !== null) {
				tooltipO.setAttribute('style','visibility:hidden');
			}
		},
		getStyle(color: string){
			return 'fill: '+color;
		}
	},
});
</script>

<template>
<g :id='idBy("light_",this.$props.lightId)'
   @mousemove='popup($event, 17, this.$props.writing, this.$props.lightId)'
   @mouseout='popdown($event, this.$props.lightId)' >
<ellipse :style='getStyle(this.$props.color)'
         id='red_light' class='Light'
         :cx='this.$props.m_hori' :cy='this.$props.m_vert'
         :rx='this.$props.rad' :ry='this.$props.rad' />
  <symbol :id='idBy("tooltip_",this.$props.lightId)' height='5' 
		  :viewBox='viewboxByWidth(17)'>
	<rect :id='idBy("tooltipRect_",this.$props.lightId)'
		  height='5' width='1' rx='1' ry='1' />
	<text :id='idBy("tooltipText_",this.$props.lightId)' class='tooltip' x='1.5' y='3.5'
		  style='font-size:2.5px;stroke-width:0.25;stroke:#000000'>@ABCD</text>
  </symbol>
  <use :id='idBy("tooltipO_",this.$props.lightId)'
	   :href='idBy("#tooltip_",this.$props.lightId)' x='5' y='5' width='0' 
	   opacity='0.7' fill='yellow' style='visibility:hidden' />
<!--
-->
</g>
</template>

<style>
  ellipse.Light {
  fill-rule: evenodd;
  stroke-width: 0.25;
  }
</style>
