<template>
  <div class="GetConnections">
    <h1>This is a GetConnections page</h1>
  </div>
  <p>Connections</p>
  »{{ nestAPIFunction }}«
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "NestAPILink",
//  props: {
//    nodeURL: String,
//    apiFunction: String,
//  },
  data() {
    return {
      nestAPIFunction: null,
    };
  },
  // no response – async needed?
  // Short flickering of »"[object Response]"« after unsuccessfully
  // trying to taken response in place of data.
  created() {
    fetch("http://127.0.0.1:7777/api/GetConnections")
      .then((response) => response.json())
      .then((data) => (this.nestAPIFunction = data));
  },
});
</script>
