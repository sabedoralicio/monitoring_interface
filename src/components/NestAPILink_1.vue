/* Recognizes Lists, numerics & bools
TODO: don't return empty for structures.
*/

<template>
  <a :href="apiFunUrl(nodeURL, apiFunction)">{{ apiFunction }}</a
  >: {{ nestAPIFunctionResponse }}<br />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "NestAPILink",
  props: {
    nodeURL: String,
    apiFunction: String,
  },
  data() {
    return {
      nestAPIFunctionResponse: null,
      nestAPICallURL: "",
    };
  },
  methods: {
    apiFunUrl(nodeURL: string, apiFunction: string) {
      return nodeURL + "/api/" + apiFunction;
    },
    outcomeOf(url: string): string {
      fetch("http://127.0.0.1:7777/api/GetConnections")
        .then((response) => response.json())
        .then((data) => { return data; });
//        .then((response) => { return response.ok; })
      return ("NO RESPONSE AT: »" + url + "«");
    },
  },
  // no response – async needed?
  // Short flickering of »"[object Response]"« after unsuccessfully
  // trying to taken response in place of data.
  created() {
    this.nestAPICallURL = this.$props.nodeURL + "/api/" + this.$props.apiFunction;
    fetch(this.$props.nodeURL + "/api/" + this.$props.apiFunction)
//    fetch(this.$props.nodeURL + "/api/tics_per_ms")
//    fetch(this.$props.nodeURL + "/api/GetConnections")
      .then((response) => response.json())
      .then((data) => (this.nestAPIFunctionResponse = data));
  },
});
</script>
