<h1 align="center">Welcome to Cube-Music 👋</h1>

<p align="center">
<img src="https://img.shields.io/badge/webpack-^3.6.0-informational" alt="webpack">
<img src="https://img.shields.io/badge/vue-2.5.2-success" alt="vue">
<img src="https://img.shields.io/badge/node-10.15.3-fa983a" alt="node">
<img src="https://img.shields.io/badge/dependencies-up to date-8c7ae6" alt="dependencies">
<img src="https://img.shields.io/badge/dev dependencies-up to date-44bd32" alt="dev dependencies">
<p>

## :speech_balloon:前言

感觉依旧缺乏原创性比较强的项目，故借学习vue后，目标相对独立开发一个完整项目，以此掌握vue相关知识，项目通过 Vue 编写实现，全面借用**网易云音乐IOS移动端**的 UI 设计、功能实现。项目开始于2019年11月初。当初IOS网易云移动端应该属于7.0版本之前，故跟现在的UI页面有一定的差异性。目前实现了大部分核心功能，音乐和视频展示和播放功能，歌单展示和部分交互功能，登录用户和其它用户及歌手详情页，搜索功能。但依然有较多细节功能还没有完善或者连通，依旧存在一些Vue bug（如评论大量数据加载的触发无限循环等等）。
（1）未来将继续解决cube-ui带来的一些交互体验问题，如多级吸附效果失败，用户详情页等内部多栏目里滚动不佳（跟实际网易云效果有些差异）
（2）优化细节功能开发和连通操作
（3）代码优化,解决bug
（4）尝试写UI组件库替换。目前如提醒组件既有采用cube-ui的，也有原生封装
（5）更深入学习vue和原生js，提升代码质量。封装如内部搜索功能，轮播效果，拖拽功能，滑动删除等功能，Vue和convas动画，从而尽量接近真实网易云效果
（6）真机环境测试和改进
（7）部署上线
> 本项目参考情况：
(1)代码：
黄佚老师的Vue音乐课程。引用（复制）了音乐播放内核如歌词解析，拖拽功能。采用了黄老师的Better-Scroll(cube-ui所封装的)
代码写法：vuex参考了黄老师的封装写法
http--axios封装参考：https://juejin.im/post/5b55c118f265da0f6f1aa354

>api来源：
https://binaryify.github.io/NeteaseCloudMusicApi/#/

感谢这几位大佬的课程教程文档（开源或付费）

>本文档页面参考：https://github.com/powerdong/Music-player

## :muscle: 项目目标

全面实现IOS移动端网易云音乐的功能

> 项目还在编写完善中

## 🚀 如何运行

> node 版本 `如下`
>因未部署上线，所以首先你需要拥有NeteaseCloudMusicApi，从github里克隆即可
参考如下：
https://github.com/Binaryify/NeteaseCloudMusicApi

环境要求
需要 NodeJS 8.12+ 环境

```
安装
$ git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
$ npm install
```

```
运行
$ node app.js
```

> 接着才能运行本项目
```
# 克隆
git clone https://github.com/itagan/cube-music.git
```

```
# 打开项目目录
cd cube-music
```

```
# 安装依赖
npm install
```

```
# 开启本地服务运行项目
npm run dev
```

```
# 提供登录测试账号：
手机13048268890 
密码123456

登录入口如：
http://0.0.0.0:8080/#/login

后面将开发更完善符合实际的登录模式以及不登录体验模式
```


**欢迎 star，欢迎 issue**

### :eyes: 项目进度

**上一次更新(2020-3-11)：** 解决了视频拖拽情况下触发轮播bug，影响用户体验

**最近开发情况(2020-2)：** 搜索功能和音乐播放内核基本完成

本项目在不断完善中，请大家拭目以待~

## 技术栈
vue全家桶+vuex+vue-router+goodstorage

### :point_right: 主要依赖

