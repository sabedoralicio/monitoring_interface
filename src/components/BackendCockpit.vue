<template>
  <v-container>
    <v-row class="text-left">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Backend Cockpit Selection
        </h1>

        <p class="subheading font-weight-regular">
          Review of backends to consider selection for deciding about whether to
          stop a job.
        </p>
        <br />
        <NestAPI :nodeURL="nodeURL" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NestAPI from "./NestAPI.vue";

export default defineComponent({
  name: "BackendCockpit",
  components: {
    NestAPI,
  },

  data() {
    return {
      host: "127.0.0.1",
      port: 7777,
      nodeURL: "http://127.0.0.1:7777",
    };
  },
});
</script>
