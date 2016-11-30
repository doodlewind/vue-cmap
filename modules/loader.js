export default {
  getColorScale(colors, data) {
    var sorted = data.map(d => d.value).sort((a, b) => a - b)
    return colors.map((c, i) => { return {
      color: c,
      threshold: sorted[parseInt(sorted.length / colors.length * (i + 1) - 1)]
    }})
  },
  getProvince(name) {
    const mapping = {
      '安徽': 'anhui',
      '北京': 'beijing',
      '重庆': 'chongqing',
      '福建': 'fujian',
      '甘肃': 'gansu',
      '广东': 'guangdong',
      '广西': 'guangxi',
      '贵州': 'guizhou',
      '海南': 'hainan',
      '河北': 'hebei',
      '黑龙江': 'heilongjiang',
      '河南': 'henan',
      '香港': 'hongkong',
      '湖北': 'hubei',
      '湖南': 'hunan',
      '江苏': 'jiangsu',
      '江西': 'jiangxi',
      '吉林': 'jilin',
      '辽宁': 'liaoning',
      '澳门': 'macau',
      '内蒙古': 'neimenggu',
      '宁夏': 'ningxia',
      '青海': 'qinghai',
      '山西': 'shan1xi',
      '陕西': 'shan3xi',
      '山东': 'shandong',
      '上海': 'shanghai',
      '四川': 'sichuan',
      '台湾': 'taiwan',
      '天津': 'tianjin',
      '新疆': 'xinjiang',
      '西藏': 'xizang',
      '云南': 'yunnan',
      '浙江': 'zhejiang'
    }
    return mapping[name]
  },
  load(name, cb) {
    switch(name) {
      case 'china':
        require.ensure([], (require) => cb(require('json!../resources/china.json'))); break
      case 'anhui':
        require.ensure([], (require) => cb(require('json!../resources/anhui.json'))); break
      case 'beijing':
        require.ensure([], (require) => cb(require('json!../resources/beijing.json'))); break
      case 'chongqing':
        require.ensure([], (require) => cb(require('json!../resources/chongqing.json'))); break
      case 'fujian':
        require.ensure([], (require) => cb(require('json!../resources/fujian.json'))); break
      case 'gansu':
        require.ensure([], (require) => cb(require('json!../resources/gansu.json'))); break
      case 'guangdong':
        require.ensure([], (require) => cb(require('json!../resources/guangdong.json'))); break
      case 'guangxi':
        require.ensure([], (require) => cb(require('json!../resources/guangxi.json'))); break
      case 'guizhou':
        require.ensure([], (require) => cb(require('json!../resources/guizhou.json'))); break
      case 'hainan':
        require.ensure([], (require) => cb(require('json!../resources/hainan.json'))); break
      case 'hebei':
        require.ensure([], (require) => cb(require('json!../resources/hebei.json'))); break
      case 'heilongjiang':
        require.ensure([], (require) => cb(require('json!../resources/heilongjiang.json'))); break
      case 'henan':
        require.ensure([], (require) => cb(require('json!../resources/henan.json'))); break
      case 'hongkong':
        require.ensure([], (require) => cb(require('json!../resources/hongkong.json'))); break
      case 'hubei':
        require.ensure([], (require) => cb(require('json!../resources/hubei.json'))); break
      case 'hunan':
        require.ensure([], (require) => cb(require('json!../resources/hunan.json'))); break
      case 'jiangsu':
        require.ensure([], (require) => cb(require('json!../resources/jiangsu.json'))); break
      case 'jiangxi':
        require.ensure([], (require) => cb(require('json!../resources/jiangxi.json'))); break
      case 'jilin':
        require.ensure([], (require) => cb(require('json!../resources/jilin.json'))); break
      case 'liaoning':
        require.ensure([], (require) => cb(require('json!../resources/liaoning.json'))); break
      case 'macau':
        require.ensure([], (require) => cb(require('json!../resources/macau.json'))); break
      case 'neimenggu':
        require.ensure([], (require) => cb(require('json!../resources/neimenggu.json'))); break
      case 'ningxia':
        require.ensure([], (require) => cb(require('json!../resources/ningxia.json'))); break
      case 'qinghai':
        require.ensure([], (require) => cb(require('json!../resources/qinghai.json'))); break
      case 'shan1xi':
        require.ensure([], (require) => cb(require('json!../resources/shan1xi.json'))); break
      case 'shan3xi':
        require.ensure([], (require) => cb(require('json!../resources/shan3xi.json'))); break
      case 'shandong':
        require.ensure([], (require) => cb(require('json!../resources/shandong.json'))); break
      case 'shanghai':
        require.ensure([], (require) => cb(require('json!../resources/shanghai.json'))); break
      case 'sichuan':
        require.ensure([], (require) => cb(require('json!../resources/sichuan.json'))); break
      case 'taiwan':
        require.ensure([], (require) => cb(require('json!../resources/taiwan.json'))); break
      case 'tianjin':
        require.ensure([], (require) => cb(require('json!../resources/tianjin.json'))); break
      case 'xinjiang':
        require.ensure([], (require) => cb(require('json!../resources/xinjiang.json'))); break
      case 'xizang':
        require.ensure([], (require) => cb(require('json!../resources/xizang.json'))); break
      case 'yunnan':
        require.ensure([], (require) => cb(require('json!../resources/yunnan.json'))); break
      case 'zhejiang':
        require.ensure([], (require) => cb(require('json!../resources/zhejiang.json'))); break
    }
  }
}
