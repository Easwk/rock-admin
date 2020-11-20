<template>
  <div>Test</div>
  <!--  <code-mirror v-model="code" :options="{mode: 'text/x-sql'}" />-->
  <!--  <v-json v-model="json" :disabled="true" />-->
  <!--  <code-mirror v-model="js" :options="{mode: 'htmlmixed'}" />-->
  <code-mirror v-model="php" :options="{mode: 'application/x-xphp'}" />
</template>

<script>
import CodeMirror from 'rock-admin/components/CodeMirror'
// import VJson from 'rock-admin/components/form/VJson'
export default {
  name: 'Test',
  components: { CodeMirror },
  data() {
    return {
      code: `-- SQL Mode for CodeMirror
SELECT SQL_NO_CACHE DISTINCT
    @var1 AS \`val1\`, @'val2', @global.'sql_mode',
    1.1 AS \`float_val\`, .14 AS \`another_float\`, 0.09e3 AS \`int_with_esp\`,
    0xFA5 AS \`hex\`, x'fa5' AS \`hex2\`, 0b101 AS \`bin\`, b'101' AS \`bin2\`,
    DATE '1994-01-01' AS \`sql_date\`, { T "1994-01-01" } AS \`odbc_date\`,
    'my string', _utf8'your string', N'her string',
        TRUE, FALSE, UNKNOWN
  FROM DUAL
  -- space needed after '--'
  # 1 line comment
  /* multiline
  comment! */
  LIMIT 1 OFFSET 0;
`,
      json: `{
  "@context": {
    "name": "http://schema.org/name",
    "description": "http://schema.org/description",
    "image": {
      "@id": "http://schema.org/image",
      "@type": "@id"
    },
    "geo": "http://schema.org/geo",
    "latitude": {
      "@id": "http://schema.org/latitude",
      "@type": "xsd:float"
    },
    "longitude": {
      "@id": "http://schema.org/longitude",
      "@type": "xsd:float"
    },
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "name": "The Empire State Building",
  "description": "The Empire State Building is a 102-story landmark in New York City.",
  "image": "http://www.civil.usherbrooke.ca/cours/gci215a/empire-state-building.jpg",
  "geo": {
    "latitude": "40.75",
    "longitude": "73.98"
  }
}`,
      js: '<table><tr><td>test 1</td></tr><tr><td>test 2</td></tr></table>',
      php: `<?php
declare(strict_types=1);

use Rock\\Util\\Middleware\\CorsMiddleware;
use Mt\\Middleware\\HttpLogMiddleware;
use Hyperf\\Validation\\Middleware\\ValidationMiddleware;
use Rock\\Util\\Middleware\\PermissionMiddleware;

return [
    'http' => [
        //CorsMiddleware::class,
        HttpLogMiddleware::class,
        ValidationMiddleware::class,
        PermissionMiddleware::class,
    ],
];
`,
      php1: ''
    }
  }
}
</script>
