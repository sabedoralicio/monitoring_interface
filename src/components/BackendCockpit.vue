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
        <h3>API function names at host {{ host }}</h3>
        <div id="app">
          <ul>
            <span v-for="api_function in nestAPIFunctions" :key="api_function">
              <NestAPILink
                nodeURL="http://127.0.0.1:7777"
                :apiFunction="api_function"
              />
            </span>
          </ul>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
//import axios from 'axios';
import NestAPILink from "./NestAPILink.vue";

export default defineComponent({
  name: "BackendCockpit",
  components: {
    NestAPILink,
  },

  data() {
    return {
      host: "127.0.0.1",
      port: 7777,
      nestAPIFunctions: null,
    };
  },
  created() {
    // Simple GET request using fetch
    //fetch(this.$props. + "/api")
    fetch("http://127.0.0.1:7777/api")
      .then((response) => response.json())
      .then((data) => (this.nestAPIFunctions = data));
  },
});
</script>
