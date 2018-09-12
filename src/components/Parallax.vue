<template>
  <div id="app">
    <div style="position: relative;">
      <parallax :fixed="true">
        <img src="../assets/pexels-photo-196416.jpeg">
      </parallax>
    </div>

    <div style="background-color: #3d3d3d; height: 100vh;"></div>
  </div>
</template>

<script>
import Parallax from './Paral'
export default {
  name: 'app',
  components: {
    Parallax
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}
.fade{
  opacity: 0.5; 
  background-color: #3d3d3d
  /* transform: translate(0%, 110%) matrix(1, 0, 0, 1, 0, 0); */
}
</style>