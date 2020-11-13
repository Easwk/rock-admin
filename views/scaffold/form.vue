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
  name: "Form",
  data() {
    return {
      comps: [],
      loaded: false,
      schema: [
        {
          name: "j-form",
          props: {
            saveApi: "/save",
            options: {
              cancelBtn: {
                text: "取消",
                on: {
                  click: "() => console.error(33333333)"
                }
              },
              section: {
                type: "card"
              }
            },
            controls: []
          }
        }
      ]
    };
  },
  created() {
    this.$http.get("/system/form_option/user").then(res => {
      this.schema[0].props.controls = res.payload;
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
