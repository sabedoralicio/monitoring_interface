<script>
export default {
  name: 'NestAPIFunction',
  props: {
    nodeURL: String,
    apiFunction: String,
  },
  data() {
    return {
      nestAPIFunctionDoc: null,
      errorMessage: null,
    };
  },
  created() {
    fetch(this.$props.nodeURL + '/api/' + this.$props.apiFunction)
      .then(async (response) => {
        const data = await response.json();
        this.nestAPIFunctionYield = data;

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        this.errorMessage = error;
        console.error('There was an error!', error);
      });
  },
};
</script>

<template>
  <div id='app'>
    <b>{{ apiFunction }} [{{ nodeURL }}]: {{ errorMessage }}</b
    >:
  </div>
  {{ nestAPIFunctionYield }}
  <div class='card-body'>
    <b>{{ errorMessage }}</b>
  </div>
</template>
