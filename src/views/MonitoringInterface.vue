<template>
    <core-toolbar />
    <div file="MonitoringInterface"></div>
    <v-content>
      <router-view />
    </v-content>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import CoreToolbar from "@/components/core/CoreToolbar.vue";

export default defineComponent({
  name: "MonitoringInterface",

  components: {
    CoreToolbar,
  },
});
</script>
