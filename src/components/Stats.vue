<template>
  <div class="main-container">
    <router-link :to="{path: '/'}">
      <div class="back-to-main">
        <a>Back</a>
      </div>
    </router-link>
    <div class="pic-stats-wrapper">
      <div class="pic-name">
        <div>
          <img :src="`${this.player.image}`">
          <h2>{{this.player.name}}</h2>
        </div>
      </div>

      <div class="stats">
        <div class="all-stats">
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
          <p>
            <strong>K:</strong>
            {{this.player.totalK}}
          </p>
          <p>
            <strong>OBP:</strong>
            {{this.player.obp}}
          </p>
        </div>
        <div class="toggle-chart">
          <div>
            <h4>Batting Average and OPS By:</h4>
          </div>
          <div class="radio">
            <input type="radio" name="stats" value="opponent" id="opp-stats" checked>
            <label for="opp-stats">Opponent</label>
          </div>
          <div class="radio">
            <input type="radio" name="stats" value="month" id="mon-stats">
            <label for="mon-stats">Month</label>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="chart-container">
        <canvas id="playerStats"></canvas>
      </div>
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
      showOpponent: true,
      labels: [],
      avgData: [],
      opsData: []
      //   opps: [],
      //   months: [],
      //   oppAvg: [],
      //   oppOps: [],
      //   monthAvg: [],
      //   monthOps: []
    };
  },
  computed: {
    toggleMainLabel() {
      if (this.showOpponent) {
        return ([
          this.labels,
          this.avgData,
          this.opsData
        ] = this.player.oppAvgOps);
      } else {
        [this.labels, this.avgData, this.opsData] = this.player.monthAvgOps;
      }
    }
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      let myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.labels, //need ternary fn to toggle if opp vs. month
          datasets: [
            {
              label: "Batting Average",
              data: this.avgData, //need ternary fn to toggle if opp vs. month
              backgroundColor: "#EBEBEB"
            },
            {
              label: "OPS",
              data: this.opsData,
              backgroundColor: "#bf0d3e" //need ternary fn to toggle if opp vs. month
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 2000,
            easing: "easeInCirc"
          },
          scales: {
            yAxes: [
              {
                afterTickToLabelConversion: function(x) {
                  for (var tick in x.ticks) {
                    if (x.ticks[tick].includes("0.")) {
                      x.ticks[tick] = x.ticks[tick].slice(1);
                      x.ticks[tick] += "00";
                    } else {
                      x.ticks[tick] += "0";
                    }
                  }
                }
              }
            ]
          }
        }
      });
    }
  },

  async created() {
    this.player = this.$route.query.player;
    console.log(this.player);

    [this.labels, this.avgData, this.opsData] = this.player.oppAvgOps;
  },
  mounted() {
    this.createChart("playerStats");
  }
};
</script>

<style scoped>
.main-container {
  height: 94%;
  width: 96%;
  padding: 2%;
  display: grid;
  grid-template: 5% 45% 50%/ 100%;

  background: #041e42;
  color: #EBEBEB;
}

.back-to-main {
  text-align: left;
}

.pic-stats-wrapper {
  display: grid;
  grid-template-columns: 25% 75%;
}

.pic-name {
  display: grid;
  grid-template: 70% 30% / 100%;
}

.stats {
  display: grid;
  align-items: center;
  font-size: 20px;
}

.all-stats {
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(3, 1fr);
}

.chart-container {
  width: 90vw;
  height: 80%;
}

.toggle-chart {
  display: flex;
  justify-content: center;
  align-items: center;
}

.radio {
  margin-left: 10px;
}

img {
  border-radius: 15px;
}

h2 {
  font-size: 25px;
}

h3 {
  margin: 8px 0 0 0;
}

label {
  margin-left: 3px;
}
</style>