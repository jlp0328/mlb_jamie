<template>
  <div class="player-container">
    <div v-for="player in this.players">
      <PlayerCard :player="player"/>
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
    this.players = await statsService.getPlayerImages(Players);
    console.log(this.players);
  }
};
</script>

<style scoped>
.player-container {
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  height: 100vh;
}

</style>