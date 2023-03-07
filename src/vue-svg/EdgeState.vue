<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'EdgeState',
    props: {
        healthyMPI: {
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
        load: {
            type: Number,
            required: true,
        },
    },
	methods: {
		getHealthStyle(healthyMPI: string){
			if(healthyMPI=='true'){
				return 'fill:#00bf00';
			} else {
				return 'fill:#bf0000';
			}
		},
		getLoadStyle(load: string){
			return 'stroke-dasharray:'+(parseFloat(load)*0.1571)+' 31.42';
		}
	},
});
</script>

<template>
<circle :style='getHealthStyle(this.$props.healthyMPI)'
        class='EdgeState_healthy'
        :cx='this.$props.m_hori' :cy='this.$props.m_vert'
        r='7' />
<circle :style='getLoadStyle(this.$props.load)'
        class='EdgeState_load'
        :cx='this.$props.m_hori' :cy='this.$props.m_vert'
        r='2.5' />
</template>

<style>
  circle.EdgeState_healthy {
  fill-rule: evenodd;
  }
  circle.EdgeState_load {
  fill-rule: evenodd;
  stroke-width: 5.0;
  fill: transparent;
  stroke:#3f3f3f;
  }
</style>
