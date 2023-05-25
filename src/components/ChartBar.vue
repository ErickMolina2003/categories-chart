<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" lg="4">
        <v-select
          v-model="categorySelected"
          label="Categories"
          :items="categories"
          outlined
        ></v-select>
      </v-col>
      <v-col cols="12" md="4" lg="4">
        <v-select
          v-model="productSelected"
          label="Products"
          :items="computedProductTitle"
          outlined
        ></v-select>
      </v-col>
      <v-col cols="12" md="4" lg="4">
        <v-select
          v-model="brandingSelected"
          label="Branding"
          :items="computedBrandingTitle"
          outlined
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12" lg="12">
        <Bar
          id="my-chart-id"
          :options="chartOptions"
          :data="computedCharData"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import CATEGORIES_JSON from '../mocks/result';
import { AnyObject } from 'chart.js/dist/types/basic';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

@Component({
  components: { Bar },
  name: 'CreateSuper',
})
class ChartBar extends Vue {
  categories = [];
  products = [];
  branding = [];

  categorySelected = '';
  productSelected = '';
  brandingSelected = '';

  chartOptions = {
    responsive: true,
  };

  mounted() {
    CATEGORIES_JSON.categories.forEach((category: AnyObject) => {
      this.categories.push(category.title);
    });
  }

  getProducts() {
    this.products = [];
    this.branding = [];
    CATEGORIES_JSON.categories.forEach((category) => {
      if (category.title == this.categorySelected) {
        this.products = category.products;
      }
    });
    console.log('productos: ', this.products);
    return this.products;
  }

  get computedProductTitle() {
    this.getProducts();

    let productsTitle = [];

    this.products.forEach((product) => {
      productsTitle.push(product.title);
    });

    return productsTitle;
  }

  getBrandings() {
    this.products.forEach((product) => {
      if (product.title == this.productSelected) {
        this.branding = product.brand;
      }
    });
  }

  get computedBrandingTitle() {
    this.getBrandings();

    let brandingsTitle = [];

    this.branding.forEach((branding) => {
      brandingsTitle.push(branding.title);
    });

    return brandingsTitle;
  }

  get computedCharData() {
    let chartData = {
      labels: ['January', 'February', 'March', 'April'],
      datasets: [
        { label: 'Sales', backgroundColor: '#f87979', data: [0, 0, 0] },
      ],
    };

    this.branding.forEach((branding) => {
      if (branding.title == this.brandingSelected) {
        chartData.datasets = [
          { label: 'Sales', backgroundColor: '#f87979', data: branding.sales },
        ];
      }
    });

    return chartData;
  }
}

export default ChartBar;
</script>
