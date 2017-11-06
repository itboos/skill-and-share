<template>
  <div class="play">
    <div class="nav space-between">
      <div class="home-btn" :style="styleObj.homeBg" @click="goHome">频道列表</div>
      <div class="line"  v-for="(line, index) in  sourceList" v-if="index < 4"
          :class="(index+1) === currentLine ? 'active': ''  "
          @click="changeLine(index, line.url)"
      >{{line.tag}}</div>
    </div>
    <div class="vedio-box" id="player">
      <div class="play-btn" @click="clickPlay" v-if="playBtnShow">
        <img src="../assets/imgs/icon_h5_play.png">
      </div>

      <div class="loading" v-show="loading">
        <img src="../assets/imgs/loading_round_big.png">
      </div>
    </div>
    <p class="collect-info">★★★ 快快收藏本网站，精彩内容不再错过 ★★★</p>
    <div class="hot-channel">
        <div class="tag-name">
          热播推荐
        </div>
        <!-- space-between -->
        <div class="tv-list flex">
          <span class="tv one-line" v-for="(item,index ) in hotList"
                @click="seeNow(index,item.tvId, item.tvName)" 
                :class="[ {'bigger-tv' : item.tvName.length > 5  }, { 'active': clickIndex===index } ] ">
              {{item.tvName}}
          </span>
        </div>
    </div>
  </div>
</template>
<script>
  import homeBtn from '../assets/imgs/homeBtn.png';

  /* eslint-disable no-param-reassign */
  let player = '';
  let videoDoc = '';
  export default {
    name: 'play',
    data() {
      return {
        styleObj: {
          homeBg: {
            backgroundImage: `url(${homeBtn})`,
          },
        },
        isScriptLoaded: false,
        hotList: [],
        sourceList: [],
        currentId: 0,
        currentPlayLine: '',
        tvName: '',
        clickIndex: -1,
        currentLine: 1,
        playBtnShow: true,
        loading: false,
        head: 'http://static.live.nagezan.net/live/fb284641-a4a6-4a2f-b596-abfb49ba037c.png',
      };
    },
    watch: {},
    computed: {},
    mounted() {
      this.getHotTvs();
      const currentId = this.$route.query && this.$route.query.tvId;
      const tvName = this.$route.query && this.$route.query.tvName;
      this.tvName = decodeURIComponent(tvName);
      console.log(this.tvName);
      document.title = `天天电视${this.tvName}`;
      this.getSource(currentId,true);
    },
    methods: {
      getSource(tvId, isAutoPlay = false) {
        const self = this;
        this.$store.dispatch('get', {
          //path: `http://114.215.175.21:3553/source_h5_with_label.php?version=1.0.0&tvid=${tvId}`,
          path: `http://43.246.209.135:9090/source_h5/get_by_tvid?tvid=${tvId}`,
          params: {},
          callback(data) {
            // console.log('播放源:', data);
            self.frameurl = data.frameurl || '';
            self.sourceList = [];
            const reg = /^letvhtml:/;
            for (let i = 0; i < data.source.length; i += 1) {
              if (reg.test(data.source[i])) {
                data.source[i] = data.source[i].replace('letvhtml://','');
              }
              self.sourceList.push({
              /* eslint-disable  comma-spacing  */
                tag: data.source_labels[i].tag,
                from: data.source_labels[i].from,
                url: data.source[i],
              });
            }
            // 默认第一条作为默认线路
            self.currentPlayLine = data.source[0];
           // console.log(self.currentPlayLine);
            if (isAutoPlay) {
              self.loading = true;
              self.clickPlay();
            } else {
              self.playBtnShow = true;
              self.loading = false;
            }
          },
        });
      },
      getleSource(url) {
        const self = this;
        this.$store.dispatch('jsonp', {
          path: url,
          params: {
          },
          callback(data) {
          },
        });
      },
      // 获取热门推荐数据
      getHotTvs() {
        const self = this;
        this.$store.dispatch('get', {
          // path: 'http://121.40.182.173:3553/v3/h5/epg_tvnow_hot_tvs.php',
          path: 'http://43.246.209.135:9090/epg_tvnow_h5/get_recommend_tvs',
          params: {},
          callback(data) {
            //console.log('热门推荐数据:', data);
            self.hotList = data;
          },
        });
      },
      clickPlay() {
        this.playBtnShow = false;
        this.loading = true;
        const self = this;
        //统计部分
        /* global ga */
        if (typeof ga !== 'undefined') {
          ga('send', {
            hitType: 'event',
            eventCategory: '云图H5版统计',
            eventAction: `${this.tvName}`,
            eventLabel: '云图H5版',
          });
        }
        /* global _hmt */
        if (typeof _hmt !== 'undefined') {
          _hmt.push(['_trackEvent', `观看${this.tvName}`, `观看${this.tvName}`, '云图H5版']);
        }
         // 使用jwplayer
        if (!this.isScriptLoaded) {
          this.$store.dispatch('loadScript', {
            // src: '../static/jwplayer/jwplayer.js',  // 本地
            src: './static/jwplayer/jwplayer.js', //服务器上
            callback: () => {
              this.jwPlayerLoaded();
              self.isScriptLoaded = true;
            },
          });
        } else {
          self.jwPlayerLoaded();
        }
      },
      goHome() {
        const homePath = this.$store.getters.homePath;
        this.$router.push(homePath);
      },
      changeLine(index, url) {
        this.currentLine = index + 1;
        if (this.isScriptLoaded) {
          player.remove();
        }
        this.currentPlayLine = url;
        this.clickPlay();
      },
      seeNow(index, tvId ,tvName) {
        this.clickIndex = index;
        if (this.isScriptLoaded) {
          player.remove();
        }
        this.tvName = tvName;
        document.title = `天天电视${this.tvName}`;
        this.getSource(tvId, true);
      },
      jwPlayerLoaded() {
        const self = this;
        /* global jwplayer:true */
        jwplayer.key = 'oaO6HbsMxzpsBrVyYDuk3rZJcRN1GwbFolh3VsFIn1w=';
        player = jwplayer('player').setup({
          // file: 'http://vod2.live.nagezan.net/video/baiwan.mp4',
          // file: 'http://hls.wsdemo.zego.im/livestream/zegotest-3332756846-719f7fd8-5cd1-4c97-bf64-06b867ae5c49/playlist.m3u8',
          //file: 'http://my.tv.sohu.com/ipad/81414038_4652180997649_13527249.m3u8?plat=3&prod=app',
          file: self.currentPlayLine,
          autostart: true,
          width: '100%',
          height: '211',
          image: self.frameurl,
          stretching: 'fill',
          primary: 'html5',
          androidhls: true,
          hlshtml: true,
          controls: true,
          events: {
            onPlay: () => {
              this.test += '_Play ';
              this.loading = false;
              this.bgShow = false;
              this.playBtnShow = false;
            },
            onPause: () => {
              this.test += '_Pause ';
              this.playBtnShow = true;
              this.loading = false;
            },
            onBuffer: () => {
              this.test += '_Buffer ';
              this.loading = true;
              this.playBtnShow = false;
            },
            onBufferChange: () => {
              this.test += '_BufferChange ';
            },
            onBufferFull: () => {
              this.test += '_BufferFull ';
              this.loading = false;
              this.bgShow = true;
              this.playBtnShow = false;
            },
            onDisplayClick: () => {
              this.test += '_DisplayClick ';
              this.play();
            },
            onSetupError: () => {
              this.test += '_SetupError ';
              this.bgShow = false;
              this.loading = false;
              this.playBtnShow = false;
            },
            onFirstFrame: () => {
              this.test += '_FirstFrame ';
            },
            onComplete: () => {
              this.test += '_Complete ';
            },
            onReady: () => {
              this.test += '_Ready ';
              this.play();
              this.playBtnShow = false;
              this.loading = false;

              videoDoc = document.querySelector('video');
              videoDoc.setAttribute('x5-video-player-type', 'h5');
            },
            onResize: () => {
              this.play();
            },
            onFullscreen: () => {
            },
          },
        });
      },
    },
    components: {
    },
  };
