<template>
  <div id="app">
    <b>{{ apiFunction }} [{{ nodeURL }}]: {{ errorMessage }}</b
    >:
  </div>
  <pre>{{ nestAPIFunctionDoc }}</pre>
  <div class="card-body">
    <b>{{ errorMessage }}</b>
  </div>
</template>

<script>
export default {
  name: "NestAPIFunctionDoc",
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
    fetch(
      this.$props.nodeURL +
        "/api/" +
        this.$props.apiFunction +
        "?inspect=getdoc"
    )
      .then(async (response) => {
        const data = await response.json();
        this.nestAPIFunctionDoc = data.data;

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        this.errorMessage = error;
        console.error("There was an error!", error);
      });
  },
};
</script>
