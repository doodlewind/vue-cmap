
import 'babel-polyfill'
import loader from './loader'

// 将数据转为颜色
function getColor(scale, val) {
    var s = scale.find(s => val <= s.threshold)
    return s ? s.color : 'lightgrey'
}

// 设置国家视图中各省 Feature 样式
function provinceStyle(feature, conf, data) {
  var provinceName = feature.properties.name
  var province = data.find(item => item.name == provinceName)
  var style = conf.tileStyle

  return {
    weight: style.weight,
    opacity: style.opacity,
    color: style.borderColor,
    dashArray: style.dashArray,
    fillColor: province ? getColor(conf.scale, province.value) : 'lightgrey',
    fillOpacity: style.fillOpacity
  }
}

// 设置省级视图中各市 Feature 样式
function cityStyle(feature, conf, vm) {
  var provinceData = vm.mapData.find(d => d.name == vm.currentProvince)
  var cityName = feature.properties.name
  var cityData = provinceData.children.find(d => cityName.indexOf(d.name) >= 0)
  var cityValue = cityData ? cityData.value : null
  var style = conf.tileStyle

  return {
    weight: style.weight,
    opacity: style.opacity,
    color: style.borderColor,
    dashArray: style.dashArray,
    fillColor: cityValue ? getColor(conf.scale, cityValue) : 'lightgrey',
    fillOpacity: style.fillOpacity
  }
}

// 设置 hover 时样式
function highlightFeature(vm, type, style, e) {
  var layer = e.target;
  layer.setStyle({
    weight: style.weight,
    color: style.borderColor,
    dashArray: style.dashArray,
    fillOpacity: style.fillOpacity
  })
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront()
  }
  vm.showInfo(type, e.target.feature.properties.name)
}

// 重置高亮样式
function resetHighlight(vm, geojson, e) {
  geojson.resetStyle(e.target)
  vm.hideInfo()
}


// 放大，渲染省级视图
function zoomIn(vm, conf, country, map, e) {
  vm.currentProvince = e.target.feature.properties.name
  var province = loader.getProvince(vm.currentProvince)
  // 省份无数据时不放大
  if (!vm.mapData.find(p => p.name == vm.currentProvince)) return
  vm.isLoading = true
  loader.load(province, data => {
    vm.province = L.geoJson(data, {
      // 省级视图下，各市的数据渲染和 hover 状态
      style: feature => cityStyle(feature, conf, vm),
      onEachFeature: (feature, layer) => {
        layer.on({
          mouseover: e => highlightFeature(vm, 'province', conf.highlightStyle, e),
          mouseout: e => resetHighlight(vm, vm.province, e)
        })
      }
    }).addTo(map)
    map.fitBounds(e.target.getBounds())
    map.removeLayer(country)
    vm.zoomed = true
    vm.isLoading = false
  })
  vm.hideInfo()
}

// 返回国家视图
function backToCountry(vm, conf, map) {
  vm.currentProvince = null
  vm.isLoading = true
  map.fitBounds(conf.countryBounds)
  loader.load('china', data => {
    var country = L.geoJson(data, {
      // 国家视图下，各省的数据渲染和 hover 状态
      style: feature => provinceStyle(feature, conf, vm.mapData),
      onEachFeature: (feature, layer) => {
        layer.on({
          mouseover: e => highlightFeature(vm, 'country', conf.highlightStyle, e),
          mouseout: e => resetHighlight(vm, country, e),
          click: e => zoomIn(vm, conf, country, map, e)
        })
      }
    }).addTo(map);
    vm.isLoading = false
  })
  setTimeout(() => {
    map.removeLayer(vm.province)
  }, 400)
}

export default {
  provinceStyle,
  highlightFeature,
  resetHighlight,
  zoomIn,
  backToCountry
}
