<template>
<transition name="fade-forward" v-show="visible">
  <div class="wrapper" v-show="visible">
    <my-header class="header">
      <span slot="left" @click="cancel">取消</span>
      <div slot="center">
        <span>选择标签</span>
        <span v-show="values.length" v-if="hackReset">({{values.length}})</span>
      </div>
      <span @click="complete" slot="right">完成</span>
    </my-header>

     <div class="scroll-list-wrap" v-if="hackReset">
        <cube-scroll
          ref="scroll"
          :options="options">
          <div class="content">
             <div class="type-tips">请选择合适的标签，最多可选择3个</div>
              <div  class="type-container">
                <div class="type-container-wrap">
                  <div class="type-wrap">{{types[0].text}}</div>
                  <ul data-type="0">
                    <li v-for="(item, index) in types[0].tags.slice(0, 6)" :key="item.txt" @click.stop="toChecked(index, $event)" ref="LiZero" :class="[item.class ? 'active' : '']">
                      <span>
                        {{item.txt}}
                      </span>
                      <span class="checked">
                      </span>
                    </li>
                  </ul>
                </div>

                <ul class="bottom-ul" data-type="0">
                  <li v-for="(item, index) in types[0].tags.slice(6)" :key="item.txt" @click.stop="toChecked(index+6, $event)" ref="LiZero" :class="[item.class ? 'active' : '']">
                    <span>
                      {{item.txt}}
                    </span>
                     <span class="checked">
                      </span>
                  </li>
                </ul>
              </div>

               <div  class="type-container">
                <div class="type-container-wrap">
                  <div class="type-wrap">{{types[1].text}}</div>
                  <ul data-type="1">
                    <li v-for="(item, index) in types[1].tags.slice(0, 6)" :key="item.txt" @click.stop="toChecked(index, $event)" ref="LiOne" :class="[item.class ? 'active' : '']">
                      <span>
                        {{item.txt}}
                      </span>
                       <span class="checked">
                      </span>
                    </li>
                  </ul>
                </div>

                <ul class="bottom-ul" data-type="1">
                  <li v-for="(item, index) in types[1].tags.slice(6)" :key="item.txt" @click.stop="toChecked(index+6, $event)"  ref="LiOne" :class="[item.class ? 'active' : '']">
                    <span>
                      {{item.txt}}
                    </span>
                     <span class="checked">
                      </span>
                  </li>
                </ul>
              </div>

               <div  class="type-container">
                <div class="type-container-wrap">
                  <div class="type-wrap">{{types[2].text}}</div>
                  <ul data-type="2">
                    <li v-for="(item, index) in types[2].tags.slice(0, 6)" :key="item.txt" @click.stop="toChecked(index, $event)" ref="LiTwo" :class="[item.class ? 'active' : '']">
                      <span>
                        {{item.txt}}
                      </span>
                       <span class="checked">
                      </span>
                    </li>
                  </ul>
                </div>

                <ul class="bottom-ul" data-type="2">
                  <li v-for="(item, index) in types[2].tags.slice(6)" :key="item.txt" @click.stop="toChecked(index+6, $event)" ref="LiTwo" :class="[item.class ? 'active' : '']">
                    <span>
                      {{item.txt}}
                    </span>
                     <span class="checked">
                      </span>
                  </li>
                </ul>
              </div>

               <div  class="type-container">
                <div class="type-container-wrap">
                  <div class="type-wrap">{{types[3].text}}</div>
                  <ul data-type="3">
                    <li v-for="(item, index) in types[3].tags.slice(0, 6)" :key="item.txt" @click.stop="toChecked(index, $event)" ref="LiThree" :class="[item.class ? 'active' : '']">
                      <span>
                        {{item.txt}}
                      </span>
                       <span class="checked">
                      </span>
                    </li>
                  </ul>
                </div>

                <ul class="bottom-ul" data-type="3">  
                  <li v-for="(item, index) in types[3].tags.slice(6)" :key="item.txt" @click.stop="toChecked(index+6, $event)" ref="LiThree" :class="[item.class ? 'active' : '']">
                    <span>
                      {{item.txt}}
                    </span>
                     <span class="checked">
                      </span>
                  </li>
                </ul>
              </div>

              
          </div>
        </cube-scroll>
      </div> 
  </div>
  </transition>
</template>

