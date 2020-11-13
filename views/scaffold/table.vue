<template>
  <div>
    <j-render
      v-if="loaded"
      :json-schema="schema"
      :components="comps"
      @loadRemoteJsonSchema="jrenderLoad"
    />
  </div>
</template>
<script>
export default {
  name: "Table",
  data() {
    return {
      comps: [],
      loaded: false,
      schema: [
        {
          name: "j-table",
          props: {}
        }
      ]
    };
  },
  created() {
    this.$http.get("/system/list_option/user").then(res => {
      this.schema[0].props = res.payload;
      this.loaded = true;
    });
  },
  methods: {
    jrenderLoad(page_api, page_json) {
      this.$store.dispatch("app/setPageJsonSchema", {
        page: page_api,
        json: JSON.stringify(page_json, null, 2)
      });
    }
  }
};
</script>
