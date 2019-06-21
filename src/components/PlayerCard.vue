<template>
  <div>
    <router-link :to="{path: id, query: {player: player}}">
      <div class="baseball-card zoom" :style='{ backgroundImage: "url(" + player.image + ")", }'>
        <div class="team">
          <img :src="`${player.teamPic}`">
        </div>
        <div class="name">
          <h2>{{player.name}}</h2>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["player"],
  computed: {
    id: function() {
      return `/player/${this.player.id}`;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Playball&display=swap");
@import url('https://fonts.googleapis.com/css?family=Graduate&display=swap');

a {
  text-decoration: none;
}

h2 {
  color: #041e43;
}

img {
  border-radius: 15px;
}

.baseball-card {
  position: relative;
  font-family:'Graduate', cursive;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #EBEBEB;
  /* background-color: whitesmoke; */
  background-repeat: no-repeat;
  background-position: 50% 40%;
  height: 263px;
  width: 175px;
  /* border: 1px solid black; */
  box-shadow: 0 0 35px black;
}

.team {
  transform: translate(10px, 10px);
  height: 65px;
  width: 65px;
  border-radius: 50%;
  background-color: white;
  display: grid;
  justify-items: center;
  align-items: center;
}

.name {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 15%;
  transform: translateY(-25px)
}

.name h2 {
  font-size: 14px;
  margin: 10px 10px;
}

.zoom {
  transition: all ease 500ms;
}

.zoom:hover {
  transform: scale(1.1);
  transition: all ease 500ms;
}

.stats-anim-enter-active {
  animation: coming 1s;
  animation-delay: .5s;
  opacity: 0;
}
.stats-anim-leave-active {
  animation: going 1s;
}

@keyframes going {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50px);
    opacity: 0;
  }
}
@keyframes coming {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>