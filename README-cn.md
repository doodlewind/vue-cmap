# vue-cmap
Vue 中国地图可视化组件，支持 Drilldown 切换国家 / 省份视图

![vue-cmap-country](http://7u2gqx.com1.z0.glb.clouddn.com/vue-cmap-1.png)

![vue-cmap-province](http://7u2gqx.com1.z0.glb.clouddn.com/vue-cmap-2.png)


## 特性
* 平滑的省市视图切换
* 可叠加 OpenStreetMap 贴片地图
* 惰性加载地形数据（基于 Code Splitting，无需配置后端接口）
* 参数化的定制样式
* 极轻，初始数据量小于 80K


## Demo
Clone 本仓库并执行构建：

``` text
cd vue-cmap/example
npm run dev
```


## 导入
按标准 Vue 组件导入方式导入即可：

``` text
npm install vue-cmap
```

``` html
<template>
  <c-map :mapData="myMapData"></c-map>
</template>

<script>
import CMap from 'vue-cmap'

export default {
  data() {
    return {
      myMapData: [
        { name: "安徽", value: 200, children: [] }
      ]
    }
  },
  components: { CMap }
}
</script>
```


## API
CMap 组件的数据和配置均以 Vue 的标准 `props` 形式传入，若地图数据在初始化 CMap 后保持不变，可在引入组件时添加 `v-once` 指令以优化性能：

``` html
<c-map
  v-once
  :mapData="myMapData"
  :mapConf="myMapConf">
</c-map>
```

### mapData
通过该 `props` 传入省市数据。由于全国城市数量固定，故在此可将省份和城市数据全量传入，传入省市数据的顺序、数量均不限（缺少数据的省市会显示为灰色）。数据格式如下：

``` js
const myMapData = [
  {
    // name 需与省份中文名保持一致
    name: "安徽",
    value: 200,
    children: [
      { name: "黄山市", value: 100 },
      { name: "合肥市", value: 100 }
      // ...
    ]
  },
  { name: '北京', value: 300, children: [] }
  // ...
]
```

### mapConf
通过该 `props` 传入 CMap 配置参数信息。传入的参数将与如下的默认参数合并后，再用于渲染图表：

``` js
export default {
  colors: ['#800026', '#BD0026', '#E31A1C', '#FC4E2A', '#FD8D3C', '#FEB24C', '#FED976', '#FFEDA0'],
  scale: null,
  width: '100%',
  height: '550px',
  hasCityView: true,
  hasTileLayer: false,
  hasZoomControl: true,
  countryBounds: [[18, 72], [54, 137]],
  tileStyle: {
    weight: 2,
    opacity: 1,
    borderColor: 'white',
    dashArray: 4,
    fillOpacity: 0.7
  },
  highlightStyle: {
    weight: 5,
    borderColor: '#666',
    dashArray: 0,
    fillOpacity: 0.7
  }
}
```

#### width
Type: `String` Default: `100%`

地图区域宽度。

#### height
Type: `String` Default: `550px`

地图区域高度。

#### colors 
Type: `Array`

地图配色数组，数量不限。数组中越靠后的颜色用于渲染越大的数据。数据将按大小顺序均匀分配各颜色。

#### scale
Type: `Object` Default: `null`

需要手动定义地图各颜色阈值时，传入该参数。该参数存在时，`colors` 不生效。格式如下：

``` js
const scale = [
  { color: 'green', threshold: 100 },  // 小于等于 100 的数据为绿色
  { color: 'yellow', threshold: 200 }, // 小于等于 200 的数据为黄色
  { color: 'red', threshold: 300 },    // 小于等于 300 的数据为红色
]
```

在默认情况下 `scale` 由 CMap 组件根据传入数据自动生成，无需手动定义颜色与数据的对应关系。

#### hasCityView
Type: `Boolean` Default: `true`

是否展示各省下的城市详细数据。

#### hasTileLayer
Type: `Boolean` Default: `false`

是否加载来自 Open Street Map 的贴片地图。

#### hasZoomControl
Type: `Boolean` Default: `true`

是否显示地图缩放控件。

#### boxZoom
Type: `Boolean` Default: `true`

是否启用 Shift 拖动鼠标的缩放。

#### doubleClickZoom
Type: `Boolean` Default: `true`

是否启用双击缩放。

#### ScrollWheelZoom
Type: `Boolean` Default: `true`

是否启用滚轮缩放。

#### minZoom
Type: `Number` Default: `3`

最低缩放等级。

#### maxZoom
Type: `Number` Default: `Infinity`

最高缩放等级。

#### countryBounds
Type: `Array` Default: `[[18, 72], [54, 137]]`

初始化时加载的中国经纬度，地图的缩放和平移均限制在该范围内。

#### tileStyle
Type: `Object`

地图省市 Tile 样式，默认参数如下：

``` js
const tileStyle = {
  weight: 2,              // 边框宽度
  opacity: 1,             // 内容透明度
  borderColor: 'white',   // 边框颜色
  dashArray: 4,           // 边框间隔长度
  fillOpacity: 0.7        // 边框透明度
}
```

#### highlightStyle
Type: `Object`

Hover 时的 Tile 样式，默认参数如下：

``` js
const tileStyle = {
  weight: 5,              // 边框宽度
  borderColor: '#666',    // 边框颜色
  dashArray: 0,           // 边框间隔长度
  fillOpacity: 0.7        // 边框透明度
}
```


## Custom
可通过定制 `modules/loader.js` 中 `require` 内容，剪裁出适合业务所需省份范围的构建版本，当只需国家视图时，可去除 `china.json` 之外的省份地形数据导入代码，以减小 Webpack 的构建文件数量。


## License
MIT