<template>
  <a :href="apiFunUrl(nodeURL, apiFunction)">{{ apiFunction }}</a
  >: {{ nestAPIFunctionResponse }}<br />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "NestAPILinkText",
  props: {
    nodeURL: String,
    apiFunction: String,
  },
  data() {
    return {
      nestAPIFunctionResponse: "",
    };
  },
  methods: {
    apiFunUrl(nodeURL: string, apiFunction: string) {
      return nodeURL + "/api/" + apiFunction;
    },
  },
  created() {
    fetch(this.$props.nodeURL + "/api/" + this.$props.apiFunction)
      .then((response) => response.text())
      .then((data) => (this.nestAPIFunctionResponse = data));
  },
});
</script>
