<template>
  <div class="cmap-container" v-bind:style="{ height: height, width: width}">
    <transition name="fade">
      <div class="cmap-btn" v-if="zoomed" @click="back">返回</div>
    </transition>
    <div class="cmap-info" v-if="hasInfo">
      <b>{{currentTile}}</b>: {{currentTileVal}}
    </div>
    <transition name="fade">
      <div class="cmap-mask" v-if="isLoading">
        <p>Loading…</p>
      </div>
    </transition>
  </div>
</template>

<script>
  import 'leaflet/dist/leaflet.css'
  import L from 'leaflet'
  import loader from './modules/loader'
  import render from './modules/render'
  import initConf from './modules/conf'
  var conf = {}

  export default {
    props: ['mapData', 'mapConf'],
    created() { conf = Object.assign({}, initConf, this.mapConf) },
    data() {
      return {
        width: this.mapConf ? (this.mapConf.width ? this.mapConf.width : '100%') : '100%',
        height: this.mapConf ? (this.mapConf.height ? this.mapConf.height : '550px') : '550px',
        zoomed: false,
        isLoading: false,
        currentTile: null,
        currentProvince: null,
        currentTileVal: '-',
        hasInfo: false
      }
    },
    methods: {
      back() {
        render.backToCountry(this, conf, this.map)
        this.zoomed = false
        this.currentTile = ''
        this.hasInfo = false
      },
      showInfo(type, name) {
        var area
        if (type == 'country') {
          area = this.mapData.find(p => p.name == name)
        }
        else {
          area = (() => {
            var province = this.mapData.find(p => p.name == this.currentProvince)
            return province ? province.children.find(c => c.name == name) : null
          })()
        }
        this.hasInfo = true
        this.currentTile = name
        this.currentTileVal = area ? area.value : '-'
      },
      hideInfo() {
        this.hasInfo = false
        this.currentTile = ''
        this.currentTileVal = '-'
      }
    },
    mounted() {
      if (!conf.scale) {
        conf.scale = loader.getColorScale(conf.colors, this.mapData)
      }

      var vm = this
      var map = L.map(this.$el, {
        attributionControl: false,
        zoomControl: conf.hasZoomControl,
        maxBounds: conf.countryBounds,
        minZoom: 3
      }).fitBounds(conf.countryBounds)

      if (conf.hasTileLayer) {
        L.tileLayer('//{s}.tile.osm.org/{z}/{x}/{y}.png', {
          // TODO
        }).addTo(map)
      }

      // 初始化国家地图
      vm.isLoading = true
      loader.load('china', data => {
        var country = L.geoJson(data, {
          style: feature => render.provinceStyle(feature, conf, this.mapData),
          onEachFeature: (feature, layer) => {
            layer.on({
              mouseover: e => render.highlightFeature(vm, 'country', conf.highlightStyle, e),
              mouseout: e => render.resetHighlight(vm, country, e),
              // 仅需在初始加载时判断是否需要城市视图
              click: conf.hasCityView ? e => render.zoomIn(vm, conf, country, map, e) : () => {}
            })
          }
        }).addTo(map);
        vm.isLoading = false
      })

      vm.map = map
    }
  }
</script>

<style scoped>
  .cmap-container {
    position: relative;
    margin: 0 auto;
  }
  .cmap-info, .cmap-btn {
    position: absolute;
    height: 25px;
    padding: 5px 15px;
    font: 14px Arial, Helvetica, sans-serif;
    line-height: 25px;
    vertical-align: middle;
    border-radius: 4px;
    box-shadow: 0 2px 3px grey;
    color: black;
    background: white;
    z-index: 999;
    cursor: pointer;
  }
  .cmap-btn {
    bottom: 15px;
    left: 10px;
  }
  .cmap-info {
    bottom: 15px;
    right: 10px;
  }
  .cmap-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: rgba(100, 100, 100, .4);
    z-index: 1000;
  }
  .cmap-mask > p {
    display: block;
    text-align: center;
    color: white;
    font: 20px Arial, Helvetica, sans-serif;
  }

  .leaflet-container {
    background: transparent !important;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s ease;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
