/* eslint-disable no-console */
import axios from "axios";
import _ from "lodash";

import Players from "./config";

const BASE_URL = process.env.VUE_APP_BASE_URL;
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

let headers;

export default {
  //Get all player data
  async fetchData(players) {
    let response;
    let multiplayer = [];

    try {
      //Getting all players data at once
      if (_.isPlainObject(players)) {
        for (var key in players) {
          let person = players[key];

          let url = `${BASE_URL}${person}`;
          let data = await this.getPlayerData(url);
          data = data.data;
          multiplayer.push(data);
        }

        response = multiplayer;
      } else {
        //Getting data for single player
        response = await axios.get(`${BASE_URL}${Players.BRYCE_HARPER}`);
        response = [response.data];
      }
    } catch (err) {
      console.log(err);
    }

    return response;
  },

  //Create key value pairs for data
  async createPlayerObject(player) {
    let playerData;

    try {
      playerData = await this.fetchData(player);

      playerData = playerData.map(elem => {
        //Loop through each array and manipulate so correct!
        headers = elem.header;
        let seasonData = elem.rows;

        headers = headers.map(key => {
          return key.label;
        });

        seasonData = seasonData.map(game => {
          let newArr = _.zipObject(headers, game);
          return newArr;
        });

        return seasonData;
      });

    } catch (err) {
      console.log(err);
    }
    return playerData;
  },

  async getPlayerData(player) {
    return await axios.get(player);
  },

  //Add/total data point being passed
  calculateTotals(data) {
    let calculate = (acc, current) => acc + current;
    let total = data.reduce(calculate);
    return total;
  },

  //Get all values into a single array
  totalDataPoint(data, stat) {
    let values = data.map(elem => {
      return elem[stat];
    });

    let total = this.calculateTotals(values);
    return total;
  },

  getTotalsAllLabels(arr) {
    let playerAnnualTotals = {};

    headers.forEach(x => {
      //Only total data points
      if (x.length <= 3) {
        let total = this.totalDataPoint(arr, x);
        playerAnnualTotals[x] = total;
      }
    });

    return playerAnnualTotals;
  },

  calcBattingAvg(sum) {
    return (sum.H / sum.AB).toFixed(3).replace(/\b0\b/g, "");
  },

  calcObp(sum) {
    return (sum.H + sum.BB + sum.HBP) / (sum.AB + sum.BB + sum.SF + sum.HBP);
  },

  calcSlugging(sum) {
    return sum.TB / sum.AB;
  },

  calcOps(obp, slugging) {
    return (obp + slugging).toFixed(3).replace(/\b0\b/g, "");
  },

  createGameObj(grouped) {
    let stats = [];

    for (var key in grouped) {
      let teamObj = {};
      let totals = this.getTotalsAllLabels(grouped[key]);
      if (MONTHS.includes(key)) {
        teamObj["month"] = key;
      } else {
        teamObj["teamName"] = key;
        teamObj["teamPic"] = grouped[key][0].opponentImage;
      }

    teamObj["avg"] = this.calcBattingAvg(totals);
      teamObj["obp"] = this.calcObp(totals);
      teamObj["slugging"] = this.calcSlugging(totals);
      teamObj["ops"] = this.calcOps(teamObj.obp, teamObj.slugging);
      teamObj["hr"] = totals.HR;
      teamObj["rbi"] = totals.RBI;
      teamObj["k"] = totals.K;

      stats.push(teamObj);
    }

    return stats;
  },

  //Create view model with player
  async createPlayerViewModel(players) {
    let allInfo = await this.createPlayerObject(players);

    allInfo = allInfo.map((arr, index) => {
      //Get totals of all stats to use for calculations
      let sum = this.getTotalsAllLabels(arr);

      //Calculate batting avg, OBP, slugging %, OPS
      let avg = this.calcBattingAvg(sum);
      let obp = this.calcObp(sum);
      let slugging = this.calcSlugging(sum);
      let ops = this.calcOps(obp, slugging);

      //Calculate player totals based on opponent
      let opps = _.groupBy(arr, "opponent");
      let opponentStats = this.createGameObj(opps);

      //Calculate player totals based on month
      arr.forEach(elem => {
        let month = new Date(elem.gameDate).getMonth();
        elem.gameMonth = MONTHS[month];
      });

      let days = _.groupBy(arr, "gameMonth");
      let monthStats = this.createGameObj(days);

      arr = {
        id: index + 1,
        name: arr[0].fullName,
        image: arr[0].playerImage,
        team: arr[0].team,
        teamPic: arr[0].teamImage,
        avg,
        ops,
        slugging: slugging.toFixed(3).replace(/\b0\b/g, ""),
        obp: obp.toFixed(3).replace(/\b0\b/g, ""),
        totalHR: sum.HR,
        totalRBI: sum.RBI,
        totalK: sum.K,
        opponentStats, 
        monthStats
      };

      return arr;
    });

    return allInfo;
  }
};
