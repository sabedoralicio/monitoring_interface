<template>
  <h3>API function names at host {{ nodeURL }}</h3>
  <v-simple-table fixed-header height="300px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Calories</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="api_function in nestAPIFunctions" :key="api_function">
          <td>{{ api_function }}</td>
          <td>{{ api_function }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  <div id="app">
    <perfect-scrollbar max-height="300px">
      <ul>
        <span v-for="api_function in nestAPIFunctions" :key="api_function">
          <NestAPILink :nodeURL="nodeURL" :apiFunction="api_function" />
        </span>
      </ul>
    </perfect-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NestAPILink from "./NestAPILink.vue";

export default defineComponent({
  name: "NestAPI",
  components: {
    NestAPILink,
  },
  props: {
    nodeURL: String,
  },
  data() {
    return {
      nestAPIFunctions: null,
    };
  },
  created() {
    fetch(this.$props.nodeURL + "/api")
      .then((response) => response.json())
      .then((data) => (this.nestAPIFunctions = data));
  },
});
</script>
