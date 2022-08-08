<template>
    <core-toolbar />
    <div file="MonitoringInterface"></div>
    <v-content>
      <router-view />
    </v-content>
    <v-footer
    class="bg-blue-lighten-1"
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        variant="text"
        class="mx-2"
        rounded="xl"
      >
        {{ link }}
      </v-btn>
      <v-col
        class="text-center text-white mt-4"
        cols="12"
      >
        <!-- {{ new Date().getFullYear() }} -->
        {{ new Date() }} — <strong>Co-Simulation Monitoring Interface</strong>
      </v-col>
    </v-row>
  </v-footer>
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