<script>
import MyHeader from '../../../base/navbar/navbar'
export default {
  components: {
    MyHeader
  },
  props: {
    // tags:{
    //   type:Array,
    //   default:[]
    // },
    playlist: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      visible: false,
      hackReset: true,
      options: {
        scrollbar: true
      },
      values: [],
      active: 'active',
      types: [
        {
          tags: [
            {
              txt: '华语',
              class: ''
            },
            {
              txt: '欧美',
              class: ''
            },
            {
              txt: '日语',
              class: ''
            },
            {
              txt: '韩语',
              class: ''
            },
            {
              txt: '粤语',
              class: ''
            },
            {
              txt: '小语种',
              class: ''
            }
          ],
          text: '语种'
        },
        {
          tags: [
            {
              txt: '流行',
              class: ''
            },
            {
              txt: '摇滚',
              class: ''
            },
            {
              txt: '民谣',
              class: ''
            },
            {
              txt: '电子',
              class: ''
            },
            {
              txt: '说唱',
              class: ''
            },
            {
              txt: '轻音乐',
              class: ''
            },
            {
              txt: '爵士',
              class: ''
            },
            {
              txt: '乡村',
              class: ''
            },
            {
              txt: 'R&B/Soul',
              class: ''
            },
            {
              txt: '古典',
              class: ''
            },
            {
              txt: '民族',
              class: ''
            },
            {
              txt: '英伦',
              class: ''
            },
            {
              txt: '金属',
              class: ''
            },
            {
              txt: '朋克',
              class: ''
            },
            {
              txt: '蓝调',
              class: ''
            },
            {
              txt: '雷鬼',
              class: ''
            },
            {
              txt: '世界音乐',
              class: ''
            },
            {
              txt: '拉丁',
              class: ''
            },
            {
              txt: '另类/独立',
              class: ''
            },
            {
              txt: 'New Age',
              class: ''
            },
            {
              txt: '古风',
              class: ''
            },
            {
              txt: 'Bossa Nova',
              class: ''
            },
            {
              txt: '后摇',
              class: ''
            },
            {
              txt: '舞曲',
              class: ''
            },
            {
              txt: '音乐剧',
              class: ''
            }
          ],
          text: '风格'
        },
        {
          tags: [
            {
              txt: '清晨',
              class: ''
            },
            {
              txt: '夜晚',
              class: ''
            },
            {
              txt: '学习',
              class: ''
            },
            {
              txt: '工作',
              class: ''
            },
            {
              txt: '午休',
              class: ''
            },
            {
              txt: '下午茶',
              class: ''
            },
            {
              txt: '地铁',
              class: ''
            },
            {
              txt: '驾车',
              class: ''
            },
            {
              txt: '运动',
              class: ''
            },
            {
              txt: '旅行',
              class: ''
            },
            {
              txt: '散步',
              class: ''
            },
            {
              txt: '酒吧',
              class: ''
            }
          ],
          text: '场景'
        },
        {
          tags: [
            {
              txt: '怀旧',
              class: ''
            },
            {
              txt: '清新',
              class: ''
            },
            {
              txt: '浪漫',
              class: ''
            },
            {
              txt: '性感',
              class: ''
            },
            {
              txt: '伤感',
              class: ''
            },
            {
              txt: '治愈',
              class: ''
            },
            {
              txt: '放松',
              class: ''
            },
            {
              txt: '孤独',
              class: ''
            },
            {
              txt: '感动',
              class: ''
            },
            {
              txt: '兴奋',
              class: ''
            },
            {
              txt: '快乐',
              class: ''
            },
            {
              txt: '安静',
              class: ''
            },
            {
              txt: '思念',
              class: ''
            }
          ],
          text: '情感'
        },
        {
          tags: [
            {
              txt: '校园',
              class: ''
            },
            {
              txt: '影视原声',
              class: ''
            },
            {
              txt: '游戏',
              class: ''
            },
            {
              txt: '70后',
              class: ''
            },
            {
              txt: '80后',
              class: ''
            },
            {
              txt: '90后',
              class: ''
            },
            {
              txt: '网络歌曲',
              class: ''
            },
            {
              txt: 'KTV',
              class: ''
            },
            {
              txt: '经典',
              class: ''
            },
            {
              txt: '翻唱',
              class: ''
            },
            {
              txt: '吉他',
              class: ''
            },
            {
              txt: '钢琴',
              class: ''
            },
            {
              txt: '器乐',
              class: ''
            },
            {
              txt: '儿童',
              class: ''
            },
            {
              txt: '榜单',
              class: ''
            },
            {
              txt: 'ACG',
              class: ''
            },
            {
              txt: '00后',
              class: ''
            }
          ],
          text: '主题'
        }
      ]
    }
  },
  watch: {},
  computed: {},
  methods: {
    cancel () {
      this.hackReset = false // 刷新重新传值
      this.values = this.playlist.tags.slice(0)
      this.$nextTick(() => {
        this.visible = false
        this.hackReset = true
      })
    },
    complete () {
      this.visible = false
      if (!this.values.length) return
      if (this.diffArr(this.values, this.playlist.tags).length === 0) return
      let dirrArr = this.diffArr(this.values, this.playlist.tags)
      dirrArr.forEach(item => {
        this.$api.songLists.updatetags(this.playlist.id, item).then(res => {
          console.log(res.data)
        })
      })
      this.playlist.tags = this.values
    },
    show () {
      this.visible = true
    },
    toChecked (index, e) {
      // let parType = e.currentTarget.parentElement.dataset.type
      // if(parType == 0) {
      //   this.$refs.LiZero[index].className === 'active' ? this.$refs.LiZero[index].classList.remove('active') : this.$refs.LiZero[index].classList.add('active')
      // }else if(parType == 1) {
      //   this.$refs.LiOne[index].className === 'active' ? this.$refs.LiOne[index].classList.remove('active') : this.$refs.LiOne[index].classList.add('active')
      // }if(parType == 2) {
      //   this.$refs.LiTwo[index].className === 'active' ? this.$refs.LiTwo[index].classList.remove('active') : this.$refs.LiTwo[index].classList.add('active')
      // }if(parType == 3) {
      //   this.$refs.LiThree[index].className === 'active' ? this.$refs.LiThree[index].classList.remove('active') : this.$refs.LiThree[index].classList.add('active')
      // }
      // console.log(e.currentTarget.children[0].innerText)
      // console.log(e.currentTarget.className)

      // this.Checkes()
      // if(this.values.length > 3) {
      //   const toast = this.$createToast({
      //     txt: '最多可选择3个标签',
      //     type: 'error',
      //     zIndex:2001
      //   })
      //   toast.show()
      //   console.log('超出了')
      // }

      if (e.currentTarget.className !== 'active') {
        if (this.values.length >= 3) {
          const toast = this.$createToast({
            txt: '最多可选择3个标签',
            type: 'error',
            zIndex: 2003
          })
          toast.show()
        } else {
          e.currentTarget.classList.add('active')
          this.values.push(e.currentTarget.children[0].innerText)
        }
      } else {
        e.currentTarget.classList.remove('active')
        let ind = this.values.findIndex(ele => {
          return ele === e.currentTarget.children[0].innerText
        })
        this.values.splice(ind, 1)
      }
    },
    // Checkes () {
    //   //去重
    //   for(let i=0; i<this.values.length; i++){
    //         for(let j=i+1; j<this.values.length; j++){
    //             if(this.values[i]==this.values[j]){
    //                 this.values.splice(j,1);
    //                 j--;
    //             }
    //         }
    //     }
    //   return this.values
    // },
    diffArr (arr1, arr2) {
      // 数组找不同
      let arr = arr1.filter(item => {
        return arr2.indexOf(item) === -1
      })
      return arr
    },
    setTag () {
      this.values = this.playlist.tags.slice(0)
      if (!this.playlist.tags.length) return
      // let indi = [
      //   // {'i': []},
      //   // {'i': []},
      //   // {'i': []},
      //   // {'i': []}
      //   [],
      //   [],
      //   [],
      //   []
      // ]
      let ind = -1
      this.playlist.tags.forEach(item => {
        for (let i = 0; i < this.types.length; i++) {
          ind = this.types[i].tags.findIndex(ele => {
            return item === ele.txt
          })
          if (ind >= 0) {
          //  indi[i].i.push(ind)
          // indi[i].push(ind)
            this.types[i].tags[ind].class = 'active'
          // console.log(this.types[i].tags[ind])
          }
        }
      })
    }

  },
  created () {
    this.setTag()
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.scroll.refresh()
    })
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .wrapper
    height:667px
    width:375px
    position: absolute
    top: 0
    bottom: 0
    left: 0
    z-index:2002
    background-color:white
    .header
      font-size:$font-size-medium-x
    .type-tips
      font-size:$font-size-small
      padding-left:15px
      margin-top:50px
      height:25px
      line-height:25px
      color:gray
    .type-container
      height:auto  
      font-size:$font-size-medium - 1
      border-bottom:5px solid rgba(128,128,128,.1)
      width:100%
      .type-container-wrap
        display:flex
        margin:auto 10px
        width:100%
        .type-wrap
          height:80px
          width:23%
          flex-center()
          background-color:white
          border:none
        ul
          display:flex
          flex-wrap:wrap 
          flex:1
          li
            border:.5px solid rgba(128,128,128,.1)
            height:40px
            // width:90px
            width:30%
            flex-center()
            background-color:white
      .bottom-ul
        display:flex
        flex-wrap:wrap 
        margin: auto 10px
        width:100%
        li
          border:.5px solid rgba(128,128,128,.1)
          height:40px
          width:23%
          flex-center()
          background-color:white  

  .active
    border:.5px solid red !important
    position:relative
    .checked
      position:absolute
      height:16px
      width:16px
      background-color:red
      color:white
      bottom:0
      right:0
      border-radius: 16px 0 0 0
    .checked:before
      content: ''
      position: absolute
      width: 7px
      height: 3px
      background: transparent
      bottom: 3px
      right: 0px
      border: 2px solid white
      border-top: none
      border-right: none
      -webkit-transform: rotate(-55deg)
      -ms-transform: rotate(-55deg)
      transform: rotate(-55deg)
      z-index: 1   



  .scroll-list-wrap
    height:667px 
    .content   
      width:100%
      height:auto    
      margin-bottom:10px 

    /*动画效果*/
  .fade-forward-enter-active,
  .fade-forward-leave-active
    transition: transform .3s ease-in

  .fade-forward-enter,
  .fade-forward-leave-to
    transform: translateY(667px)  

</style>