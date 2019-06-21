<template>
  <div class="landing-wrapper">
    <h1>2018 Season Comparison</h1>
    <div class="player-container">
      <div v-for="player in this.players">
        <PlayerCard :player="player"/>
      </div>
    </div>
  </div>
</template>

<script>
import PlayerCard from "./PlayerCard";
import statsService from "../stats.service";
import Players from "../config";

export default {
  name: "Landing",
  components: {
    PlayerCard
  },
  data() {
    return {
      players: []
    };
  },

  async created() {
    this.players = await statsService.createPlayerViewModel(Players);
    console.log(this.players);
  }
};
</script>

<style scoped>
.landing-wrapper {
  display: grid;
  height: 100%;
  grid-template: 1fr 3fr / 100%;
  overflow: hidden;
  background: linear-gradient(to bottom, #041e42, #041e42, #041e42, #bf0d3e);
}

h1 {
  color: white;
}
.player-container {
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  height: 100%;
}

img {
  width: 50px;
  height: auto;
}
</style>