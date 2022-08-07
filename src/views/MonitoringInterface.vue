<template>
    <core-toolbar />
    <div file="MonitoringInterface"></div>
      <router-view />
<!--
    <backend-cockpit />
  <v-app class="grey lighten-4">
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
-->
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
