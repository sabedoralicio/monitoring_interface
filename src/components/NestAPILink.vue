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
    };
  },
  methods: {
    apiFunUrl(nodeURL: string, apiFunction: string) {
      return nodeURL + "/api/" + apiFunction;
    },
  },
  // no response – async needed?
  // Short flickering of »"[object Response]"« after unsuccessfully
  // trying to taken response in place of data.
  created() {
    fetch(this.$props.nodeURL + "/api/GetKernelStatus")
      .then((response) => response.json())
      .then((data) => (this.nestAPIFunctionResponse = data));
  },
});
</script>
