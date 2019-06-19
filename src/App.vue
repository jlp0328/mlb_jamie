<template>
  <div id="app">
    <transition name="stats">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Stats from "./components/Stats.vue";
import Landing from "./components/Landing.vue";

export default {
  name: "app",
  components: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: linear-gradient(#93a5cf, #e2d1c3);
}

.stats-enter-active {
  animation: coming 1s;
  animation-delay: 0.5s;
  opacity: 0;
}
.stats-leave-active {
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
