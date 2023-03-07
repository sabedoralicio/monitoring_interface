<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HelpButton',
    props: {
        left: {
            type: Number,
            required: true,
        },
        upper: {
            type: Number,
            required: true,
        },
    },
	methods: {
		getWritingLeft(left: string){
			return 3.5+parseFloat(left);
		},
		getWritingUpper(upper: string){
			return 12.0+parseFloat(upper);
		}
	},
});
</script>

<template>
  <rect id='button' class='HelpButton' width='20.0' height='20.0'
        :x='this.$props.left' :y='this.$props.upper' />
  <text xml:space='preserve' id='label'>
	<tspan id='tspan2422' class='HelpButton'
	  :x='getWritingLeft(this.$props.left)'
	  :y='getWritingUpper(this.$props.upper)'
	  >HELP</tspan></text>
</template>

<style>
  button.HelpButton {
  fill: #0000ff;
  fill-rule: evenodd;
  stroke-width: 0.25;
  }
  rect.HelpButton {
  fill: #0000ff;
  fill-rule: evenodd;
  stroke-width: 0.25;
  }
  tspan.HelpButton {
  font-style: normal;
  font-variant: normal;
  font-weight: bold;
  font-stretch: normal;
  font-size: 5.0px;
  font-family: sans-serif;
  -inkscape-font-specification: 'sans-serif Bold';
  fill: #ffffff;
  stroke-width: 0.25;
  }
</style>
