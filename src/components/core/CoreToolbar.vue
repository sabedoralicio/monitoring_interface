<template>
  <v-toolbar app color="#9fcfff" dense>
    <span @click="drawer = !drawer" >>>></span>
    <v-btn v-for="k in subMenuKnowledge" :key="k.id" slot="activator" flat
	  ><router-link class="button" :to="k.path">{{ k.id }}</router-link><v-tooltip
        activator="parent"
        location="bottom"
      >{{ k.tooltip }}</v-tooltip></v-btn>
  </v-toolbar>

    <v-navigation-drawer app v-model="drawer" class="primary">
	  <v-table fixed-header height="900px">
      <tbody>
        <tr>
          <td></td>
        </tr><tr>
          <td></td>
        </tr><tr>
          <td><router-link to="/">Backend</router-link></td>
        </tr>
		<tr>
          <td><router-link to="/selection">Selection</router-link></td>
        </tr><tr>
          <td><router-link to="/view">View</router-link></td>
        </tr><tr>
          <td><router-link to="/grafana">Grafana</router-link></td>
        </tr><tr>
          <td><router-link to="/help">Help</router-link></td>
        </tr>
      </tbody>
  </v-table>
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
// TODO: Path to SubMenuKnowledge.json
//import { subMenuKnowledge } from "SubMenuKnowledge.json";
export default {
  data() {
    //    return {
    //      subMenuKnowledge: subMenuKnowledge,
    //    };
    return {
	  drawer: false,
	  sidebar: 4,
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

