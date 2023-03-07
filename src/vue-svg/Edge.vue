<script lang='ts'>
import { defineComponent } from 'vue';
import EdgeState from '@/vue-svg/EdgeState.vue';

export default defineComponent({
	name: 'Edge',
    props: {
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
	components: {
		EdgeState,
	},
	methods: {
		getPath(ofHori:string, ofVert:string, toHori:string, toVert:string){
			return 'M'+ofHori+' '+ofVert+' L'+toHori+' '+toVert;
		},
		getPlacing(placing:string, of:string, to:string){
			let ofN = parseFloat(of);
			let length = parseFloat(to) - ofN;
			let p = parseFloat(placing)*length + ofN;
			return p;
		},
		getStyleOfLoad(load:number){
			return 'stroke:'+this.getColorOfLoad(load)+';stroke-width:1.0';
		},
		getColorOfLoad(load:number){
			let col = load / 20.0;
			let mod = col / 1.0;
			var r:number;
			var g:number;
			var b:number;
			if(col > 4.0){
				r= 1.0; g= 1.0-mod; b= 0.0;
			} else if(col > 3.0){
				r= mod; g= 1.0; b= 0.0;
			} else if(col > 2.0){
				r= 0.0; g= 1.0; b= 1.0-mod;
			} else if(col > 1.0){
				r= 0.0; g= mod; b= 1.0;
			} else {
				r= 1.0-mod; g= 0.0; b= 1.0;
			}
			return 'rgb('+(255*r)+','+(255*g)+','+(255*b)+')';
		},
		showTooltip(evt:any, text:string) {
			let tooltip = document.getElementById("tooltip");
			if(tooltip !== null){
				console.log('??');
				tooltip.innerHTML = text;
				tooltip.style.display = "block";
				tooltip.style.left = evt.pageX + 10 + 'px';
				tooltip.style.top = evt.pageY + 10 + 'px';
			}
		},
		hideTooltip() {
			var tooltip = document.getElementById("tooltip");
			//tooltip.style.display = "none";
		},
	},
});
</script>

<template>
<path :d='getPath(this.$props.of_hori,this.$props.of_vert,this.$props.to_hori,this.$props.to_vert)'
	  :style='getStyleOfLoad(this.$props.load)' />
</template>
