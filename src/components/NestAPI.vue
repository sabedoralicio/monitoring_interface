<template>
  <h3>API function names, response texts at host {{ nodeURL }}</h3>
  <div id="app">
  <v-table fixed-header height="300px">
      <thead>
        <tr>
          <th class="text-left">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="api_function in nestAPIFunctions" :key="api_function">
          <td><NestAPILinkText :nodeURL="nodeURL" :apiFunction="api_function" /></td>
        </tr>
      </tbody>
  </v-table>
  </div>
  <h3>API function names at host {{ nodeURL }}</h3>
  <div id="app">
  <v-table fixed-header height="900px">
      <thead>
        <tr>
          <th class="text-left">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="api_function in nestAPIFunctions" :key="api_function">
          <td><NestAPILinkJsonRaw :nodeURL="nodeURL" :apiFunction="api_function" /></td>
        </tr>
      </tbody>
  </v-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NestAPILinkJsonRaw from "./NestAPILinkJsonRaw.vue";
import NestAPILinkText from "./NestAPILinkText.vue";

export default defineComponent({
  name: "NestAPI",
  components: {
    NestAPILinkJsonRaw,
    NestAPILinkText,
  },
  props: {
    nodeURL: String,
  },
  data() {
    return {
      nestAPIFunctions: null,
    };
  },
  created() {
    fetch(this.$props.nodeURL + "/api")
      .then((response) => response.json())
      .then((data) => (this.nestAPIFunctions = data));
	  
  },
});
</script>
