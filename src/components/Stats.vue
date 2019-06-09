<template>
  <div>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";

import Players from "../config";

export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      playerData: {},
      headers: [],
      seasonData: []
    };
  },
  methods: {
    async fetchData() {
      let response;
      try {
        response = await axios.get(`${this.baseUrl}${Players.BRYCE_HARPER}`);
      } catch (err) {
        console.log(err);
      }
      return response.data;
    },

    async createPlayerObject() {
      this.playerData = await this.fetchData();
      this.headers = this.playerData.header;
      this.seasonData = this.playerData.rows;

      try {
        this.headers = this.headers.map(elem => {
          return elem.label;
        });

        this.seasonData = this.seasonData.map(game => {
          let newArr = _.zipObject(this.headers, game);
          return newArr;
        });

        let totalHomeRuns = this.totalDataPoint(this.seasonData, 'HR');
        let totalRunsBattedIn = this.totalDataPoint(this.seasonData,'RBI');
        let totalStrikeOuts = this.totalDataPoint(this.seasonData, 'K');
        console.log(totalHomeRuns, totalRunsBattedIn, totalStrikeOuts);
        
      } catch (err) {
        console.log(err);
      }
    },

    calculateTotals(data) {
      let calculate = (acc, current) => acc + current;
      let total = data.reduce(calculate);
      return total;
    },

    totalDataPoint(data, stat) {
      let values = data.map(elem => {
        return elem[stat];
      });

      let total = this.calculateTotals(values);
      return total;
    }
  },
  async created() {
    let seasonStats = await this.createPlayerObject();
  }
};
</script>

<style scoped>
</style>