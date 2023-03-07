<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'YellowSlab',
    props: {
        isOn: {
            type: Boolean,
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
        width: {
            type: Number,
            required: true,
        },
        height: {
            type: Number,
            required: true,
        },
    },
	methods: {
		getStyle(isOn: string){
			if(isOn=='true'){
				return 'fill:#bfbf00';
			} else {
				return 'fill:#3f3f3f';
			}
		}
	},
});
</script>

<template>
<rect :style='getStyle(this.$props.isOn)'
      id='red_light' class='YellowSlab'
      :x='this.$props.left' :y='this.$props.upper'
      :width='this.$props.width' :height='this.$props.height' />
</template>

<style>
  rect.YellowSlab {
  fill-rule: evenodd;
  stroke-width: 0.25;
  }
</style>
