<template>
  <v-toolbar app color="#9fcfff" dense>
    <router-link class="button" :to="k.path"><v-btn v-for="k in subMenuKnowledge" :key="k.id" slot="activator" flat
	  >{{ k.id }}<v-tooltip
        activator="parent"
        location="bottom"
      >{{ k.tooltip }}</v-tooltip></v-btn></router-link>
  </v-toolbar>

    <!-- switches side bar on & off -->
<!--
    <v-toolbar abcdef="ABCDEF" flat app>
      <v-toolbar-title class="text-uppercase grey--text">
        <span @click="drawer = !drawer" >ABCDEFGHI</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-navigation-drawer ghijkl="GHIJKL" app v-model="drawer" class="primary">
      <v-list>
        <v-list-tile v-for="link in subMenuKnowledge" :key="link.id" router :to="link.path">
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>	
-->

</template>

<script lang="ts">
// TODO: Path to SubMenuKnowledge.json
//import { subMenuKnowledge } from "SubMenuKnowledge.json";
export default {
  data() {
    //    return {
    //      subMenuKnowledge: subMenuKnowledge,
    //    };
    return {
	  drawer: false,
      subMenuKnowledge: [
        { id: "Backend", path: "/", items: ["Nest Server", "Insite"],
		  tooltip: "Physical node access" },
        { id: "Selection", path: "/selection", items: ["Neurons", "Synapses"],
		  tooltip: "Neural model access" },
        { id: "View", path: "/view", items: ["Weighting A", "Weighting B"],
		  tooltip: "Composition of overall advice" },
        { id: "Grafana", path: "/grafana", items: ["Grafana A", "Grafana B"],
		  tooltip: "Additional adornment" },
        { id: "Help", path: "/help", items: ["Doc", "About"],
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

