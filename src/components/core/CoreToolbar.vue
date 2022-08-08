<template>
  <v-toolbar app color="#9fcfff" dense>
    <span @click="drawer = !drawer" >>>></span>
    <v-btn @click="sidebar = k.sidebar" v-for="k in headerBarKnowledge" :key="k.id" slot="activator" flat
	  >{{ k.id }}<v-tooltip
        activator="parent"
        location="bottom"
      >{{ k.tooltip }}</v-tooltip></v-btn>
  </v-toolbar>

  <v-navigation-drawer app v-model="drawer" class="primary">
    <BackendWorks v-if="sidebar == 0" />
    <SelectionWorks v-else-if="sidebar == 1" />
    <ViewWorks v-else-if="sidebar == 2" />
    <GrafanaWorks v-else-if="sidebar == 3" />
    <HelpWorks v-else />
  </v-navigation-drawer>

</template>

<script lang="ts">
import BackendWorks from "@/components/BackendWorks.vue";
import SelectionWorks from "@/components/SelectionWorks.vue";
import ViewWorks from "@/components/ViewWorks.vue";
import GrafanaWorks from "@/components/GrafanaWorks.vue";
import HelpWorks from "@/components/HelpWorks.vue";
import { headerBarKnowledge } from "@/assets/HeaderBarKnowledge.json";

export default {
  components: {
    BackendWorks,
    SelectionWorks,
    ViewWorks,
    GrafanaWorks,
    HelpWorks,
  },
  data() {
    return {
      drawer: false,
      sidebar: 4,
      headerBarKnowledge: headerBarKnowledge,
    };
  },
};
</script>

<style>
a.button:active { text-decoration: none; color: #FF7F00; }
a.button:hover { text-decoration: none; color: #FF7F00; }
a.button:link { text-decoration: none; color: #FF7F00; }
a.button:visited { text-decoration: none; color: #FF7F00; }
</style>

