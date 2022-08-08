<template>
  <v-toolbar app color="#9fcfff" dense>
    <span @click="drawer = !drawer" >>>></span>
    <v-btn @click="sidebar = k.sidebar" v-for="k in subMenuKnowledge" :key="k.id" slot="activator" flat
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

    <!-- switches side bar on & off -->
<!--
    <v-toolbar abcdef="ABCDEF" flat app>
	<v-toolbar-side-icon @click="drawer = !drawer" class="blue--text"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span @click="drawer = !drawer" >ABCDEFGHI</span>
      </v-toolbar-title>
    </v-toolbar>
-->

</template>

<script lang="ts">
import BackendWorks from "@/components/BackendWorks.vue";
import SelectionWorks from "@/components/SelectionWorks.vue";
import ViewWorks from "@/components/ViewWorks.vue";
import GrafanaWorks from "@/components/GrafanaWorks.vue";
import HelpWorks from "@/components/HelpWorks.vue";
// TODO: Path to SubMenuKnowledge.json
//import { subMenuKnowledge } from "SubMenuKnowledge.json";
export default {
  components: {
    BackendWorks,
    SelectionWorks,
    ViewWorks,
    GrafanaWorks,
    HelpWorks,
  },
  data() {
    //    return {
    //      subMenuKnowledge: subMenuKnowledge,
    //    };
    return {
	  drawer: false,
	  sidebar: 4,
      subMenuKnowledge: [
        { id: "Backend", sidebar: 0, path: "/", items: ["Nest Server", "Insite"],
		  tooltip: "Physical node access" },
        { id: "Selection", sidebar: 1, path: "/selection", items: ["Neurons", "Synapses"],
		  tooltip: "Neural model access" },
        { id: "View", sidebar: 2, path: "/view", items: ["Weighting A", "Weighting B"],
		  tooltip: "Composition of overall advice" },
        { id: "Grafana", sidebar: 3, path: "/grafana", items: ["Grafana A", "Grafana B"],
		  tooltip: "Additional adornment" },
        { id: "Help", sidebar: 4, path: "/help", items: ["Doc", "About"],
		  tooltip: "Non process related support." },
      ],
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

