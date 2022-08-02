<template>
  <v-toolbar app color="#9fcfff" dense>
    <v-list>
      <v-list-item v-for="k in subMenuKnowledge" :key="k.id">
        <v-list-item-title>{{ k.id }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-toolbar>
</template>

<script lang="ts">
import { subMenuKnowledge } from "@/assets/SubMenuKnowledge.json";
export default {
  data() {
    return {
      subMenuKnowledge: subMenuKnowledge,
    };
  },
};
</script>
