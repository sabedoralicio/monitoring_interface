<template>
  <core-toolbar />
  <div file="MonitoringInterface"></div>
  <backend-cockpit />
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import BackendCockpit from "@/components/BackendCockpit.vue";
import CoreToolbar from "@/components/core/CoreToolbar.vue";

export default defineComponent({
  name: "MonitoringInterface",

  components: {
    BackendCockpit,
    CoreToolbar,
  },
});
</script>
