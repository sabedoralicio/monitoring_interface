<template>
  <h3>API function names, response texts at host {{ nodeURL }}</h3>
  <div id="app">
  <v-table fixed-header height="1300px">
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
import NestAPILinkJsonRaw from "@/components/NestAPILinkJsonRaw.vue";
import NestAPILinkText from "@/components/NestAPILinkText.vue";

export default defineComponent({
  name: "BackendView",
  components: {
    NestAPILinkJsonRaw,
    NestAPILinkText,
  },
  methods: {
    isHtmlErrorMessage(responseString:string): number {
	  return responseString.indexOf("<");
	}
  },
  data() {
    return {
      nodeURL: "http://127.0.0.1:8080",
      nestAPIFunctions: null,
    };
  },
  created() {
    fetch("http://127.0.0.1:8080/nest/nodes")
      .then((response) => response.json())
      .then((data) => (this.nestAPIFunctions = data));	  
  },
});
</script>
