<template>
  <a :href="apiFunUrl(nodeURL, apiFunction)">{{ apiFunction }}</a
  ><br />
</template>

<script>
export default {
  name: "NestAPILink",
  props: {
    nodeURL: String,
    apiFunction: String,
  },
  methods: {
    apiFunUrl(nodeURL, apiFunction) {
      return nodeURL + "/api/" + apiFunction;
    },
  },
};
</script>
