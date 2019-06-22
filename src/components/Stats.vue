<template>
  <div class="main-container">
    <router-link :to="{path: '/'}">
      <div class="back-to-main">
        <a>Back</a>
      </div>
    </router-link>
    <div class="pic-stats-wrapper">
      <div class="pic-name">
        <div class="team-pic">
          <img :src="`${this.player.teamPic}`">
        </div>
        <img :src="`${this.player.image}`">
        <h2>{{this.player.name}}</h2>
      </div>

      <div class="stats">
        <h3>
          <span class="red">2018</span> @ The Plate
        </h3>
        <div class="all-stats">
          <p>
            <strong>AVG:</strong>
            {{this.player.avg}}
          </p>
          <p>
            <strong>OPS:</strong>
            {{this.player.ops}}
          </p>
          <p>
            <strong>HR:</strong>
            {{this.player.totalHR}}
          </p>
          <p>
            <strong>RBI:</strong>
            {{this.player.totalRBI}}
          </p>
          <p>
            <strong>OBP:</strong>
            {{this.player.obp}}
          </p>
          <p>
            <strong>K:</strong>
            {{this.player.totalK}}
          </p>
        </div>
        <div class="toggle-chart">
          <div>
            <h4>Batting Average and OPS By:</h4>
          </div>
          <div class="radio">
            <input
              type="radio"
              name="stats"
              value="opponent"
              id="opp-stats"
              @click="toggleMainLabel()"
              checked
            >
            <label for="opp-stats">Opponent</label>
          </div>
          <div class="radio">
            <input
              type="radio"
              name="stats"
              value="month"
              id="mon-stats"
              @click="toggleMainLabel()"
            >
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
    };
  },
  methods: {
    toggleMainLabel() {
      if (this.showOpponent) {
        this.showOpponent = false;
        [this.labels, this.avgData, this.opsData] = this.player.monthAvgOps;
        this.createChart("playerStats");
      } else {
        this.showOpponent = true;
        return ([
          this.labels,
          this.avgData,
          this.opsData
        ] = this.player.oppAvgOps);
        this.createChart("playerStats");
      }
    },
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      let myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.labels,
          datasets: [
            {
              label: "Batting Average",
              data: this.avgData,
              backgroundColor: "#EBEBEB"
            },
            {
              label: "OPS",
              data: this.opsData,
              backgroundColor: "#bf0d3e"
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
          legend: {
            labels: {
              fontColor: "#EBEBEB",
              fontSize: 16
            }
          },
          tooltips: {
            mode: "label"
          },
          hover: {
            mode: "nearest",
            intersect: true
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: "#EBEBEB"
                },
                ticks: {
                  fontColor: "#EBEBEB"
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  color: "#EBEBEB"
                },
                ticks: {
                  fontColor: "#EBEBEB"
                },
                scaleLabel: {
                  fontColor: "#EBEBEB"
                },
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
  color: #ebebeb;
}

.back-to-main {
  text-align: left;
  color: white;
}

.pic-stats-wrapper {
  display: grid;
  grid-template-columns: 22% 78%;
}

.pic-name {
  display: grid;
  grid-template: 10% 60% 30% / 100%;
  justify-items: center;
  align-items: center;
}

.stats {
  display: grid;
  align-items: center;
  font-size: 20px;
}

.all-stats {
  display: grid;
  grid-template: repeat(1, 1fr) / repeat(6, 1fr);
}

.chart-container {
  margin: 0 3% 0 3%;
  width: 94%;
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

.team-pic {
  border-radius: 15px;
  transform: translate(-50px, 20px);
  height: 65px;
  width: 65px;
  border-radius: 50%;
  background-color: white;
  display: grid;
  justify-items: center;
  align-items: center;
}

.red {
  color: #bf0d3e;
}

h2 {
  margin: 0;
  font-size: 25px;
}

h3 {
  margin: 8px 0 0 0;
  font-size: 30px;
}

label {
  margin-left: 3px;
}
</style>