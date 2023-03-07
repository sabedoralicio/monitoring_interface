<!-- Header bar, allowing to open & close left menu. -->
<script lang='ts'>
import LeftSideBar from '@/components/LeftSideBar.vue';
import { viewGridKnowledge } from '@/assets/ViewGridKnowledge.json';

export default {
  components: {
	  LeftSideBar,
  },
  data() {
    return {
		showing_left_drawer: false, // true, // left menu drawer at begin is shut
      sidebar_col: 4,
      viewGridKnowledge: viewGridKnowledge,
    };
  },
};
</script>

<template>
<v-toolbar app color='#9fcfff' dense>
<!--
    <span @click='showing_left_drawer = !showing_left_drawer'>>>></span>
-->
    <v-btn
      @click='sidebar_col = k.sidebar_col'
      v-for='k in viewGridKnowledge'
      :key='k.id'
      flat
      >{{ k.id
      }}<v-tooltip activator='parent' location='bottom'>{{
        k.tooltip
      }}</v-tooltip></v-btn
    >
  </v-toolbar>

<!-- v-model='showing_left_drawer' needed for changing left drawer -->
<!--
  <v-navigation-drawer app v-model='showing_left_drawer' class='primary'>
	<LeftSideBar :links='viewGridKnowledge[sidebar_col].links' />
  </v-navigation-drawer>
-->
</template>

<style>
a.button:active {
  text-decoration: none;
  color: #ff7f00;
};
a.button:hover {
  text-decoration: none;
  color: #ff7f00;
};
a.button:link {
  text-decoration: none;
  color: #ff7f00;
};
a.button:visited {
  text-decoration: none;
  color: #ff7f00;
};
</style>
