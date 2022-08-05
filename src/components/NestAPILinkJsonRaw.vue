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
  name: "NestAPILinkJsonRaw",
  props: {
    nodeURL: String,
    apiFunction: String,
  },
  data() {
    return {
      nestAPIFunctionResponse: null,
    };
  },
  methods: {
    apiFunUrl(nodeURL: string, apiFunction: string) {
      return nodeURL + "/api/" + apiFunction;
    },
  },
  created() {
    fetch(this.$props.nodeURL + "/api/" + this.$props.apiFunction)
      .then((response) => response.json())
      .then((data) => (this.nestAPIFunctionResponse = data));
  },
});
</script>
