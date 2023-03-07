<script lang='ts'>
import { defineComponent } from 'vue';
import EdgeState from '@/views/EdgeState.vue';

export default defineComponent({
	name: 'Edge4_3o',
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
	  style='stroke:#00009f;stroke-width:4.0' />
<path :d='getPath(this.$props.of_hori,this.$props.of_vert,this.$props.to_hori,this.$props.to_vert)'
	  style='stroke:#9f9fff;stroke-width:3.0' />
<!--
<path d='getPath(this.$props.of_hori,this.$props.of_vert,this.$props.to_hori,this.$props.to_vert)'
	  style='stroke:#00009f;stroke-width:4.0' />
-->
<EdgeState :m_hori='getPlacing(this.$props.placing,this.$props.of_hori,this.$props.to_hori)'
		   :m_vert='getPlacing(this.$props.placing,this.$props.of_vert,this.$props.to_vert)'
		   :healthyMPI='this.$props.healthyMPI'
		   :load='this.$props.load'  onmousemove="showTooltip(evt, 'This is blue');" onmouseout="hideTooltip();"/>
</template>
