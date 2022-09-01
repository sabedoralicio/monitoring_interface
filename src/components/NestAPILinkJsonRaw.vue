/* Recognizes Lists, numerics & bools TODO: don't return empty for structures.
*/

<template>
  <a :href="apiFunUrl(nodeURL, apiFunction)">{{ apiFunction }}</a
  >: {{ nestAPIFunctionResponse }}<br />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "NestAPILinkJsonRaw",
  props: {
    nodeURL: String,
    apiFunction: String,
  },
  data() {
    return {
      nestAPIFunctionResponse: "",
    };
  },
  methods: {
    apiFunUrl(nodeURL: string, apiFunction: string) {
      return nodeURL + "/api/" + apiFunction;
    },
  },
  created() {
    fetch(this.$props.nodeURL + "/api/" + this.$props.apiFunction)
      .then((response) => response.text())
      //      .then((data) => (this.nestAPIFunctionResponse = JSON.stringify(JSON.parse('{"T_max":1152921504606846.8,"T_min":-1152921504606846.8,"adaptive_spike_buffers":true,"adaptive_target_buffers":true,"biological_time":0.0,"buffer_size_spike_data":2,"buffer_size_target_data":2,"connection_rules":["one_to_one","all_to_all","fixed_indegree","fixed_outdegree","pairwise_bernoulli","symmetric_pairwise_bernoulli","fixed_total_number"],"data_path":"","data_prefix":"","dict_miss_is_error":true,"growth_curves":["gaussian","linear","sigmoid"],"growth_factor_buffer_spike_data":1.5,"growth_factor_buffer_target_data":1.5,"keep_source_table":true,"local_num_threads":1,"local_spike_counter":0,"max_buffer_size_spike_data":8388608,"max_buffer_size_target_data":16777216,"max_delay":0.1,"max_num_syn_models":512}'))));
      .then(
        (data) =>
          (this.nestAPIFunctionResponse = JSON.stringify(JSON.parse(data)))
      );
  },
});
</script>
