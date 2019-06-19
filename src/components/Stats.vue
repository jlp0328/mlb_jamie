<template>
  <div class="main-container">
    <div class="pic-container">
      <img :src="`${this.player.image}`">
      <h2>{{this.player.name}}</h2>
    </div>
    <div>
      <dl>
        <dt>Total Homeruns</dt>
        <dd>{{this.player.totalHR}}</dd>
      </dl>
      <dl>
        <dt>Total RBI's</dt>
        <dd>{{this.player.totalRBI}}</dd>
      </dl>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";

import statsService from "../stats.service";
import Players from "../config";

export default {
  data() {
    return {
      player: []
    };
  },
  methods: {},
  async created() {
    this.player = this.$route.query.player;
    console.log(this.player);
  }
};
</script>

<style scoped>
.main-container {
  display: grid;
  grid-template-rows: 40% 60%;
  grid-template-columns: 40% 60%;
  height: 100vh;
}

.pic-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

img {
  border-radius: 15px;
}

dl {
  display: flex;
}
</style>