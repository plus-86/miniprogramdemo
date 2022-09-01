import {
  random,
  uniq
} from '../../utils/lodash.min'
Page({
  data: {
    bubble:[],
  },
  async onLoad() {
    console.log()
    this.randomBubble()
  },
  randomBubble() {
    let bubble = [{
      title: '喝8杯水',
      isshow: true
    }, {
      title: '不吃外卖',
      isshow: true
    }, {
      title: '不吃外卖',
      isshow: true
    }, {
      title: '步行超过1千米',
      isshow: true
    }, {
      title: '23点之前睡觉',
      isshow: true
    }]
    
    let [size,width,height] = [[],[],[]]
    let {windowWidth,windowHeight} = wx.getSystemInfoSync()
    while (size.length < 5) {
      size.push(`${random(180,250,false)}rpx`) 
      size = uniq(size)
    }
    while (width.length < 5) {
      width.push(`${random(0,windowWidth,false)}rpx`) 
      width = uniq(width)
    }
    while (height.length < 5) {
      height.push(`${random(0,windowHeight,false)}rpx`) 
      height = uniq(height)
    }
    
    for(let i in bubble){
      bubble[i]['size'] = size[i]
      bubble[i]['top'] = height[i]
      bubble[i]['left'] = width[i] 
    }
    this.setData({
      bubble
    })
    console.log(bubble)
  },
})