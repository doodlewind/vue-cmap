<template>
  <div class="app">
    <c-map 
      :mapData="mapData"
      :mapConf="conf">
    </c-map>
  </div>
</template>

<script>
  import Vue from 'vue'
  import CMap from './CMap/CMap.vue'
  import mapData from './mapData'

  export default {
    data() {
      return {
        conf: {
          colors: ['green', 'yellow', 'red'],
          hasTileLayer: false
        },
        mapData: mapData.data
      }
    },
    mounted() {

    },
    components: {
      CMap
    }
  }
</script>

<style>
  html {
    font-size: 100px;
  }
  *, div, span, h1, h2, p, body input {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  body, div, p, span {
    font-size: .16rem;
  }
  .app {
    border: 1px lightgrey solid;
    width: 8rem;
    margin: .5rem auto;
    padding: 0;
  }
</style>
