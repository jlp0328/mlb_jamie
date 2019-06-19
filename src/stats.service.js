/* eslint-disable no-console */
import axios from "axios";
import _ from "lodash";

import Players from "./config";

const BASE_URL = process.env.VUE_APP_BASE_URL;

export default {
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

  async createPlayerObject(player) {
    let playerData;

    try {
      playerData = await this.fetchData(player);

      playerData = playerData.map(elem => {
        //Loop through each array and manipulate so correct!
        let headers = elem.header;
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

      //   this.headers = this.playerData.header
      //     ? this.playerData.header
      //     : "Some default label";
      //   this.seasonData = this.playerData.rows;
      //   // Think about component defaults
      //   this.headers = this.headers.map(elem => {
      //     return elem.label ? elem.label : "{Default Label}";
      //   });

      //   this.seasonData = this.seasonData.map(game => {
      //     let newArr = _.zipObject(this.headers, game);
      //     return newArr;
      //   });

      //   return this.seasonData;

      //   let totalHomeRuns = this.totalDataPoint(this.seasonData, "HR");
      //   let totalRunsBattedIn = this.totalDataPoint(this.seasonData, "RBI");
      //   let totalStrikeOuts = this.totalDataPoint(this.seasonData, "K");
      // Return <Player ...props />
      //   return [totalHomeRuns, totalRunsBattedIn, totalStrikeOuts];
    } catch (err) {
      // Return <Player ...props mainPlayerData="Default data" />
      console.log(err);
    }
    return playerData;
  },

  async getPlayerData(player) {
    return await axios.get(player);
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
  },

  async getPlayerImages(players) {
    let allInfo = await this.createPlayerObject(players);

    allInfo = allInfo.map((arr, index) => {

      arr = {
        id: index + 1,
        name: arr[0].fullName,
        image: arr[0].playerImage,
        team: arr[0].teamImage,
        totalHR: this.totalDataPoint(arr, "HR"),
        totalRBI: this.totalDataPoint(arr, "RBI"),
        totalK: this.totalDataPoint(arr, "K"),
        games: arr
      };

      return arr;
    });

    return allInfo;
  }
};
