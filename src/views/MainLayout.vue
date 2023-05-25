<template>
  <chart-bar></chart-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import ChartBar from '../components/ChartBar.vue';

@Component({
  components: { ChartBar },
})
class MainLayout extends Vue {}

export default MainLayout;
</script>
