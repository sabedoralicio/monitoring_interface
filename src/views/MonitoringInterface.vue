<template>
  <core-toolbar />
  <hello-world />
  <div file="MonitoringInterface"></div>
  <hello-world />
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import CoreToolbar from "@/components/core/CoreToolbar.vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default defineComponent({
  name: "MonitoringInterface",

  components: {
    CoreToolbar,
    HelloWorld,
  },
});
</script>
