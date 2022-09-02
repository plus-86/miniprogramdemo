import {
  random,
  uniq
} from '../../utils/lodash.min'
Page({
  data: {
    bubble: [],
    showMask: false,
    maskTitle: ''
  },
  async onLoad() {
    console.log()
    this.randomBubble()
  },
  removeCover(){
    this.setData({
      showMask:false,
    })
  },
  showCover(e){
    let title = e.currentTarget.dataset.title
    let index = e.currentTarget.dataset.index
    let newBubble = this.data.bubble
    newBubble[index]['isshow'] = false
    this.setData({
      bubble:newBubble,
      showMask:true,
      maskTitle: title
    })
  },
  randomBubble() {
    let bubble = [{
      title: '喝8杯水',
      isshow: true
    }, {
      title: '不吃外卖',
      isshow: true
    }, {
      title: '不久坐',
      isshow: true
    }, {
      title: '步行超过1千米',
      isshow: true
    }, {
      title: '23点之前睡觉',
      isshow: true
    }]

    let [size, top, left] = [
      [],
      [],
      []
    ]
    // 获取屏幕宽高，限定范围
    let {
      windowWidth,
      windowHeight
    } = wx.getSystemInfoSync()
    // 创建随机大小，且不同尺寸的圆
    while (size.length < 5) {
      size.push(`${random(50,100)}`)
      size = uniq(size)
    }
    // 给第一个圆定位
    left.push(`${Math.abs(random(0,windowWidth) - 100)}`)
    top.push(`${Math.abs(random(0,windowHeight) - 100)}`)

    while (top.length < 5) {
      // 新的圆位置
      let newx = `${Math.abs(random(0, windowWidth) - 100)}`
      let newy = `${Math.abs(random(0, windowHeight) - 100)}`

      let isAvailableArr = []
      // 判断新建的圆形位置，与之前每一项是否有重叠
      for (let i in top) {
        let oldx = left[i]
        let oldy = top[i]
        isAvailableArr.push(this.isAvailable(newx, newy, oldx, oldy))
      }
      // 没有重叠则推入数组
      if (isAvailableArr.every(item => item == true)) {
        left.push(newx)
        top.push(newy)
      }

    }
    for (let i in bubble) {
      bubble[i]['size'] = size[i]
      bubble[i]['top'] = top[i]
      bubble[i]['left'] = left[i]
    }
    this.setData({
      bubble
    })
  },
  isAvailable(newX, NewY, oldX, oldY) {
    let isAvailable = false
    let n1 = newX - oldX
    let n2 = NewY - oldY
    let p = Math.pow(n1, 2) + Math.pow(n2, 2)
    if (p > Math.pow(100, 2)) {
      isAvailable = true
    }
    return isAvailable
  }
})