<template>
  <a :href="apiFunUrl(nodeURL, apiFunction)">{{ apiFunction }}</a
  >: {{ outcomeOf(nestAPIFunctionResponse) }}<br />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NestAPILink from "./NestAPILink.vue";

export default defineComponent({
  name: "NestAPI",
  components: {
    NestAPILink,
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
