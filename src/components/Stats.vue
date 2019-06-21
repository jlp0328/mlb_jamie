<template>
  <div class="main-container">
    <div class="pic-stats-wrapper">
      <div class="pic-name">
        <img :src="`${this.player.image}`">
        <h2>{{this.player.name}}</h2>
      </div>

      <div class="stats">
        <p>
          <strong>HR:</strong>
          {{this.player.totalHR}}
        </p>
        <p>
          <strong>RBI:</strong>
          {{this.player.totalRBI}}
        </p>
        <p>
          <strong>AVG:</strong>
          {{this.player.avg}}
        </p>
        <p>
          <strong>OPS:</strong>
          {{this.player.ops}}
        </p>
      </div>
    </div>

    <div>
      <canvas id="playerStats"></canvas>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Line } from "vue-chartjs";
import _ from "lodash";

import statsService from "../stats.service";
import Players from "../config";

export default {
  data() {
    return {
      player: [],
      stats: []
    };
  },
  methods: {
    // createChart(chartId, chartData) {
    //   const ctx = document.getElementById(chartId);
    //   const myChart = new Chart(ctx, {
    //     type: chartData.type,
    //     data: chartData.data,
    //     options: chartData.options
    //   });
    // }
  },
  async created() {
    this.player = this.$route.query.player;
    console.log(this.player);
  },
  mounted() {
    // this.createChart("playerStats", this.planetChartData);
  }
};
</script>

<style scoped>
.main-container {
  height: 98vh;
}

.pic-stats-wrapper {
  display: grid;
  grid-template-columns: 25% 75%;
}

.pic-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(6, 1fr);
}

img {
  border-radius: 15px;
}

dl {
  display: flex;
}
</style>