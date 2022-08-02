<template>
  <h1>Nest Node {{nodeURL}}</h1>
  <h3>API functions</h3>
  <div id="app">
    <ul>
      <span v-for="api_function in nestAPIFunctions" :key="api_function">
         <NestAPILink 
           nodeURL="http://127.0.0.1:7777"
           :apiFunction='api_function'/>
       </span>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import NestAPILink from './NestAPILink.vue';

export default {
  name: "NestAPI",
  components: {
    NestAPILink
  },
  props: {
    nodeURL: String
  },^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  data() {
    return {
      nestAPIFunctions: null
    };
  },
  created() {
    // Simple GET request using axios
    axios.get(this.$props.nodeURL+"/api")
      .then(response => this.nestAPIFunctions = response.data);
    // Simple GET request using fetch
//    fetch(this.$props.nodeURL+"/api")
//      .then(response => response.json())
//      .then(data => (this.nestAPIFunctions = data));
  }
};
</script>
