<template>
  <v-toolbar app color="#9fcfff" dense>
    <v-btn v-for="k in subMenuKnowledge" :key="k.id" flat>{{ k.id }}</v-btn>
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
        { id: "Backend", items: ["Nest Server", "Insite"] },
        { id: "Selection", items: ["Neurons", "Synapses"] },
        { id: "View", items: ["Weighting A", "Weighting B"] },
        { id: "Grafana", items: ["Grafana A", "Grafana B"] },
        { id: "Help", items: ["Doc", "About"] },
      ],
    };
  },
};
</script>
