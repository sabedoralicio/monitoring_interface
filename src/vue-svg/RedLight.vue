<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'RedLight',
    props: {
        isOn: {
            type: Boolean,
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
    },
	methods: {
		getStyle(isOn: string){
			if(isOn=='true'){
				return 'fill:#ff0000';
			} else {
				return 'fill:#3f3f3f';
			}
		}
	},
});
</script>

<template>
<ellipse :style='getStyle(this.$props.isOn)'
         id='red_light' class='RedLight'
         :cx='this.$props.m_hori' :cy='this.$props.m_vert'
         :rx='this.$props.rad' :ry='this.$props.rad' />
</template>

<style>
  ellipse.RedLight {
  fill-rule: evenodd;
  stroke-width: 0.25;
  }
</style>