</script>

<style scoped lang="scss">
  @import "../assets/css/base";
  /* $maincolor */
  .collect-info {
    background: #fff;
    font-size: (11rem / $rem);
    padding: 4px 0 7px;
  }
  .nav {
    padding: (14rem / $rem) (16rem / $rem) (15rem / $rem) (4rem / $rem);
    line-height: (17rem / $rem);
    background: $maincolor;
    color: #fff;
    font-size: (12rem / $rem);
    .home-btn {
      padding-left: 1.1rem;
      background-size: (16rem / $rem) (16rem / $rem);
      background-repeat: no-repeat;
      background-position: (4rem / $rem) (0rem / $rem);
      height: (17rem / $rem);
    }
    .line {
      position: relative;
    }
    .active::after {
      content: "";
      display: block;
      width: (16rem / $rem);
      height: 0;
      border-bottom: solid 2px #fff;
      position: absolute;
      left: 50%;
      bottom: -(2rem / $rem);
      margin-left: (-8rem / $rem);
    }
  }
  .vedio-box{
    background: rgba(0,0,0,.9);
    height: (211rem / $rem);
  }
  .hot-channel {
    .tag-name {
      text-align: left;
      color: $maincolor;
      font-size: (16rem / $rem);
      line-height: (19rem / $rem);
      margin:  (16rem / $rem) 0  (12rem / $rem)  (16rem / $rem);
    }
  }
  .tv-list{
    padding: 0 0 0 (6rem / $rem);
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
     > span.active{
         background: $maincolor;
         color: #fff;
    }
    .bigger-tv{
        width:auto;
        max-width: (160rem / $rem);
        // box-sizing: content-box;
        padding: (11rem / $rem) (12rem / $rem);
    }
  }
  .tv {
      // width: (88rem / $rem);
      width: auto;
      min-width: (88rem / $rem);
      height: (40rem / $rem);
      line-height: (18rem / $rem);
      padding: (11rem / $rem) 0;
      background: #fff;
      margin: 0 (4rem / $rem) (5rem / $rem)  0;
      border-radius: 2px;
  }
  .vedio-box {
     position: relative;
  }
  .play-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    width: (70rem / $rem);
    height: (70rem / $rem);
    margin: (-30rem / $rem) 0 0 (-30rem / $rem);
  }

  .loading {
    @extend .play-btn;

    animation: loading 1s linear infinite;
  }

  @keyframes loading {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

</style>
