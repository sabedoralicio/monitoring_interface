<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'LeftSideBar',
    props: {
        backend: {
            type: String,  // TODO: JSON list
            required: true,
        },
    },
  });
</script>

<template>
  <v-table>
    <tbody>
      <tr>
        <td></td>
      </tr>
      <tr>
        <td></td>
      </tr>
	  <tr v-for='rl in links' :key='rl.url'>
        <td><router-link :to='rl.url'>{{rl.name}}</router-link></td>
      </tr>
    </tbody>
  </v-table>
</template>
