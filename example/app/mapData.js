function rnd() {
  return parseInt(Math.random() * 1500)
}

export default {
  data: [
    {
      name: "安徽",
      value: rnd(),
      children: [
        { name: "六安市", value: rnd() },
        { name: "安庆市", value: rnd() },
        { name: "滁州市", value: rnd() },
        { name: "宣城市", value: rnd() },
        { name: "阜阳市", value: rnd() },
        { name: "宿州市", value: rnd() },
        { name: "黄山市", value: rnd() },
        { name: "巢湖市", value: rnd() },
        { name: "亳州市", value: rnd() },
        { name: "池州市", value: rnd() },
        { name: "合肥市", value: rnd() },
        { name: "蚌埠市", value: rnd() },
        { name: "芜湖市", value: rnd() },
        { name: "淮北市", value: rnd() },
        { name: "淮南市", value: rnd() },
        { name: "马鞍山市", value: rnd() },
        { name: "铜陵市", value: rnd() }
      ]
    },
    { name: '北京', value: rnd(), children: [] },
    { name: '重庆', value: rnd(), children: [] },

    { name: '甘肃', value: rnd(), children: [] },
    { name: '广东', value: rnd(), children: [] },
    { name: '广西', value: rnd(), children: [] },
    { name: '贵州', value: rnd(), children: [] },
    { name: '海南', value: rnd(), children: [] },
    { name: '河北', value: rnd(), children: [] },
    { name: '黑龙江', value: rnd(), children: [] },
    { name: '河南', value: rnd(), children: [] },
    { name: '香港', value: rnd(), children: [] },
    { name: '湖北', value: rnd(), children: [] },
    { name: '湖南', value: rnd(), children: [] },
    { name: '江苏', value: rnd(), children: [] },
    { name: '江西', value: rnd(), children: [] },
    { name: '吉林', value: rnd(), children: [] },
    { name: '辽宁', value: rnd(), children: [] },
    { name: '澳门', value: rnd(), children: [] },
    { name: '内蒙古', value: rnd(), children: [] },
    { name: '宁夏', value: rnd(), children: [] },
    { name: '青海', value: rnd(), children: [] },
    { name: '山西', value: rnd(), children: [] },
    { name: '陕西', value: rnd(), children: [] },
    { name: '山东', value: rnd(), children: [] },
    { name: '上海', value: rnd(), children: [] },
    { name: '四川', value: rnd(), children: [] },
    { name: '台湾', value: rnd(), children: [] },
    { name: '天津', value: rnd(), children: [] },
    { name: '新疆', value: rnd(), children: [] },
    { name: '西藏', value: rnd(), children: [] },
    { name: '云南', value: rnd(), children: [] },
    { name: '浙江', value: rnd(), children: [] }
  ]
}