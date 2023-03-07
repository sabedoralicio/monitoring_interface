<script lang='ts'>
import { defineComponent } from 'vue';
import { graytone, paletteBlueRed, paletteMagentaRed } from '@/ts/Palette';

export default defineComponent({
	name: 'Edge1Color',
    props: {
        edgeId: {
            type: String,
            required: true,
        },
        healthyMPI: {
            type: Boolean,
            required: true,
        },
        load: {
            type: Number,
            required: true,
        },
        of_hori: {
            type: Number,
            required: true,
        },
        of_vert: {
            type: Number,
            required: true,
        },
        to_hori: {
            type: Number,
            required: true,
        },
        to_vert: {
            type: Number,
            required: true,
        },
        placing: {
            type: Number,
            required: true,
        },
    },
	methods: {
		idBy(prefix:string, edgeId:string){
			return prefix+edgeId;
		},
		popup(evt:MouseEvent, width:number, healthyMPI:string, load:number, edgeId:string){
			let edge= document.getElementById(this.idBy("edge_",this.$props.edgeId));
			let tooltipO= document.getElementById(this.idBy("tooltipO_",edgeId));
			let rrO= document.getElementById(this.idBy("tooltipRect_",this.$props.edgeId));
			let ttO= document.getElementById(this.idBy("tooltipText_",this.$props.edgeId));
			var msg:string= '';
			if(healthyMPI==='true'){
				msg= 'Load '+load;
			} else {
				msg= 'Defunct';
			}
			let shrift= new Text(msg);
			if(edge !== null && tooltipO !== null && rrO !== null && ttO !== null) {
				ttO.replaceChild(shrift, ttO.childNodes[0]);
				ttO.setAttribute('style','font-size:2.5px;stroke-width:0.25;stroke:#000000');
				tooltipO.setAttribute('x',''+(0.265*(evt.pageX)-width*0.5+2.5));
				tooltipO.setAttribute('y',''+(0.265*(evt.pageY)-20-2.5));
				tooltipO.setAttribute('width',''+width);
				tooltipO.setAttribute('viewBox','0 0 '+width+' 5');
				rrO.setAttribute('width',''+width);
				tooltipO.setAttribute('style','visibility:inherit');
				edge.appendChild(tooltipO);
			}
		},
		popdown(evt:MouseEvent, edgeId:string){
			let tooltipO= document.getElementById(this.idBy("tooltipO_",edgeId));
			if(tooltipO !== null) {
				tooltipO.setAttribute('style','visibility:hidden');
			}
		},
		getPath(ofHori:string, ofVert:string, toHori:string, toVert:string){
			return 'M'+ofHori+' '+ofVert+' L'+toHori+' '+toVert;
		},
		getPlacing(placing:string, of:string, to:string){
			let ofN = parseFloat(of);
			let length = parseFloat(to) - ofN;
			let p = parseFloat(placing)*length + ofN;
			return p;
		},
		getStyleOfLoad(healthy:string,load:number){
			return 'stroke:'+this.getColorOfLoad(healthy,load)+';stroke-width:1.0';
		},
		getColorOfLoad(healthy:string,load:number){
			if(healthy==='true'){
				return paletteBlueRed(load);
//				return paletteMagentaRed(load);
			} else {
				return graytone(50.0);
			}
		}
	},
});
</script>

<template>
<g :id='idBy("edge_",this.$props.edgeId)'>
<path @mousemove='popup($event, 17, this.$props.healthyMPI, this.$props.load, this.$props.edgeId)'
	  @mouseout='popdown($event, this.$props.edgeId)'
	  :d='getPath(this.$props.of_hori,this.$props.of_vert,this.$props.to_hori,this.$props.to_vert)'
	  :style='getStyleOfLoad(this.$props.healthyMPI,this.$props.load)' />
  <symbol :id='idBy("tooltip_",this.$props.edgeId)' height='5' 
          viewBox='0 0 17 5'>
    <rect :id='idBy("tooltipRect_",this.$props.edgeId)'
		  height='5' width='1' rx='1' ry='1' />
	<text :id='idBy("tooltipText_",this.$props.edgeId)' class='tooltip' x='1.5' y='3.5'
		  style='font-size:2.5px;stroke-width:0.25;stroke:#000000'>@ABCD</text>
  </symbol>
  <use :id='idBy("tooltipO_",this.$props.edgeId)'
	   :href='idBy("#tooltip_",this.$props.edgeId)' x='5' y='5' width='0' 
	   opacity='0.7' fill='yellow' style='visibility:hidden' />
</g>
</template>
