<template>
  <v-toolbar app color="#9fcfff" dense>
    <v-btn v-for="k in subMenuKnowledge" :key="k.id" slot="activator" flat>{{ k.id }}</v-btn>
<!--
    <v-tooltip bottom>
      <v-btn v-for="k in subMenuKnowledge" :key="k.id" slot="activator" flat>{{ k.id }}</v-btn>
      <span>??</span>
    </v-tooltip>
-->
  </v-toolbar>
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
      subMenuKnowledge: [
        { id: "Backend", items: ["Nest Server", "Insite"], tooltip: "AAA" },
        { id: "Selection", items: ["Neurons", "Synapses"], tooltip: "BBB" },
        { id: "View", items: ["Weighting A", "Weighting B"], tooltip: "CCC" },
        { id: "Grafana", items: ["Grafana A", "Grafana B"], tooltip: "DDD" },
        { id: "Help", items: ["Doc", "About"], tooltip: "EEE" },
      ],
    };
  },
};
</script>
