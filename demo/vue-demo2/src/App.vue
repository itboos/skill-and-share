<template>
  <div id="app">
      <top></top>
      <h3>这是测试啊</h3>
  </div>
</template>

<script>
import Top from './components/Top';
import Rank from './components/Rank';
//import axios from 'axios';
import CGI  from './lib/cgi';

export default {
  name: 'app',
  components: {
    Top,
    Rank
  },
  data(){
    return {
      CGI:'',
      CGI2: '',
      remainTime: {
         time: 0,
         h: '0',
         m: '0',
         s: '0'
      },
    }
  },
  created(){
    CGI.init();
    this.getData();
  },
  methods:{
    getData(){
        var params={
          data:{
             campaign:"campaign20170125"
          }
        };
        CGI.post(this.CGI+'/cgi-bin/get_top_list',params,(resp)=>{
          console.log(resp);
        },'text/plain');
    },
    // JSONP请求
    getData2(){
        // offset=0 表示本周数据，=-1 表示请求上周前三数据
        var params={
          gid: 9999,
          offset: 0
        }
        //CGI.jsonp(this.CGI+'v1/c5/xiaoyou/weekly_top_gift.json?gid=9999&offset=0',(resp)=>{
        CGI.jsonp(this.CGI+'/v1/c5/xiaoyou/weekly_top_gift.json',params,(resp)=>{
          if(resp.code === 0){
            //console.log(resp);
            var data= resp.data;
            this.loadding= false;
            this.leftTime= data.diffTimestamp;
            var anchors= CGI.addLazy( data.anchor );
            //榜单数据
            if(anchors.length > 0 && anchors.length <= 10 ){
              for(var i=0;i< anchors.length; i++){
                this.list.splice(i, 1, anchors[i]);
              }
            }
            //this.list=[];
            this.cutDown(this.leftTime);
          }
         
        });
    },
    cutDown(leftTime){
      clearInterval(this.timer);
      if( this.status ===0 ){
       this.remainTime.time = parseInt((leftTime) / 1000);
           CGI.remainInterval(this.remainTime);
           this.timer = setInterval(() =>{
            CGI.remainInterval(this.remainTime);
         }, 1000)
      } 
   
    }
 },
  computed:{

  }
}
</script>

<style>
  body,html,p,h3{
    margin:0;
    padding:0;
  }
  body{
    background:#fff;
    max-width: 520px;
    margin:0 auto;
  }
  img {
    width:100%;
    vertical-align: top;
  }
  a{
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
    display: inline-block;
  }
  .one-line{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
  [v-cloak]{
    display: none;
  }
  .refresh {
      position: fixed;
      width: 2.1rem;
      right: 0;
      top: 15rem;
      z-index: 5;
  }
  #loading {
      position: fixed;
      top: 10rem;
      left: 50%;
      margin-left: -35px;
      width: 70px;
      z-index: 9999;
  }
  #loading img:nth-child(2){
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      animation: loading 1s linear infinite;
  }

  @keyframes loading {
      0% {
          transform: rotate(0deg);
      }
      100% {
          transform: rotate(360deg);
      }
  }
</style>
<style lang="scss">
   @import './lib/function';
   h3{
      font-size: rem(40);
    }


</style>
