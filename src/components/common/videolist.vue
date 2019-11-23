<template>
    <ul>
      <li v-for="(item,index) in videos" :key="item.data.vid">
        <div class="flexdiv">
          <div class="container">
            <div class="wrapper" @click.prevent="playVideo(item,index)">
              <video :poster="item.data.coverUrl"
                     :src="item.data.urlInfo.url"
                     class="video"
                     width="375px"
                     height="200px"
                     id="video"
                     ref="video"
                     :moted="true"
                     @timeupdate="updateTime"

              >
                <source :src="item.data.urlInfo.url" type="audio/mpeg">
              </video>

              <div class="wrap" v-show="wrapShow">
                <div class="grop" v-if="gropshow">22</div>
                <div class="wrapperLeft">
                  <div  v-show="currentshow">
                    <i class="iconfont iconzan1" v-if="currentTimeShow && activeIndex === index"></i>
                    <span v-if="currentTimeShow && activeIndex === index">{{item.data.playTime}}</span>
                    <div v-if="!currentTimeShow && activeIndex === index"> {{Durationms(currentTime)}} / {{item.data.durationms}}</div>
                  </div>
                </div>
<!--                v-show=" playss && activeIndex === index"-->
                <div class="wrapperCenter" v-if="plays">
<!--                  <i class="iconfont iconliuyan" v-if="play && activeIndex === index"></i>-->
<!--                  <i class="iconfont iconnetease" v-else></i>-->
                  <i class="iconfont iconliuyan" v-if="play && activeIndex === index"></i>
                  <i class="iconfont iconnetease" v-else></i>
                </div>

                <div class="wrapperRight" v-show="playTimes && activeIndex === index">
                  <i class="iconfont iconzan1"  v-if="playTime && activeIndex === index"></i>
                  <span  v-if="playTime && activeIndex === index">{{item.data.durationms}}</span>
                  <i class="iconfont iconliuyan" v-if="!playTime && activeIndex === index"></i>
                </div>

              </div>

              <div class="control">
                <div class="speed"  :style="[activeIndex === index ? {width: speedWidth + 'px'} : {width: 0} ]"></div>

                <div class="controlBtn" ref="setWidth" :style="[activeIndex === index ? {left: speedWidth + 'px'} : {left: 0} ]" v-show="controlBtn && activeIndex === index"></div>
              </div>
            </div>

            <div class="title" @click="toPlayerDetail(item.data.vid,item.data.urlInfo.url)">
              <span>
                {{item.data.title}}
              </span>
              <img :src="item.data.creator.avatarUrl" >
            </div>

            <div class="wrapBottom">
              <div class="wrapBottomImg" @click="avatar()">
                <img :src="item.data.creator.avatarUrl">
                <span>{{item.data.creator.nickname}}</span>
              </div>

              <div class="wrapBottomLeft" @click="praisedCount()">
                <i class="iconfont iconzan1"></i>
                <span>{{item.data.praisedCount}}</span>
              </div>

              <div class="wrapBottomCenter" @click="details(item.data.vid,item.data.urlInfo.url)">
                <i class="iconfont iconliuyan"></i>
                <span>{{item.data.commentCount}}</span>
              </div>

              <i class="wrapBottomRight iconfont icon-ellipsis" @click="more()"></i>
            </div>
          </div>
        </div>
      </li>
    </ul>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import {currentVideo} from '../../store/getters'
    import {serializeNumber} from '../../assets/js/number'
    import {durationms} from '../../assets/js/timestamp'

    export default {
        name: "videoList.vue",
        data() {
            return {
                videos:this.videos,
                gropshow:false,
                videoDom:'',
                // isPlay:falste, //是否播放
                currentshow:true,//视频左下角播放量或者进度是否显示
                currentTimeShow:true,//播放量跟播放进度转换
                check:true,//是否显示
                countTime:true, //视频左下角播放量变成播放时间进度
                wrapShow:true, //遮罩层显示
                controlBtn:false, //进度按钮
                playTime:true, //播放总时间是否变成视频全屏按钮
                playTimes:true,//播放总时间或者全屏按钮是否会显示
                plays:true,//播放或暂停按钮显示出来
                // playss:true,
                play:true, //播放和暂停按钮切换
                currentTime:`00:00`, //播放进度时间
                // _currentTime:`00:00`,//保存进度
                activeIndex: -1,
                // duration:'', //视频播放总时间
                speedWidth:0,
                durationms:0,//视频播放总时间
                currentDuration:[{},{}], //存放前后播放视频的播放进度
                durationHistory:[], //存放本视频流页面前后视频播放进度的历史记录

            }
        },
        props: {
            videoGroupId:{
                type:Number,
                required:true
            }
        },
        watch: {
            //videoGroup 的 id 父组件切换时候传过来
            videoGroupId(id) {
                this.getVideos(id);
            }
        },
        created() {
            this.getVideos()
        },
        computed: {
            percent(){
                return this.currentTime / this.durationms
            },
            ...mapGetters([
                'videoList',
                'currentVideo',
                'videoCurrentTime',
                'currentIndex',
                'back'
            ]),
        },
        // mounted() {
        //
        //     this.$nextTick(() => {
        //         this.playVideo();//在mounted()中添加这个方法，就解决了
        //     })
        // },
        methods:{
            getVideos(id) {
                this.$api.video.videolist(id).then((res) => {
                    this.videos = res.data.datas;
                    for(let i=0;i<this.videos.length;i++){
                        this.videos[i].data.playTime = serializeNumber(this.videos[i].data.playTime)
                        this.videos[i].data.durationms = durationms(this.videos[i].data.durationms)
                    }
                    console.log(this.videos)
                })
            },
            playVideo(item,index) {
                //该视频未显示播放进度情况下（非暂停状态），点击容器可播放视频
                // this.$refs.video.play() ***没有用，报错
                // this.videoDom = document.getElementById('video');
                let videoDams = document.getElementsByClassName('video');
                this.videoDom = document.getElementsByClassName('video')[index];
                this.durationms = this.videoDom.duration;
                this.setCurrentIndex(index);
                if(typeof item.isPlay == 'undefined'){
                    //给对象添加属性
                    this.$set(item,'isPlay',false);
                    this.isPlay = false;
                }else {
                    item.isPlay = !item.isPlay;
                }
                //隐藏播放量，显示播放进度
                this.currentTimeShow = false;
                //播放或暂停的时候进度按钮显示
                this.controlBtn = true;
                //播放总长度变成全屏按钮
                this.playTime = false;
                // this.playss = true;
                //中间播放按钮或暂停按钮是否显示
                this.plays = true;
                //播放按钮变暂停按钮
                this.play = false;
                //右下角播放总长度变成全屏按钮
                this.playTimes = true;
                //左下角播放量或者进度是否显示
                this.currentshow = true;


                let obj = {};
                obj[index] = this.currentTime;
                //判断被点击的视频是否存在了***为避免空值无法Object.keys转 currentDuration:[0,0]这样定义。
                // let has = parseInt(Object.keys(this.currentDuration[0])[0]) === index || parseInt(Object.keys(this.currentDuration[1])[0]) === index;
                //看看当前被点击的是否有在数组中//不存在则返回-1
                let i = this.currentDuration.findIndex((value) => {
                    return index === parseInt(Object.keys(value)[0]);
                });
                // 该视频是否播放
                if(this.isPlay && this.activeIndex === index) {
                    this.videoDom.pause();
                    //标志位
                    this.isPlay =  false;
                    // this.activeIndex = -1;
                    this.countTime = false;
                    //暂停按钮变播放按钮
                    this.play = true;
                    // this.playss = false;




                    this.currentTime = videoDams[index].currentTime;

                    if(i !== -1){
                        //原来就存在的话，那就把它替换为新播放进度
                        this.currentDuration[i][index] = videoDams[index].currentTime;
                    }else {

                        if(this.currentDuration.length >=  2) {
                            this.currentDuration.splice(0,1);//删除第1个
                            this.currentDuration.push(obj);//再把新的推进来

                        }else {
                            // this.currentDuration.splice(0,1);//删除第1个
                            this.currentDuration.push(obj);
                        }
                    }

                    // if(this.currentDuration.length >=  2) {
                    //     // if(i !== -1){
                    //     //    //原来就存在的话，那就替换为新播放进度
                    //     //     this.currentDuration[i][index] = videoDams[index].currentTime;
                    //     // }
                    //     this.currentDuration.splice(0,1);//删除第1个
                    //     this.currentDuration.push(obj);//再把新的推进来
                    //
                    // }else {
                    //     this.currentDuration.splice(0,1);//删除第1个
                    //     this.currentDuration.push(obj);
                    // }

                    // //从vuex获取播放进度时间并给对应视频设置播放进度
                    //把当前视频的播放进度提交vuex
                    // this.setVideoCurrentTime(this.currentTime);
                    // let arr = [index + ":" + this.currentTime]
                    // this.setCurrentTimes({
                    //     // index,
                    //     videoCurrentTime:this.currentTime
                    //     // videoCurrentTime:arr
                    // });
                    //***不从vuex获取***//
                    //当该视频开启了播放，即使之后暂停。其它视频统统还原状态。仅仅保存上一条播放的进度。其它重置。
                    for(let i = 0;i<this.videos.length;i++) {
                        if(index === i) continue;
                        this.videos[i].isPlay = false;
                        videoDams[i].pause();
                        videoDams[i].currentTime = 0; //重置
                    }

                    //让进度数组的数据显示在两个最近播放的视频上面，而不被重置。解决Bug:避免当没被手动暂停时候去播放其它而重置该播放时间
                }else {
                    //从vuex获取播放进度时间并给对应视频设置播放进度
                    // this.currentTime = this.videoCurrentTime[0];
                    // videoDams[index].currentTime = this.videoCurrentTime;
                    this.videoDom.play();
                    //标志位播放
                    this.isPlay = true;
                    this.activeIndex = index;
                    //播放的时候视频顶部显示切换
                    setTimeout(() => {
                        //底部播放或暂停的时候进度按钮显示
                        this.controlBtn = false;
                        //右下角播放总长度变成全屏按钮
                        this.playTimes = false;
                        // //中间播放按钮变暂停按钮
                        // this.plays = false;
                        //左下角播放量或者进度是否显示
                        this.currentshow = false;
                        //隐藏播放进度播放量，显示播放量
                        this.currentTimeShow = true;
                        //播放按钮变暂停按钮
                        this.play = true;
                        //中间播放按钮或暂停按钮是否显示
                        this.plays = true;
                        // this.playss = true;

                    },3000);

                    if(this.currentDuration.length >=  2) {
                        if(i !== -1){
                            //在数组中存在，那么取出上次的播放进度作为当前播放开头
                            this.currentTime = this.currentDuration[i][index];
                            videoDams[index].currentTime= this.currentDuration[i][index];
                        }

                    }else {
                        //没找到说明没有最近上次播放进度
                        this.currentDuration.splice(0,1);//删除第1个
                        this.currentDuration.push(obj);//再把新的推进来
                    }

                    for(let i = 0;i<this.videos.length;i++) {
                        if(i === index) continue;
                        videoDams[i].pause();
                        videoDams[i].currentTime = 0; //重置
                    }

                    //避免当没被手动暂停时候去播放下一个视频而被重置播放时间。从播放进度数组获取
                    // this.currentDuration.forEach((item) => {
                    //       parseInt(Object.keys(item))[0] === 2
                    // })

                    // for(let i =0;i<this.currentDuration;i++) {
                    //     parseInt(Object.keys(this.currentDuration[i])[0])
                    // }




                    // for(let i = 0;i<this.videos.length;i++) {
                    //     if( parseInt(Object.keys(this.currentDuration[0])[0]) === i) continue;
                    //     if( parseInt(Object.keys(this.currentDuration[1])[0]) === i) continue;
                    //     videoDams[i].pause();
                    //     videoDams[i].currentTime = 0; //重置
                    // }

                    // this.$refs.setWidth.offsetWidth = '100px'; //****没有*****
                    // this.speedWidth = this.percent * 500;
                }
                this.speedWidth = this.percent * 345;
            },


            // getwidth() {
            //     this.$nextTick(() => {
            //         this.$refs.setWidth.style.width = '35px';
            //     })
            // },
            //黄奕老师写法
            // format(interval) { // 对时间戳进行转化为分秒
            //     interval = interval | 0 // 互零操作符，一个正数向下取整 相当于Math.floor方法
            //     const minute = interval / 60 | 0
            //     const second = this._pad(interval % 60) // 秒数前面补零操作
            //     return `${minute}:${second}`
            // },
            // // 进一步对播放时间处理，秒数补零操作，一位秒数的时候是 0x ，两位不需要处理
            // _pad (num, n = 2) {
            //     let len = num.toString().length;
            //     while (len < n) {
            //         num = '0' + num;
            //         len++
            //     }
            //     return num
            // },
            updateTime (e) {
                // if(this.activeIndex !== e.index) {
                //     this.currentTime = this.Durationms(e.target.currentTime);
                // }
                this.currentTime = e.target.currentTime; // 播放的时候派发事件，能够获得当前时间 ***注意写法

                this.speedWidth = this.percent * 345;

            },
            Durationms(durationms){
                // 对时间戳进行转化为分秒
                // durationms = durationms / 1000;//转换为多少秒  本身播放当前时间为秒
                durationms = durationms | 0; // 互零操作符，一个正数向下取整 相当于Math.floor方法
                let  minute = durationms / 60 | 0;
                minute = minute < 10 ? '0' + minute : minute;
                // let second = _pad(durationms) % 60;
                let second = durationms % 60;
                second = second < 10 ? '0' + second : second;// 秒数前面补零操作
                return `${minute}:${second}`;
            },

            toPlayerDetail(vid,currentUrl) {
                console.log('去视频页');
                // 视频详情页，这个不会把底部评论提前
                this.$router.push({
                    path:`videoplayer`
                });
                //给vuex提交vid，确定当前要播放视频id
                this.video({vid,currentUrl});
            },
            avatar() {
                //去up主页
            },
            praisedCount() {
                //点赞
            },
            details(vid,currentUrl) {
                console.log('去视频页并评论提前');
                //视频详情页，这个不会把底部评论提前
                this.$router.push({
                    path:`videoplayer`
                });
                //给vuex提交vid，确定当前要播放视频id
                this.video({
                    vid,
                    currentUrl
                });
                this.commentBack({back:true});
            },
            more() {
                //更多
            },
            ...mapActions([
                'video',
                'setCurrentTimes',
                'commentBack'

            ]),
            ...mapMutations({
                setVideoList:'SET_VIDEO_LIST',
                setCurrentIndex: 'SET_CURRENT_INDEX',
                setVideoCurrentTime:'SET_VIDEO_CURRENT_TIME',
                setCurrentUrl:'SET_CURRENT_URL'
            })
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  li
    margin:10px auto
    .flexdiv
      width:100%
      background-color:white
      .container
        margin:5px 10px
        .wrapper
          background-color:#dcdcdc
          border-radius:10px
          position:relative
          height:203px
          font-size:$font-size-small-s
          .video
            width:100%
            height:200px
            border-radius:10px
          .wrap
            position:absolute
            top:0
            right:0
            bottom:0
            left:0
            opacity: 0.8

            .grop
              position:absolute
              top:10px
              right:10px
              border:1px solid gray
              min-width:25px
              text-align:center
              border-radius:6px
              height:13px
              line-height:13px
              padding:2px 8px
              background-color:greenyellow
            .wrapperLeft
              position: absolute
              left:5px
              bottom:10px
              height:10px
              color:white
            .wrapperCenter
              color:white
              position: absolute
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              font-size:$font-size-large-x
            .wrapperRight
              position: absolute
              right:10px
              bottom:10px
              height:10px
              color:white
          .control
            height:2px
            width:100%
            background-color:yellow
            position:absolute
            bottom:0
            .speed
              height:2px
              background-color:red
              /*width:0*/
              margin:0 5px
            .controlBtn
              border-radius:50%
              background-color:red
              height:10px
              width:10px
              position:absolute
              bottom:-3px
              left:0


        .title
          border-bottom:1px solid #dcdcdc
          flex-between()
          margin:auto 5px
          height:45px
          span
            ellipsis()
            font-size:$font-size-medium
          img
            width:30px
            height:30px
            border-radius:50%
        .wrapBottom
          height:45px
          line-height:45px
          position:relative
          flex-center(column)
          font-size:$font-size-large
          .wrapBottomImg
            position:absolute
            left:0
            height:100%
            min-width:35px
            flex-center()
            img
              width:30px
              height:30px
              border-radius:50%
              margin-top:-15px
              position:absolute
              top:50%
              left:0
            span
              ellipsis()
              height:35px
              line-height:35px
              margin-left:35px
              font-size:$font-size-small
          .wrapBottomLeft
            position:absolute
            left:210px
            height:100%
            min-width:35px
            span
              font-size:$font-size-small-s
              position:absolute
              bottom:8px
              left:13px

          .wrapBottomCenter
            position:absolute
            left:280px
            height:100%
            min-width:35px
            span
              font-size:$font-size-small-s
              position:absolute
              bottom:8px
              left:13px
          .wrapBottomRight
            position:absolute
            right:-10px
            height:100%
            width:35px
            text-align:center

</style>
