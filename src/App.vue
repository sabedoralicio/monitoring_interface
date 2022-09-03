<template>
  <v-app>
    <v-main>
      <MonitoringInterface />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MonitoringInterface from "@/views/MonitoringInterface.vue";

export default defineComponent({
  name: "App",

  components: {
    MonitoringInterface,
  },
});
</script>