- Vue 全家桶(使用 Vue-cli 作为构建工具)
- WebPack
- ES6,ES5
- Stylus
- ESLint
- goodstorage
- Cube UI
- [网易云音乐 API](https://binaryify.github.io/NeteaseCloudMusicApi/#/)


## :mega: 目标功能

- [x] 手机登录、注册
- [ ] 修改密码
- [x] 我的页面歌单信息
- [x] 添加，删除歌单
- [ ] 最近播放
- [ ] 心动模式
- [ ] 我的电台
- [x] 我的收藏
- [x] 发现页面推荐歌单
- [x] 发现页面新碟
- [x] 发现页面新歌
- [ ] 发现页面每日推荐
- [ ] 发现页面歌单
- [x] 视频页面
- [ ] 歌单广场
- [ ] 新歌推荐
- [x] 更多新碟
- [ ] 发现页面排行榜
- [ ] 发现页面电台
- [x] 退出账号
- [ ] 发现页面私人 FM
- [x] 搜索功能
- [x] 搜索结果展示
- [ ] 热搜榜
- [x] 历史记录
- [x] 搜索推荐
- [ ] 歌手分类
- [x] 音乐视频播放功能
- [x] 播放列表
- [x] 添加删除播放列表
- [ ] 签到
- [ ] 歌曲喜欢与否
- [x] 专辑收藏与否
- [x] 歌单评论
- [x] 专辑评论
- [x] 电台节目评论
- [x] 视频评论
- [x] 登录用户相关
- [x] 歌手和其它用户相关
- [x] 页面滚动加载
- [ ] 左右滑动切换
- [ ] 页面切换动画
- [ ] 登陆情况，没网判断
- [ ] 全面优化&修复

## :computer: 部分功能展示截图

![](https://pic.downk.cc/item/5e6a07a0e83c3a1e3a08cd6b.gif)
![](https://pic.downk.cc/item/5e6a07a0e83c3a1e3a08cd6d.gif)
![](https://pic.downk.cc/item/5e6a07a0e83c3a1e3a08cd6f.gif)
![](https://pic.downk.cc/item/5e6a038be83c3a1e3a06ba01.gif)
![](https://pic.downk.cc/item/5e6a0371e83c3a1e3a06ae44.gif)
![](https://pic.downk.cc/item/5e6a00bae83c3a1e3a05a808.gif)
![](https://pic.downk.cc/item/5e6a00bae83c3a1e3a05a80a.gif)
![](https://pic.downk.cc/item/5e6a00bae83c3a1e3a05a80c.gif)
![](https://pic.downk.cc/item/5e6a00bae83c3a1e3a05a810.gif)

## :page_with_curl: 项目布局

```js
.src
+-- api
|   +-- api.js // 请求相关的api地址
|   +-- http.js // axios封装统一管理状态码
+-- assets // 项目资源
|   +-- iconfonts //icon图标有关
|   +-- js // 全局使用的公共方法，数据
    |   +-- area.js // 地址和对应代码数据
    |   +-- debounce.js // 防抖
    |   +--dialog.js // 弹窗处理函数
    |   +-- dom.js // 兼容性
    |   +-- number.js // 数字转换方法
    |   +-- timestamp.js // 时间戳转换方法
+-- base // 基础组件
|   +-- basecomment // 评论相关
    |   +-- basecomment.vue // 评论显示基础组件
    |   +-- replyallcomment.vue // 回复全部评论展示
    |   +-- replycontent.vue // 回复评论主体内容
    |   +-- userbase.vue // 插槽使用：暂无使用
|   +-- more // 更多功能优化
    |   +-- moreslot.vue // 目标：使用插槽统一管理更多及其类似页面。暂未使用   
|   +-- nav // 导航
    |   +-- nav.vue // 发现页更多歌单单个框展示组件 
|   +-- navbar // 顶部搜索框插槽组件
    |   +-- navbar.vue // 待优化 
|   +-- progress // 拖拽相关
    |   +-- progress-bar.vue // 拖拽进度条组件  
|   +-- search // 顶部搜索框 （待优化）
    |   +-- search.vue // 搜索组件 
    |   +-- searchcancel.vue // 搜索组件，带取消按钮 
|   +-- share // 分享组件
    |   +-- search.vue // 搜索组件 
    |   +-- searchcancel.vue // 搜索组件，带取消按钮 
|   +-- song // 歌曲
    |   +-- songbase.vue // 歌曲展示基础组件 
    |   +-- songlistbase.vue // 歌单歌曲列表展示基础组件  
|   +-- swiper // 页面展示方便滚动的各种小组件
    |   +-- album.vue // 专辑列表基础组件  插槽版
    |   +-- albumcommenttop.vue // 专辑评论页头部专辑信息组件 
    |   +-- albumsinger.vue // 歌手详情页，专辑列表基础组件
    |   +-- albumsmall.vue // 专辑列表基础组件  插槽版 小尺寸模式
    |   +-- baseauto.vue // 50px高的插槽模式自由组合列表基础展示组件
    |   +-- column.vue // 我的收藏：专栏展示   静态数据渲染    
    |   +-- followbase.vue // 65px高的插槽模式自由组合列表基础展示组件 
    |   +-- followbasesmall.vue // 50px高的插槽模式自由组合列表基础展示组件
    |   +-- listbase.vue // 列表项展示组件（自由组合限制大）
    |   +-- listbasesmall.vue // 列表项展示组件（自由组合限制大） 小尺寸版
    |   +-- logbase.vue // 话题 展示基础组件
    |   +-- recommendSwiper.vue // 推荐列表
    |   +-- searchsong.vue // 搜索结果歌曲列表基础组件
    |   +-- singervideo.vue // 歌手详情页视频列表展示
    |   +-- songlistcomment.vue // 歌单评论页顶部歌曲详情页
    |   +-- subvideo.vue // 收藏视频列表基础组件
|   +-- video // 视频
    |   +-- baseplayer.vue // 视频播放器基础组件
    |   +-- basevideo.vue // 视频播放器基础组件 
    |   +-- sharevideo.vue // 视频分享
    |   +-- wonderfulbase.vue // 精彩视频列表视频播放器基础组件     
+-- common // 公共
|   +-- js // 核心js文件
    |   +-- config.js // 音乐播放模式匹配
    |   +-- goodstorage.js // 本地储存库
    |   +-- util.js // 随机播放音乐方法
    +-- stylus // stylus
+-- components // 页面功能组件
|   +-- account // 账号相关
    |   +-- follows // 我的关注
    |   +-- account.vue // 账号页面
    |   +-- feature.vue // 账号页面子组件
    |   +-- header.vue // 账号头部页面
    |   +-- personal.vue // 子页面：账号个人信息
|   +-- common // 公共组件
    |   +-- buildlist.vue // 新建歌单  
    |   +-- checkfooter.vue // 歌单多选时底部显示组件 
    |   +-- collectiontolist.vue // 收藏歌单  
    |   +-- commentreply.vue // 评论回复展示页面
    |   +-- cover.vue // 歌单等封面效果  
    |   +-- moresinger.vue // 更多歌手  
    |   +-- moresongs.vue // 更多歌曲 
    |   +-- playmore.vue // 更多页面 
    |   +-- radiotips.vue // 电台，更多页面  
    |   +-- replydialog.vue // 回复弹窗提示组件 
    |   +-- setring.vue // 设置铃声组件
    |   +-- sharedialog.vue // 分享提醒组件
    |   +-- subscribe-dialog.vue // 苹果限制提醒组件
    |   +-- toast.vue // 节目提醒有关
    |   +-- videoslide.vue // 精彩视频页面 
|   +-- dynamic // 动态
    |   +--comment // 动态评论有关
    |   +--dynamic.vue // 动态页面
    |   +--forward.vue // 动态转发
|   +-- find // 发现
    |   +--find.vue // 发现页面
    |   +--header.vue // 发现头部页面
    |   +--nav.vue // 发现页面导航
    |   +--newsong.vue // 新歌新碟
    |   +--recommendsong.vue // 推荐歌单
    |   +--slider.vue // 发现页面轮播图
    |   +--videos.vue // 视频流展示
|   +-- musicplayer // 音乐播放
    |   +--header.vue // 头部页面
    |   +--index.vue // 主体
    |   +--playlist.vue // 播放列表（带轮播效果）
|   +-- my // 我的
    |   +--collectionmore.vue // 主体
    |   +--header.vue // 头部   
    |   +--my.vue // 我的   
    |   +--mymusic.vue // 我的音乐  
    |   +--mynav.vue // 我的导航 
    |   +--playlist.vue // 我的歌单 
    |   +--playmore.vue // 我的更多操作 
|   +-- mycollection // 我的收藏
    |   +--album.vue // 专辑
    |   +--collectionlist.vue // 主体页面
    |   +--header.vue // 头部
    |   +--mlog.vue // mlog
    |   +--search.vue // 收藏内容搜索  **暂不支持
    |   +--singer.vue // 收藏的歌手 
    |   +--slider.vue // 左右滑动效果   
    |   +--specialcolumn.vue // 收藏的专栏  **静态数据
    |   +--video.vue // 收藏的视频 
|   +-- newalbumsong // 新碟新歌
    |   +--img // 图片资源
    |   +--index.vue // 主体页面
    |   +--list.vue // 新歌列表
    |   +--newsongs.vue // 新歌
    |   +--newalbums.vue // 新专辑展示
    |   +--songlist.vue // 新歌左右滑动列表主体
|   +-- others // 其它用户详情页
    |   +--edituser // 编辑用户
    |   +--morelist // 用户页面列表组件
    |   +--basemessage.vue // 用户基本数据
    |   +--header.vue // 头部
    |   +--homepage.vue // 用户主页
    |   +--message.vue // 用户信息  
    |   +--playlist.vue // 歌单列表
    |   +--user.vue // 用户详情页主体结构
    |   +--userdynamic.vue // 用户动态（类似微信朋友圈）  
|   +-- search // 搜索功能
    |   +--albums // 专辑
    |   +--all // 综合
    |   +--hotsearch.vue // 热搜
    |   +--playlist.vue // 歌单
    |   +--radios.vue // 电台
    |   +--search.vue // 搜索主体结构
    |   +--singers.vue // 歌手
    |   +--songs.vue // 歌曲
    |   +--users.vue // 用户 
    |   +--videos.vue // 视频
    |   +--yuncun.vue // 云村  
|   +-- singer // 歌手详情页
    |   +--album // 专辑
    |   +--dynamic // 歌手动态
    |   +--header.vue // 头部
    |   +--homepage.vue // 主页
    |   +--message.vue // 歌手信息
    |   +--moremessage.vue // 更多信息
    |   +--music.vue // 歌曲
    |   +--singer.vue // 歌手详情页
    |   +--video.vue // 视频
|   +-- songlist // 歌单展示模式
    |   +--album // 专辑文件夹
    |   +--edit // 编辑文件夹
    |   +--radio // 电台文件夹
    |   +--songlist // 歌单文件夹
    |   +--header.vue // 头部
|   +-- tabbar // 
    |   +--tabbar.vue // 底部导航
|   +-- user // 登录用户
    |   +--img // 静态图
    |   +--code // 验证码登录
    |   +--header // 头部
    |   +--login // 登录
    |   +--loginpassword.vue // 密码登录   
    |   +--loginphone // 手机号登录
|   +-- video // 视频
    |   +--slide // 视频流播放左右滑动
    |   +--video // 视频流播放
    |   +--header // 头部
    |   +--videolist // 视频列表  
|   +-- videoplayer // 视频播放器
    |   +--comment // 视频详情页评论
    |   +--hotcomment // 视频精彩评论
    |   +--newcomment // 最新评论
    |   +--videoplayer // 视频详情页 
|   +-- village // 云村
    |   +--village // 精彩视频流展示   
+-- router // 路由配置
    +-- index
+-- store // vuex 配置使用
    +-- actions // 根级别的 action
    +-- getters // 根级别的 getter
    +-- index // 组装模块并导出 store 的地方
    +-- mutations-types // 根级别的 mutation-types
    +-- mutations // 根级别的 mutation
    +-- state // 根级别的 state
```

## 打包日志
暂未打包部署上线

> 本项目会长期更新，欢迎大家指出问题，共同学习

## 作者

👤 **Agan**