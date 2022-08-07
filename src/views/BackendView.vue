<template>
  <div class="backend">
    <h1>This is a Backend page</h1>
  </div>
  <p>Hier geht es um das Anliegen, das CSMI ‘physisch’ angemessen mit allen Systemkomponenten zu verbinden – d.h., nach Start des CSMI muss sich der Nutzer ja zunächst erstmal mit den bezogenen System-Knoten verbinden, und dies dürfte ernstzunehmende Arbeit sein. Grundlage aller weiteren Maßnahmen ist, im Netz die erheblichen Backendeinheiten zu finden und mit ihnen eine fachgerechte Anbindung sicherzustellen.</p>

  <p>Für alle diese eher Systemadministrator-mäßigen Verrichtungen soll die erste View eingerichtet sein; sie beginnt i.W. mit dem Hochfahren des CSMI und endet mit der erfolgreichen Herstellung der System-Anbindung. Ausnahmsweise kann sie auch später noch aufgesucht werden.</p>

  <p>The appropriate application companion handling also does belong here.</p>
  <h3>API function names, response texts at host {{ nodeURL }}</h3>
  <div id="app">
  <v-table fixed-header height="300px">
      <thead>
        <tr>
          <th class="text-left">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="api_function in nestAPIFunctions" :key="api_function">
          <td><NestAPILinkText :nodeURL="nodeURL" :apiFunction="api_function" /></td>
          <td>{{ api_function }}</td>
        </tr>
      </tbody>
  </v-table>
  </div>
  <h3>API function names at host {{ nodeURL }}</h3>
  <div id="app">
  <v-table fixed-header height="900px">
      <thead>
        <tr>
          <th class="text-left">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="api_function in nestAPIFunctions" :key="api_function">
          <td><NestAPILinkJsonRaw :nodeURL="nodeURL" :apiFunction="api_function" /></td>
        </tr>
      </tbody>
  </v-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NestAPILinkJsonRaw from "@/components/NestAPILinkJsonRaw.vue";
import NestAPILinkText from "@/components/NestAPILinkText.vue";

export default defineComponent({
  name: "BackendView",
  components: {
    NestAPILinkJsonRaw,
    NestAPILinkText,
  },
  data() {
    return {
      nodeURL: "http://127.0.0.1:7777",
      nestAPIFunctions: null,
    };
  },
  created() {
    fetch("http://127.0.0.1:7777/api")
      .then((response) => response.json())
      .then((data) => (this.nestAPIFunctions = data));	  
  },
});
</script>
